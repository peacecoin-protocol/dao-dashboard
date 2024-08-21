'use client'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'

import { shortenAddress, formatString } from '~/components/utils'
import useWindowWidth from '~/components/useWindWidth'
import { Button } from '~/components/ui/button'
import {
  pceAddress,
  governorAddress,
  POLY_SCAN_TX,
} from '~/app/constants/constants'
import { PCE_ABI } from '~/app/ABIs/PCEToken'
import { GOVERNOR_ABI } from '~/app/ABIs/Governor'
import { PagePropsWithLocale } from '~/i18n/types'
import { getDict } from '~/i18n/get-dict'

import { useEffect, useState } from 'react'
import { formatEther } from 'ethers'
import { createClient } from 'viem'
import { readContract } from '@wagmi/core'
import { http, createConfig } from '@wagmi/core'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  type BaseError,
} from 'wagmi'
import { polygonAmoy } from '@wagmi/core/chains'
import Link from 'next/link'

import RingLoader from 'react-spinners/RingLoader'
const override = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'black',
}

const config = createConfig({
  chains: [polygonAmoy],
  client({ chain }) {
    return createClient({ chain, transport: http() })
  },
})

export default function ForPendingPage({
  params: { locale, ...params },
}: PagePropsWithLocale<{}>) {
  const [dict, setDict] = useState<any>(null)
  const width = useWindowWidth()
  const colSpan = width < 1280

  let [loading, setLoading] = useState(true)

  let blockTimestamp = Date.now() / 1000

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
  const { data: hash, error, writeContract } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })

  const [proposals, setProposals] = useState<any[]>([])
  const [proposalStatus, setStatus] = useState<any[]>([])

  const { data: votes, refetch: refetchVotes } = useReadContract({
    address: pceAddress,
    abi: PCE_ABI,
    functionName: 'getVotes',
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
    const notify = async () => {
      if (isConfirmed) {
        toast.success(
          <Link href={`${POLY_SCAN_TX}${hash}`} target="_blank">
            Transaction Succeed!
          </Link>
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

  const fetchData = async (count: any) => {
    if (!count) return
    let temp = []
    let _status = []
    for (let i = 1; i <= count; i++) {
      const proposal = await readContract(config, {
        address: governorAddress,
        abi: GOVERNOR_ABI,
        functionName: 'proposals',
        args: [i],
      })
      const status = await readContract(config, {
        address: governorAddress,
        abi: GOVERNOR_ABI,
        functionName: 'state',
        args: [i],
      })

      switch (status as number) {
        case 0:
          _status.push('Pending')
          temp.push(proposal)
          break
        case 1:
          _status.push('Active')
          temp.push(proposal)
          break
        case 4:
          _status.push('Succeeded')
          temp.push(proposal)
          break
        case 5:
          _status.push('Queued')
          temp.push(proposal)
          break
        default:
          break
      }
    }
    setProposals(temp)
    setStatus(_status)
    setLoading(false)
  }

  useEffect(() => {
    fetchData(proposalCount)
  }, [proposalCount, isConfirmed])

  return (
    <div className="w-full">
      <div className="mx-8 gap-4 flex-col flex">
        <h2 className="text-2xl font-bold tracking-tight mt-6">
          {dict ? dict.pending.title : ''}
        </h2>

        <div className="gap-4 flex flex-col">
          <p className="text-muted-foreground">
            {dict ? dict.pending.votingPower : ''}
            {' : '}
            {votes ? formatString(formatEther(BigInt(votes as string))) : '0'}
          </p>

          <div className="border rounded-xl">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    {dict ? dict.common.proposal.proposalId : ''}
                  </TableHead>
                  <TableHead className="max-xl:hidden">
                    {dict ? dict.common.proposal.proposer : ''}
                  </TableHead>
                  <TableHead className="max-xl:hidden">
                    {dict ? dict.common.proposal.forVote : ''}
                  </TableHead>
                  <TableHead className="max-xl:hidden">
                    {dict ? dict.common.proposal.againstVote : ''}
                  </TableHead>
                  <TableHead className="max-xl:hidden">
                    {dict ? dict.common.proposal.status : ''}
                  </TableHead>
                  <TableHead>
                    {dict ? dict.common.proposal.castVote : ''}
                  </TableHead>
                  <TableHead>
                    {dict ? dict.common.proposal.execute : ''}
                  </TableHead>
                  <TableHead>
                    {dict ? dict.common.proposal.queue : ''}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {proposals &&
                  proposals.map((proposal, index) => (
                    <TableRow key={proposal[0]}>
                      <TableCell className="font-medium">
                        {formatString(proposal[0])}
                      </TableCell>
                      <TableCell className="max-xl:hidden">
                        {shortenAddress(proposal[1])}
                      </TableCell>
                      <TableCell className="font-medium max-xl:hidden">
                        {formatString(formatEther(proposal[5]))}
                      </TableCell>
                      <TableCell className="font-medium max-xl:hidden">
                        {formatString(formatEther(proposal[6]))}
                      </TableCell>
                      <TableCell className="font-medium max-xl:hidden">
                        {proposalStatus[index]}
                      </TableCell>
                      <TableCell className="flex max-xl:flex-col flex-row gap-2">
                        <Button
                          disabled={proposalStatus[index] != 'Active'}
                          onClick={() => {
                            writeContract({
                              abi: GOVERNOR_ABI,
                              address: governorAddress,
                              functionName: 'castVote',
                              args: [proposal[0], true],
                            })
                          }}
                        >
                          {dict ? dict.common.proposal.forVote : ''}
                        </Button>
                        <Button
                          disabled={proposalStatus[index] != 'Active'}
                          className="xl:ml-2"
                          onClick={() => {
                            writeContract({
                              abi: GOVERNOR_ABI,
                              address: governorAddress,
                              functionName: 'castVote',
                              args: [proposal[0], false],
                            })
                          }}
                        >
                          {dict ? dict.common.proposal.againstVote : ''}
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          disabled={
                            blockTimestamp < proposals[index][2] ||
                            proposalStatus[index] != 'Queued'
                          }
                          onClick={() => {
                            writeContract({
                              abi: GOVERNOR_ABI,
                              address: governorAddress,
                              functionName: 'execute',
                              args: [proposal[0]],
                            })
                          }}
                        >
                          {dict ? dict.common.proposal.execute : ''}
                        </Button>
                      </TableCell>

                      <TableCell>
                        <Button
                          disabled={proposalStatus[index] != 'Succeeded'}
                          onClick={() => {
                            writeContract({
                              abi: GOVERNOR_ABI,
                              address: governorAddress,
                              functionName: 'queue',
                              args: [proposal[0]],
                            })
                          }}
                        >
                          {dict ? dict.common.proposal.queue : ''}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={colSpan ? 3 : 7}>
                    {dict ? dict.common.proposal.total : ''}
                  </TableCell>
                  <TableCell>{proposals.length}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
          <ToastContainer
            position="bottom-right"
            closeOnClick
            draggable
          ></ToastContainer>

          <RingLoader
            color={'#000000'}
            loading={loading}
            cssOverride={override}
            size={50}
          />
        </div>
      </div>
    </div>
  )
}
