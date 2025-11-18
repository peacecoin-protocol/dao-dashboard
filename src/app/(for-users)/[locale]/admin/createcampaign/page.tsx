'use client'

import { useEffect, useState, useMemo } from 'react'
import { ethers, formatEther, parseEther, ZeroAddress } from 'ethers'
import { useToast } from '~/hooks/use-toast'

import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
  useSwitchChain,
  type BaseError,
  useReadContract,
} from 'wagmi'
import { readContract, waitForTransactionReceipt } from '@wagmi/core'
import { CAMPAIGN } from '~/i18n/types'

import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '~/components/ui/dialog'
import { timestampToDate } from '~/components/utils'

import {
  campaignAddress,
  defaultChainId,
  campaignTableHeaders,
  GAS_LIMIT,
} from '~/app/constants/constants'

import { CAMPAIGN_ABI } from '~/app/ABIs/Campaigns'

import { config } from '~/lib/config'
import { PagePropsWithLocale, Dictionary } from '~/i18n/types'
import { getDict } from '~/i18n/get-dict'
import { Spinner } from '~/components/ui/Spinner'
import { CreateCampaignModal } from '~/app/(for-users)/[locale]/admin/createcampaign/modal/createCampaignModal'
import { AddWhitelistModal } from '~/app/(for-users)/[locale]/admin/createcampaign/modal/addWhitelistModal'
import { TableComponent } from '~/components/custom/tableComponent'
import { erc20Abi } from 'viem'
import { createClient } from '~/utils/supabase/client'

// Constants
const PCE_LOGO = '/pce_logo.jpg'
const CLAIM_MESSAGE = 'Claim Bounty for dApp.xyz'
const DEFAULT_CAMPAIGN_ID = -1
const DEFAULT_NFT_DETAIL_INDEX = -1

// Types
interface DialogState {
  isOpen: boolean
  isCreateOpen: boolean
  isAddWinnersOpen: boolean
  campaignId: number
}

interface CampaignStatus {
  isWinner: boolean
  isClaimed: boolean
  status: number
}

interface TotalClaimed {
  campaignId: number
  totalClaimed: string
}

// Components

const CampaignDialog = ({
  isOpen,
  onOpenChange,
  campaign,
  status,
  onClaim,
  isConnected,
  campaignDict,
}: {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  campaign: CAMPAIGN | undefined
  status: CampaignStatus
  onClaim: (gistUrl: string) => void
  isConnected: boolean
  campaignDict: any
}) => {
  const [gistUrl, setGistUrl] = useState('')

  const isActive = useMemo(() => {
    if (!campaign) return false
    const now = new Date()
    const endDate = new Date(Number(campaign.endDate) * 1000)
    const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000)
    return oneHourFromNow <= endDate
  }, [campaign])

  const handleClaim = () => {
    onClaim(gistUrl)
    setGistUrl('')
  }

  if (!campaign) return null

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-md sm:max-w-lg md:max-w-xl mx-auto p-4 sm:p-6 gap-4">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl md:text-2xl font-bold my-2 sm:my-4 break-words">
            {campaign.title}
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base break-words">
            {campaign.description}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 sm:gap-4 text-muted-foreground text-sm sm:text-base">
          <p className="break-words">
            <span className="font-semibold">
              {campaignDict.reward ?? 'Reward'}:
            </span>{' '}
            {campaign.tokenType == 1
              ? `${campaign.totalAmount} Contributor SBTs`
              : campaign.tokenType == 2
                ? `${campaign.totalAmount} Contributor NFTs`
                : `${formatEther(campaign.totalAmount ?? '0')} ${campaignDict.pce ?? 'PCE'}`}
          </p>
          {isActive && (
            <>
              <p className="break-words">
                <span className="font-semibold">
                  {campaignDict.startTime ?? 'Start Time'}:
                </span>
                {timestampToDate(parseInt(campaign.startDate ?? '0'))}
              </p>
              <p className="break-words">
                <span className="font-semibold">
                  {campaignDict.endTime ?? 'End Time'}:
                </span>
                {timestampToDate(parseInt(campaign.endDate ?? '0'))}
              </p>
            </>
          )}
          {!campaign.validateSignatures && (
            <p className="break-words">
              {status.isWinner
                ? (campaignDict.youAreWhitelisted ??
                  'You are whitelisted as a winner')
                : (campaignDict.youAreNotWhitelisted ??
                  'You are not whitelisted as a winner')}
            </p>
          )}
          {status.isClaimed && (
            <p>
              {campaignDict.alreadyClaimed ??
                'You have already claimed this campaign'}
            </p>
          )}
          {campaign.validateSignatures &&
            !status.isClaimed &&
            status.status != 2 && (
              <Input
                type="text"
                placeholder={
                  campaignDict.enterGithubGist ?? 'Enter Github Gist URL'
                }
                value={gistUrl}
                onChange={(e) => setGistUrl(e.target.value)}
                className="w-full"
              />
            )}
          <Button
            onClick={handleClaim}
            disabled={
              status.isClaimed ||
              status.status == 2 ||
              (!status.isWinner && !campaign.validateSignatures) ||
              !isConnected
            }
            className="w-full"
          >
            {campaignDict.claim ?? 'Claim'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Main component
export default function ForCampaignPage({
  params: { locale, ...params },
}: PagePropsWithLocale<{}>) {
  const [dict, setDict] = useState<Dictionary | null>(null)
  const campaign = dict?.campaign ?? {}
  const { address, chainId } = useAccount()
  const { chains, switchChain } = useSwitchChain()
  const { toast } = useToast()

  const supabase = createClient()

  const [campaignData, setCampaignData] = useState<CAMPAIGN[]>([])
  const [refetchCampaignData, setRefetchCampaignData] = useState(false)

  useEffect(() => {
    const fetchCampaignData = async () => {
      const { data: campaignData } = await supabase.from('Campaign').select()
      if (campaignData && campaignData.length > 0) {
        const _tokenData = await Promise.all(
          campaignData.map(async (campaign, index) => {
            const { data } = await supabase
              .from('Token')
              .select()
              .eq('tokenId', campaign.sbtId.toString())
              .eq('isSBT', campaign.tokenType == 1 ? true : false)

            campaignData[index].daoId = data?.[0]?.daoId
            campaignData[index].image = data?.[0]?.image
          })
        )

        setCampaignData(campaignData as CAMPAIGN[])
      }
    }
    fetchCampaignData()
  }, [address, supabase, refetchCampaignData])

  // State
  const [dialogState, setDialogState] = useState<DialogState>({
    isOpen: false,
    isCreateOpen: false,
    isAddWinnersOpen: false,
    campaignId: DEFAULT_CAMPAIGN_ID,
  })

  const [loading, setLoading] = useState<boolean>(false)
  const [isInvalidToken, setIsInvalidToken] = useState(false)

  // Contract hooks
  const {
    data: hash,
    error,
    writeContract,
    writeContractAsync,
  } = useWriteContract()

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
      confirmations: 1,
    })

  // Effects
  useEffect(() => {
    const switchChainAndReload = async () => {
      if (!chainId || !chains.some((chain) => chain.id === chainId)) {
        switchChain({ chainId: defaultChainId })
      }
    }
    switchChainAndReload()
  }, [chainId, chains, switchChain])

  useEffect(() => {
    const fetchDict = async () => {
      try {
        const fetchedDict = await getDict(locale)
        setDict(fetchedDict)
      } catch (error) {}
    }
    fetchDict()
  }, [locale])

  useEffect(() => {
    if (!dialogState.isOpen) {
      setDialogState((prev) => ({ ...prev, campaignId: DEFAULT_CAMPAIGN_ID }))
    }
  }, [dialogState.isOpen])

  useEffect(() => {
    if (isConfirmed) {
      toast({ title: 'Transaction Succeeded!' })
    } else if (isConfirming) {
      toast({ title: 'Transaction Pending, Please Wait...' })
    } else if (error) {
      toast({ title: (error as BaseError).shortMessage })
    }
  }, [isConfirmed, isConfirming, error, toast])

  const handleAddWhitelist = async (formData: any) => {
    setLoading(true)
    try {
      const encodedGists = formData.data.map(
        (item: { address: string; git: string }, index: number) =>
          ethers.keccak256(ethers.toUtf8Bytes(item.git.trim()))
      )
      let addresses = formData.data.map(
        (item: { address: string }) => item.address
      )

      const isVerifySignature = campaignData.find(
        (campaign) => campaign.campaignId === formData.id
      )?.validateSignatures

      if (isVerifySignature) {
        addresses = [ZeroAddress]
      }

      const tx = await writeContractAsync({
        abi: CAMPAIGN_ABI,
        address: campaignAddress[chainId || defaultChainId] as `0x${string}`,
        functionName: 'addCampWinners',
        args: [formData.id, addresses, encodedGists],
      })

      await waitForTransactionReceipt(config, {
        hash: tx,
        confirmations: 1,
      })

      toast({
        title: 'Winners added successfully',
      })
    } catch (error) {
      console.error('Error adding whitelist:', error)
      toast({
        title: 'Failed to add whitelist',
      })
    } finally {
      setLoading(false)
    }
  }

  const { data: campaignId, refetch: refetchCampaignId } = useReadContract({
    abi: CAMPAIGN_ABI,
    address: campaignAddress[chainId || defaultChainId] as `0x${string}`,
    functionName: 'campaignId',
  })

  const handleCreateCampaign = async (formData: any) => {
    if (isInvalidToken) {
      toast({
        title: 'Invalid token',
      })
      setDialogState((prev) => ({
        ...prev,
        isCreateOpen: false,
      }))
      setIsInvalidToken(false)
      return
    }

    setDialogState((prev) => ({
      ...prev,
      isCreateOpen: false,
      isAddWinnersOpen: false,
    }))
    setLoading(true)

    try {
      if (formData.tokenType == 0) {
        const _allowance = await readContract(config, {
          abi: erc20Abi,
          address: formData.tokenAddress as `0x${string}`,
          functionName: 'allowance',
          args: [
            address as `0x${string}`,
            campaignAddress[chainId || defaultChainId] as `0x${string}`,
          ],
        })
        if (_allowance < parseEther(formData.totalAmount)) {
          const hash = await writeContractAsync({
            abi: erc20Abi,
            address: formData.tokenAddress as `0x${string}`,
            functionName: 'approve',
            args: [
              campaignAddress[chainId || defaultChainId] as `0x${string}`,
              parseEther(formData.totalAmount),
            ],
          })

          await waitForTransactionReceipt(config, {
            hash: hash,
            confirmations: 1,
          })
        }
      }

      const campaign = {
        sbtId: formData.sbtId,
        title: formData.title,
        description: formData.description,
        claimAmount:
          formData.tokenType !== 0
            ? formData.claimAmount
            : parseEther(formData.claimAmount),
        totalAmount:
          formData.tokenType !== 0
            ? formData.totalAmount
            : parseEther(formData.totalAmount),
        startDate: new Date(formData.startDate).getTime() / 1000,
        endDate: new Date(formData.endDate).getTime() / 1000,
        validateSignatures: formData.isVerifySignature,
        tokenType: formData.tokenType,
        token: formData.tokenType != 0 ? ZeroAddress : formData.tokenAddress,
        creator: address as `0x${string}`,
      }

      try {
        const tx = await writeContractAsync({
          abi: CAMPAIGN_ABI,
          address: campaignAddress[chainId || defaultChainId] as `0x${string}`,
          functionName: 'createCampaign',
          args: [campaign],
          gas: BigInt(GAS_LIMIT),
        })

        const receipt = await waitForTransactionReceipt(config, {
          hash: tx,
          confirmations: 1,
        })

        if (receipt.status == 'success') {
          await supabase.from('Campaign').insert({
            ...campaign,
            created_at: new Date().toISOString(),
            campaignId: (Number(campaignId) || 0) + 1,
          })
        }
      } catch (error) {
        console.error('Error creating campaign:', error)
        toast({
          title: 'Failed to create campaign',
        })
      }

      setRefetchCampaignData(!refetchCampaignData)
      toast({
        title: 'Campaign created successfully',
      })
    } catch (error) {
      console.error('Error creating campaign:', error)
      toast({
        title: 'Failed to create campaign',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full min-h-screen bg-background container">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-background/80 backdrop-blur-sm">
          <Spinner show={true} size="large" />
        </div>
      )}

      <div className="mx-auto py-4 sm:py-6 space-y-4 sm:space-y-6">
        {/* Header Section */}
        <div className="space-y-3 sm:space-y-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
            {campaign.title ?? ''}
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-4xl">
            {campaign.description ?? ''}
          </p>
        </div>

        {/* Modals */}
        <CreateCampaignModal
          isOpen={dialogState.isCreateOpen}
          onClose={() =>
            setDialogState((prev) => ({ ...prev, isCreateOpen: false }))
          }
          onSubmit={handleCreateCampaign}
          setIsInvalidToken={setIsInvalidToken}
          campaign={campaign}
        />

        <AddWhitelistModal
          isOpen={dialogState.isAddWinnersOpen}
          onClose={() =>
            setDialogState((prev) => ({ ...prev, isAddWinnersOpen: false }))
          }
          campaignData={campaignData}
          onSubmit={handleAddWhitelist}
          campaign={campaign}
        />

        {/* Campaigns Section */}
        <div className="space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Button
                onClick={() =>
                  setDialogState((prev) => ({ ...prev, isCreateOpen: true }))
                }
                className="w-full sm:w-auto"
              >
                {campaign.createCampaign ?? 'Create Campaign'}
              </Button>
              <Button
                onClick={() =>
                  setDialogState((prev) => ({
                    ...prev,
                    isAddWinnersOpen: true,
                  }))
                }
                variant="outline"
                className="w-full sm:w-auto"
              >
                {campaign.addWinners ?? 'Add Winners'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <TableComponent
        headers={campaignTableHeaders}
        campaignInfo={campaignData}
      />
    </div>
  )
}
