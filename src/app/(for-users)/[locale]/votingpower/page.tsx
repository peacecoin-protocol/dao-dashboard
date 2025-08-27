'use client'

import Image from 'next/image'

import { useEffect, useMemo, useState } from 'react'

import { Button } from '~/components/custom/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
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

import { PagePropsWithLocale, Dictionary, Metadata } from '~/i18n/types'
import { defaultChainId } from '~/app/constants/constants'

import { formatNumber, formatString } from '~/components/utils'
import { PCE_ABI } from '~/app/ABIs/PCEToken'

import { config } from '~/lib/config'

import { waitForTransactionReceipt } from '@wagmi/core'
import { useBlock } from 'wagmi'
import {
  PCE_SBT_ADDRESS,
  pceAddress,
  stakingAddress,
  WPCE_ADDRESS,
} from '~/app/constants/constants'

import { STAKING_ABI } from '~/app/ABIs/Staking'
import { SBT_ABI } from '~/app/ABIs/SBT'
import axios from 'axios'
import { PCE_GOV_TOKEN_ABI } from '~/app/ABIs/PCEGovToken'

export default function StakingPage({
  params: { locale },
}: PagePropsWithLocale<{}>) {
  const [dict, setDict] = useState<Dictionary | null>(null)
  const { toast } = useToast()
  const votingPowerDict = dict?.votingPower ?? {}

  const { data: blockNumber } = useBlockNumber()
  const { data: block } = useBlock({
    blockNumber,
  })
  let [loading, setLoading] = useState(true)

  const [stakingAmount, setStakingAmount] = useState('')
  const [nftBalances, setNftBalances] = useState<number[]>([])
  const [nftMetadata, setNftMetadata] = useState<Metadata[]>([])
  const [sbtVotingPower, setSBTVotingPower] = useState<number[]>([])
  const [totalSBTVotingPower, setTotalSBTVotingPower] = useState<number>(0)
  const [stakedBalance, setStakedBalance] = useState<string>('0')

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
      confirmations: 1,
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
  }, [wPCEBalance])

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

  const { data: currentTokenId, refetch: refetchCurrentTokenId } =
    useReadContract({
      address: PCE_SBT_ADDRESS[chainId || defaultChainId] as `0x${string}`,
      abi: SBT_ABI,
      functionName: 'currentTokenId',
    })

  const { data: uri_, refetch: refetchUri } = useReadContract({
    abi: SBT_ABI,
    address: PCE_SBT_ADDRESS[chainId || defaultChainId] as `0x${string}`,
    functionName: 'uri_',
    args: [],
  })

  const { data: getTokenVote, refetch: refetchGetTokenVote } = useReadContract({
    abi: PCE_GOV_TOKEN_ABI,
    address: WPCE_ADDRESS[chainId || defaultChainId] as `0x${string}`,
    functionName: 'getVotes',
    args: [address],
  })

  useEffect(() => {
    const fetchNFTBalances = async () => {
      if (!chainId) {
        return
      }
      if (currentTokenId && Number(currentTokenId) > 0) {
        toast({
          title: votingPowerDict.loadingSBTNFTs ?? 'Loading SBT NFTs...',
        })

        let _nftBalances: number[] = []
        for (let i = 1; i <= (currentTokenId as number); i++) {
          const _balance = (await readContract(config, {
            abi: SBT_ABI,
            address: PCE_SBT_ADDRESS[
              chainId || defaultChainId
            ] as `0x${string}`,
            functionName: 'balanceOf',
            args: [address, i],
          })) as number

          _nftBalances.push(_balance)
        }
        setNftBalances(_nftBalances)
      }
    }

    fetchNFTBalances()
    refetchGetTokenVote()
  }, [chainId, currentTokenId, isConfirmed])

  useEffect(() => {
    const fetchVotingPower = async () => {
      if (!chainId) {
        return
      }
      if (currentTokenId && Number(currentTokenId) > 0) {
        toast({
          title:
            votingPowerDict.loadingVotingPower ?? 'Loading Voting Power...',
        })

        let _votingSBTPower: number[] = []
        for (let i = 1; i <= (currentTokenId as number); i++) {
          const _balance = (await readContract(config, {
            abi: SBT_ABI,
            address: PCE_SBT_ADDRESS[
              chainId || defaultChainId
            ] as `0x${string}`,
            functionName: 'votingPowerPerId',
            args: [i],
          })) as number

          _votingSBTPower.push(_balance)
        }
        setSBTVotingPower(_votingSBTPower)
      }
    }

    fetchVotingPower()
  }, [chainId, currentTokenId, isConfirmed])

  useEffect(() => {
    if (nftBalances.length > 0 && sbtVotingPower.length > 0) {
      let _SBTPower = 0
      for (let i = 0; i < nftBalances.length; i++) {
        _SBTPower += Number(nftBalances?.[i]) * Number(sbtVotingPower?.[i])
      }
      setTotalSBTVotingPower(_SBTPower)
    }
  }, [nftBalances, sbtVotingPower])

  useEffect(() => {
    const fetchNFTMetadata = async () => {
      if (currentTokenId && Number(currentTokenId) > 0) {
        toast({
          title: votingPowerDict.loadingMetadata ?? 'Loading Metadata...',
        })

        const _nftMetadata: Metadata[] = []
        for (let i = 1; i <= (currentTokenId as number); i++) {
          try {
            const _uri = await readContract(config, {
              abi: SBT_ABI,
              address: PCE_SBT_ADDRESS[
                chainId || defaultChainId
              ] as `0x${string}`,
              functionName: 'tokenURIs',
              args: [i],
            })

            const response = await axios.get(`/api/get-nft-metadata`, {
              params: {
                metadata: uri_ + (_uri as string),
              },
            })
            const data = response.data
            data.token_id = i
            _nftMetadata.push(data)
          } catch (error) {
            console.error('Error fetching NFT metadata:', error)
            const metadata: Metadata = {
              image: '/images/empty-nft.svg',
              name: '',
              description: '',
              attributes: [],
              external_url: '',
              token_id: 0,
            }
            _nftMetadata.push(metadata)
          }
        }
        setNftMetadata(_nftMetadata)
      }
    }

    fetchNFTMetadata()
  }, [uri_, currentTokenId, chainId])

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
        confirmations: 1,
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
        confirmations: 1,
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
      confirmations: 1,
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
          title: votingPowerDict.transactionSucceed ?? 'Transaction Succeed!',
        })

        await refetchWPCEBalance()
        await refetchPCEBalance()
      } else if (isConfirming) {
        toast({
          title: votingPowerDict.txPending ?? 'TX is Pending, Please Wait...',
        })
      } else if (error) {
        toast({ title: (error as BaseError).shortMessage })
      }
    }

    notify()
  }, [
    isConfirmed,
    error,
    hash,
    refetchWPCEBalance,
    refetchPCEBalance,
    refetchGetTokenVote,
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
              <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <span className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
                  {votingPowerDict.pceBalance ?? 'PCE Balance'}
                </span>
                <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                  {pceBalance
                    ? formatNumber(
                        parseFloat(formatEther(pceBalance as string))
                      )
                    : '0'}{' '}
                  PCE
                </span>
              </div>

              {/* Amount Staked */}
              <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <span className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300">
                  {votingPowerDict.amountStaked ?? 'Amount Staked'}
                </span>
                <span className="text-lg font-semibold text-purple-600 dark:text-purple-400">
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
              <div className="grid grid-cols-3 gap-4 pt-4">
                <Button variant="default" onClick={handleStake}>
                  {votingPowerDict.stake ?? 'Stake'}
                </Button>
                <Button variant="default" onClick={handleWithdraw}>
                  {votingPowerDict.withdraw ?? 'Withdraw'}
                </Button>

                <Button variant="default" onClick={handleDelegate}>
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
                <div className="flex justify-between items-center">
                  <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                    {votingPowerDict.stakedAmount ?? 'Staked Amount'}
                  </span>
                  <span className="text-sm sm:text-base font-semibold text-gray-800 dark:text-white">
                    {stakedBalance
                      ? formatNumber(
                          parseFloat(formatEther(stakedBalance as string))
                        )
                      : '0'}{' '}
                    PCE
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                    {votingPowerDict.delegationPower ?? 'Delegation Power'}
                  </span>
                  <span className="text-sm sm:text-base font-semibold text-gray-800 dark:text-white">
                    {getTokenVote
                      ? formatNumber(
                          parseFloat(formatEther(stakedBalance as string))
                        )
                      : '0'}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                    {votingPowerDict.sbtVotingPower ?? 'SBT Voting Power'}
                  </span>
                  <span className="text-sm sm:text-base font-semibold text-gray-800 dark:text-white">
                    {totalSBTVotingPower
                      ? formatNumber(totalSBTVotingPower)
                      : '0'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 my-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
                {votingPowerDict.votingPowerAndInfo ?? 'Voting Power & Info'}
              </h2>
              <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {votingPowerDict.active ?? 'Active'}
              </span>
            </div>

            {/* Voting Power Features */}
            <div className="space-y-3 my-4">
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                -{' '}
                {votingPowerDict.votingPowerFeature1 ??
                  'Your total voting power is the sum of your staked amount'}
              </p>

              <div className="flex items-start space-x-3">
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                  -{' '}
                  {votingPowerDict.votingPowerFeature2 ??
                    'Participate in governance decisions and earn more from staking rewards'}
                </p>
              </div>

              <div className="flex items-start space-x-3">
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                  -{' '}
                  {votingPowerDict.votingPowerFeature3 ??
                    "For 99% of you that don't like voting power, use it to influence rewards for other community members"}
                </p>
              </div>

              <div className="flex items-start space-x-3">
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                  -{' '}
                  {votingPowerDict.votingPowerFeature4 ??
                    'You can delegate voting power to any network participant'}
                </p>
              </div>

              <div className="flex items-start space-x-3">
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                  -{' '}
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
              {votingPowerDict.mySBTs ?? 'My SBTs'} ({nftBalances.length}{' '}
              {votingPowerDict.nfts ?? 'NFTs'})
            </h2>

            {/* Mobile Card View */}
            <div className="lg:hidden space-y-4">
              {nftBalances.map((balance, index) =>
                balance > 0 ? (
                  <div
                    key={index}
                    className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        {votingPowerDict.id ?? 'ID'}
                      </span>
                      <span className="text-sm font-semibold text-gray-800 dark:text-white">
                        {index + 1}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        {votingPowerDict.image ?? 'Image'}
                      </span>
                      <Image
                        src={
                          !nftMetadata || nftMetadata.length === 0
                            ? '/images/empty-nft.svg'
                            : nftMetadata[index]?.image ||
                              '/images/empty-nft.svg'
                        }
                        alt={`NFT #${index}`}
                        className="rounded-lg object-cover"
                        width={60}
                        height={60}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        {votingPowerDict.amount ?? 'Amount'}
                      </span>
                      <span className="text-sm font-semibold text-gray-800 dark:text-white">
                        {formatString(balance.toString())}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        {votingPowerDict.votingPower ?? 'Voting Power'}
                      </span>
                      <span className="text-sm font-semibold text-gray-800 dark:text-white">
                        {sbtVotingPower[index]
                          ? formatString(sbtVotingPower[index].toString())
                          : '0'}
                      </span>
                    </div>
                  </div>
                ) : null
              )}
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block">
              <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 dark:bg-gray-800">
                      <TableHead className="font-bold text-gray-800 dark:text-white">
                        {votingPowerDict.id ?? 'ID'}
                      </TableHead>
                      <TableHead className="font-bold text-gray-800 dark:text-white">
                        {votingPowerDict.image ?? 'Image'}
                      </TableHead>
                      <TableHead className="font-bold text-gray-800 dark:text-white">
                        {votingPowerDict.amount ?? 'Amount'}
                      </TableHead>
                      <TableHead className="font-bold text-gray-800 dark:text-white">
                        {votingPowerDict.votingPower ?? 'Voting Power'}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {nftBalances.map((balance, index) =>
                      balance > 0 ? (
                        <TableRow
                          key={index}
                          className="hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          <TableCell className="font-semibold text-gray-800 dark:text-white">
                            {index + 1}
                          </TableCell>
                          <TableCell>
                            <Image
                              src={
                                !nftMetadata || nftMetadata.length === 0
                                  ? '/images/empty-nft.svg'
                                  : nftMetadata[index]?.image ||
                                    '/images/empty-nft.svg'
                              }
                              alt={`NFT #${index}`}
                              className="rounded-lg object-cover"
                              width={80}
                              height={80}
                            />
                          </TableCell>
                          <TableCell className="font-semibold text-gray-800 dark:text-white">
                            {formatString(balance.toString())}
                          </TableCell>
                          <TableCell className="font-semibold text-gray-800 dark:text-white">
                            {sbtVotingPower[index]
                              ? formatString(sbtVotingPower[index].toString())
                              : '0'}
                          </TableCell>
                        </TableRow>
                      ) : null
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
