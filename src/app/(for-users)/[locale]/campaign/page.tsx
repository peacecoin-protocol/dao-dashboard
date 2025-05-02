'use client'

import { useEffect, useState } from 'react'

import { ApolloClient, gql, InMemoryCache } from '@apollo/client'
import { ethers, formatEther } from 'ethers'
import axios from 'axios'

import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  useSignMessage,
  type BaseError,
} from 'wagmi'
import { readContract } from '@wagmi/core'
import { CAMPAIGN } from '~/i18n/types'

import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '~/components/ui/card'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
} from '~/app/constants/constants'

import { CAMPAIGN_ABI } from '~/app/ABIs/Campaigns'

import { config } from '~/lib/config'
import { PagePropsWithLocale, Dictionary } from '~/i18n/types'
import { getDict } from '~/i18n/get-dict'
import { SBT_ABI } from '~/app/ABIs/SBT'

import { localhost } from '~/app/providers'
import Link from '~/components/custom/Link'
import { toast } from 'react-toastify'
import CopyIcon from '../../../../../public/svg/copy'
import Image from 'next/image'

export default function ForCampaignPage({
  params: { locale, ...params },
}: PagePropsWithLocale<{}>) {
  const [dict, setDict] = useState<Dictionary | null>(null)
  const campaign = dict?.campaign ?? {}
  const dashboard = dict?.dashboard ?? {}

  const [isOpen, setIsOpen] = useState(false)
  const [campaignData, setCampaignData] = useState<CAMPAIGN[]>([])
  const [campaignId, setCampaignId] = useState<number>(-1)
  const [isWinner, setIsWinner] = useState<boolean>(false)
  const [isClaimed, setIsClaimed] = useState<boolean>(false)
  const [status, setStatus] = useState<number>(0)
  const [githubId, setGithubId] = useState<string>('')
  const { address, chainId } = useAccount()
  const { signMessageAsync } = useSignMessage()

  const [nftBalances, setNftBalances] = useState<number[]>([])
  const [nftMetadata, setNftMetadata] = useState<{ image: string }[]>([])

  const { data: hash, error, writeContract } = useWriteContract()
  const [signature, setSignature] = useState<string>('')
  const _message = 'Claim Bounty for dApp.xyz'

  const signMessage = async () => {
    if (chainId) {
      const message = await signMessageAsync({
        message: _message,
      })
      setSignature(message)
    }
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })

  const { data: totalClaimed, refetch: refetchTotalClaimed } = useReadContract({
    abi: CAMPAIGN_ABI,
    address: campaignAddress[chainId || localhost.id] as `0x${string}`,
    functionName: 'totalClaimed',
    args: [address],
  })

  const { data: _campaignId, refetch: refetchCampaignId } = useReadContract({
    abi: CAMPAIGN_ABI,
    address: campaignAddress[chainId || localhost.id] as `0x${string}`,
    functionName: 'campaignId',
    args: [],
  })

  useEffect(() => {
    const getSBTNFTs = async () => {
      if (_campaignId) {
        toast.info('Loading SBT NFTs...')

        let _nftBalances: number[] = []
        for (let i = 0; i < (_campaignId as number); i++) {
          const _balance = (await readContract(config, {
            abi: SBT_ABI,
            address: sbtAddress[chainId || localhost.id] as `0x${string}`,
            functionName: 'balanceOf',
            args: [address, i],
          })) as number
          console.log(_balance)
          _nftBalances.push(_balance)
        }
        setNftBalances(_nftBalances)

        const _nftMetadata: { image: string }[] = []
        for (let i = 0; i < (_campaignId as number); i++) {
          const _metadata = (await readContract(config, {
            abi: SBT_ABI,
            address: sbtAddress[chainId || localhost.id] as `0x${string}`,
            functionName: 'uri',
            args: [i],
          })) as string

          try {
            console.log(_metadata)
            const response = await axios.get(`/api/get-nft-metadata`, {
              params: {
                metadata: _metadata,
              },
            })
            const data = response.data
            console.log(data)
            _nftMetadata.push({ image: data.image })
          } catch (error) {
            console.error('Error fetching NFT metadata:', error)
            _nftMetadata.push({ image: '' })
          }
        }
        console.log(_nftMetadata)
        setNftMetadata(_nftMetadata)
      }
    }

    getSBTNFTs()
  }, [_campaignId, isConfirmed])

  const { data: totalClaimedNFTs, refetch: refetchTotalClaimedNFTs } =
    useReadContract({
      abi: SBT_ABI,
      address: sbtAddress[chainId || localhost.id] as `0x${string}`,
      functionName: 'totalClaimedNFT',
      args: [address],
    })

  useEffect(() => {
    const notify = async () => {
      if (isConfirmed) {
        toast.success(
          <Link
            chainId={chainId}
            type="txHash"
            hash={hash}
            message="Transaction Succeed!"
          ></Link>
        )
        await refetchTotalClaimed()
      } else if (isConfirming) {
        toast.info(
          <div className="disabled">TX is Pending, Please Wait...</div>
        )
      } else if (error) {
        toast.error((error as BaseError).shortMessage)
      }
    }

    notify()
  }, [isConfirmed, isConfirming, error, hash])

  useEffect(() => {
    const fetchDict = async () => {
      try {
        const fetchedDict = await getDict(locale)
        setDict(fetchedDict)
      } catch (error) {
        console.error('Error fetching dictionary:', error)
      }
    }
    fetchDict()
  }, [locale])

  const client = new ApolloClient({
    uri: SUBGRAPH_URL[chainId || localhost.id] as string,
    cache: new InMemoryCache(),
  })

  useEffect(() => {
    if (!isOpen) {
      setCampaignId(-1)
    }
  }, [isOpen])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await client.query({
          query: gql`
            query campaignCreateds {
              campaignCreateds(
                first: 10
                orderDirection: asc
                orderBy: campaignId
              ) {
                campaignId
                title
                description
                endDate
                startDate
                validateSignatures
                amount
                isNFT
              }
            }
          `,
        })

        setCampaignData(data.campaignCreateds)
      } catch (error) {
        console.error('Error fetching data', error)
      }
    }

    fetchData()
  }, [isConfirmed])

  function parseGithubUsername(gistUrl: string): string | undefined {
    try {
      const url = new URL(gistUrl)
      const parts = url.pathname.split('/')
      return parts.length >= 2 ? parts[1] : undefined
    } catch (err) {
      return undefined
    }
  }

  const claimCampaign = async (campaignId: number, gistUrl: string) => {
    setIsOpen(false)

    let _signature = '0x'
    let _message = '_'
    let gistUsername
    if (campaignData[campaignId]?.validateSignatures) {
      try {
        gistUsername = parseGithubUsername(gistUrl)

        if (gistUsername == undefined) {
          toast.error('Invalid Github Gist URL')
          return
        }

        const result = await axios.get(gistUrl)
        const gistData = result.data
        _signature = gistData.Signature
        _message = gistData.Message
      } catch (error) {
        console.error('Error fetching gist:', error)
      }
    }

    let _gistUsername = ethers.keccak256(
      ethers.toUtf8Bytes(gistUsername ? gistUsername : '0x')
    )

    try {
      writeContract(
        {
          abi: CAMPAIGN_ABI,
          address: campaignAddress[chainId || localhost.id] as `0x${string}`,
          functionName: 'claimCampaign',
          args: [campaignId, _gistUsername, _message, _signature],
        },
        {
          onSuccess: (data) => {},
          onError: (error) => {
            console.error('Transaction error:', error)
          },
        }
      )
    } catch (error) {
      console.error('Error claiming campaign', error)
    }
  }

  useEffect(() => {
    const getStatus = async () => {
      if (campaignId >= 0 && address) {
        const status = (await readContract(config, {
          abi: CAMPAIGN_ABI,
          address: campaignAddress[chainId || localhost.id] as `0x${string}`,
          functionName: 'getStatus',
          args: [campaignId],
        })) as number

        setStatus(status)
      }
    }

    const checkWinner = async () => {
      if (campaignId >= 0 && address) {
        const winner = (await readContract(config, {
          abi: CAMPAIGN_ABI,
          address: campaignAddress[chainId || localhost.id] as `0x${string}`,
          functionName: 'isWinner',
          args: [campaignId, address],
        })) as boolean

        setIsWinner(winner)
      }
    }

    const checkClaimed = async () => {
      await getStatus()
      await checkWinner()
      if (campaignId >= 0 && address) {
        let claimed = false
        if (campaignData[campaignId]?.isNFT) {
          if (githubId) {
            claimed = (await readContract(config, {
              abi: CAMPAIGN_ABI,
              address: campaignAddress[
                chainId || localhost.id
              ] as `0x${string}`,
              functionName: 'champGistsClaimed',
              args: [campaignId, githubId],
            })) as boolean
          }
        } else {
          claimed = (await readContract(config, {
            abi: CAMPAIGN_ABI,
            address: campaignAddress[chainId || localhost.id] as `0x${string}`,
            functionName: 'champWinnersClaimed',
            args: [campaignId, address],
          })) as boolean
        }

        setIsClaimed(claimed)

        setIsOpen(true)
      }
    }

    checkClaimed()
  }, [campaignId, address, chainId])

  const isActive = (campaign: CAMPAIGN | undefined) => {
    if (!campaign) return false
    const now = new Date()
    const startDate = new Date(Number(campaign.startDate) * 1000)
    const endDate = new Date(Number(campaign.endDate) * 1000)
    const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000)

    return oneHourFromNow <= endDate
  }

  const CampaignDialog = ({
    isOpen,
    onOpenChange,
  }: {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
  }) => (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="gap-4 m-4">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold my-4">
            {campaignData[campaignId]?.title}
          </DialogTitle>
          <DialogDescription>
            {campaignData[campaignId]?.description}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 text-muted-foreground">
          {campaignData[campaignId]?.isNFT ? (
            <p>Reward: {campaignData[campaignId]?.amount} Contributor NFT</p>
          ) : (
            <p>
              Reward: {formatEther(campaignData[campaignId]?.amount ?? '0')} PCE
            </p>
          )}
          {isActive(campaignData[campaignId]) && (
            <>
              <p>
                Start Time:{' '}
                {timestampToDate(
                  parseInt(campaignData[campaignId]?.startDate ?? '0')
                )}
              </p>
              <p>
                End Time:{' '}
                {timestampToDate(
                  parseInt(campaignData[campaignId]?.endDate ?? '0')
                )}
              </p>
            </>
          )}
          {campaignData.length > 0 &&
          !campaignData[campaignId]?.validateSignatures ? (
            <>
              {isWinner ? (
                <>
                  <p>You are whitelisted as a winner</p>
                </>
              ) : (
                <>
                  <p>You are not whitelisted as a winner</p>
                </>
              )}
            </>
          ) : (
            <></>
          )}
          {isClaimed ? <p>You have already claimed this campaign</p> : null}
          {campaignData.length > 0 && (
            <>
              {campaignData[campaignId]?.validateSignatures &&
                !isClaimed &&
                status == 2 && (
                  <Input type="text" placeholder="Enter Github Gist URL" />
                )}
              <Button
                onClick={async () => {
                  const gistUrlInput = document.querySelector(
                    'input[placeholder="Enter Github Gist URL"]'
                  ) as HTMLInputElement
                  const gistUrlValue = gistUrlInput?.value
                  await claimCampaign(campaignId, gistUrlValue)
                }}
                disabled={
                  isClaimed ||
                  status != 2 ||
                  (!isWinner && !campaignData[campaignId]?.validateSignatures)
                }
              >
                Claim
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 mx-8">
        <h2 className="text-2xl font-bold tracking-tight mt-6">
          {campaign.title ?? ''}
        </h2>
        <p className="text-muted-foreground">{campaign.description ?? ''}</p>

        {/* <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {dashboard.totalrevenue ?? ''}
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalClaimed ? formatEther(totalClaimed as bigint) : '0'} PCE
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Contributor NFTs
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {nftBalance ? nftBalance.toString() : '0'} NFTs
              </div>
            </CardContent>
          </Card>
        </div> */}

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">NFT Balances</CardTitle>
          </CardHeader>
          <CardContent>
            {nftBalances.length > 0 && nftMetadata.length > 0 && (
              <div className="flex flex-wrap">
                {nftBalances.map((balance, index) => (
                  <div key={index} className="flex flex-col items-center gap-2">
                    {balance > 0 && (
                      <div className="flex flex-col items-center gap-2 px-2">
                        <div className="relative">
                          <Image
                            src={
                              (nftMetadata[index] &&
                                nftMetadata[index].image) ??
                              ''
                            }
                            alt={`NFT #${index}`}
                            className="rounded-lg h-[140px] w-[100px] object-fill"
                            width={100}
                            height={140}
                          />
                          <div className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                            {balance.toString()}
                          </div>
                        </div>
                        <p className="text-muted-foreground"># {index + 1}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold tracking-tight mt-6">
            {campaign.announcement ?? ''}
          </h2>
          {campaignData.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  {campaignData[0]?.title ?? 'No Title'}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-lg">
                {campaignData[0]?.description ?? 'No Description'}
              </CardContent>
              <CardFooter className="flex flex-col gap-2 text-muted-foreground justify-start items-start">
                <p>
                  Airdrop Amount:{' '}
                  {campaignData[0]?.isNFT
                    ? campaignData[0]?.amount
                    : formatEther(campaignData[0]?.amount ?? '0')}{' '}
                  {campaignData[0]?.isNFT ? 'NFT' : 'PCE'}
                </p>
                <p>
                  Start Time:{' '}
                  {timestampToDate(parseInt(campaignData[0]?.startDate ?? '0'))}
                </p>
                <p>
                  End Time:{' '}
                  {timestampToDate(parseInt(campaignData[0]?.endDate ?? '0'))}
                </p>

                <Button onClick={signMessage}>Sign Message</Button>
                {signature.length > 0 && (
                  <div
                    className="flex flex-col gap-2 w-full"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        JSON.stringify({
                          Message: _message,
                          Signature: signature,
                          'Wallet Address': address,
                        })
                      )
                      toast.success('Signature copied to clipboard')
                    }}
                  >
                    <h5 className="text-muted-foreground break-words whitespace-normal bg-muted rounded-lg p-4 relative">
                      <div className="absolute top-2 right-2">
                        <CopyIcon />
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-2">
                          <span className="font-semibold">Message:</span>
                          <span>{_message}</span>
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
              </CardFooter>
            </Card>
          )}
        </div>

        <div className="flex flex-col gap-4 mb-6">
          <h2 className="text-2xl font-bold tracking-tight mt-6">Campaigns</h2>

          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No.</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Start Time</TableHead>
                  <TableHead>End Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaignData.map((campaign, index) => (
                  <TableRow
                    key={index}
                    onClick={() => {
                      setCampaignId(index)
                    }}
                    className="cursor-pointer hover:bg-muted/50"
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{campaign.title}</TableCell>
                    <TableCell>
                      {campaign.isNFT
                        ? campaign.amount
                        : formatEther(campaign.amount ?? '0')}
                    </TableCell>
                    <TableCell>{campaign.isNFT ? 'NFT' : 'PCE'}</TableCell>
                    <TableCell>
                      {timestampToDate(parseInt(campaign.startDate))}
                    </TableCell>
                    <TableCell>
                      {timestampToDate(parseInt(campaign.endDate))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>
      <CampaignDialog isOpen={isOpen} onOpenChange={setIsOpen} />
      <ToastContainer position="bottom-right" draggable></ToastContainer>
    </div>
  )
}
