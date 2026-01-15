'use client'

import { useEffect, useState } from 'react'

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
  useBlockNumber,
} from 'wagmi'

import { getDict } from '~/i18n/get-dict'

import { PagePropsWithLocale, Dictionary } from '~/i18n/types'
import { daoStudioAddress, defaultChainId } from '~/app/constants/constants'

import { formatNumber } from '~/components/utils'
import { PCE_ABI } from '~/app/ABIs/PCEToken'

import { config } from '~/lib/config'

import { waitForTransactionReceipt } from '@wagmi/core'
import { pceAddress, WPCE_ADDRESS, PCE_DAO_ID } from '~/app/constants/constants'

import { SBT_ABI } from '~/app/ABIs/SBT'
import { PCE_C_GOV_TOKEN_ABI } from '~/app/ABIs/PCECGovToken'
import { PCE_GOV_TOKEN_ABI } from '~/app/ABIs/PCEGovToken'
import { SBTTableComponent } from '~/components/custom/sbt-tableComponent'
import { SBTInfo } from '~/components/custom/sbt-tableComponent'
import { PageHeaderSection } from '~/components/custom/page-header-section'

import { createClient } from '~/utils/supabase/client'
import { DAO_STUDIO_ABI } from '~/app/ABIs/DAOStudio'

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
  const [tokenData, setTokenData] = useState<SBTInfo[]>([])
  const [refetchTokenData, setRefetchTokenData] = useState(false)
  const [sbtAddress, setSbtAddress] = useState<string | undefined>('')
  const [nftAddress, setNftAddress] = useState<string | undefined>('')
  const [governorAddress, setGovernorAddress] = useState<string | undefined>('')
  const [getVotes, setGetVotes] = useState<bigint | undefined>(undefined)

  const { address, chainId } = useAccount()

  const { data: blockNumber } = useBlockNumber()

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

  const { data: daoConfigs, refetch: refetchDaoConfigs } = useReadContract({
    address: daoStudioAddress[chainId || defaultChainId] as `0x${string}`,
    abi: DAO_STUDIO_ABI,
    functionName: 'daoConfigs',
    args: [PCE_DAO_ID],
  }) as { data?: string; refetch: () => void }

  useEffect(() => {
    if (daoConfigs?.length == 7) {
      setGovernorAddress(daoConfigs[3])

      setSbtAddress(daoConfigs[1])
      setNftAddress(daoConfigs[2])
    }
  }, [daoConfigs])

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

  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    abi: PCE_ABI,
    address: pceAddress[chainId || defaultChainId] as `0x${string}`,
    functionName: 'allowance',
    args: [address, WPCE_ADDRESS[chainId || defaultChainId] as `0x${string}`],
  })

  const { data: wPCEAllowance, refetch: refetchWPCEAllowance } =
    useReadContract({
      abi: PCE_ABI,
      address: WPCE_ADDRESS[chainId || defaultChainId] as `0x${string}`,
      functionName: 'allowance',
      args: [address, WPCE_ADDRESS[chainId || defaultChainId] as `0x${string}`],
    })

  const { data: sbtVotingPower, refetch: refetchGetSBTVotingPower } =
    useReadContract({
      abi: SBT_ABI,
      address: sbtAddress as `0x${string}`,
      functionName: 'getPastVotes',
      args: [address, blockNumber?.toString()],
    }) as { data?: bigint; refetch: () => void }

  const { data: nftVotingPower, refetch: refetchGetNFTVotingPower } =
    useReadContract({
      abi: SBT_ABI,
      address: nftAddress as `0x${string}`,
      functionName: 'getPastVotes',
      args: [address, blockNumber?.toString()],
    }) as { data?: bigint; refetch: () => void }

  const { data: getTokenVote, refetch: refetchGetTokenVote } = useReadContract({
    abi: PCE_GOV_TOKEN_ABI,
    address: WPCE_ADDRESS[chainId || defaultChainId] as `0x${string}`,
    functionName: 'getVotes',
    args: [address],
  }) as { data?: bigint; refetch: () => void }

  useEffect(() => {
    if (getTokenVote && sbtVotingPower && nftVotingPower) {
      setGetVotes(
        BigInt(getTokenVote as unknown as string) +
          BigInt(sbtVotingPower as unknown as string) +
          BigInt(nftVotingPower as unknown as string)
      )
    }
  }, [getTokenVote, sbtVotingPower, nftVotingPower])

  useEffect(() => {
    const fetchTokenData = async () => {
      setLoading(true)
      const { data: tokens } = await supabase
        .from('Token')
        .select()
        .eq('daoId', PCE_DAO_ID)

      const _tokenData = tokens as SBTInfo[]

      const tokenBalances = await Promise.all(
        _tokenData.map(async (token: SBTInfo) => {
          let balance = 0
          try {
            balance = (await readContract(config, {
              abi: SBT_ABI,
              address: token.address as `0x${string}`,
              functionName: 'balanceOf',
              args: [address, token.tokenId],
            })) as number
            return balance ?? 0
          } catch (error) {
            console.error('Error fetching token balance:', error)
            return 0
          }
        })
      )

      _tokenData.forEach((token: SBTInfo, index: number) => {
        token.balance = tokenBalances[index] ?? 0
      })
      setTokenData(
        _tokenData.filter((token: SBTInfo) => Number(token.balance) > 0)
      )

      setLoading(false)
    }
    fetchTokenData()
  }, [address, refetchTokenData, supabase])

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
            WPCE_ADDRESS[chainId || defaultChainId] as `0x${string}`,
            BigInt(maxUint256),
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
        address: WPCE_ADDRESS[chainId || defaultChainId] as `0x${string}`,
        functionName: 'deposit',
        args: [BigInt(parseEther(stakingAmount))],
      })

      setStakingAmount('')

      await waitForTransactionReceipt(config, {
        hash: tx,
        confirmations: 1,
      })
    } catch (error) {
      console.error('Error depositing tokens:', error)
    }

    refetchPCEBalance()
    refetchAllowance()
    refetchWPCEAllowance()
    refetchWPCEBalance()
  }

  const handleWithdraw = async () => {
    if ((wPCEBalance as string) == '0') {
      toast({ title: votingPowerDict.noStakedAmount ?? 'No staked amount' })
      return
    }

    try {
      const tx = await writeContractAsync({
        abi: PCE_C_GOV_TOKEN_ABI,
        address: WPCE_ADDRESS[chainId || defaultChainId] as `0x${string}`,
        functionName: 'withdraw',
        args: [wPCEBalance as string],
      })

      await waitForTransactionReceipt(config, {
        hash: tx,
        confirmations: 1,
      })
    } catch (error) {
      console.error('Error withdrawing tokens:', error)
    }

    refetchWPCEBalance()
    refetchPCEBalance()
    refetchGetTokenVote()
  }

  useEffect(() => {
    const notify = async () => {
      if (isConfirmed) {
        toast({
          title: transactionSuccessMessage,
        })

        refetchWPCEBalance()
        refetchPCEBalance()
        refetchGetTokenVote()
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

  const handleDelegate = async () => {
    setLoading(true)
    try {
      await writeContractAsync({
        abi: PCE_GOV_TOKEN_ABI,
        address: WPCE_ADDRESS[chainId || defaultChainId] as `0x${string}`,
        functionName: 'delegate',
        args: [address],
      })

      refetchGetTokenVote()
      refetchGetSBTVotingPower()
      refetchGetNFTVotingPower()
    } catch (error) {
      console.error('Error delegating voting power:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSBTDelegate = async () => {
    setLoading(true)
    try {
      const tx = await writeContractAsync({
        abi: SBT_ABI,
        address: sbtAddress as `0x${string}`,
        functionName: 'delegate',
        args: [address],
      })

      await waitForTransactionReceipt(config, {
        hash: tx,
        confirmations: 1,
      })

      refetchGetSBTVotingPower()
    } catch (error) {
      console.error('Error delegating voting power:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleNFTTDelegate = async () => {
    setLoading(true)
    try {
      const tx = await writeContractAsync({
        abi: SBT_ABI,
        address: nftAddress as `0x${string}`,
        functionName: 'delegate',
        args: [address],
      })

      await waitForTransactionReceipt(config, {
        hash: tx,
        confirmations: 1,
      })

      refetchGetNFTVotingPower()
    } catch (error) {
      console.error('Error delegating voting power:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full mx-auto flex flex-col gap-4">
      {/* Header Section */}
      <PageHeaderSection
        title={votingPowerDict.title ?? 'PEACECOIN Staking Pool'}
        description={
          votingPowerDict.description ??
          'Secure your future and earn rewards by staking your PEACECOIN tokens in our professional staking pool.'
        }
      />

      {/* Main Content - Mobile Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
        <div className="rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
          <div className="text-center mb-6">
            <PageHeaderSection
              title={votingPowerDict.stakeYourTokens ?? 'Stake your PEACECOIN'}
              description={
                votingPowerDict.stakeDescription ??
                'Start earning by staking your tokens in the pool.'
              }
            />
          </div>

          <div className="gap-4">
            {/* PCE Balance */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-center sm:text-left gap-1 rounded-lg py-4">
              <span className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 w-full">
                {votingPowerDict.pceBalance ?? 'PCE Balance'}
              </span>
              <span className="text-lg font-semibold text-blue-600 dark:text-blue-400 w-full text-right">
                {pceBalance
                  ? formatNumber(parseFloat(formatEther(pceBalance as string)))
                  : '0'}{' '}
                PCE
              </span>
            </div>

            {/* Amount Staked */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-center sm:text-left gap-1 rounded-lg pb-4">
              <span className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 w-full">
                {votingPowerDict.amountStaked ?? 'Amount Staked'}
              </span>
              <span className="text-lg font-semibold text-purple-600 dark:text-purple-400 w-full text-right">
                {wPCEBalance
                  ? formatNumber(
                      parseFloat(formatEther(wPCEBalance as unknown as bigint))
                    )
                  : '0'}{' '}
                PCE
              </span>
            </div>

            {/* Amount to Stake Input */}
            <div className="space-y-2">
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
        <div className="rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
          {/* My Voting Power Section */}
          <div className="text-center space-y-4">
            <PageHeaderSection
              title={votingPowerDict.myVotingPower ?? 'My Voting Power'}
              description={''}
            />

            <div className="text-3xl sm:text-4xl font-bold text-teal-600 dark:text-teal-400 mb-4">
              {getVotes
                ? formatNumber(
                    Number(formatEther(getVotes as unknown as bigint))
                  )
                : '0'}
            </div>

            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-center sm:text-left">
                <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300 w-full">
                  {votingPowerDict.delegationPower ?? 'Delegation Power'}
                </span>
                <span className="text-sm sm:text-base font-semibold text-gray-800 dark:text-white w-full text-right">
                  {getTokenVote
                    ? formatNumber(
                        parseFloat(
                          formatEther(getTokenVote as unknown as bigint)
                        )
                      )
                    : '0'}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-center sm:text-left">
                <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300 w-full">
                  {votingPowerDict.sbtVotingPower ?? 'SBT & NFT Voting Power'}
                </span>
                <span className="text-sm sm:text-base font-semibold text-gray-800 dark:text-white w-full text-right">
                  {sbtVotingPower
                    ? formatNumber(
                        Number(formatEther(sbtVotingPower as unknown as bigint))
                      )
                    : '0'}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-center sm:text-left">
                <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300 w-full">
                  {votingPowerDict.nftVotingPower ?? 'NFT Voting Power'}
                </span>
                <span className="text-sm sm:text-base font-semibold text-gray-800 dark:text-white w-full text-right">
                  {nftVotingPower
                    ? formatNumber(
                        Number(formatEther(nftVotingPower as unknown as bigint))
                      )
                    : '0'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 my-6 text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white w-full">
              {votingPowerDict.votingPowerAndInfo ?? 'Voting Power & Info'}
            </h2>
            <span className="text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
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
        <div className="rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700 flex flex-col gap-4">
          <PageHeaderSection
            title={
              (votingPowerDict.mySBTs ?? 'My Tokens') +
              ` (${tokenData.length ?? 0})`
            }
          />

          <div className="flex flex-row gap-4 ml-auto">
            <Button onClick={handleSBTDelegate} className="w-60">
              {votingPowerDict.delegateSBTVotingPower ??
                'Delegate SBT Voting Power'}
            </Button>

            <Button onClick={handleNFTTDelegate} className="w-60">
              {votingPowerDict.delegateNFTVotingPower ??
                'Delegate NFT Voting Power'}
            </Button>
          </div>

          <div className="-mx-4 sm:mx-0">
            <div className="px-4 sm:px-0">
              <SBTTableComponent sbtInfo={tokenData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
