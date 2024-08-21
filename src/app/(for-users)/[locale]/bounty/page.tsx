'use client'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import {
  pceAddress,
  bountyAddress,
  POLY_SCAN_TX,
  governorAddress,
} from '~/app/constants/constants'
import { PCE_ABI } from '~/app/ABIs/PCEToken'
import { BOUNTY_ABI } from '~/app/ABIs/Bounty'

import { shortenAddress, formatString } from '~/components/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from '~/components/ui/table'
import { Card, CardHeader, CardTitle, CardContent } from '~/components/ui/card'

import { PagePropsWithLocale } from '~/i18n/types'
import { getDict } from '~/i18n/get-dict'

import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  type BaseError,
} from 'wagmi'
import { readContract } from '@wagmi/core'
import { parseEther, createClient } from 'viem'
import { polygonAmoy } from '@wagmi/core/chains'
import { http, createConfig } from '@wagmi/core'

import Link from 'next/link'
import { BigNumberish, ethers, formatEther } from 'ethers'

import { gql } from '@apollo/client'
import createApolloClient from '~/app/apollo-client'
import { GOVERNOR_ABI } from '~/app/ABIs/Governor'

interface Contributor {
  contributor: string | null
  totalAmount: BigNumberish
  id?: string
}

interface Proposal {
  id: string | null
  amount: BigNumberish
}

const config = createConfig({
  chains: [polygonAmoy],
  client({ chain }) {
    return createClient({ chain, transport: http() })
  },
})

const provider = new ethers.JsonRpcProvider(
  'https://polygon-amoy.blockpi.network/v1/rpc/public'
)

export default function ForBountyPage({
  params: { locale, ...params },
}: PagePropsWithLocale<{}>) {
  const [dict, setDict] = useState<any>(null)

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
  const { address, chainId } = useAccount()
  const { data: hash, error, writeContractAsync } = useWriteContract()

  const client = createApolloClient()

  const [proposalData, setProposalData] = useState<any>([])
  const [contributorData, setContributorData] = useState([])

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await client.query({
          query: gql`
            query totalBounties {
              contributorTotalBounties(
                first: 10
                orderBy: totalAmount
                orderDirection: desc
              ) {
                totalAmount
                id
                contributor
              }
            }
          `,
        })

        setContributorData(data.contributorTotalBounties)
      } catch (error) {
        console.error('Error fetching data', error)
      }
    }

    fetchData()
  }, [isConfirmed])

  const [bountyAmount, setBountyAmount] = useState('')
  const [contributorAddr, setContributorAddr] = useState('')
  const [proposalId, setProposalId] = useState('')

  const { data: pceBalance, refetch: refetchBalance } = useReadContract({
    address: pceAddress,
    abi: PCE_ABI,
    functionName: 'balanceOf',
    args: [address],
    chainId: chainId,
  })

  const { data: proposalCount, refetch: refetchProposalCount } =
    useReadContract({
      address: governorAddress,
      abi: GOVERNOR_ABI,
      functionName: 'proposalCount',
      args: [],
      chainId: chainId,
    })

  useEffect(() => {
    const readProposalData = async () => {
      if (proposalCount == undefined) return
      let _proposalData = []
      for (let i = 0; i < parseInt(proposalCount as string); i++) {
        const amount = await readContract(config, {
          abi: BOUNTY_ABI,
          address: bountyAddress,
          functionName: 'proposalBounties',
          args: [i],
        })

        if ((amount as number) > 0) _proposalData.push({ id: i, amount })
      }
      setProposalData(_proposalData)
    }
    readProposalData()
  }, [proposalCount])

  const { data: contributorBounties, refetch: refetchContributorBounties } =
    useReadContract({
      address: bountyAddress,
      abi: BOUNTY_ABI,
      functionName: 'contributorBounties',
      args: [address],
      chainId: chainId,
    })

  const { data: _amount, refetch: refetchBountyAmount } = useReadContract({
    address: bountyAddress,
    abi: BOUNTY_ABI,
    functionName: 'bountyAmount',
    args: [],
    chainId: chainId,
  })

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target.name
    const value = event.target.value

    if (name === 'bountyAmount') {
      setBountyAmount(value)
    } else if (name === 'contributorAddr') {
      setContributorAddr(value)
    } else if (name === 'proposalId') {
      setProposalId(value)
    }
  }

  const handleClaimProposalBounty = async () => {
    try {
      const claimProposalBountyTX = await writeContractAsync({
        abi: BOUNTY_ABI,
        address: bountyAddress,
        functionName: 'claimProposalBounty',
        args: [proposalId],
      })

      const txReceipt = await provider.waitForTransaction(claimProposalBountyTX)
    } catch (error) {
      toast.error((error as BaseError).shortMessage)
    }
  }

  const handleClaimContributorBounty = async () => {
    try {
      const claimContributorBountyTX = await writeContractAsync({
        abi: BOUNTY_ABI,
        address: bountyAddress,
        functionName: 'claimContributorBounty',
        args: [],
      })

      const txReceipt = await provider.waitForTransaction(
        claimContributorBountyTX
      )

      await refetchBalance()
      await refetchBountyAmount()
      await refetchContributorBounties()
    } catch (error) {
      toast.error((error as BaseError).shortMessage)
    }
  }

  const handleAddProposalBounty = async () => {
    try {
      const allowance = await readContract(config, {
        abi: PCE_ABI,
        address: pceAddress,
        functionName: 'allowance',
        args: [address, bountyAddress],
      })

      if ((BigInt(allowance as string) as bigint) <= parseEther(bountyAmount)) {
        const tx = await writeContractAsync(
          {
            abi: PCE_ABI,
            address: pceAddress,
            functionName: 'approve',
            args: [bountyAddress, parseEther(bountyAmount)],
          },
          {
            onSuccess: (data) => {},
            onError: (error) => {
              console.error('Transaction error:', error)
            },
          }
        )
        const transactionReceipt = await provider.waitForTransaction(tx)
      }
      const addProposalBountyTX = await writeContractAsync({
        abi: BOUNTY_ABI,
        address: bountyAddress,
        functionName: 'addProposalBounty',
        args: [proposalId, parseEther(bountyAmount)],
      })

      const txReceipt = await provider.waitForTransaction(addProposalBountyTX)

      await refetchBalance()
      await refetchBountyAmount()
      await refetchContributorBounties()
    } catch (error) {
      toast.error((error as BaseError).shortMessage)
    }
  }

  const handleAddContributorBounty = async () => {
    try {
      const allowance = await readContract(config, {
        abi: PCE_ABI,
        address: pceAddress,
        functionName: 'allowance',
        args: [address, bountyAddress],
      })

      if ((BigInt(allowance as string) as bigint) < parseEther(bountyAmount)) {
        const tx = await writeContractAsync(
          {
            abi: PCE_ABI,
            address: pceAddress,
            functionName: 'approve',
            args: [bountyAddress, parseEther(bountyAmount)],
          },
          {
            onSuccess: (data) => {},
            onError: (error) => {
              console.error('Transaction error:', error)
            },
          }
        )
        const transactionReceipt = await provider.waitForTransaction(tx)
      }
      const addContributorBountyTX = await writeContractAsync({
        abi: BOUNTY_ABI,
        address: bountyAddress,
        functionName: 'addContributorBounty',
        args: [contributorAddr, parseEther(bountyAmount)],
      })

      const txReceipt = await provider.waitForTransaction(
        addContributorBountyTX
      )

      await refetchBalance()
      await refetchBountyAmount()
      await refetchContributorBounties()
    } catch (error) {
      toast.error((error as BaseError).shortMessage)
    }
  }

  useEffect(() => {
    const notify = async () => {
      if (isConfirmed) {
        toast.success(
          <Link href={`${POLY_SCAN_TX}${hash}`} target="_blank">
            Transaction Succeed!
          </Link>
        )

        setBountyAmount('')
        setContributorAddr('')

        await refetchBalance()
        await refetchBountyAmount()
        await refetchContributorBounties()
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

  const getWithdrawnAmount = (bountyInfo: unknown): string => {
    if (
      Array.isArray(bountyInfo) &&
      bountyInfo.length > 0 &&
      typeof bountyInfo[0] === 'bigint'
    ) {
      return formatEther(bountyInfo[1] as bigint)
    }
    return '0'
  }

  const getClaimableAmount = (bountyInfo: unknown): string => {
    if (
      Array.isArray(bountyInfo) &&
      bountyInfo.length > 0 &&
      typeof bountyInfo[0] === 'bigint' &&
      typeof bountyInfo[1] === 'bigint'
    ) {
      return formatEther((bountyInfo[0] - bountyInfo[1]) as bigint)
    }
    return '0'
  }

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 mx-8">
        <h2 className="text-2xl font-bold tracking-tight mt-6">
          {dict ? dict.bounty.title : ''}
        </h2>
        <p className="text-muted-foreground">
          {dict ? dict.bounty.description : ''}
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {dict ? dict.common.dashboard.totalrevenue : ''}
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
                {contributorBounties
                  ? formatString(getWithdrawnAmount(contributorBounties))
                  : '0'}{' '}
                PCE
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {dict ? dict.common.dashboard.pcebalance : ''}
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
                {pceBalance
                  ? formatString(formatEther(pceBalance as bigint))
                  : '0'}{' '}
                PCE
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {dict ? dict.common.dashboard.claimable : ''}
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
                {contributorBounties
                  ? formatString(getClaimableAmount(contributorBounties))
                  : '0'}{' '}
                PCE
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {dict ? dict.common.dashboard.percontributor : ''}
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
                {_amount ? formatString(formatEther(_amount as bigint)) : '0'}{' '}
                PCE
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="contributor" className="">
          <TabsList>
            <TabsTrigger value="contributor">
              {dict ? dict.bounty.contributorBounty : ''}
            </TabsTrigger>
            <TabsTrigger value="proposal">
              {dict ? dict.bounty.proposal : ''}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="contributor">
            <div className="gap-4 flex flex-col">
              <Input
                type="number"
                name="bountyAmount"
                value={bountyAmount}
                placeholder={dict ? dict.bounty.bountyAmount : ''}
                className="mt-4"
                onChange={handleChange}
              />

              <Input
                type="address"
                name="contributorAddr"
                value={contributorAddr}
                placeholder={dict ? dict.bounty.contributorAddr : ''}
                onChange={handleChange}
              />

              <div className="flex max-xl:flex-col flex-row gap-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    if (!contributorAddr) return
                    handleAddContributorBounty()
                  }}
                >
                  {dict ? dict.bounty.addContributor : ''}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    if (!address) return
                    handleClaimContributorBounty()
                  }}
                >
                  {dict ? dict.bounty.claimContributor : ''}
                </Button>
              </div>
              <div className="rounded-xl border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        {' '}
                        {dict ? dict.bounty.contributor : ''}
                      </TableHead>
                      <TableHead>
                        {' '}
                        {dict ? dict.bounty.totalAmount : ''}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contributorData &&
                      contributorData.map((contributor: Contributor, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            {shortenAddress(contributor.contributor)}
                          </TableCell>
                          <TableCell>
                            {formatEther(contributor.totalAmount)}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>{' '}
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={1}>
                        {dict ? dict.bounty.total : ''}
                      </TableCell>
                      <TableCell>
                        {contributorData ? contributorData.length : '0'}
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="proposal">
            <div>
              <Input
                type="number"
                name="bountyAmount"
                value={bountyAmount}
                placeholder={dict ? dict.bounty.bountyAmount : ''}
                className="mt-5"
                onChange={handleChange}
              />
              <Input
                value={proposalId}
                type="number"
                name="proposalId"
                placeholder={dict ? dict.bounty.proposalID : ''}
                className="mt-5"
                onChange={handleChange}
              />

              <div className="flex flex-row max-md:flex-col gap-4 my-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    if (!proposalId) return
                    handleAddProposalBounty()
                  }}
                >
                  {dict ? dict.bounty.addProposal : ''}
                </Button>

                <Button
                  variant="outline"
                  onClick={() => {
                    if (!proposalId) return
                    handleClaimProposalBounty()
                  }}
                >
                  {dict ? dict.bounty.claimProposal : ''}
                </Button>
              </div>

              <div className="rounded-xl border">
                <Table className="">
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        {dict ? dict.bounty.proposalID : ''}
                      </TableHead>
                      <TableHead>
                        {dict ? dict.bounty.totalAmount : ''}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {proposalData &&
                      proposalData.map((proposal: Proposal, index: number) => (
                        <TableRow key={index}>
                          <TableCell>{proposal.id}</TableCell>
                          <TableCell>
                            {formatString(formatEther(proposal.amount))}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>{' '}
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={1}>
                        {dict ? dict.common.proposal.total : ''}
                      </TableCell>
                      <TableCell>
                        {proposalData ? proposalData.length : '0'}
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <ToastContainer
          position="bottom-right"
          closeOnClick
          draggable
        ></ToastContainer>
      </div>
    </div>
  )
}
