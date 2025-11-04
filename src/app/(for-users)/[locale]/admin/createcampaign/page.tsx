'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'
import { ApolloClient, gql, HttpLink, InMemoryCache } from '@apollo/client'
import { ethers, formatEther, parseEther, ZeroAddress } from 'ethers'
import { useToast } from '~/hooks/use-toast'

import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  useSignMessage,
  useSwitchChain,
  type BaseError,
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
import { fetchMetadata } from '~/components/utils'
import { Env } from '~/env'

import {
  PCE_SBT_ADDRESS,
  campaignAddress,
  CAMPAIGNS_SUBGRAPH_URL,
  defaultChainId,
  NFTAddress,
  campaignTableHeaders,
  NFT_SUBGRAPH_URL,
  SBT_SUBGRAPH_URL,
} from '~/app/constants/constants'

import { CAMPAIGN_ABI } from '~/app/ABIs/Campaigns'

import { config } from '~/lib/config'
import { PagePropsWithLocale, Dictionary } from '~/i18n/types'
import { getDict } from '~/i18n/get-dict'
import { SBT_ABI } from '~/app/ABIs/SBT'
import { Spinner } from '~/components/ui/Spinner'
import { CreateCampaignModal } from '~/app/(for-users)/[locale]/admin/createcampaign/modal/createCampaignModal'
import { AddWhitelistModal } from '~/app/(for-users)/[locale]/admin/createcampaign/modal/addWhitelistModal'
import {
  CampaignInfo,
  TableComponent,
} from '~/components/custom/tableComponent'
import { SBTInfo } from '~/components/custom/sbt-tableComponent'
import { erc20Abi } from 'viem'

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

  const [loading, setLoading] = useState<boolean>(false)
  const [totalClaimed, setTotalClaimed] = useState<TotalClaimed[]>([])
  const [isInvalidToken, setIsInvalidToken] = useState(false)
  const [sbtData, setSBTData] = useState<SBTInfo[]>([])
  const [nftData, setNFTData] = useState<SBTInfo[]>([])
  const [tokenData, setTokenData] = useState<SBTInfo[]>([])
  const [refetchNFTData, setRefetchNFTData] = useState(false)
  const [refetchSBTData, setRefetchSBTData] = useState(false)

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
              where: {
                creator: "${address?.toLowerCase()}"
              }
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
              creator
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

  useEffect(() => {
    const filteredSbtData: SBTInfo[] = sbtData.filter(
      (token: SBTInfo) => token.tokenId !== '1'
    )
    const filteredNftData: SBTInfo[] = nftData.filter(
      (token: SBTInfo) => token.tokenId !== '1'
    )
    setTokenData([...filteredSbtData, ...filteredNftData])
  }, [sbtData, nftData])

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
                creator
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
            creator: token.creator,
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
                creator
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
            creator: token.creator,
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

      const isVerifySignature = campaignData.data.find(
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

      const tx = await writeContractAsync({
        abi: CAMPAIGN_ABI,
        address: campaignAddress[chainId || defaultChainId] as `0x${string}`,
        functionName: 'createCampaign',
        args: [campaign],
        gas: BigInt(1000000),
      })

      await waitForTransactionReceipt(config, {
        hash: tx,
        confirmations: 1,
      })

      await fetchCampaignData()
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

        {/* Modals */}
        <CreateCampaignModal
          isOpen={dialogState.isCreateOpen}
          onClose={() =>
            setDialogState((prev) => ({ ...prev, isCreateOpen: false }))
          }
          tokenData={tokenData}
          onSubmit={handleCreateCampaign}
          setIsInvalidToken={setIsInvalidToken}
          campaign={campaign}
        />

        <AddWhitelistModal
          isOpen={dialogState.isAddWinnersOpen}
          onClose={() =>
            setDialogState((prev) => ({ ...prev, isAddWinnersOpen: false }))
          }
          campaignData={campaignData.data}
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
        campaignInfo={campaignInfo()}
      />
    </div>
  )
}
