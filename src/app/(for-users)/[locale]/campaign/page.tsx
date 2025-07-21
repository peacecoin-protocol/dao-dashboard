'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'
import { ApolloClient, gql, InMemoryCache } from '@apollo/client'
import { ethers, formatEther, parseEther } from 'ethers'
import axios from 'axios'
import { toast } from 'sonner'

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
import { CAMPAIGN, Metadata } from '~/i18n/types'

import { Input } from '~/components/ui/input'
import { Button } from '~/components/custom/button'

import { Card, CardHeader, CardTitle, CardContent } from '~/components/ui/card'

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
  sbtAddress,
  SUBGRAPH_URL,
  defaultChainId,
} from '~/app/constants/constants'

import { CAMPAIGN_ABI } from '~/app/ABIs/Campaigns'

import { config } from '~/lib/config'
import { PagePropsWithLocale, Dictionary } from '~/i18n/types'
import { getDict } from '~/i18n/get-dict'
import { SBT_ABI } from '~/app/ABIs/SBT'
import CopyIcon from '../../../../../public/svg/copy'
import Image from 'next/image'
import { NFT_DETAIL } from '~/components/custom/nft-detail'
import { Spinner } from '~/components/ui/Spinner'
import { CreateCampaignModal } from './modal/createCampaignModal'
import { AddWhitelistModal } from './modal/addWhitelistModal'
import { CampaignsTable } from './modal/campaignTable'
// Constants
const CLAIM_MESSAGE = 'Claim Bounty for dApp.xyz'
const DEFAULT_CAMPAIGN_ID = -1
const DEFAULT_NFT_DETAIL_INDEX = -1
const EMPTY_NFT_IMAGE = '/images/empty-nft.svg'

// Types
interface CampaignState {
  data: CAMPAIGN[]
  tokenURIs: { internal_id: number; uri: string }[]
}

interface NFTState {
  balances: number[]
  metadata: Metadata[]
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

const useNFTData = (
  chainId: number | undefined,
  address: string | undefined,
  tokenURIs: { internal_id: number; uri: string }[],
  uri_: string | undefined,
  isConfirmed: boolean
) => {
  const [state, setState] = useState<NFTState>({
    balances: [],
    metadata: [],
    detailIndex: DEFAULT_NFT_DETAIL_INDEX,
    isDetailOpen: false,
  })

  const fetchNFTBalances = useCallback(async () => {
    if (!chainId || !address || tokenURIs.length === 0) return

    try {
      const balances = await Promise.all(
        tokenURIs.map(async (tokenURI) => {
          return (await readContract(config, {
            abi: SBT_ABI,
            address: sbtAddress[chainId || defaultChainId] as `0x${string}`,
            functionName: 'balanceOf',
            args: [address, tokenURI.internal_id],
          })) as number
        })
      )
      setState((prev) => ({ ...prev, balances }))
    } catch (error) {}
  }, [chainId, address, tokenURIs, isConfirmed])

  const fetchNFTMetadata = useCallback(async () => {
    if (tokenURIs.length === 0 || !uri_) return

    try {
      const metadata = await Promise.all(
        tokenURIs.map(async (tokenURI) => {
          const tokenUri = uri_ + tokenURI.uri

          let tokenData
          let tokenDataJson
          try {
            tokenData = await fetch(tokenUri)
            tokenDataJson = await tokenData.json()
          } catch (error) {}
          return {
            image: tokenDataJson.image,
            name: tokenDataJson.name,
            description: tokenDataJson.description,
            attributes: [],
            external_url: '',
            token_id: tokenURI.internal_id,
          }
        })
      )
      setState((prev) => ({ ...prev, metadata }))
    } catch (error) {
      const fallbackMetadata = tokenURIs.map((_, index) => ({
        image: EMPTY_NFT_IMAGE,
        name: '',
        description: '',
        attributes: [],
        external_url: '',
        token_id: index,
      }))
      setState((prev) => ({ ...prev, metadata: fallbackMetadata }))
    }
  }, [uri_, tokenURIs])

  useEffect(() => {
    fetchNFTBalances()
  }, [fetchNFTBalances])

  useEffect(() => {
    fetchNFTMetadata()
  }, [fetchNFTMetadata])

  return {
    ...state,
    setDetailIndex: (index: number) =>
      setState((prev) => ({ ...prev, detailIndex: index })),
    setIsDetailOpen: (open: boolean) =>
      setState((prev) => ({ ...prev, isDetailOpen: open })),
  }
}

// Components

const NFTBalancesCard = ({
  balances,
  metadata,
  onNFTClick,
}: {
  balances: number[]
  metadata: Metadata[]
  onNFTClick: (index: number) => void
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">SBT Balances</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap">
          {balances.length == 0 || balances.every((b) => b == 0) ? (
            <div className="w-full flex justify-center items-center py-8 text-muted-foreground">
              No SBTs
            </div>
          ) : (
            balances.map((balance, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                {balance > 0 && (
                  <div
                    className="flex flex-col items-center gap-2 px-2 cursor-pointer"
                    onClick={() => onNFTClick(index)}
                  >
                    <div className="relative">
                      <Image
                        src={metadata[index]?.image || EMPTY_NFT_IMAGE}
                        alt={`NFT #${index} (shown as original image)`}
                        className="rounded-lg object-fill"
                        width={120}
                        height={120}
                      />
                      <div className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                        {balance.toString()}
                      </div>
                    </div>
                    <p className="text-muted-foreground"># {index + 1}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}

const CampaignDialog = ({
  isOpen,
  onOpenChange,
  campaign,
  status,
  onClaim,
}: {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  campaign: CAMPAIGN | undefined
  status: CampaignStatus
  onClaim: (gistUrl: string) => void
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
      <DialogContent className="gap-4 m-4">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold my-4">
            {campaign.title}
          </DialogTitle>
          <DialogDescription>{campaign.description}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 text-muted-foreground">
          <p>
            Reward:{' '}
            {campaign.isNFT
              ? `${campaign.amount} Contributor NFT`
              : `${formatEther(campaign.amount ?? '0')} PCE`}
          </p>
          {isActive && (
            <>
              <p>
                Start Time:{' '}
                {timestampToDate(parseInt(campaign.startDate ?? '0'))}
              </p>
              <p>
                End Time: {timestampToDate(parseInt(campaign.endDate ?? '0'))}
              </p>
            </>
          )}
          {!campaign.validateSignatures && (
            <p>
              {status.isWinner
                ? 'You are whitelisted as a winner'
                : 'You are not whitelisted as a winner'}
            </p>
          )}
          {status.isClaimed && <p>You have already claimed this campaign</p>}
          {campaign.validateSignatures &&
            !status.isClaimed &&
            status.status != 2 && (
              <Input
                type="text"
                placeholder="Enter Github Gist URL"
                value={gistUrl}
                onChange={(e) => setGistUrl(e.target.value)}
              />
            )}
          <Button
            onClick={handleClaim}
            disabled={
              status.isClaimed ||
              status.status == 2 ||
              (!status.isWinner && !campaign.validateSignatures)
            }
          >
            Claim
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

  // State
  const [dialogState, setDialogState] = useState<DialogState>({
    isOpen: false,
    isCreateOpen: false,
    isAddWinnersOpen: false,
    campaignId: DEFAULT_CAMPAIGN_ID,
  })

  const [signature, setSignature] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

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
    address: sbtAddress[chainId || defaultChainId] as `0x${string}`,
    functionName: 'uri_',
    args: [],
    chainId: chainId || defaultChainId,
  })

  const { data: currentTokenId, refetch: refetchCurrentTokenId } =
    useReadContract({
      address: sbtAddress[chainId || defaultChainId] as `0x${string}`,
      abi: SBT_ABI,
      functionName: 'currentTokenId',
      args: [],
      chainId: chainId || defaultChainId,
    })

  const [campaignData, setCampaignData] = useState<CampaignState>({
    data: [],
    tokenURIs: [],
  })

  const client = new ApolloClient({
    uri: SUBGRAPH_URL[chainId || defaultChainId] as string,
    cache: new InMemoryCache(),
  })

  const {
    balances: nftBalances,
    metadata: nftMetadata,
    detailIndex: nftDetailIndex,
    isDetailOpen: isNFTDetailOpen,
    setDetailIndex: setNftDetailIndex,
    setIsDetailOpen: setIsNFTDetailOpen,
  } = useNFTData(
    chainId,
    address,
    campaignData.tokenURIs,
    uri_ as string,
    isConfirmed
  )

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
              amount
              isNFT
            }
            setTokenURIs(first: 10, orderBy: internal_id, orderDirection: asc) {
              internal_id
              uri
            }
          }
        `,
      })

      setCampaignData({
        data: data.campaignCreateds,
        tokenURIs: data.setTokenURIs,
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
      if (dialogState.campaignId < 0 || !address || !chainId) return

      try {
        const [status, isWinner, isClaimed] = await Promise.all([
          readContract(config, {
            abi: CAMPAIGN_ABI,
            address: campaignAddress[
              chainId || defaultChainId
            ] as `0x${string}`,
            functionName: 'getStatus',
            args: [dialogState.campaignId],
          }),
          readContract(config, {
            abi: CAMPAIGN_ABI,
            address: campaignAddress[
              chainId || defaultChainId
            ] as `0x${string}`,
            functionName: 'isWinner',
            args: [dialogState.campaignId, address],
          }),
          readContract(config, {
            abi: CAMPAIGN_ABI,
            address: campaignAddress[
              chainId || defaultChainId
            ] as `0x${string}`,
            functionName: 'champWinnersClaimed',
            args: [dialogState.campaignId, address],
          }),
        ])

        setCampaignStatus({
          status: status as number,
          isWinner: isWinner as boolean,
          isClaimed: isClaimed as boolean,
        })
      } catch (error) {}
    }

    checkCampaignStatus()
  }, [dialogState.campaignId, address, chainId])

  useEffect(() => {
    const fetchData = async () => {
      if (isConfirmed) {
        toast('Transaction Succeeded! Data refreshed.')
      } else if (error) {
        toast((error as BaseError).shortMessage)
      }
    }
    fetchData()
  }, [isConfirmed, error])

  // Handlers
  const signMessage = useCallback(async () => {
    if (!chainId) return

    try {
      const message = await signMessageAsync({ message: CLAIM_MESSAGE })
      setSignature(message)
    } catch (error) {}
  }, [chainId, signMessageAsync])

  const handleAddWhitelist = async (formData: any) => {
    setLoading(true)
    const encodedGists = formData.data.map(
      (item: { address: string; git: string }, index: number) =>
        ethers.keccak256(ethers.toUtf8Bytes(item.git.trim()))
    )
    const gistUsernameHash = ethers.keccak256(ethers.toUtf8Bytes('pwollemi'))
    const addresses = formData.data.map(
      (item: { address: string }) => item.address
    )

    const isVerifySignature = campaignData.data.find(
      (campaign) => campaign.campaignId === formData.id
    )?.validateSignatures

    try {
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
    } catch (error) {
      toast('Error adding whitelist')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateCampaign = async (formData: any) => {
    setDialogState((prev) => ({
      ...prev,
      isCreateOpen: false,
      isAddWinnersOpen: false,
    }))
    setLoading(true)

    try {
      const campaign = {
        sbtId: formData.sbtId,
        title: formData.title,
        description: formData.description,
        amount: formData.isSBT ? formData.amount : parseEther(formData.amount),
        startDate: new Date(formData.startDate).getTime() / 1000,
        endDate: new Date(formData.endDate).getTime() / 1000,
        validateSignatures: formData.isVerifySignature,
        isNFT: formData.isSBT,
      }

      const tx = await writeContractAsync({
        abi: CAMPAIGN_ABI,
        address: campaignAddress[chainId || defaultChainId] as `0x${string}`,
        functionName: 'createCampaign',
        args: [campaign],
      })

      await waitForTransactionReceipt(config, {
        hash: tx,
        confirmations: 2,
      })

      await fetchCampaignData()
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

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
      setLoading(true)
      setDialogState((prev) => ({ ...prev, isOpen: false }))

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
            toast('Invalid Github Gist URL')
            return
          }

          const result = await axios.get(gistUrl)

          const gistData = result.data
          signature = gistData.Signature
          message = gistData.Message
        } catch (error) {
          return
        }
      }

      const gistUsernameHash = ethers.keccak256(
        ethers.toUtf8Bytes(gistUsername || '0x')
      )

      try {
        writeContract({
          abi: CAMPAIGN_ABI,
          address: campaignAddress[chainId || defaultChainId] as `0x${string}`,
          functionName: 'claimCampaign',
          args: [campaignId, gistUsernameHash, message, signature],
        })
      } catch (error) {
      } finally {
        await fetchCampaignData()
        setLoading(false)
      }
    },
    [campaignData, parseGithubUsername, chainId, writeContract, toast]
  )

  const handleNFTClick = useCallback(
    (index: number) => {
      setNftDetailIndex(index)
      setIsNFTDetailOpen(true)
    },
    [setNftDetailIndex, setIsNFTDetailOpen]
  )

  const handleCopySignature = useCallback(() => {
    navigator.clipboard.writeText(
      JSON.stringify({
        Message: CLAIM_MESSAGE,
        Signature: signature,
        'Wallet Address': address,
      })
    )
    toast('Signature copied to clipboard')
  }, [signature, address, toast])

  const currentCampaign = useMemo(
    () =>
      campaignData.data.find(
        (campaign) => campaign.campaignId == dialogState.campaignId
      ),
    [campaignData, dialogState.campaignId]
  )

  return (
    <div className="w-full">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/60">
          <Spinner show={true} size="large" />
        </div>
      )}
      <div className="flex flex-col gap-4 mx-8">
        <h2 className="text-2xl font-bold tracking-tight mt-6">
          {campaign.title ?? ''}
        </h2>
        <p className="text-muted-foreground">{campaign.description ?? ''}</p>

        <CreateCampaignModal
          isOpen={dialogState.isCreateOpen}
          onClose={() =>
            setDialogState((prev) => ({ ...prev, isCreateOpen: false }))
          }
          nftMetadata={nftMetadata}
          onSubmit={handleCreateCampaign}
        />

        <AddWhitelistModal
          isOpen={dialogState.isAddWinnersOpen}
          onClose={() =>
            setDialogState((prev) => ({ ...prev, isAddWinnersOpen: false }))
          }
          onSubmit={handleAddWhitelist}
        />

        {chainId && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-2">
              <Button
                onClick={() =>
                  setDialogState((prev) => ({
                    ...prev,
                    isCreateOpen: true,
                  }))
                }
              >
                Create Campaign
              </Button>

              <Button
                onClick={() =>
                  setDialogState((prev) => ({
                    ...prev,
                    isAddWinnersOpen: true,
                  }))
                }
              >
                Add Winners
              </Button>
              <Button onClick={signMessage}>Sign Message</Button>
            </div>
            {signature.length > 0 && (
              <div
                className="flex flex-col gap-2 w-full cursor-pointer"
                onClick={handleCopySignature}
              >
                <h5 className="text-muted-foreground break-words whitespace-normal bg-muted rounded-lg p-4 relative">
                  <div className="absolute top-2 right-2">
                    <CopyIcon />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <span className="font-semibold">Message:</span>
                      <span>{CLAIM_MESSAGE}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-semibold">Signature:</span>
                      <span className="break-all">{signature}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="font-semibold">Wallet Address:</span>
                      <span className="break-all">{address}</span>
                    </div>
                  </div>
                </h5>
              </div>
            )}
            <NFTBalancesCard
              balances={nftBalances}
              metadata={nftMetadata}
              onNFTClick={handleNFTClick}
            />
          </div>
        )}

        <div className="flex flex-col gap-4 mb-6">
          <h2 className="text-2xl font-bold tracking-tight mt-6">Campaigns</h2>
          <CampaignsTable
            campaigns={campaignData.data}
            metadata={nftMetadata}
            onCampaignClick={(index) => {
              setDialogState((prev) => ({
                ...prev,
                campaignId: campaignData.data[index]?.campaignId ?? 0,
                isOpen: true,
              }))
            }}
          />
        </div>
      </div>
      <CampaignDialog
        isOpen={dialogState.isOpen}
        onOpenChange={(open) => {
          setDialogState((prev) => ({
            ...prev,
            isOpen: open,
            campaignId: prev.campaignId,
          }))
        }}
        campaign={currentCampaign}
        status={campaignStatus}
        onClaim={(gistUrl) => claimCampaign(dialogState.campaignId, gistUrl)}
      />
      <NFT_DETAIL
        isOpen={isNFTDetailOpen}
        onOpenChange={setIsNFTDetailOpen}
        imageSrc={nftMetadata[nftDetailIndex]?.image || EMPTY_NFT_IMAGE}
        imageName={campaignData.data[nftDetailIndex]?.title ?? ''}
        tokenId={nftDetailIndex + 1}
        description={campaignData.data[nftDetailIndex]?.description ?? ''}
        metadata={JSON.stringify(nftMetadata[nftDetailIndex])}
      />
    </div>
  )
}
