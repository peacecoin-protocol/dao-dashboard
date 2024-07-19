'use client'
import { Input } from '~/components/ui/input'

import { Button } from '~/components/ui/button'
import {
  pceAddress,
  governorAddress,
  POLY_SCAN_TX,
} from '~/app/constants/constants'
import { encodeCalldata } from '~/components/utils'
import { PCE_ABI } from '~/app/ABIs/PCEToken'
import { GOVERNOR_ABI } from '~/app/ABIs/Governor'

import { useEffect, useState } from 'react'
import { createClient } from 'viem'
import { http, createConfig } from '@wagmi/core'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
  type BaseError,
} from 'wagmi'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'

import { polygonAmoy } from '@wagmi/core/chains'
import Link from 'next/link'
import { Textarea } from '@headlessui/react'

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
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')

  function handleSelect(value: any) {
    setCategory(value)
  }

  function handleChange(event: any) {
    const name = event.target.name
    const value = event.target.value
    if (name === 'targets') {
      setTargets(value)
    } else if (name === 'values') {
      setValues(value)
    } else if (name === 'description') {
      setDescription(value)
    }
  }

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

  return (
    <div className="flex flex-col w-1/2 items-center justify-center">
      <div className="text-center text-2xl my-6">Submit a Proposals</div>
      <Select onValueChange={handleSelect}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select the Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Suggest something</SelectItem>
          <SelectItem value="2">Asks funds for investment</SelectItem>
          <SelectItem value="3">Other</SelectItem>
        </SelectContent>
      </Select>

      <div className="w-full">
        <Input
          hidden={category !== '2'}
          className="mt-5"
          type="number"
          placeholder="Amounts"
          name="values"
          onChange={handleChange}
        />

        <Textarea
          className="mt-5 h-20 w-full align-center p-2 rounded"
          placeholder="Description"
          name="description"
          onChange={handleChange}
        />
        <Button
          className="mt-5 w-full"
          variant="outline"
          onClick={() => {
            if (category.length == 0) {
              toast.error('Please Select Category')
              return
            }

            let _signature = 'approve(address,uint256)'
            let _value = '0'
            let _calldata = ''
            if (category === '2') {
              _calldata = encodeCalldata(PCE_ABI, 'transfer', [address, values])
              _signature = 'transfer(address,uint256)'
              _value = values
            } else {
              _calldata = encodeCalldata(PCE_ABI, 'approve', [address, '0'])
            }

            writeContract({
              abi: GOVERNOR_ABI,
              address: governorAddress,
              functionName: 'propose',
              args: [
                [pceAddress],
                [_value],
                [_signature],
                [_calldata],
                description,
              ],
            })
          }}
        >
          Propose
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
