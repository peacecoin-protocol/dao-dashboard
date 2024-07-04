'use client'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'

import { Button } from '~/components/ui/button'
import {
  pceAddress,
  governorAddress,
  POLY_SCAN_TX,
} from '~/app/constants/constants'
import { PCE_ABI } from '~/app/ABIs/PCEToken'
import { GOVERNOR_ABI } from '~/app/ABIs/Governor'

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

const config = createConfig({
  chains: [polygonAmoy],
  client({ chain }) {
    return createClient({ chain, transport: http() })
  },
})

export default function ForPendingPage() {
  const { address, chainId } = useAccount()
  const { data: hash, error, writeContract } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })

  const [targets, setTargets] = useState('')
  const [values, setValues] = useState('')
  const [singature, setSignatures] = useState('')
  const [calldata, setCalldata] = useState('')
  const [description, setDescription] = useState('')
  const [proposals, setProposals] = useState<any[]>([])
  const [proposalStatus, setStatus] = useState<any[]>([])
  const [delegateAddr, setDelegateAddr] = useState('')

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

  const formatNumberString = (num: any) => {
    return BigInt(num as string).toString()
  }

  const handleDelegate = async () => {
    writeContract({
      abi: PCE_ABI,
      address: pceAddress,
      functionName: 'delegate',
      args: [delegateAddr],
    })
  }

  useEffect(() => {
    if (isConfirmed) {
      toast.success(
        <Link href={`${POLY_SCAN_TX}${hash}`} target="_blank">
          Claim Success, View TX
        </Link>
      )
    } else if (isConfirming) {
      toast.info(<div className="disabled">TX is Pending, Please Wait...</div>)
    } else if (error) {
      toast.error((error as BaseError).shortMessage)
    }
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
  }

  useEffect(() => {
    fetchData(proposalCount)
  }, [proposalCount])

  return (
    <div className="w-full">
      <div className="text-center text-2xl my-4">Pending Proposals</div>
      <div className="gap-4 flex flex-col">
        <div>
          Voting Power : {votes ? formatEther(BigInt(votes as string)) : '0'}
        </div>

        <Table className="rounded border">
          <TableCaption>A list of the proposals.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[110px]">Proposal id</TableHead>
              <TableHead>Proposer</TableHead>
              <TableHead>For Vote</TableHead>
              <TableHead>Against Vote</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Cast Vote</TableHead>
              <TableHead>Execute</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {proposals &&
              proposals.map((proposal, index) => (
                <TableRow key={proposal[0]}>
                  <TableCell className="font-medium">
                    {formatNumberString(proposal[0])}
                  </TableCell>
                  <TableCell>{proposal[1]}</TableCell>
                  <TableCell className="font-medium">
                    {formatEther(proposal[5])}
                  </TableCell>
                  <TableCell className="font-medium">
                    {formatEther(proposal[6])}
                  </TableCell>
                  <TableCell>{proposalStatus[index]}</TableCell>
                  <TableCell>
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
                      For Vote
                    </Button>
                    <Button
                      disabled={proposalStatus[index] != 'Active'}
                      className="ml-2"
                      onClick={() => {
                        writeContract({
                          abi: GOVERNOR_ABI,
                          address: governorAddress,
                          functionName: 'castVote',
                          args: [proposal[0], false],
                        })
                      }}
                    >
                      Aga Vote
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      disabled={proposalStatus[index] != 'Queued'}
                      onClick={() => {
                        writeContract({
                          abi: GOVERNOR_ABI,
                          address: governorAddress,
                          functionName: 'execute',
                          args: [proposal[0]],
                        })
                      }}
                    >
                      Execute
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
                      Queue
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={7}>Total Proposals</TableCell>
              <TableCell>{proposals.length}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        <ToastContainer
          position="bottom-right"
          closeOnClick
          draggable
        ></ToastContainer>
      </div>
    </div>
  )
}
