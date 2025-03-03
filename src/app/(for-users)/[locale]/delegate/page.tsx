'use client'

import { useEffect, useState } from 'react'
import Link from '~/components/custom/Link'

import { formatEther } from 'ethers'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  type BaseError,
} from 'wagmi'

import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { formatString } from '~/components/utils'

import { pceGovToken } from '~/app/constants/constants'
import { PCE_GOV_TOKEN_ABI } from '~/app/ABIs/PCEGovToken'

import { PagePropsWithLocale, Dictionary } from '~/i18n/types'
import { getDict } from '~/i18n/get-dict'
import { localhost } from 'wagmi/chains'

export default function ForDelegatePage({
  params: { locale, ...params },
}: PagePropsWithLocale<{}>) {
  const [dict, setDict] = useState<Dictionary | null>(null)

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

  const [delegateAddr, setDelegateAddr] = useState('')

  const { data: votes, refetch: refetchVotes } = useReadContract({
    address: pceGovToken[chainId || localhost.id] as `0x${string}`,
    abi: PCE_GOV_TOKEN_ABI,
    functionName: 'getVotes',
    args: [address],
  })

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target.name
    const value = event.target.value
    if (name === 'delegateAddr') {
      setDelegateAddr(value)
    }
  }

  const handleDelegate = async () => {
    writeContract({
      abi: PCE_GOV_TOKEN_ABI,
      address: pceGovToken[chainId || localhost.id] as `0x${string}`,
      functionName: 'delegate',
      args: [delegateAddr],
    })
  }

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

        setDelegateAddr('')
        await refetchVotes()
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

  const delegate = dict?.delegate ?? {}

  return (
    <div className="items-center justify-center flex w-full">
      <div className="flex flex-col max-xl:mx-10 mx-80 max-xl:my-0 my-20 gap-4">
        <h2 className="text-2xl font-bold tracking-tight my-4 text-center">
          {delegate.title ?? ''}
        </h2>
        <div className="text-muted-foreground">
          {delegate.votingPower ?? ''} :{' '}
          {votes ? formatString(formatEther(BigInt(votes as string))) : '0'}
        </div>

        <div className="text-muted-foreground">
          {delegate.description ?? ''}
        </div>
        <Input
          type="address"
          name="delegateAddr"
          value={delegateAddr}
          placeholder={delegate.address ?? ''}
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
          {delegate.delegate ?? ''}
        </Button>
        <ToastContainer position="bottom-right" draggable></ToastContainer>
      </div>
    </div>
  )
}
