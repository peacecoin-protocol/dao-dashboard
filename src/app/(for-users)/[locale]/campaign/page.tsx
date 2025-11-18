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
  useSwitchChain,
  type BaseError,
} from 'wagmi'
import { readContract, waitForTransactionReceipt } from '@wagmi/core'
import { CAMPAIGN, SupabaseDao } from '~/i18n/types'

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
  PCE_SBT_ADDRESS,
  campaignAddress,
  defaultChainId,
  GAS_LIMIT,
  NFTAddress,
} from '~/app/constants/constants'
import { SBT_ABI } from '~/app/ABIs/SBT'

import { CAMPAIGN_ABI } from '~/app/ABIs/Campaigns'

import { config } from '~/lib/config'
import { PagePropsWithLocale, Dictionary } from '~/i18n/types'
import { getDict } from '~/i18n/get-dict'
import { Spinner } from '~/components/ui/Spinner'
import { TableComponent } from '~/components/custom/tableComponent'
import {
  SBTTableComponent,
  SBTInfo,
} from '~/components/custom/sbt-tableComponent'
import {
  campaignTableHeaders,
  sbtTableHeaders,
} from '~/app/constants/constants'
import { createClient } from '~/utils/supabase/client'

// Constants
const PCE_LOGO = '/pce_logo.jpg'
const CLAIM_MESSAGE = 'Claim Bounty for dApp.xyz'
const DEFAULT_CAMPAIGN_ID = -1
const DEFAULT_NFT_DETAIL_INDEX = -1
const EMPTY_NFT_IMAGE = '/images/empty-nft.svg'

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
  const { signMessageAsync } = useSignMessage()
  const { chains, switchChain } = useSwitchChain()
  const { toast } = useToast()
  const [refetchCampaignData, setRefetchCampaignData] = useState(false)
  const [refetchTokenData, setRefetchTokenData] = useState(false)

  const supabase = createClient()

  // State
  const [dialogState, setDialogState] = useState<DialogState>({
    isOpen: false,
    isCreateOpen: false,
    isAddWinnersOpen: false,
    campaignId: DEFAULT_CAMPAIGN_ID,
  })

  const [signature, setSignature] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [tokenData, setTokenData] = useState<SBTInfo[]>([])

  const [allDAOs, setAllDAOs] = useState<SupabaseDao[]>([])

  const [searchTerm, setSearchTerm] = useState<string>('')

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

  const [campaignData, setCampaignData] = useState<CAMPAIGN[]>([])

  const [filteredCampaignData, setFilteredCampaignData] = useState<CAMPAIGN[]>(
    []
  )

  useEffect(() => {
    const fetchAllDAOs = async () => {
      try {
        if (!address) return

        setLoading(true)

        const { data } = await supabase
          .from('DAO')
          .select()
          .eq('creator', address as string)

        setAllDAOs(data as SupabaseDao[])
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data', error)
        setLoading(false)
      }
    }

    fetchAllDAOs()
  }, [address])

  useEffect(() => {
    if (searchTerm.length > 0) {
      setFilteredCampaignData(
        campaignData.filter((campaign) =>
          campaign.daoId.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    } else {
      setFilteredCampaignData(campaignData)
    }
  }, [campaignData, searchTerm])

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

  // Campaign status
  const [campaignStatus, setCampaignStatus] = useState<CampaignStatus>({
    isWinner: false,
    isClaimed: false,
    status: 0,
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
    const fetchTokenData = async () => {
      try {
        setLoading(true)
        const { data: tokens } = await supabase.from('Token').select()

        const _tokenData = tokens as SBTInfo[]

        const tokenBalances = await Promise.all(
          _tokenData.map(async (token: SBTInfo) => {
            const balance = (await readContract(config, {
              abi: SBT_ABI,
              address: token.isSBT
                ? (PCE_SBT_ADDRESS[chainId || defaultChainId] as `0x${string}`)
                : (NFTAddress[chainId || defaultChainId] as `0x${string}`),
              functionName: 'balanceOf',
              args: [address, token.tokenId],
            })) as number
            return balance
          })
        )

        _tokenData.forEach((token: SBTInfo, index: number) => {
          token.balance = tokenBalances[index]?.toString() ?? '0'
        })
        setTokenData(
          _tokenData.filter((token: SBTInfo) => Number(token.balance) > 0)
        )
      } catch (error) {
        console.error('Error fetching token data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchTokenData()
  }, [address, refetchTokenData, supabase, chainId])

  useEffect(() => {
    if (!dialogState.isOpen) {
      setDialogState((prev) => ({ ...prev, campaignId: DEFAULT_CAMPAIGN_ID }))
    }
  }, [dialogState.isOpen])

  useEffect(() => {
    const checkCampaignStatus = async () => {
      if (dialogState.campaignId <= 0 || !address || !chainId) return

      try {
        const [status, isWinner, isClaimed] = await Promise.all([
          await readContract(config, {
            abi: CAMPAIGN_ABI,
            address: campaignAddress[
              chainId || defaultChainId
            ] as `0x${string}`,
            functionName: 'getStatus',
            args: [dialogState.campaignId],
          }),
          await readContract(config, {
            abi: CAMPAIGN_ABI,
            address: campaignAddress[
              chainId || defaultChainId
            ] as `0x${string}`,
            functionName: 'isWinner',
            args: [dialogState.campaignId, address],
          }),
          await readContract(config, {
            abi: CAMPAIGN_ABI,
            address: campaignAddress[
              chainId || defaultChainId
            ] as `0x${string}`,
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
  }, [dialogState.campaignId, address, chainId])

  useEffect(() => {
    if (isConfirmed) {
      toast({ title: 'Transaction Succeeded!' })
    } else if (isConfirming) {
      toast({ title: 'Transaction Pending, Please Wait...' })
    } else if (error) {
      toast({ title: (error as BaseError).shortMessage })
    }
  }, [isConfirmed, isConfirming, error, toast])

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
  }, [chainId, signMessageAsync])

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

      let signature = '0x'
      let message = '_'
      let gistUsername

      const campaign = filteredCampaignData.find(
        (campaign) => campaign.campaignId === campaignId
      )
      if (campaign?.validateSignatures) {
        try {
          gistUsername = parseGithubUsername(gistUrl)
          if (!gistUsername) {
            toast({
              title: 'Invalid Github Gist URL',
            })
            return
          }

          const result = await axios.get(gistUrl)

          const gistData = result.data
          signature = gistData.Signature
          message = gistData.Message
        } catch (error) {
          console.error('Error fetching gist data:', error)
          toast({
            title: 'Failed to fetch gist data',
          })
          return
        }
      }

      const gistUsernameHash = ethers.keccak256(
        ethers.toUtf8Bytes(gistUsername || '0x')
      )

      try {
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

        if (_campaignData && _campaignData.length > 0) {
          await supabase
            .from('Campaign')
            .update({
              claimedAmount:
                Number(_campaignData[0].claimedAmount) +
                Number(_campaignData[0].claimAmount),
            })
            .eq('campaignId', campaignId)
        }
        setRefetchCampaignData(!refetchCampaignData)
        setRefetchTokenData(!refetchTokenData)

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
      writeContract,
      config,
      refetchCampaignData,
      refetchTokenData,
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
  }, [signature, address])

  const currentCampaign = useMemo(
    () =>
      filteredCampaignData.find(
        (campaign) => campaign.campaignId == dialogState.campaignId
      ),
    [filteredCampaignData, dialogState.campaignId]
  )

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
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
                {campaign.sbtBalances ?? 'Token Balances'}
              </h2>
            </div>

            <SBTTableComponent headers={sbtTableHeaders} sbtInfo={tokenData} />
          </div>
        )}
      </div>
      {/* Campaign search input */}
      <div className="mb-4 flex justify-end">
        <input
          type="text"
          placeholder={campaign.searchCampaign ?? 'Search campaigns by DAO ID'}
          className="border rounded px-3 py-2 w-full max-w-xs focus:outline-none focus:ring"
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
        searchTerm={searchTerm}
      />
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
    </div>
  )
}
