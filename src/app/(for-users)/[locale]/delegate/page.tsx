'use client'

import { useEffect, useState } from 'react'
import Link from '~/components/custom/Link'

import { formatEther, parseEther } from 'ethers'
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
import { config } from '~/lib/config'
import { waitForTransactionReceipt } from '@wagmi/core'
import { Button } from '~/components/ui/button'
import { AmountInput } from '~/components/custom/amount-input'
import { formatString } from '~/components/utils'

import { pceAddress, pceGovToken } from '~/app/constants/constants'
import { PCE_ABI } from '~/app/ABIs/PCEToken'
import { PCE_GOV_TOKEN_ABI } from '~/app/ABIs/PCEGovToken'

import { PagePropsWithLocale, Dictionary } from '~/i18n/types'
import { getDict } from '~/i18n/get-dict'
import { localhost } from 'wagmi/chains'
import { CommunityGov_ABI } from '~/app/ABIs/CommunityGov'
import { DelegateInput } from '~/components/custom/delegate-input'
import { PCE_C_GOV_TOKEN_ABI } from '~/app/ABIs/PCECGovToken'

export default function ForDelegatePage({
  params: { locale, ...params },
}: PagePropsWithLocale<{}>) {
  const [dict, setDict] = useState<Dictionary | null>(null)
  const { address, chainId } = useAccount()
  const [stakingAmount, setStakingAmount] = useState('')
  const [delegateAddr, setDelegateAddr] = useState('')

  const { data: pceBalance, refetch: refetchPceBalance } = useReadContract({
    address: pceAddress[chainId || localhost.id] as `0x${string}`,
    abi: PCE_ABI,
    functionName: 'balanceOf',
    args: [address],
  })

  const { data: pceGovBalance, refetch: refetchPceGovBalance } =
    useReadContract({
      address: pceGovToken[chainId || localhost.id] as `0x${string}`,
      abi: PCE_GOV_TOKEN_ABI,
      functionName: 'balanceOf',
      args: [address],
    })

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

  const {
    data: hash,
    error,
    writeContract,
    writeContractAsync,
  } = useWriteContract()

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
      confirmations: 1,
    })

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

  const handleStake = async () => {
    const allowance = await readContract(config, {
      abi: PCE_ABI,
      address: pceAddress[chainId || localhost.id] as `0x${string}`,
      functionName: 'allowance',
      args: [address, pceGovToken[chainId || localhost.id] as `0x${string}`],
    })

    if (BigInt(allowance as string) < BigInt(parseEther(stakingAmount))) {
      let tx
      try {
        tx = await writeContractAsync({
          abi: PCE_ABI,
          address: pceAddress[chainId || localhost.id] as `0x${string}`,
          functionName: 'approve',
          args: [
            pceGovToken[chainId || localhost.id] as `0x${string}`,
            parseEther(stakingAmount),
          ],
        })
      } catch (error) {
        console.error('Error approving tokens:', error)
        return
      }
      await waitForTransactionReceipt(config, {
        hash: tx,
        confirmations: 1,
      })
    }

    let tx
    try {
      tx = await writeContractAsync({
        abi: PCE_C_GOV_TOKEN_ABI,
        address: pceGovToken[chainId || localhost.id] as `0x${string}`,
        functionName: 'deposit',
        args: [parseEther(stakingAmount)],
      })

      setStakingAmount('')
      await waitForTransactionReceipt(config, {
        hash: tx,
        confirmations: 1,
      })
    } catch (error) {
      console.error('Error depositing tokens:', error)
      return
    }

    await new Promise((resolve) => setTimeout(resolve, 1000))

    refetchPceBalance()
    refetchPceGovBalance()
    refetchVotes()
  }

  const handleWithdraw = async () => {
    let tx
    try {
      tx = await writeContractAsync({
        abi: CommunityGov_ABI,
        address: pceGovToken[chainId || localhost.id] as `0x${string}`,
        functionName: 'withdraw',
        args: [pceGovBalance],
      })

      await waitForTransactionReceipt(config, {
        hash: tx,
        confirmations: 1,
      })
    } catch (error) {
      console.error('Error withdrawing tokens:', error)
      return
    }

    await new Promise((resolve) => setTimeout(resolve, 1000))

    refetchPceBalance()
    refetchPceGovBalance()
    refetchVotes()
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

  const localDict = dict?.delegate ?? {}

  return (
    <div className="items-center justify-center flex w-full">
      <div className="flex flex-col max-xl:mx-10 mx-80 max-xl:my-0 my-20 gap-4">
        <h2 className="text-2xl font-bold tracking-tight my-4 text-center">
          {localDict.title ?? ''}
        </h2>

        <div className="text-muted-foreground">
          {localDict.peaceCoin ?? 'Peace Coin'}:
          {pceBalance
            ? formatString(formatEther(BigInt(pceBalance as string)))
            : '0'}
        </div>

        <div className="text-muted-foreground">
          {localDict.votingPower ?? ''} :{' '}
          {votes ? formatString(formatEther(BigInt(votes as string))) : '0'}
        </div>

        <div className="text-muted-foreground">
          Governance Token:
          {pceGovBalance
            ? formatString(formatEther(BigInt(pceGovBalance as string)))
            : '0'}
        </div>

        <div className="text-muted-foreground">
          {localDict.description ?? ''}
        </div>

        <div className="flex gap-2 w-full items-center justify-center flex-row">
          <AmountInput
            localDict={localDict}
            className="w-60 w-full"
            variant="outline"
            setStakingAmount={setStakingAmount}
            handleStake={handleStake}
            maxAmount={
              pceBalance ? Number(formatEther(BigInt(pceBalance as string))) : 0
            }
          />

          <Button
            className="w-full"
            variant="outline"
            onClick={() => {
              handleWithdraw()
            }}
          >
            Withdraw
          </Button>

          <DelegateInput
            className="w-60 w-full"
            variant="outline"
            setDelegateAddr={setDelegateAddr}
            handleDelegate={handleDelegate}
          />
        </div>

        <ToastContainer position="bottom-right" draggable></ToastContainer>
      </div>
    </div>
  )
}
