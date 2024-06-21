'use client'
import { Input } from '~/components/ui/input'
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

export default function ForVotingPage() {
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

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target.name
    const value = event.target.value
    if (name === 'targets') {
      setTargets(value)
    } else if (name === 'values') {
      setValues(value)
    } else if (name === 'signatures') {
      setSignatures(value)
    } else if (name === 'calldatas') {
      setCalldata(value)
    } else if (name === 'description') {
      setDescription(value)
    } else if (name === 'delegateAddr') {
      setDelegateAddr(value)
    }
  }

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
          break
        case 1:
          _status.push('Active')
          break
        case 2:
          _status.push('Canceled')
          break
        case 3:
          _status.push('Defeated')
          break
        case 4:
          _status.push('Succeeded')
          break
        case 5:
          _status.push('Queued')
          break
        case 6:
          _status.push('Expired')
          break
        case 7:
          _status.push('Executed')
          break
        default:
          _status.push('Defeated')
      }
      temp.push(proposal)
    }
    setProposals(temp)
    setStatus(_status)
  }

  useEffect(() => {
    fetchData(proposalCount)
  }, [proposalCount])

  return (
    <div>
      <div>Voting Page</div>
      <div>
        <div>
          Your current Voting Power :{' '}
          {votes ? formatEther(BigInt(votes as string)) : '0'}
        </div>
        <div>Delegate Voting</div>
        <div>
          This option allows you to delegate your votes to another Ethereum
          address. You never send PCE, only your voting rights, and can
          undelegate at any time.
        </div>
        <Input
          type="address"
          name="delegateAddr"
          placeholder="Address"
          className="mt-5"
          onChange={handleChange}
        />
        <Button
          className="mt-5"
          variant="outline"
          onClick={() => {
            if (!delegateAddr) return
            handleDelegate()
          }}
        >
          Delegate
        </Button>
        <Input
          className="mt-5"
          type="address"
          placeholder="Target Address"
          name="targets"
          onChange={handleChange}
        />
        <Input
          className="mt-5"
          type="number"
          placeholder="Values"
          name="values"
          onChange={handleChange}
        />
        <Input
          className="mt-5"
          type="text"
          placeholder="Signatures"
          name="signatures"
          onChange={handleChange}
        />
        <Input
          className="mt-5"
          type="text"
          placeholder="Calldatas"
          name="calldatas"
          onChange={handleChange}
        />
        <Input
          className="mt-5"
          type="text"
          placeholder="Description"
          name="description"
          onChange={handleChange}
        />
        <Button
          className="mt-5"
          variant="outline"
          onClick={() => {
            writeContract({
              abi: GOVERNOR_ABI,
              address: governorAddress,
              functionName: 'propose',
              args: [[targets], [values], [singature], [calldata], description],
            })
          }}
        >
          Propose
        </Button>

        <Table>
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
              proposals.map((proposal) => (
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
                  <TableCell>
                    {proposal[0] && proposalStatus[parseInt(proposal[0]) - 1]}
                  </TableCell>
                  <TableCell>
                    <Button
                      disabled={
                        proposalStatus[parseInt(proposal[0]) - 1] != 'Active'
                      }
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
                      disabled={
                        proposalStatus[parseInt(proposal[0]) - 1] != 'Active'
                      }
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
                      disabled={
                        proposalStatus[parseInt(proposal[0]) - 1] != 'Queued'
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
                      Execute
                    </Button>
                  </TableCell>

                  <TableCell>
                    <Button
                      disabled={
                        proposalStatus[parseInt(proposal[0]) - 1] != 'Succeeded'
                      }
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
              <TableCell>
                {proposalCount
                  ? BigInt(proposalCount as string).toString()
                  : '0'}
              </TableCell>
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
