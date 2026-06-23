'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'
import { ethers, formatEther } from 'ethers'
import axios from 'axios'
import { useToast } from '~/hooks/use-toast'
import { CopyIcon } from 'lucide-react'

import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
  useSignMessage,
} from 'wagmi'
import { readContract, waitForTransactionReceipt } from '@wagmi/core'
import { CAMPAIGN } from '~/i18n/types'

import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'

import { Card, CardContent } from '~/components/ui/card'

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
  GAS_LIMIT,
  appDeploymentEnv,
  defaultChainId,
} from '~/app/constants/constants'
import { CAMPAIGN_ABI } from '~/app/ABIs/Campaigns'

import { config } from '~/lib/config'
import { PagePropsWithLocale } from '~/i18n/types'
import { TableComponent } from '~/components/custom/tableComponent'
import {
  SBTTableComponent,
  SBTInfo,
} from '~/components/custom/sbt-tableComponent'
import { campaignTableHeaders } from '~/app/constants/constants'
import { createClient } from '~/utils/supabase/client'
import { PageHeaderSection } from '~/components/custom/page-header-section'
import { PageSubHeaderSection } from '~/components/custom/page-sub-header-section'
import { LoadingOverlay } from '~/components/ui/loading-overlay'
import { useDictionary } from '~/hooks/use-dictionary'
import { useEnsureSupportedChain } from '~/hooks/use-ensure-supported-chain'
import { useTransactionToast } from '~/hooks/use-transaction-toast'
import {
  fetchCampaignsWithMetadata,
  fetchDaoNamesByIds,
  fetchOwnedTokenBalances,
} from '~/lib/campaigns'

// Constants
const CLAIM_MESSAGE = 'Claim Bounty for dApp.xyz'
const DEFAULT_CAMPAIGN_ID = -1

// Types
interface DialogState {
  isOpen: boolean
  campaignId: number
}

interface CampaignStatus {
  isWinner: boolean
  isClaimed: boolean
  status: number
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
                </span>{' '}
                {timestampToDate(parseInt(campaign.startDate ?? '0'))}
              </p>
              <p className="break-words">
                <span className="font-semibold">
                  {campaignDict.endTime ?? 'End Time'}:
                </span>{' '}
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
                  campaignDict.enterGithubGist ?? 'Enter Github Gist ID'
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
  const dict = useDictionary(locale)
  const campaign = dict?.campaign ?? {}
  const { address, chainId } = useAccount()
  const { signMessageAsync } = useSignMessage()
  const { toast } = useToast()
  const [refetchCampaignData, setRefetchCampaignData] = useState(false)
  const [refetchTokenData, setRefetchTokenData] = useState(false)

  const supabase = useMemo(() => createClient(), [])
  useEnsureSupportedChain()

  // State
  const [dialogState, setDialogState] = useState<DialogState>({
    isOpen: false,
    campaignId: DEFAULT_CAMPAIGN_ID,
  })

  const [signature, setSignature] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [tokenData, setTokenData] = useState<SBTInfo[]>([])

  const [daoNames, setDaoNames] = useState<Record<string, string>>({})
  const [searchTerm, setSearchTerm] = useState<string>('')

  // Contract hooks
  const { data: hash, error, writeContractAsync } = useWriteContract()

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
      confirmations: 1,
    })

  const [campaignData, setCampaignData] = useState<CAMPAIGN[]>([])
  const filteredCampaignData = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()
    const sortedCampaigns = [...campaignData].sort(
      (a, b) => Number(a.campaignId) - Number(b.campaignId)
    )

    if (!normalizedSearch) {
      return sortedCampaigns
    }

    return sortedCampaigns.filter((campaignItem) => {
      const daoName = daoNames[campaignItem.daoId] || ''
      return daoName.toLowerCase().includes(normalizedSearch)
    })
  }, [campaignData, daoNames, searchTerm])

  useEffect(() => {
    const fetchCampaignData = async () => {
      const nextCampaignData = await fetchCampaignsWithMetadata(supabase)
      setCampaignData(nextCampaignData)
      setDaoNames(
        await fetchDaoNamesByIds(
          supabase,
          nextCampaignData.map((item) => item.daoId)
        )
      )
    }
    fetchCampaignData()
  }, [refetchCampaignData, supabase])

  // Campaign status
  const [campaignStatus, setCampaignStatus] = useState<CampaignStatus>({
    isWinner: false,
    isClaimed: false,
    status: 0,
  })

  // Effects
  useEffect(() => {
    const fetchTokenData = async () => {
      setLoading(true)
      try {
        const nextTokenData = await fetchOwnedTokenBalances({
          account: address,
          supabase,
        })
        setTokenData(nextTokenData)
      } finally {
        setLoading(false)
      }
    }
    fetchTokenData()
  }, [address, refetchTokenData, supabase])

  useEffect(() => {
    if (!dialogState.isOpen) {
      setDialogState((prev) => ({ ...prev, campaignId: DEFAULT_CAMPAIGN_ID }))
    }
  }, [dialogState.isOpen])

  useEffect(() => {
    const checkCampaignStatus = async () => {
      if (dialogState.campaignId <= 0 || !address || !chainId) return

      try {
        const contractAddress = campaignAddress[
          chainId || defaultChainId
        ] as `0x${string}`
        const [status, isWinner, isClaimed] = await Promise.all([
          readContract(config, {
            abi: CAMPAIGN_ABI,
            address: contractAddress,
            functionName: 'getStatus',
            args: [dialogState.campaignId],
          }),
          readContract(config, {
            abi: CAMPAIGN_ABI,
            address: contractAddress,
            functionName: 'isWinner',
            args: [dialogState.campaignId, address],
          }),
          readContract(config, {
            abi: CAMPAIGN_ABI,
            address: contractAddress,
            functionName: 'campWinnersClaimed',
            args: [dialogState.campaignId, address],
          }),
        ])

        setCampaignStatus({
          status: status as number,
          isWinner: isWinner as boolean,
          isClaimed: isClaimed as boolean,
        })
      } catch (error) {
        console.error('Error checking campaign status:', error)
        toast({
          title: 'Failed to check campaign status',
          description: 'Please try again later',
        })
      }
    }

    checkCampaignStatus()
  }, [dialogState.campaignId, address, chainId, toast])

  useTransactionToast({
    error,
    isConfirmed,
    isConfirming,
  })

  // Handlers
  const signMessage = useCallback(async () => {
    if (!chainId) {
      toast({
        title: 'Please connect your wallet first',
      })
      return
    }

    try {
      setLoading(true)
      const message = await signMessageAsync({ message: CLAIM_MESSAGE })
      setSignature(message)
      toast({
        title: 'Message signed successfully',
      })
    } catch (error) {
      console.error('Error signing message:', error)
      toast({
        title: 'Failed to sign message',
      })
    } finally {
      setLoading(false)
    }
  }, [chainId, signMessageAsync, toast])

  const parseGithubUsername = useCallback(
    (gistUrl: string): string | undefined => {
      try {
        const url = new URL(gistUrl)
        const parts = url.pathname.split('/')
        return parts.length >= 2 ? parts[1] : undefined
      } catch {
        return undefined
      }
    },
    []
  )

  const claimCampaign = useCallback(
    async (campaignId: number, gistUrl: string) => {
      setDialogState((prev) => ({ ...prev, isOpen: false }))
      setLoading(true)

      try {
        let signature = '0x'
        let message = '_'
        let gistUsername: string | undefined

        const campaign = filteredCampaignData.find(
          (campaignItem) => campaignItem.campaignId === campaignId
        )

        if (campaign?.validateSignatures) {
          gistUsername = parseGithubUsername(gistUrl)
          if (!gistUsername) {
            toast({
              title: 'Invalid Github Gist ID',
            })
            return
          }

          try {
            const result = await axios.get(gistUrl)
            const gistData = result.data
            signature = gistData.Signature
            message = gistData.Message
          } catch (fetchError) {
            console.error('Error fetching gist data:', fetchError)
            toast({
              title: 'Failed to fetch gist data',
            })
            return
          }
        }

        const gistUsernameHash = ethers.keccak256(
          ethers.toUtf8Bytes(gistUsername || '0x')
        )

        const tx = await writeContractAsync({
          abi: CAMPAIGN_ABI,
          address: campaignAddress[chainId || defaultChainId] as `0x${string}`,
          functionName: 'claimCampaign',
          args: [campaignId, gistUsernameHash, message, signature],
          gas: BigInt(GAS_LIMIT),
        })

        await waitForTransactionReceipt(config, {
          hash: tx,
          confirmations: 1,
        })

        const { data: _campaignData } = await supabase
          .from('Campaign')
          .select()
          .eq('campaignId', campaignId)
          .eq('environment', appDeploymentEnv)
          .order('campaignId', { ascending: true })

        if (_campaignData && _campaignData.length > 0) {
          await supabase
            .from('Campaign')
            .update({
              claimedAmount:
                Number(_campaignData[0].claimedAmount) +
                Number(_campaignData[0].claimAmount),
            })
            .eq('campaignId', campaignId)
            .eq('environment', appDeploymentEnv)
        }
        setRefetchCampaignData((prev) => !prev)
        setRefetchTokenData((prev) => !prev)

        toast({
          title: 'Campaign claimed successfully',
        })
      } catch (error) {
        console.error('Error claiming campaign:', error)
        toast({
          title: 'Failed to claim campaign',
        })
      } finally {
        setLoading(false)
      }
    },
    [
      filteredCampaignData,
      parseGithubUsername,
      chainId,
      supabase,
      toast,
      writeContractAsync,
    ]
  )

  const handleCopySignature = useCallback(() => {
    try {
      navigator.clipboard.writeText(
        JSON.stringify({
          Message: CLAIM_MESSAGE,
          Signature: signature,
          'Wallet Address': address,
        })
      )
      toast({
        title: 'Signature copied to clipboard',
      })
    } catch (error) {
      console.error('Error copying signature:', error)
      toast({
        title: 'Failed to copy signature',
      })
    }
  }, [signature, address, toast])

  const currentCampaign = useMemo(
    () =>
      filteredCampaignData.find(
        (campaign) => campaign.campaignId == dialogState.campaignId
      ),
    [filteredCampaignData, dialogState.campaignId]
  )

  return (
    <>
      <LoadingOverlay isLoading={loading} />
      <div className="w-full mx-auto space-y-6 sm:space-y-8">
        {/* Header Section */}
        <PageHeaderSection
          title={campaign.title ?? ''}
          description={campaign.description ?? ''}
        />

        {/* Wallet Connected Section */}
        {chainId && (
          <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                className="w-full sm:w-auto sm:min-w-[200px] text-sm sm:text-base"
                onClick={signMessage}
              >
                {campaign.signMessage ?? 'Sign Message'}
              </Button>
            </div>

            {signature.length > 0 && (
              <Card className="w-full">
                <CardContent className="p-3 sm:p-4 md:p-6">
                  <div className="cursor-pointer" onClick={handleCopySignature}>
                    <div className="relative bg-muted rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3">
                      <div className="absolute top-2 right-2">
                        <CopyIcon />
                      </div>
                      <div className="space-y-2 text-xs sm:text-sm md:text-base">
                        <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                          <span className="font-semibold min-w-[80px] sm:min-w-[100px]">
                            {campaign.message ?? 'Message'}:
                          </span>
                          <span className="break-all">{CLAIM_MESSAGE}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                          <span className="font-semibold min-w-[80px] sm:min-w-[100px]">
                            {campaign.signature ?? 'Signature'}:
                          </span>
                          <span className="break-all font-mono text-xs">
                            {signature}
                          </span>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                          <span className="font-semibold min-w-[80px] sm:min-w-[100px]">
                            {campaign.walletAddress ?? 'Wallet Address'}:
                          </span>
                          <span className="break-all font-mono text-xs">
                            {address}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            <PageSubHeaderSection
              title={campaign.sbtBalances ?? 'Token Balances'}
            />

            <SBTTableComponent sbtInfo={tokenData} />
          </div>
        )}
        {/* Campaign search input */}
        <div className="flex flex-row justify-between">
          <PageSubHeaderSection
            title={campaign.searchCampaignLabel ?? 'Campaigns'}
          />
          <Input
            type="text"
            placeholder={
              campaign.searchCampaign ?? 'Search campaigns by DAO Name'
            }
            aria-label="Search campaigns by DAO Name"
            className="w-full sm:max-w-xs"
            value={searchTerm}
            onChange={(e) => {
              const value = e.target.value
              setSearchTerm(value)
            }}
          />
        </div>

        <TableComponent
          headers={campaignTableHeaders}
          campaignInfo={filteredCampaignData}
          onCampaignClick={(campaignId) => {
            setDialogState((prev) => ({
              ...prev,
              isOpen: true,
              campaignId: Number(campaignId),
            }))
          }}
        />
      </div>
      {/* Campaign Dialog */}
      <CampaignDialog
        isOpen={dialogState.isOpen}
        onOpenChange={(open) => {
          setDialogState((prev) => ({
            ...prev,
            isOpen: open,
            campaignId: currentCampaign?.campaignId ?? 0,
          }))
        }}
        campaign={currentCampaign}
        status={campaignStatus}
        onClaim={(gistUrl) =>
          claimCampaign(currentCampaign?.campaignId ?? 0, gistUrl)
        }
        isConnected={!!address}
        campaignDict={campaign}
      />
    </>
  )
}
