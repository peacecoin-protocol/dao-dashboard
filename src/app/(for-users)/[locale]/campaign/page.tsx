'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'
import { ApolloClient, gql, HttpLink, InMemoryCache } from '@apollo/client'
import { ethers, formatEther } from 'ethers'
import axios from 'axios'
import { useToast } from '~/hooks/use-toast'
import { CopyIcon } from 'lucide-react'

import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  useSignMessage,
  useSwitchChain,
  type BaseError,
} from 'wagmi'
import { readContract } from '@wagmi/core'
import { CAMPAIGN, Metadata } from '~/i18n/types'

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
  NFTAddress,
  NFT_SUBGRAPH_URL,
  SBT_SUBGRAPH_URL,
  CAMPAIGNS_SUBGRAPH_URL,
  DAO_STUDIO_SUBGRAPH_URL,
} from '~/app/constants/constants'

import { fetchMetadata } from '~/components/utils'
import { CAMPAIGN_ABI } from '~/app/ABIs/Campaigns'

import { config } from '~/lib/config'
import { PagePropsWithLocale, Dictionary } from '~/i18n/types'
import { getDict } from '~/i18n/get-dict'
import { SBT_ABI } from '~/app/ABIs/SBT'
import { Spinner } from '~/components/ui/Spinner'
import {
  CampaignInfo,
  TableComponent,
} from '~/components/custom/tableComponent'
import {
  SBTTableComponent,
  SBTInfo,
} from '~/components/custom/sbt-tableComponent'
import {
  campaignTableHeaders,
  sbtTableHeaders,
} from '~/app/constants/constants'
import { Env } from '~/env'

// Constants
const PCE_LOGO = '/pce_logo.jpg'
const CLAIM_MESSAGE = 'Claim Bounty for dApp.xyz'
const DEFAULT_CAMPAIGN_ID = -1
const DEFAULT_NFT_DETAIL_INDEX = -1
const EMPTY_NFT_IMAGE = '/images/empty-nft.svg'

// Types
interface CampaignState {
  data: CAMPAIGN[]
  tokenURIs: { internal_id: number; uri: string }[]
  nftTokenURIs: { internal_id: number; uri: string }[]
}

export interface NFTState {
  sbtBalances: number[]
  nftBalances: number[]
  nftMetadata: Metadata[]
  sbtMetadata: Metadata[]
  detailIndex: number
  isDetailOpen: boolean
}

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

  // State
  const [dialogState, setDialogState] = useState<DialogState>({
    isOpen: false,
    isCreateOpen: false,
    isAddWinnersOpen: false,
    campaignId: DEFAULT_CAMPAIGN_ID,
  })

  const [signature, setSignature] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [totalClaimed, setTotalClaimed] = useState<TotalClaimed[]>([])
  const [refetchNFTData, setRefetchNFTData] = useState(false)
  const [refetchSBTData, setRefetchSBTData] = useState(false)
  const [sbtData, setSBTData] = useState<any[]>([])
  const [nftData, setNFTData] = useState<any[]>([])
  const [tokenData, setTokenData] = useState<any[]>([])

  const [allDAOs, setAllDAOs] = useState<{ daoId: string; daoName: string }[]>(
    []
  )

  const [searchTerm, setSearchTerm] = useState<string>('')

  const sbtClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: SBT_SUBGRAPH_URL[chainId || defaultChainId] as string,
    }),
  })
  const nftClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: NFT_SUBGRAPH_URL[chainId || defaultChainId] as string,
    }),
  })
  const studioClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: DAO_STUDIO_SUBGRAPH_URL[chainId || defaultChainId] as string,
    }),
  })

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

  const { data: uri_ } = useReadContract({
    abi: SBT_ABI,
    address: PCE_SBT_ADDRESS[chainId || defaultChainId] as `0x${string}`,
    functionName: 'uri_',
    args: [],
    chainId: chainId || defaultChainId,
  })

  const { data: currentTokenId, refetch: refetchCurrentTokenId } =
    useReadContract({
      address: PCE_SBT_ADDRESS[chainId || defaultChainId] as `0x${string}`,
      abi: SBT_ABI,
      functionName: 'currentTokenId',
      args: [],
      chainId: chainId || defaultChainId,
    })

  const [campaignData, setCampaignData] = useState<CampaignState>({
    data: [],
    tokenURIs: [],
    nftTokenURIs: [],
  })

  const client = new ApolloClient({
    uri: CAMPAIGNS_SUBGRAPH_URL[chainId || defaultChainId] as string,
    cache: new InMemoryCache(),
  })

  useEffect(() => {
    const fetchAllDAOs = async () => {
      try {
        setLoading(true)

        const { data } = await studioClient.query({
          query: gql`
            query getAllDAOs {
              daocreateds(
                first: 100
                orderBy: timestamp_
                orderDirection: desc
                where: {
                  creator: "${address?.toLowerCase()}"
                }
              ) {
                daoId
                daoName
              }
            }
          `,
        })

        setAllDAOs(data.daocreateds)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data', error)
        setLoading(false)
      }
    }

    fetchAllDAOs()
  }, [chainId])

  useEffect(() => {
    const filteredSbtData: SBTInfo[] = sbtData.filter(
      (token: SBTInfo) => token.tokenId !== '1' && token.balance !== '0'
    )
    const filteredNftData: SBTInfo[] = nftData.filter(
      (token: SBTInfo) => token.tokenId !== '1' && token.balance !== '0'
    )
    setTokenData([...filteredSbtData, ...filteredNftData])
  }, [sbtData, nftData])

  const fetchSBTStatus = useCallback(
    async (_sbtData: SBTInfo[]) => {
      if (!chainId || !address || !_sbtData.length) return
      try {
        const statuses = await Promise.all(
          _sbtData.map(async (token: SBTInfo) => {
            return (await readContract(config, {
              abi: SBT_ABI,
              address: PCE_SBT_ADDRESS[
                chainId || defaultChainId
              ] as `0x${string}`,
              functionName: 'isRevoked',
              args: [token.tokenId],
            })) as boolean
          })
        )

        const balances = await Promise.all(
          _sbtData.map(async (token: SBTInfo) => {
            return (await readContract(config, {
              abi: SBT_ABI,
              address: PCE_SBT_ADDRESS[
                chainId || defaultChainId
              ] as `0x${string}`,
              functionName: 'balanceOf',
              args: [address, token.tokenId],
            })) as BigInt
          })
        )

        setSBTData(
          _sbtData.map((token: SBTInfo, index: number) => ({
            ...token,
            isRevoked: statuses[index] || false,
            balance: balances[index]?.toString() || '0',
          }))
        )
      } catch (error) {
        console.error('Error fetching SBT status:', error)
      }
    },
    [chainId, address, sbtData]
  )

  const fetchNFTStatus = useCallback(
    async (_nftData: SBTInfo[]) => {
      if (!chainId || !address || !_nftData.length) return
      try {
        const statuses = await Promise.all(
          _nftData.map(async (token: SBTInfo) => {
            return (await readContract(config, {
              abi: SBT_ABI,
              address: PCE_SBT_ADDRESS[
                chainId || defaultChainId
              ] as `0x${string}`,
              functionName: 'isRevoked',
              args: [token.tokenId],
            })) as boolean
          })
        )

        const balances = await Promise.all(
          _nftData.map(async (token: SBTInfo) => {
            return (await readContract(config, {
              abi: SBT_ABI,
              address: NFTAddress[chainId || defaultChainId] as `0x${string}`,
              functionName: 'balanceOf',
              args: [address, token.tokenId],
            })) as BigInt
          })
        )

        setNFTData(
          _nftData.map((token: SBTInfo, index: number) => ({
            ...token,
            isRevoked: statuses[index] || false,
            balance: balances[index]?.toString() || '0',
          }))
        )
      } catch (error) {
        console.error('Error fetching SBT status:', error)
      }
    },
    [chainId, address, sbtData]
  )

  useEffect(() => {
    const fetchNFTData = async () => {
      try {
        setLoading(true)
        const { data } = await nftClient.query({
          query: gql`
            query getNFTData {
              createdTokens(first: 10, orderDirection: desc, where: {}) {
                tokenId
                timestamp_
                tokenURI
                votingPower
              }
            }
          `,
        })

        let _nftData: SBTInfo[] = []
        for (const token of data.createdTokens) {
          let _metadata: any = {}
          try {
            _metadata = await fetchMetadata(
              `${Env.PINATA_GATEWAY_URL}/ipfs/${token.tokenURI}`
            )
          } catch (error) {
            console.error('Error fetching NFT data:', error)
          }

          _nftData.push({
            tokenId: token.tokenId,
            createdAt: Number(token.timestamp_).toString(),
            image: _metadata.image
              ? `${Env.PINATA_GATEWAY_URL}/ipfs/${_metadata.image}`
              : EMPTY_NFT_IMAGE,
            name: _metadata.name,
            description: _metadata.description,
            balance: '0',
            votingPower: token.votingPower,
            isRevoked: false,
            isSBT: false,
          })
        }

        setNFTData([..._nftData])
        await fetchNFTStatus(_nftData)

        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.error('Error:', error)
      }
    }
    fetchNFTData()
  }, [refetchNFTData])

  useEffect(() => {
    const fetchSBTData = async () => {
      try {
        setLoading(true)
        const { data } = await sbtClient.query({
          query: gql`
            query getSBTData {
              createdTokens(first: 10, orderDirection: desc, where: {}) {
                tokenId
                timestamp_
                tokenURI
                votingPower
              }
            }
          `,
        })

        let _sbtData: SBTInfo[] = []
        for (const token of data.createdTokens) {
          let _metadata: any = {}
          try {
            _metadata = await fetchMetadata(
              `${Env.PINATA_GATEWAY_URL}/ipfs/${token.tokenURI}`
            )
          } catch (error) {
            console.error('Error fetching SBT data:', error)
          }

          _sbtData.push({
            tokenId: token.tokenId,
            createdAt: Number(token.timestamp_).toString(),
            image: _metadata.image
              ? `${Env.PINATA_GATEWAY_URL}/ipfs/${_metadata.image}`
              : EMPTY_NFT_IMAGE,
            name: _metadata.name,
            description: _metadata.description,
            balance: '0',
            votingPower: token.votingPower,
            isRevoked: false,
            isSBT: true,
          })
        }

        setSBTData([..._sbtData])
        await fetchSBTStatus(_sbtData)

        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.error('Error:', error)
      }
    }
    fetchSBTData()
  }, [refetchSBTData])

  const fetchCampaignData = async () => {
    setLoading(true)
    try {
      const { data } = await client.query({
        query: gql`
          query getCampaigns {
            campaignCreateds(
              first: 5
              orderDirection: desc
              orderBy: campaignId
            ) {
              campaignId
              sbtId
              title
              description
              endDate
              startDate
              validateSignatures
              totalAmount
              claimAmount
              token
              tokenType
            }
          }
        `,
      })

      setCampaignData({
        data: data.campaignCreateds,
        tokenURIs: [],
        nftTokenURIs: [],
      })
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

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
    fetchCampaignData()
  }, [chainId])

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
    const fetchTotalClaimed = async () => {
      if (campaignData.data.length === 0) return

      try {
        const totalClaimedPromises = campaignData.data.map(async (campaign) => {
          try {
            const _claimed = (await readContract(config, {
              abi: CAMPAIGN_ABI,
              address: campaignAddress[
                chainId || defaultChainId
              ] as `0x${string}`,
              functionName: 'totalClaimed',
              args: [campaign.campaignId],
            })) as unknown as string
            return {
              campaignId: campaign.campaignId,
              totalClaimed: _claimed,
            }
          } catch (error) {
            console.error(
              `Error fetching total claimed for campaign ${campaign.campaignId}:`,
              error
            )
            return {
              campaignId: campaign.campaignId,
              totalClaimed: '0',
            }
          }
        })

        const results = await Promise.all(totalClaimedPromises)
        setTotalClaimed(results)
      } catch (error) {
        console.error('Error fetching total claimed data:', error)
      }
    }

    fetchTotalClaimed()
  }, [campaignData, chainId, isConfirmed])

  useEffect(() => {
    const fetchData = async () => {
      if (isConfirmed) {
        toast({
          title: 'Transaction Succeeded! Data refreshed.',
        })
      } else if (error) {
        toast({
          title: (error as BaseError).shortMessage,
        })
      }
    }
    fetchData()
  }, [isConfirmed, error])

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

      const campaign = campaignData.data.find(
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
        await writeContractAsync({
          abi: CAMPAIGN_ABI,
          address: campaignAddress[chainId || defaultChainId] as `0x${string}`,
          functionName: 'claimCampaign',
          args: [campaignId, gistUsernameHash, message, signature],
          gas: BigInt(1000000),
        })

        toast({
          title: 'Campaign claimed successfully',
        })
      } catch (error) {
        console.error('Error claiming campaign:', error)
        toast({
          title: 'Failed to claim campaign',
        })
      } finally {
        await fetchCampaignData()
        setLoading(false)
      }
    },
    [campaignData, parseGithubUsername, chainId, writeContract]
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
      campaignData.data.find(
        (campaign) => campaign.campaignId == dialogState.campaignId
      ),
    [campaignData, dialogState.campaignId]
  )

  const campaignInfo = useCallback((): CampaignInfo[] => {
    const info: CampaignInfo[] = campaignData.data.map((campaign) => ({
      id: campaign.campaignId.toString(),
      image:
        campaign.tokenType == 1
          ? sbtData?.find((m) => m.tokenId == campaign.sbtId.toString())
              ?.image || EMPTY_NFT_IMAGE
          : campaign.tokenType == 2
            ? nftData?.find((m) => m.tokenId == campaign.sbtId.toString())
                ?.image || EMPTY_NFT_IMAGE
            : PCE_LOGO,
      tokenId: campaign.sbtId.toString(),
      title: campaign.title,
      description: campaign.description,
      isValidateSignatures: campaign.validateSignatures,
      totalClaimAmount: campaign.totalAmount.toString() || '0',
      claimedAmount:
        totalClaimed
          .find((t) => t.campaignId == campaign.campaignId)
          ?.totalClaimed.toString() ?? '0',
      claimAmount: campaign.claimAmount.toString(),
      totalClaimedAmount: campaign.totalAmount.toString(),
      tokenType:
        campaign.tokenType == 1
          ? 'SBT'
          : campaign.tokenType == 2
            ? 'NFT'
            : 'ERC20',
      startTime: campaign.startDate,
      endTime: campaign.endDate,
      isEnded: Number(campaign.endDate) < new Date().getTime() / 1000,
    }))

    return info
  }, [campaignData, sbtData, nftData, totalClaimed])

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
          placeholder={campaign.searchCampaign ?? 'Search campaigns'}
          className="border rounded px-3 py-2 w-full max-w-xs focus:outline-none focus:ring"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <TableComponent
        headers={campaignTableHeaders}
        campaignInfo={campaignInfo()}
        onCampaignClick={(campaignId) => {
          setDialogState((prev) => ({
            ...prev,
            isOpen: true,
            campaignId: Number(campaignId),
          }))
        }}
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
