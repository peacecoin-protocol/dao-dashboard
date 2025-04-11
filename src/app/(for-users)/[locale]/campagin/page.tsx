'use client'

import { useEffect, useState } from 'react'

import { ApolloClient, gql, InMemoryCache } from '@apollo/client'
import { formatEther } from 'ethers'
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
import { CAMPAGIN } from '~/i18n/types'

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
  DialogFooter,
} from '~/components/ui/dialog'
import { timestampToDate } from '~/components/utils'

import { campaginAddress, SUBGRAPH_URL } from '~/app/constants/constants'
import { CAMPAGIN_ABI } from '~/app/ABIs/Campagins'

import { config } from '~/lib/config'
import { PagePropsWithLocale, Dictionary } from '~/i18n/types'
import { getDict } from '~/i18n/get-dict'

import { localhost } from '~/app/providers'
import Link from '~/components/custom/Link'
import { toast } from 'react-toastify'

export default function ForCampaginPage({
  params: { locale, ...params },
}: PagePropsWithLocale<{}>) {
  const [dict, setDict] = useState<Dictionary | null>(null)
  const campagin = dict?.campagin ?? {}
  const dashboard = dict?.dashboard ?? {}

  const [isOpen, setIsOpen] = useState(false)
  const [campaginData, setCampaginData] = useState<CAMPAGIN[]>([])
  const [campaginId, setCampaginId] = useState<number>(-1)
  const [isWinner, setIsWinner] = useState<boolean>(false)
  const [isClaimed, setIsClaimed] = useState<boolean>(false)

  const { address, chainId } = useAccount()
  const { signMessageAsync } = useSignMessage()

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

  const { data: totalClaimed } = useReadContract({
    abi: CAMPAGIN_ABI,
    address: campaginAddress[chainId || localhost.id] as `0x${string}`,
    functionName: 'totalClaimed',
    args: [address],
  }) as { data: bigint }

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
    const fetchData = async () => {
      try {
        const { data } = await client.query({
          query: gql`
            query campaginCreateds {
              campaginCreateds(
                first: 10
                orderDirection: asc
                orderBy: campaginId
              ) {
                campaginId
                title
                description
                endDate
                startDate
                validateSignatures
                amount
              }
            }
          `,
        })

        setCampaginData(data.campaginCreateds)
      } catch (error) {
        console.error('Error fetching data', error)
      }
    }

    fetchData()
  }, [isConfirmed])

  useEffect(() => {
    const fetchGistData = async (url: string) => {
      try {
        const response = await fetch('/api/endpoint/router', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url }),
        })
        const data = await response.json()
        return data
      } catch (error) {
        console.error('Error fetching gist:', error)
        return null
      }
    }

    fetchGistData('/api/endpoint/router')
  }, [])

  const claimCampagin = async (campaginId: number, gistUrl: string) => {
    setIsOpen(false)

    let _signature = '0x'
    let _message = ''

    if (campaginData[campaginId]?.validateSignatures) {
      try {
        const result = await axios.get(gistUrl)
        const gistData = result.data
        _signature = gistData.signature
        _message = gistData.message
      } catch (error) {
        console.error('Error fetching gist:', error)
      }
    }

    try {
      setCampaginId(-1)
      writeContract(
        {
          abi: CAMPAGIN_ABI,
          address: campaginAddress[chainId || localhost.id] as `0x${string}`,
          functionName: 'claimCampagin',
          args: [campaginId, _message, _signature],
        },
        {
          onSuccess: (data) => {},
          onError: (error) => {
            console.error('Transaction error:', error)
          },
        }
      )
    } catch (error) {
      console.error('Error claiming campagin', error)
    }
  }

  useEffect(() => {
    const checkWinner = async () => {
      if (campaginId >= 0 && address) {
        const winner = (await readContract(config, {
          abi: CAMPAGIN_ABI,
          address: campaginAddress[chainId || localhost.id] as `0x${string}`,
          functionName: 'isWinner',
          args: [campaginId, address],
        })) as boolean
        setIsWinner(winner)
      }
    }

    const checkClaimed = async () => {
      await checkWinner()
      if (campaginId >= 0 && address) {
        const claimed = (await readContract(config, {
          abi: CAMPAGIN_ABI,
          address: campaginAddress[chainId || localhost.id] as `0x${string}`,
          functionName: 'champWinnersClaimed',
          args: [campaginId, address],
        })) as boolean
        setIsClaimed(claimed)

        setIsOpen(true)
      }
    }

    checkClaimed()
  }, [campaginId, address, chainId])

  const CampaginDialog = ({
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
            {campaginData[campaginId]?.title}
          </DialogTitle>
          <DialogDescription>
            {campaginData[campaginId]?.description}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 text-muted-foreground">
          <p>
            Amount: {formatEther(campaginData[campaginId]?.amount ?? '0')} PCE
          </p>
          <p>
            Start Time:{' '}
            {timestampToDate(
              parseInt(campaginData[campaginId]?.startDate ?? '0')
            )}
          </p>
          <p>
            End Time:{' '}
            {timestampToDate(
              parseInt(campaginData[campaginId]?.endDate ?? '0')
            )}
          </p>
          {campaginData.length > 0 &&
            (isWinner ? (
              <>
                <p>You are whitelisted as a winner</p>
                {isClaimed ? (
                  <p>You have already claimed this campagin</p>
                ) : null}
                {campaginData[campaginId]?.validateSignatures && !isClaimed && (
                  <Input type="text" placeholder="Enter Github Gist URL" />
                )}
                <Button
                  onClick={async () => {
                    const gistUrlInput = document.querySelector(
                      'input[placeholder="Enter Github Gist URL"]'
                    ) as HTMLInputElement
                    const gistUrlValue = gistUrlInput?.value
                    await claimCampagin(campaginId, gistUrlValue)
                  }}
                  disabled={isClaimed}
                >
                  Claim
                </Button>
              </>
            ) : (
              <p>You are not whitelisted as a winner</p>
            ))}
        </div>
      </DialogContent>
    </Dialog>
  )

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 mx-8">
        <h2 className="text-2xl font-bold tracking-tight mt-6">
          {campagin.title ?? ''}
        </h2>
        <p className="text-muted-foreground">{campagin.description ?? ''}</p>

        <div className="grid gap-4 lg:grid-cols-2">
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
                {/* {contributorBounties
                  ? formatString(getWithdrawnAmount(contributorBounties))
                  : '0'}{' '} */}
                {formatEther(totalClaimed ?? '0')} PCE
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
                {/* {contributorBounties
                  ? formatString(getClaimableAmount(contributorBounties))
                  : '0'}{' '} */}
                0 NFTs
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold tracking-tight mt-6">
            {campagin.announcement ?? ''}
          </h2>

          {campaginData.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  {campaginData[0]?.title ?? 'No Title'}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-lg">
                {campaginData[0]?.description ?? 'No Description'}
              </CardContent>
              <CardFooter className="flex flex-col gap-2 text-muted-foreground justify-start items-start">
                <p>
                  Airdrop Amount: {formatEther(campaginData[0]?.amount ?? '0')}{' '}
                  PCE
                </p>
                <p>
                  Start Time:{' '}
                  {timestampToDate(parseInt(campaginData[0]?.startDate ?? '0'))}
                </p>
                <p>
                  End Time:{' '}
                  {timestampToDate(parseInt(campaginData[0]?.endDate ?? '0'))}
                </p>
                {campaginData[0]?.validateSignatures ? (
                  <DialogFooter className="gap-4 w-1/2">
                    <div className="flex flex-col gap-2 w-full">
                      <div className="flex flex-row gap-2 w-full">
                        <Input
                          type="text"
                          className="w-full"
                          placeholder="Enter Github Gist URL"
                        />
                      </div>
                    </div>
                  </DialogFooter>
                ) : null}

                <Button onClick={signMessage}>Sign Message</Button>
                {signature.length > 0 && (
                  <div
                    className="flex flex-col gap-2 w-full"
                    onClick={() => {
                      navigator.clipboard.writeText(signature)
                      toast.success('Signature copied to clipboard')
                    }}
                  >
                    <h5 className="text-muted-foreground break-words whitespace-normal">
                      Signature: {signature}
                    </h5>
                  </div>
                )}
              </CardFooter>
            </Card>
          )}
        </div>

        <div className="flex flex-col gap-4 mb-6">
          <h2 className="text-2xl font-bold tracking-tight mt-6">
            {campagin.pastCampagin ?? ''}
          </h2>

          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No.</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Start Time</TableHead>
                  <TableHead>End Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaginData.map((campagin, index) => (
                  <TableRow
                    key={index}
                    onClick={() => {
                      setCampaginId(index)
                    }}
                    className="cursor-pointer hover:bg-muted/50"
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{campagin.title}</TableCell>
                    <TableCell>{formatEther(campagin.amount)} PCE</TableCell>
                    <TableCell>
                      {timestampToDate(parseInt(campagin.startDate))}
                    </TableCell>
                    <TableCell>
                      {timestampToDate(parseInt(campagin.endDate))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </div>
      <CampaginDialog isOpen={isOpen} onOpenChange={setIsOpen} />
      <ToastContainer position="bottom-right" draggable></ToastContainer>
    </div>
  )
}
