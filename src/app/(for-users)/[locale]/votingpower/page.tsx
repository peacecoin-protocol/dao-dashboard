'use client'

import { useEffect, useMemo, useState } from 'react'

import { Button } from '~/components/ui/button'

import { Input } from '~/components/ui/input'
import { readContract } from '@wagmi/core'

import { formatEther, parseEther } from 'ethers'
import { maxUint256 } from 'viem'
import { useToast } from '~/hooks/use-toast'
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  type BaseError,
} from 'wagmi'

import { getDict } from '~/i18n/get-dict'

import { PagePropsWithLocale, Dictionary } from '~/i18n/types'
import { defaultChainId } from '~/app/constants/constants'

import { formatNumber } from '~/components/utils'
import { PCE_ABI } from '~/app/ABIs/PCEToken'

import { config } from '~/lib/config'

import { waitForTransactionReceipt } from '@wagmi/core'
import {
  PCE_SBT_ADDRESS,
  pceAddress,
  stakingAddress,
  WPCE_ADDRESS,
  sbtTableHeaders,
  NFTAddress,
} from '~/app/constants/constants'

import { STAKING_ABI } from '~/app/ABIs/Staking'
import { SBT_ABI } from '~/app/ABIs/SBT'

import { PCE_GOV_TOKEN_ABI } from '~/app/ABIs/PCEGovToken'
import { SBTTableComponent } from '~/components/custom/sbt-tableComponent'
import { SBTInfo } from '~/components/custom/sbt-tableComponent'

import { createClient } from '~/utils/supabase/client'

export default function StakingPage({
  params: { locale },
}: PagePropsWithLocale<{}>) {
  const [dict, setDict] = useState<Dictionary | null>(null)
  const { toast } = useToast()
  const votingPowerDict = dict?.votingPower ?? {}
  const supabase = createClient()
  const transactionSuccessMessage =
    votingPowerDict.transactionSucceed ?? 'Transaction Succeed!'
  const transactionPendingMessage =
    votingPowerDict.txPending ?? 'TX is Pending, Please Wait...'

  let [loading, setLoading] = useState(true)

  const [stakingAmount, setStakingAmount] = useState('')
  const [totalSBTVotingPower, setTotalSBTVotingPower] = useState<number>(0)
  const [stakedBalance, setStakedBalance] = useState<string>('0')

  const [tokenData, setTokenData] = useState<SBTInfo[]>([])
  const [refetchTokenData, setRefetchTokenData] = useState(false)
  const { address, chainId } = useAccount()

  const {
    data: hash,
    error,
    writeContract,
    writeContractAsync,
  } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
      confirmations: 2,
    })

  const { data: pceBalance, refetch: refetchPCEBalance } = useReadContract({
    address: pceAddress[chainId || defaultChainId] as `0x${string}`,
    abi: PCE_ABI,
    functionName: 'balanceOf',
    args: [address],
  })

  const { data: wPCEBalance, refetch: refetchWPCEBalance } = useReadContract({
    address: WPCE_ADDRESS[chainId || defaultChainId] as `0x${string}`,
    abi: PCE_ABI,
    functionName: 'balanceOf',
    args: [address],
  })

  useEffect(() => {
    const fetchStakedBalance = async () => {
      if (wPCEBalance) {
        const stakedBalance = await readContract(config, {
          abi: STAKING_ABI,
          address: stakingAddress[chainId || defaultChainId] as `0x${string}`,
          functionName: '_convertToPEACECOIN',
          args: [wPCEBalance as string],
        })
        setStakedBalance(stakedBalance as string)
      } else {
        setStakedBalance('0')
      }
    }
    fetchStakedBalance()
  }, [wPCEBalance, chainId])

  const { data: rewardBalance, refetch: refetchRewardBalance } =
    useReadContract({
      address: stakingAddress[chainId || defaultChainId] as `0x${string}`,
      abi: STAKING_ABI,
      functionName: 'rewards',
      args: [address],
    })

  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    abi: PCE_ABI,
    address: pceAddress[chainId || defaultChainId] as `0x${string}`,
    functionName: 'allowance',
    args: [address, stakingAddress[chainId || defaultChainId] as `0x${string}`],
  })

  const { data: wPCEAllowance, refetch: refetchWPCEAllowance } =
    useReadContract({
      abi: PCE_ABI,
      address: WPCE_ADDRESS[chainId || defaultChainId] as `0x${string}`,
      functionName: 'allowance',
      args: [
        address,
        stakingAddress[chainId || defaultChainId] as `0x${string}`,
      ],
    })

  const { data: getTokenVote, refetch: refetchGetTokenVote } = useReadContract({
    abi: PCE_GOV_TOKEN_ABI,
    address: WPCE_ADDRESS[chainId || defaultChainId] as `0x${string}`,
    functionName: 'getVotes',
    args: [address],
  })

  useEffect(() => {
    const fetchTokenData = async () => {
      try {
        setLoading(true)
        const { data: tokens } = await supabase.from('Token').select()

        const _tokenData = tokens as SBTInfo[]

        const tokenBalances = await Promise.all(
          _tokenData.map(async (token: SBTInfo) => {
            const balance = (await readContract(config, {
              abi: SBT_ABI,
              address: token.isSBT
                ? (PCE_SBT_ADDRESS[chainId || defaultChainId] as `0x${string}`)
                : (NFTAddress[chainId || defaultChainId] as `0x${string}`),
              functionName: 'balanceOf',
              args: [address, token.tokenId],
            })) as number
            return balance
          })
        )

        _tokenData.forEach((token: SBTInfo, index: number) => {
          token.balance = tokenBalances[index]?.toString() ?? '0'
        })
        setTokenData(
          _tokenData.filter((token: SBTInfo) => Number(token.balance) > 0)
        )
      } catch (error) {
        console.error('Error fetching token data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchTokenData()
  }, [address, refetchTokenData, supabase, chainId])

  const handleStake = async () => {
    if (stakingAmount === '' || stakingAmount === '0') {
      toast({
        title:
          votingPowerDict.pleaseEnterValidAmount ??
          'Please enter a valid amount',
      })
      return
    }

    if (BigInt(pceBalance as string) < BigInt(parseEther(stakingAmount))) {
      toast({
        title: votingPowerDict.insufficientBalance ?? 'Insufficient balance',
      })
      return
    }

    if (
      (BigInt(allowance as string) as bigint) <
      BigInt(parseEther(stakingAmount))
    ) {
      let tx
      try {
        tx = await writeContractAsync({
          abi: PCE_ABI,
          address: pceAddress[chainId || defaultChainId] as `0x${string}`,
          functionName: 'approve',
          args: [
            stakingAddress[chainId || defaultChainId] as `0x${string}`,
            BigInt(maxUint256),
          ],
        })
      } catch (error) {
        console.error('Error approving tokens:', error)
        return
      }
      await waitForTransactionReceipt(config, {
        hash: tx,
        confirmations: 2,
      })

      await new Promise((resolve) => setTimeout(resolve, 1000))

      await refetchAllowance()
      await refetchWPCEAllowance()
      await refetchGetTokenVote()
      await refetchPCEBalance()
    }

    let tx
    try {
      tx = await writeContractAsync({
        abi: STAKING_ABI,
        address: stakingAddress[chainId || defaultChainId] as `0x${string}`,
        functionName: 'stake',
        args: [BigInt(parseEther(stakingAmount))],
      })

      setStakingAmount('')

      await waitForTransactionReceipt(config, {
        hash: tx,
        confirmations: 2,
      })
    } catch (error) {
      console.error('Error depositing tokens:', error)
      return
    }

    await refetchPCEBalance()
    await refetchAllowance()
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  const handleWithdraw = async () => {
    if ((wPCEBalance as string) == '0') {
      toast({ title: votingPowerDict.noStakedAmount ?? 'No staked amount' })
      return
    }

    const tx = await writeContractAsync({
      abi: STAKING_ABI,
      address: stakingAddress[chainId || defaultChainId] as `0x${string}`,
      functionName: 'withdraw',
      args: [wPCEBalance as string],
    })

    await waitForTransactionReceipt(config, {
      hash: tx,
      confirmations: 2,
    })
    await new Promise((resolve) => setTimeout(resolve, 1000))

    await refetchWPCEBalance()
    await refetchPCEBalance()
    await refetchGetTokenVote()
  }

  useEffect(() => {
    const notify = async () => {
      if (isConfirmed) {
        toast({
          title: transactionSuccessMessage,
        })

        await refetchWPCEBalance()
        await refetchPCEBalance()
        await refetchGetTokenVote()
      } else if (isConfirming) {
        toast({
          title: transactionPendingMessage,
        })
      } else if (error) {
        toast({ title: (error as BaseError).shortMessage })
      }
    }

    notify()
  }, [
    isConfirmed,
    isConfirming,
    error,
    hash,
    refetchWPCEBalance,
    refetchPCEBalance,
    refetchGetTokenVote,
    toast,
    transactionPendingMessage,
    transactionSuccessMessage,
  ])

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

  const votingPower = useMemo(() => {
    return (
      totalSBTVotingPower +
      Number(
        formatEther(
          stakedBalance && typeof stakedBalance === 'bigint'
            ? stakedBalance
            : BigInt(0)
        )
      )
    )
  }, [totalSBTVotingPower, stakedBalance])

  const handleDelegate = async () => {
    await writeContractAsync({
      abi: PCE_GOV_TOKEN_ABI,
      address: WPCE_ADDRESS[chainId || defaultChainId] as `0x${string}`,
      functionName: 'delegate',
      args: [address],
    })

    await refetchGetTokenVote()
  }

  useEffect(() => {
    const fetchSBTVotingPower = async () => {
      let _SBTPower = 0
      if (tokenData && tokenData.length > 0) {
        for (let i = 0; i < tokenData.length; i++) {
          if (tokenData[i]?.balance && tokenData[i]?.votingPower) {
            _SBTPower +=
              Number(tokenData[i]?.balance) * Number(tokenData[i]?.votingPower)
          }
        }
      }

      setTotalSBTVotingPower(_SBTPower)
    }
    fetchSBTVotingPower()
  }, [tokenData])
  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center mb-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white ml-4">
              {votingPowerDict.title ?? 'PACECOIN Staking Pool'}
            </h1>
          </div>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
            {votingPowerDict.description ??
              'Secure your future and earn rewards by staking your PACECOIN tokens in our professional staking pool.'}
          </p>
        </div>

        {/* Main Content - Mobile Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Section - Stake your SPACECOIN */}
          <div className="bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
            <div className="text-center mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-2">
                {votingPowerDict.stakeYourTokens ?? 'Stake your SPACECOIN'}
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                {votingPowerDict.stakeDescription ??
                  'Start earning by staking your tokens in the pool.'}
              </p>
            </div>

            <div className="space-y-4">
              {/* PCE Balance */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-center sm:text-left gap-1 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <span className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 w-full">
                  {votingPowerDict.pceBalance ?? 'PCE Balance'}
                </span>
                <span className="text-lg font-semibold text-blue-600 dark:text-blue-400 w-full">
                  {pceBalance
                    ? formatNumber(
                        parseFloat(formatEther(pceBalance as string))
                      )
                    : '0'}{' '}
                  PCE
                </span>
              </div>

              {/* Amount Staked */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-center sm:text-left gap-1 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <span className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 w-full">
                  {votingPowerDict.amountStaked ?? 'Amount Staked'}
                </span>
                <span className="text-lg font-semibold text-purple-600 dark:text-purple-400 w-full">
                  {wPCEBalance
                    ? formatNumber(
                        wPCEBalance
                          ? parseFloat(formatEther(stakedBalance as string))
                          : 0
                      )
                    : '0'}{' '}
                  PCE
                </span>
              </div>

              {/* Amount to Stake Input */}
              <div className="space-y-2">
                <label className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
                  {votingPowerDict.amountToStake ?? 'Amount to Stake'}
                </label>
                <Input
                  type="number"
                  min="0"
                  placeholder={votingPowerDict.enterAmount ?? 'Enter amount'}
                  value={stakingAmount}
                  onChange={(e) => setStakingAmount(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
                <Button
                  className="w-full"
                  variant="default"
                  onClick={handleStake}
                >
                  {votingPowerDict.stake ?? 'Stake'}
                </Button>
                <Button
                  className="w-full"
                  variant="default"
                  onClick={handleWithdraw}
                >
                  {votingPowerDict.withdraw ?? 'Withdraw'}
                </Button>

                <Button
                  className="w-full"
                  variant="default"
                  onClick={handleDelegate}
                >
                  {votingPowerDict.delegate ?? 'Delegate'}
                </Button>
              </div>
            </div>
          </div>

          {/* Right Section - Voting Power & Info */}
          <div className="bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
            {/* My Voting Power Section */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-3 ">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white w-full text-center">
                {votingPowerDict.myVotingPower ?? 'My Voting Power'}
              </h3>

              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-teal-600 dark:text-teal-400 mb-4">
                  {formatNumber(votingPower)}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-center sm:text-left">
                  <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300 w-full">
                    {votingPowerDict.stakedAmount ?? 'Staked Amount'}
                  </span>
                  <span className="text-sm sm:text-base font-semibold text-gray-800 dark:text-white w-full">
                    {stakedBalance
                      ? formatNumber(
                          parseFloat(formatEther(stakedBalance as string))
                        )
                      : '0'}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-center sm:text-left">
                  <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300 w-full">
                    {votingPowerDict.delegationPower ?? 'Delegation Power'}
                  </span>
                  <span className="text-sm sm:text-base font-semibold text-gray-800 dark:text-white w-full">
                    {getTokenVote
                      ? formatNumber(
                          parseFloat(formatEther(stakedBalance as string))
                        )
                      : '0'}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-center sm:text-left">
                  <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300 w-full">
                    {votingPowerDict.sbtVotingPower ?? 'SBT & NFT Voting Power'}
                  </span>
                  <span className="text-sm sm:text-base font-semibold text-gray-800 dark:text-white w-full">
                    {totalSBTVotingPower
                      ? formatNumber(totalSBTVotingPower)
                      : '0'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 my-6 text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white w-full">
                {votingPowerDict.votingPowerAndInfo ?? 'Voting Power & Info'}
              </h2>
              <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {votingPowerDict.active ?? 'Active'}
              </span>
            </div>

            {/* Voting Power Features */}
            <div className="space-y-3 my-4">
              <div className="flex items-start gap-2 text-sm sm:text-base text-gray-600 dark:text-gray-300">
                <span className="font-semibold text-gray-800 dark:text-white">
                  •
                </span>
                <p>
                  {votingPowerDict.votingPowerFeature1 ??
                    'Your total voting power is the sum of your staked amount'}
                </p>
              </div>

              <div className="flex items-start gap-2 text-sm sm:text-base text-gray-600 dark:text-gray-300">
                <span className="font-semibold text-gray-800 dark:text-white">
                  •
                </span>
                <p>
                  {votingPowerDict.votingPowerFeature2 ??
                    'Participate in governance decisions and earn more from staking rewards'}
                </p>
              </div>

              <div className="flex items-start gap-2 text-sm sm:text-base text-gray-600 dark:text-gray-300">
                <span className="font-semibold text-gray-800 dark:text-white">
                  •
                </span>
                <p>
                  {votingPowerDict.votingPowerFeature3 ??
                    "For 99% of you that don't like voting power, use it to influence rewards for other community members"}
                </p>
              </div>

              <div className="flex items-start gap-2 text-sm sm:text-base text-gray-600 dark:text-gray-300">
                <span className="font-semibold text-gray-800 dark:text-white">
                  •
                </span>
                <p>
                  {votingPowerDict.votingPowerFeature4 ??
                    'You can delegate voting power to any network participant'}
                </p>
              </div>

              <div className="flex items-start gap-2 text-sm sm:text-base text-gray-600 dark:text-gray-300">
                <span className="font-semibold text-gray-800 dark:text-white">
                  •
                </span>
                <p>
                  {votingPowerDict.votingPowerFeature5 ??
                    'You can also delegate voting power to our fund to publish governance decisions'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SBTs Table Section - Mobile Responsive */}
        <div className="mt-8 sm:mt-12">
          <div className="bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-6">
              {votingPowerDict.mySBTs ?? 'My Tokens'} ({tokenData.length})
            </h2>

            <div className="-mx-4 sm:mx-0">
              <div className="px-4 sm:px-0">
                <SBTTableComponent
                  headers={sbtTableHeaders}
                  sbtInfo={tokenData}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
