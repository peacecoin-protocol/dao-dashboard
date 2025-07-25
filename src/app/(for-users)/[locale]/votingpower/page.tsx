'use client'

import { useEffect, useMemo, useState } from 'react'

import { useNavigate } from 'react-router-dom'

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
import { useToast } from '~/components/ui/use-toast'
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
  const navigate = useNavigate()
  const [dict, setDict] = useState<Dictionary | null>(null)
  const { toast } = useToast()
  const localDict = dict?.daoInfo ?? {}

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
        toast({ title: 'Loading SBT NFTs...' })

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
        toast({ title: 'Loading Voting Power...' })

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
        toast({ title: 'Loading Metadata...' })

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
      toast({ title: 'Please enter a valid amount' })
      return
    }

    if (BigInt(pceBalance as string) < BigInt(parseEther(stakingAmount))) {
      toast({ title: 'Insufficient balance' })
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
      toast({ title: 'No staked amount' })
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
          title: 'Transaction Succeed!',
        })

        await refetchWPCEBalance()
        await refetchPCEBalance()
      } else if (isConfirming) {
        toast({ title: 'TX is Pending, Please Wait...' })
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
    <div className="items-center justify-center flex flex-col mx-2 sm:mx-10 gap-4">
      <div className="w-full flex justify-center mt-8">
        <div className="flex flex-col items-center bg-white/90 dark:bg-zinc-900/90 rounded-2xl shadow-lg px-8 py-6 max-w-2xl w-full border border-zinc-200 dark:border-zinc-800">
          <img
            src="/pce_logo.jpg"
            alt="PeaceCoin Logo"
            className="w-28 h-28 rounded-full mb-4"
          />
          <h1 className="text-4xl font-extrabold text-center text-zinc-800 dark:text-zinc-100 mb-2 tracking-tight">
            $PEACECOIN Staking Pool
          </h1>
          <p className="text-lg text-center text-zinc-500 dark:text-zinc-400 max-w-xl">
            Secure your future and earn rewards by staking your $PEACECOIN
            tokens in our professional staking pool.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row w-full gap-8 mt-8">
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="bg-white/80 dark:bg-zinc-900/80 rounded-2xl shadow-xl p-10 w-full max-w-lg flex flex-col gap-8 border border-zinc-200 dark:border-zinc-800">
            <div className="flex flex-col items-center gap-3">
              <span className="text-3xl font-semibold text-zinc-800 dark:text-zinc-100">
                Stake your $PEACECOIN
              </span>
              <span className="text-base text-zinc-500 dark:text-zinc-400">
                Earn rewards by staking your tokens in the pool.
              </span>
            </div>
            <div className="flex flex-col gap-5 mt-4">
              <div className="flex flex-row justify-between items-center bg-zinc-100 dark:bg-zinc-800 rounded-lg px-6 py-4">
                <span className="text-base font-medium text-zinc-700 dark:text-zinc-300">
                  PCE Balance
                </span>
                <span className="text-lg font-semibold text-blue-600 dark:text-blue-300">
                  {pceBalance
                    ? formatNumber(
                        parseFloat(formatEther(pceBalance as string))
                      )
                    : '0'}{' '}
                  PCE
                </span>
              </div>
              <div className="flex flex-row justify-between items-center bg-zinc-100 dark:bg-zinc-800 rounded-lg px-6 py-4">
                <span className="text-base font-medium text-zinc-700 dark:text-zinc-300">
                  Amount Staked
                </span>
                <span className="text-lg font-semibold text-purple-600 dark:text-purple-300">
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
              <div className="flex flex-col gap-2 mt-2">
                <label
                  className="text-base font-medium text-zinc-700 dark:text-zinc-300"
                  htmlFor="staking-amount"
                >
                  Amount to Stake
                </label>
                <Input
                  id="staking-amount"
                  type="number"
                  min="0"
                  placeholder="Enter amount"
                  value={stakingAmount}
                  onChange={(e) => setStakingAmount(e.target.value)}
                  className="text-lg px-5 py-4 rounded-lg border border-zinc-300 dark:border-zinc-700 focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>
            <div className="flex flex-row gap-6 mt-6">
              <Button
                variant="default"
                onClick={handleStake}
                type="button"
                className="w-full"
              >
                Stake
              </Button>
              <Button
                variant="default"
                onClick={handleWithdraw}
                type="button"
                className="w-full"
              >
                Withdraw
              </Button>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center gap-8">
          <div className="w-full max-w-lg bg-white/80 dark:bg-zinc-900/80 rounded-2xl shadow-xl p-10 border border-zinc-200 dark:border-zinc-800 flex flex-col gap-6">
            <span className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-2">
              Voting Power & Info
            </span>
            <span className="text-base text-zinc-500 dark:text-zinc-400">
              {/* You can display more information here, such as: */}
              <ul className="list-disc pl-5">
                <li>
                  Your total voting power is the sum of your staked amount and
                  the total voting power of the SBTs you hold.
                </li>
                <li>
                  For SBTs: If you hold SBTs, their voting power will be
                  included in your total voting power.
                </li>
                <li>
                  For staked amounts: You must delegate your staked tokens to
                  receive voting power. Please stake and delegate to maximize
                  your voting influence.
                </li>
                <li>
                  You may delegate voting power to yourself or to another
                  address, allowing for flexible participation in governance.
                </li>
              </ul>
            </span>
            {/* Add more stats, charts, or links as needed */}
          </div>

          <div className="w-full max-w-lg bg-white/80 dark:bg-zinc-900/80 rounded-2xl shadow-xl p-10 border border-zinc-200 dark:border-zinc-800 flex flex-col gap-6">
            <span className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-2">
              My Voting Power - {formatNumber(votingPower)}
            </span>
            <span className="text-base text-zinc-500 dark:text-zinc-400">
              {/* You can display more information here, such as: */}
              <ul className="list-disc pl-5">
                <li>
                  Staked Amount:{' '}
                  {stakedBalance
                    ? formatNumber(
                        parseFloat(formatEther(stakedBalance as string))
                      )
                    : '0'}{' '}
                  PCE
                </li>
                <li>SBT Power: {totalSBTVotingPower}</li>
                <li>
                  Delegated Power:{' '}
                  {getTokenVote
                    ? formatNumber(
                        parseFloat(formatEther(stakedBalance as string))
                      )
                    : '0'}{' '}
                  PCE
                </li>
              </ul>
            </span>
          </div>

          <div className="flex flex-row gap-4 mt-2 w-full max-w-lg ">
            <Button
              variant="default"
              className="w-full"
              onClick={handleDelegate}
            >
              Delegate
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-row mt-4 gap-4 w-full p-10">
        <div className="flex flex-col w-full gap-4">
          <div className="flex flex-col sm:flex-row w-full gap-4 items-center justify-between">
            <div className="flex flex-col gap-4">
              <h1 className="flex flex-row text-2xl font-bold gap-4">
                My SBTs - ({nftBalances.length} NFTs)
              </h1>
            </div>
          </div>

          <div className="rounded-xl flex border mt-4 flex-row w-full gap-4">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="font-bold">
                    {localDict.id ?? 'Id'}
                  </TableHead>
                  <TableHead className="font-bold">
                    {localDict.image ?? 'Image'}
                  </TableHead>
                  <TableHead className="font-bold">
                    {localDict.amount ?? 'Amount'}
                  </TableHead>
                  <TableHead className="font-bold">
                    {localDict.votingPower ?? 'Voting Power'}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {nftBalances.map((balance, index) => (
                  <TableRow key={index}>
                    {/* Id */}
                    <TableCell>
                      <div className="flex flex-row gap-2 items-center">
                        <h1 className="text-md text-dark_blue font-bold">
                          {index + 1}
                        </h1>
                      </div>
                    </TableCell>
                    {/* Image */}
                    <TableCell>
                      <img
                        src={
                          !nftMetadata || nftMetadata.length === 0
                            ? '/images/empty-nft.svg'
                            : nftMetadata[index]?.image ||
                              '/images/empty-nft.svg'
                        }
                        alt={`NFT #${index}`}
                        className="rounded-lg h-[140px] w-[100px] object-fill"
                        width={100}
                        height={140}
                      />
                    </TableCell>
                    <TableCell className="font-bold font-md text-dark_blue">
                      {balance ? formatString(balance.toString()) : '0'}
                    </TableCell>
                    <TableCell className="font-bold font-md text-dark_blue">
                      {sbtVotingPower[index]
                        ? formatString(sbtVotingPower[index].toString())
                        : '0'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}
