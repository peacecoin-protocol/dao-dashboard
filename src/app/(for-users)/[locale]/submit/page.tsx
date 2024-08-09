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
import { PagePropsWithLocale } from '~/i18n/types'
import { getDict } from '~/i18n/get-dict'

import { polygonAmoy } from '@wagmi/core/chains'
import Link from 'next/link'
import { Textarea } from '@headlessui/react'

const config = createConfig({
  chains: [polygonAmoy],
  client({ chain }) {
    return createClient({ chain, transport: http() })
  },
})

export default function ForSubmitPage({
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
    <div className="flex flex-row w-full items-center justify-center content-center">
      <div className="flex flex-col w-1/2 items-center justify-center ">
        <h2 className="text-2xl font-bold tracking-tight my-6">
          {dict ? dict.submit.title : ''}
        </h2>
        <Select onValueChange={handleSelect}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={dict ? dict.submit.select : ''} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">
              {dict ? dict.submit.category1 : ''}
            </SelectItem>
            <SelectItem value="2">
              {dict ? dict.submit.category2 : ''}
            </SelectItem>
            <SelectItem value="3">
              {dict ? dict.submit.category3 : ''}
            </SelectItem>
          </SelectContent>
        </Select>

        <div className="w-full">
          <Input
            hidden={category !== '2'}
            className="mt-5"
            type="number"
            placeholder={dict ? dict.submit.amount : ''}
            name="values"
            onChange={handleChange}
          />

          <Textarea
            className="mt-5 h-20 w-full align-center p-2 rounded border-[1px] border-gray94"
            placeholder={dict ? dict.submit.description : ''}
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
                _calldata = encodeCalldata(PCE_ABI, 'transfer', [
                  address,
                  values,
                ])
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
            {dict ? dict.submit.propose : ''}
          </Button>

          <ToastContainer
            position="bottom-right"
            closeOnClick
            draggable
          ></ToastContainer>
        </div>
      </div>
    </div>
  )
}
