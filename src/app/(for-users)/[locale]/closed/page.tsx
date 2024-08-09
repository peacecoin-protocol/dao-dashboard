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

import { governorAddress, POLY_SCAN_TX } from '~/app/constants/constants'
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

import { PagePropsWithLocale } from '~/i18n/types'
import { getDict } from '~/i18n/get-dict'

const config = createConfig({
  chains: [polygonAmoy],
  client({ chain }) {
    return createClient({ chain, transport: http() })
  },
})

export default function ForClosedPage({
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

  const { chainId } = useAccount()
  const { data: hash, error, writeContract } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })

  const [proposals, setProposals] = useState<any[]>([])
  const [proposalStatus, setStatus] = useState<any[]>([])

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
        case 2:
          _status.push('Canceled')
          temp.push(proposal)
          break
        case 3:
          _status.push('Defeated')
          temp.push(proposal)
          break
          break
        case 6:
          _status.push('Expired')
          temp.push(proposal)
          break
        case 7:
          _status.push('Executed')
          temp.push(proposal)
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
      <div className="mx-8 gap-4 flex-col flex">
        <h2 className="text-2xl font-bold tracking-tight mt-6">
          {dict ? dict.closed.title : ''}
        </h2>
        <div className="rounded-xl flex border">
          <Table className="">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[110px]">
                  {' '}
                  {dict ? dict.common.proposal.proposalId : ''}
                </TableHead>
                <TableHead>
                  {dict ? dict.common.proposal.proposer : ''}
                </TableHead>
                <TableHead>
                  {dict ? dict.common.proposal.forVote : ''}
                </TableHead>
                <TableHead>
                  {dict ? dict.common.proposal.againstVote : ''}
                </TableHead>
                <TableHead>{dict ? dict.common.proposal.status : ''}</TableHead>
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
                  </TableRow>
                ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={4}>
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
      </div>
    </div>
  )
}
