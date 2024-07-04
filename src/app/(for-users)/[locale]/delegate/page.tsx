'use client'
import { Input } from '~/components/ui/input'

import { Button } from '~/components/ui/button'
import { pceAddress, POLY_SCAN_TX } from '~/app/constants/constants'
import { PCE_ABI } from '~/app/ABIs/PCEToken'

import { useEffect, useState } from 'react'
import { formatEther } from 'ethers'
import { createClient } from 'viem'
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

export default function ForDelegatePage() {
  const { address, chainId } = useAccount()
  const { data: hash, error, writeContract } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })

  const [delegateAddr, setDelegateAddr] = useState('')

  const { data: votes, refetch: refetchVotes } = useReadContract({
    address: pceAddress,
    abi: PCE_ABI,
    functionName: 'getVotes',
    args: [address],
    chainId: chainId,
  })

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target.name
    const value = event.target.value
    if (name === 'delegateAddr') {
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

  return (
    <div className="items-center justify-center flex w-full">
      <div className="flex flex-col w-1/2 gap-4">
        <div className="text-center text-2xl my-6">Delegate Voting Power</div>

        <div>
          Voting Power : {votes ? formatEther(BigInt(votes as string)) : '0'}
        </div>

        <div>
          Before you can vote, you must assign your voting rights to either
          yourself, or you can assign it to a third party. {<br></br>}
          {<br></br>} Enter the Ethereum address of wallet to receive the voting
          rights.
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
        <ToastContainer
          position="bottom-right"
          closeOnClick
          draggable
        ></ToastContainer>
      </div>
    </div>
  )
}