'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import * as CustomLink from '~/components/custom/Link'

import { useRouter } from 'next/navigation'
import { Alchemy, Network } from 'alchemy-sdk'

import RingLoader from 'react-spinners/RingLoader'
import { ringStyle } from '~/app/constants/styles'

import { Tabs, TabsList, TabsTrigger, TabsContent } from '~/components/ui/tabs'
import { Button } from '~/components/ui/button'
import { Checkbox } from '~/components/ui/checkbox'
import { Plus, X, ChevronsUpDown } from 'lucide-react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import { Input } from '~/components/ui/input'
import { DateTimePicker } from '~/components/ui/date-time-picker'
import {
  readContract,
  waitForTransactionReceipt,
  simulateContract,
} from '@wagmi/core'

import { ethers, formatEther, parseEther } from 'ethers'

import { useToast } from '~/hooks/use-toast'
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  type BaseError,
  useBlockNumber,
} from 'wagmi'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover'
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '~/components/ui/command'

import { getDict } from '~/i18n/get-dict'

import { PagePropsWithLocale, Dictionary } from '~/i18n/types'

import { formatString, shortenAddress } from '~/components/utils'
import { PCE_ABI } from '~/app/ABIs/PCEToken'
import { GOVERNOR_ABI } from '~/app/ABIs/Governor'
import { Textarea } from '~/components/ui/textarea'
import { config } from '~/lib/config'
import { TIMELOCK_ABI } from '~/app/ABIs/Timelock'
import { TooltipComponent } from '~/components/custom/TooltipComponent'
import {
  defaultChainId,
  MultipleVotingAddress,
} from '~/app/constants/constants'
import { useBlock } from 'wagmi'
import {
  pceAddress,
  timelockAddress,
  daoStudioAddress,
  WPCE_ADDRESS,
  PCE_DAO_ID,
} from '~/app/constants/constants'

import { createdAt } from '~/app/constants/constants'
import { Env } from '~/env'
import Image from 'next/image'
import { PageHeaderSection } from '~/components/custom/page-header-section'
import { InfoCell } from '~/components/custom/info-cell'
import { MULTIPLE_VOTINGS_ABI } from '~/app/ABIs/MultipleVotings'
import { createClient } from '~/utils/supabase/client'
import { DAO_STUDIO_ABI } from '~/app/ABIs/DAOStudio'

type TokenBalance = {
  contractAddress: string
  tokenBalance: number
  name: string
  symbol: string
  decimals: number
  logo: string
}

export default function PCEPage({
  params: { locale },
}: PagePropsWithLocale<{}>) {
  const router = useRouter()
  const [dict, setDict] = useState<Dictionary | null>(null)

  const localDict = dict?.daoInfo ?? {}

  const { data: blockNumber } = useBlockNumber()
  const { data: block } = useBlock({
    blockNumber,
  })

  const [delegateAddr, setDelegateAddr] = useState('')
  const [description, setDescription] = useState('')
  const [transferAmount, setTransferAmount] = useState('')
  const [tokenAddress, setTokenAddress] = useState('')

  const [values, setValues] = useState('')
  const [bytescode, setBytesCodes] = useState('')
  const [variable1, setVariable1] = useState('')
  const [variable2, setVariable2] = useState('')
  const [variable3, setVariable3] = useState('')

  const [multipleOptions, setMultipleOptions] = useState<any[]>([])
  const [proposals, setProposals] = useState<any[]>([])

  const [filteredProposals, setFilteredProposals] = useState<any[]>([])
  let [loading, setLoading] = useState(false)

  const [category, setCategory] = useState('')

  const [isDepositDialogOpened, setIsDepositDialogOpened] = useState(false)
  const [isCreateProposalDialogOpened, setIsCreateProposalDialogOpened] =
    useState(false)
  const [isRefetching, setIsRefetching] = useState(false)

  const [governorAddress, setGovernorAddress] = useState<string | undefined>('')

  const supabase = createClient()

  // Options state for category 7
  const [options, setOptions] = useState<string[]>(['', ''])

  // Time state for category 7
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')

  const [tabContent, setTabContent] = useState('about')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isStatusFilterOpen, setIsStatusFilterOpen] = useState(false)

  const [treasuryBalances, setTreasuryBalances] = useState<TokenBalance[]>([])

  // Social editing state variables
  const [isEditingSocials, setIsEditingSocials] = useState(false)
  const [isUpdatingSocials, setIsUpdatingSocials] = useState(false)
  const [socials, setSocials] = useState({
    website: '',
    linkedin: '',
    twitter: '',
    telegram: '',
  })

  const [editingSocials, setEditingSocials] = useState(socials)

  const { address, chainId } = useAccount()
  const { toast } = useToast()

  const alchemyConfig = {
    apiKey: Env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    network: Network.ETH_SEPOLIA,
  }

  const alchemy = new Alchemy(alchemyConfig)

  const getTokenMetadata = async (address: string) => {
    const metadata = await alchemy.core.getTokenMetadata(address)
    return metadata
  }

  const getTreasuryBalances = async (address: `0x${string}`) => {
    const balances = (await alchemy.core.getTokenBalances(address))
      .tokenBalances

    const formatedBalances = (await Promise.all(
      balances.map(async (balance) => ({
        tokenBalance: Number(balance.tokenBalance),
        contractAddress: balance.contractAddress,
        ...(await getTokenMetadata(balance.contractAddress)),
      }))
    )) as TokenBalance[]

    setTreasuryBalances(formatedBalances)
  }
  const { data: daoConfigs, refetch: refetchDaoConfigs } = useReadContract({
    address: daoStudioAddress[chainId || defaultChainId] as `0x${string}`,
    abi: DAO_STUDIO_ABI,
    functionName: 'daoConfigs',
    args: [PCE_DAO_ID],
  }) as { data?: string; refetch: () => void }

  useEffect(() => {
    if (daoConfigs?.length == 7) {
      setGovernorAddress(daoConfigs[3])
    }
  }, [daoConfigs])

  useEffect(() => {
    if (timelockAddress[chainId || defaultChainId]) {
      getTreasuryBalances(
        timelockAddress[chainId || defaultChainId] as `0x${string}`
      )
    }
  }, [timelockAddress])

  const {
    data: hash,
    error,
    writeContract,
    writeContractAsync: writeContractAsync,
  } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
      confirmations: 1,
    })

  const { data: quorum, refetch: refetchQuorum } = useReadContract({
    address: governorAddress as `0x${string}`,
    abi: GOVERNOR_ABI,
    functionName: 'quorumVotes',
  })

  const { data: votingDelay, refetch: refetchVotingDelay } = useReadContract({
    address: governorAddress as `0x${string}`,
    abi: GOVERNOR_ABI,
    functionName: 'votingDelay',
  })

  const { data: multipleVotingPeriod, refetch: refetchMultipleVotingPeriod } =
    useReadContract({
      address: MultipleVotingAddress[
        chainId || defaultChainId
      ] as `0x${string}`,
      abi: MULTIPLE_VOTINGS_ABI,
      functionName: 'votingPeriod',
    })

  const { data: multipleVotingDelay, refetch: refetchMultipleVotingDelay } =
    useReadContract({
      address: MultipleVotingAddress[
        chainId || defaultChainId
      ] as `0x${string}`,
      abi: MULTIPLE_VOTINGS_ABI,
      functionName: 'votingDelay',
    })

  const { data: multipleVotingQuorum, refetch: refetchMultipleVotingQuorum } =
    useReadContract({
      address: MultipleVotingAddress[
        chainId || defaultChainId
      ] as `0x${string}`,
      abi: MULTIPLE_VOTINGS_ABI,
      functionName: 'quorumVotes',
    })

  const { data: pceBalance, refetch: refetchPCEBalance } = useReadContract({
    address: pceAddress[chainId || defaultChainId] as `0x${string}`,
    abi: PCE_ABI,
    functionName: 'balanceOf',
    args: [address],
  })

  const { data: proposalThreshold, refetch: refetchProposalThreshold } =
    useReadContract({
      address: governorAddress as `0x${string}`,
      abi: GOVERNOR_ABI,
      functionName: 'proposalThreshold',
    })

  const { data: votingPeriod, refetch: refetchVotingPeriod } = useReadContract({
    address: governorAddress as `0x${string}`,
    abi: GOVERNOR_ABI,
    functionName: 'votingPeriod',
  })

  const { data: socialConfig, refetch: refetchSocialConfig } = useReadContract({
    address: governorAddress as `0x${string}`,
    abi: GOVERNOR_ABI,
    functionName: 'socialConfig',
  })

  useEffect(() => {
    if (
      socialConfig &&
      Array.isArray(socialConfig) &&
      socialConfig.length > 0
    ) {
      setSocials({
        website: socialConfig[1] as string,
        linkedin: socialConfig[2] as string,
        twitter: socialConfig[3] as string,
        telegram: socialConfig[4] as string,
      })
    }
  }, [socialConfig])

  const { data: getVotes, refetch: refetchGetVotes } = useReadContract({
    address: governorAddress as `0x${string}`,
    abi: GOVERNOR_ABI,
    functionName: 'getVotes',
    args: [address],
  }) as { data?: bigint; refetch: () => void }

  const { data: timelockDelay, refetch: refetchTimelockDelay } =
    useReadContract({
      address: timelockAddress[chainId || defaultChainId] as `0x${string}`,
      abi: TIMELOCK_ABI,
      functionName: 'delay',
    })

  const OptionsCard = ({
    multipleOptionProposalData,
  }: {
    multipleOptionProposalData: any
  }) => {
    const [selectedOption, setSelectedOption] = useState<number | null>(null)
    let start = multipleOptionProposalData?.start ?? 0
    let end = multipleOptionProposalData?.end ?? 0
    let options = multipleOptionProposalData?.options ?? []
    let optionVotes = multipleOptionProposalData?.optionVotes ?? []
    let description = multipleOptionProposalData?.description ?? ''
    let status = multipleOptionProposalData?.status ?? ''
    let hasVoted = multipleOptionProposalData?.hasVoted ?? false
    // Use the blockNumber from wagmi's useBlockNumber hook (already in the parent component)

    // Calculate total votes from optionVotes (handle BigInt values)
    const totalVotes = optionVotes.reduce((acc: bigint, curr: any) => {
      const currValue =
        typeof curr === 'bigint' ? curr : BigInt(String(curr || 0))
      return acc + currValue
    }, BigInt(0))

    // Calculate percentages for all options
    const optionPercentages = options.map((option: string, index: number) => {
      const optionValue = optionVotes[index] || BigInt(0)
      const value =
        typeof optionValue === 'bigint'
          ? optionValue
          : BigInt(String(optionValue || 0))
      return totalVotes > 0 ? (Number(value) / Number(totalVotes)) * 100 : 0
    })

    // Find max percentage for color coding
    const maxPercentage = Math.max(...optionPercentages)

    // Determine colors: green for highest, orange for middle, red for lowest
    const getColor = (percentage: number) => {
      if (percentage === maxPercentage && maxPercentage > 0) {
        return 'bg-green-500'
      } else if (percentage > 0) {
        // Check if it's the second highest
        const sorted = [...optionPercentages].sort((a, b) => b - a)
        if (percentage === sorted[1] && sorted[1] > 0) {
          return 'bg-orange-500'
        }
        return 'bg-red-500'
      }
      return 'bg-gray-300'
    }

    // Await reading the contract to get proposal info for the given pID
    // This should run on component mount/update with pID, so useEffect is appropriate.

    return (
      <article className="flex flex-col bg-blue-50 p-6 rounded-xl gap-4 shadow-sm">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center justify-between w-full">
            <h1 className="text-xl font-bold text-gray-800 flex-1">
              {description || 'Description'}
            </h1>
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full
      ${status === 'Active'
                  ? 'bg-green-200 text-green-900'
                  : status === 'Pending'
                    ? 'bg-yellow-200 text-yellow-900'
                    : status === 'Ended'
                      ? 'bg-gray-300 text-gray-700'
                      : 'bg-gray-200 text-gray-800'
                }`}
              style={{ minWidth: 73, textAlign: 'center' }}
            >
              {status}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {/* Display options with checkboxes and progress bars */}
          {options.map((option: string, index: number) => {
            const optionValue = optionVotes[index] || BigInt(0)
            const value =
              typeof optionValue === 'bigint'
                ? optionValue
                : BigInt(String(optionValue || 0))
            const percentage = optionPercentages[index] || 0
            const percentageStr = percentage.toFixed(2)

            return (
              <div key={index} className="flex flex-col gap-2">
                <div className="flex flex-row items-center gap-3">
                  <Checkbox
                    checked={selectedOption === index}
                    onCheckedChange={() => setSelectedOption(index)}
                    className="h-5 w-5"
                    disabled={status !== 'Active' || hasVoted}
                  />
                  <span className="flex-1 text-gray-700 whitespace-pre-line break-words">
                    {option}
                  </span>
                  <span className="text-gray-700 font-medium">
                    {formatString(formatEther(value))}: {`(${percentageStr}%) `}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full transition-all ${getColor(percentage)}`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
        {/* Submit Button */}
        <Button
          className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 rounded-lg"
          disabled={status !== 'Active' || selectedOption === null}
          onClick={async () => {
            if (selectedOption !== null) {
              setLoading(true)
              try {
                const tx = await writeContractAsync({
                  abi: MULTIPLE_VOTINGS_ABI,
                  address: MultipleVotingAddress[
                    chainId || defaultChainId
                  ] as `0x${string}`,
                  functionName: 'castMultipleChoiceVote',
                  args: [multipleOptionProposalData.pID, selectedOption],
                })

                await waitForTransactionReceipt(config, {
                  hash: tx,
                  confirmations: 1,
                })

                setIsRefetching(!isRefetching)
                setSelectedOption(null)
              } catch (error) {
                console.error('Error voting:', error)
              } finally {
                setLoading(false)
                setSelectedOption(null)
              }
            }
          }}
          style={{
            display: hasVoted || status !== 'Active' ? 'none' : undefined,
          }}
        >
          Submit
        </Button>
        {status === 'Ended' && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">
              {localDict?.resultsTitle ?? 'Voting Results'}
            </h3>
            <ul className="space-y-2">
              {multipleOptionProposalData.options &&
                (() => {
                  // value may be under multipleOptionProposalData.values or multipleOptionProposalData.optionValues based on how it's structured
                  let valuesArr: number[] = []
                  if (Array.isArray(multipleOptionProposalData.optionVotes)) {
                    valuesArr = multipleOptionProposalData.optionVotes.map(
                      (v: any) => Number(v)
                    )
                  }

                  let total = valuesArr.reduce((acc, curr) => acc + curr, 0)
                  // Find max indices (so we can highlight/wrap the "most chosen")
                  const maxValue = Math.max(...valuesArr)
                  const maxIndices = valuesArr
                    .map((v, idx) => (v === maxValue ? idx : -1))
                    .filter((idx) => idx !== -1)

                  return multipleOptionProposalData.options.map(
                    (opt: string, idx: number) => {
                      const value = valuesArr[idx] ?? 0
                      let formattedValue: string = ''
                      formattedValue = formatString(
                        formatEther(BigInt(value).toString())
                      )

                      let pct =
                        total > 0
                          ? ((Number(value) / total) * 100).toFixed(2)
                          : '0.00'

                      // Highlight the most chosen option(s)
                      const isMostChosen = maxIndices.includes(idx)

                      return (
                        <li
                          key={idx}
                          className={`flex items-center gap-2 ${isMostChosen ? 'font-bold text-green-700' : ''
                            }`}
                        >
                          <span className="font-medium">{opt}</span>
                          <span className="ml-auto">
                            {formattedValue} {localDict?.votes ?? 'votes'} (
                            {pct}
                            %)
                          </span>
                          {isMostChosen && (
                            <span className="ml-2 text-xs text-green-600 font-semibold">
                              {/* Customizable: show only for first, or for all with max votes */}
                              {`has beeen choose the most`}
                            </span>
                          )}
                        </li>
                      )
                    }
                  )
                })()}
            </ul>
          </div>
        )}
      </article>
    )
  }

  const ProposalCard = ({ proposal }: { proposal: any }) => {
    const [selectedOption, setSelectedOption] = useState<number | null>(null)

    let start = proposal?.start ?? 0
    let end = proposal?.end ?? 0
    let options = proposal?.options ?? []
    let optionVotes = proposal?.optionVotes ?? []
    let description = proposal?.description ?? ''
    let status = proposal?.status ?? ''
    let hasVoted = proposal?.hasVoted ?? false

    // Calculate total votes from optionVotes (handle BigInt values)
    const totalVotes = optionVotes.reduce((acc: bigint, curr: any) => {
      const currValue =
        typeof curr === 'bigint' ? curr : BigInt(String(curr || 0))
      return acc + currValue
    }, BigInt(0))

    // Use the blockNumber from wagmi's useBlockNumber hook (already in the parent component)

    // Calculate percentages for all options
    const optionPercentages = options.map((option: string, index: number) => {
      const optionValue = optionVotes[index] || BigInt(0)
      const value =
        typeof optionValue === 'bigint'
          ? optionValue
          : BigInt(String(optionValue || 0))
      return totalVotes > 0 ? (Number(value) / Number(totalVotes)) * 100 : 0
    })

    // Find max percentage for color coding
    const maxPercentage = Math.max(...optionPercentages)

    // Determine colors: green for highest, orange for middle, red for lowest
    const getColor = (percentage: number) => {
      if (percentage === maxPercentage && maxPercentage > 0) {
        return 'bg-green-500'
      } else if (percentage > 0) {
        // Check if it's the second highest
        const sorted = [...optionPercentages].sort((a, b) => b - a)
        if (percentage === sorted[1] && sorted[1] > 0) {
          return 'bg-orange-500'
        }
        return 'bg-red-500'
      }
      return 'bg-gray-300'
    }

    // Await reading the contract to get proposal info for the given pID
    // This should run on component mount/update with pID, so useEffect is appropriate.

    return (
      <article className="flex flex-col bg-blue-50 p-6 rounded-xl gap-4 shadow-sm">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center justify-between w-full">
            <h1 className="text-xl font-bold text-gray-800 flex-1">
              {description || 'Description'}
            </h1>
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full
      ${status === 'Active'
                  ? 'bg-green-200 text-green-900'
                  : status === 'Pending'
                    ? 'bg-yellow-200 text-yellow-900'
                    : status === 'Ended'
                      ? 'bg-gray-300 text-gray-700'
                      : 'bg-gray-200 text-gray-800'
                }`}
              style={{ minWidth: 73, textAlign: 'center' }}
            >
              {status}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {/* Display options with checkboxes and progress bars */}
          {options.map((option: string, index: number) => {
            const optionValue = optionVotes[index] || BigInt(0)
            const value =
              typeof optionValue === 'bigint'
                ? optionValue
                : BigInt(String(optionValue || 0))
            const percentage = optionPercentages[index] || 0
            const percentageStr = percentage.toFixed(2)

            return (
              <div key={index} className="flex flex-col gap-2">
                <div className="flex flex-row items-center gap-3">
                  <Checkbox
                    checked={selectedOption === index}
                    onCheckedChange={() => setSelectedOption(index)}
                    className="h-5 w-5"
                    disabled={status !== 'Active' || hasVoted}
                  />
                  <span className="flex-1 text-gray-700 whitespace-pre-line break-words">
                    {option}
                  </span>
                  <span className="text-gray-700 font-medium">
                    {formatString(formatEther(value))}: {`(${percentageStr}%) `}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full transition-all ${getColor(percentage)}`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
        {/* Submit Button */}
        <Button
          className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 rounded-lg"
          disabled={status !== 'Active' || selectedOption === null}
          onClick={async () => {
            if (selectedOption !== null) {
              setLoading(true)
              try {
                const tx = await writeContractAsync({
                  abi: GOVERNOR_ABI,
                  address: governorAddress as `0x${string}`,
                  functionName: 'castVote',
                  args: [proposal.pID, selectedOption == 0 ? true : false],
                })

                await waitForTransactionReceipt(config, {
                  hash: tx,
                  confirmations: 1,
                })

                setIsRefetching(!isRefetching)
                setSelectedOption(null)
              } catch (error) {
                console.error('Error voting:', error)
              } finally {
                setLoading(false)
                setSelectedOption(null)
              }
            }
          }}
          style={{
            display: hasVoted || status !== 'Active' ? 'none' : undefined,
          }}
        >
          Submit
        </Button>
        {status === 'Ended' && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">
              {localDict?.resultsTitle ?? 'Voting Results'}
            </h3>
            <ul className="space-y-2">
              {proposal.options &&
                (() => {
                  // value may be under multipleOptionProposalData.values or multipleOptionProposalData.optionValues based on how it's structured
                  let valuesArr: number[] = []
                  if (Array.isArray(proposal.optionVotes)) {
                    valuesArr = proposal.optionVotes.map((v: any) => Number(v))
                  }

                  let total = valuesArr.reduce((acc, curr) => acc + curr, 0)
                  // Find max indices (so we can highlight/wrap the "most chosen")
                  const maxValue = Math.max(...valuesArr)
                  const maxIndices = valuesArr
                    .map((v, idx) => (v === maxValue ? idx : -1))
                    .filter((idx) => idx !== -1)

                  return proposal.options.map((opt: string, idx: number) => {
                    const value = valuesArr[idx] ?? 0
                    let formattedValue: string = ''
                    formattedValue = formatString(
                      formatEther(BigInt(value).toString())
                    )

                    let pct =
                      total > 0
                        ? ((Number(value) / total) * 100).toFixed(2)
                        : '0.00'

                    // Highlight the most chosen option(s)
                    const isMostChosen = maxIndices.includes(idx)

                    return (
                      <li
                        key={idx}
                        className={`flex items-center gap-2 ${isMostChosen ? 'font-bold text-green-700' : ''
                          }`}
                      >
                        <span className="font-medium">{opt}</span>
                        <span className="ml-auto">
                          {formattedValue} {localDict?.votes ?? 'votes'} ({pct}
                          %)
                        </span>
                        {isMostChosen && (
                          <span className="ml-2 text-xs text-green-600 font-semibold">
                            {/* Customizable: show only for first, or for all with max votes */}
                            {`has beeen choose the most`}
                          </span>
                        )}
                      </li>
                    )
                  })
                })()}
            </ul>
          </div>
        )}
      </article>
    )
  }

  function handleChange(event: any) {
    const name = event.target.name
    const value = event.target.value
    if (name === 'targets') {
    } else if (name === 'values') {
      setValues(value)
    } else if (name === 'description') {
      setDescription(value)
    } else if (name === 'bytescode') {
      setBytesCodes(value)
    } else if (name === 'variable1') {
      setVariable1(value)
    } else if (name === 'variable2') {
      setVariable2(value)
    } else if (name === 'variable3') {
      setVariable3(value)
    }
  }

  function handleSelect(value: any) {
    setCategory(value)
  }

  const { data: proposalCount, refetch: refetchProposalCount } =
    useReadContract({
      address: governorAddress as `0x${string}`,
      abi: GOVERNOR_ABI,
      functionName: 'proposalCount',
    })

  const { data: multipleProposalCount, refetch: refetchMultipleProposalCount } =
    useReadContract({
      address: MultipleVotingAddress[
        chainId || defaultChainId
      ] as `0x${string}`,
      abi: MULTIPLE_VOTINGS_ABI,
      functionName: 'proposalCount',
    }) as unknown as { data?: number; refetch: () => void }

  useEffect(() => {
    async function fetchMultipleProposals() {
      const currentTimestamp = Math.floor(Date.now() / 1000)

      if (!multipleProposalCount || !address || !chainId || !currentTimestamp)
        return

      setLoading(true)
      let _multipleOptions = []
      for (let i = Number(multipleProposalCount); i > 0; i--) {
        const _proposalData = await readContract(config, {
          address: MultipleVotingAddress[
            chainId || defaultChainId
          ] as `0x${string}`,
          abi: MULTIPLE_VOTINGS_ABI,
          functionName: 'getProposal',
          args: [i.toString()],
          account: address,
        })

        const _optionVotes = await readContract(config, {
          address: MultipleVotingAddress[
            chainId || defaultChainId
          ] as `0x${string}`,
          abi: MULTIPLE_VOTINGS_ABI,
          functionName: 'getOptionVotes',
          args: [i],
        })

        const isEnded =
          currentTimestamp >
          Number(
            Array.isArray(_proposalData) ? Number(String(_proposalData[4])) : 0
          )
        _multipleOptions.push({
          pID: i,
          description: Array.isArray(_proposalData)
            ? (_proposalData[7] as string)
            : '',
          options: Array.isArray(_proposalData)
            ? (_proposalData[2] as string[])
            : [],
          start: Array.isArray(_proposalData)
            ? (_proposalData[3] as number)
            : 0,
          end: Array.isArray(_proposalData) ? (_proposalData[4] as number) : 0,
          totalVotes: Array.isArray(_proposalData)
            ? (_proposalData[5] as number)
            : 0,
          status: isEnded ? 'Ended' : 'Active',
          hasVoted: Array.isArray(_proposalData)
            ? (_proposalData[8] as boolean)
            : false,
          optionVotes: _optionVotes,
          isMultipleChoice: true,
        })
      }

      setMultipleOptions(_multipleOptions)
      setLoading(false)
    }
    fetchMultipleProposals()
  }, [multipleProposalCount, address, chainId, isRefetching])

  useEffect(() => {
    async function fetchProposals() {
      const currentBlock = Math.floor(Date.now() / 1000)

      if (!proposalCount || !address || !chainId || !currentBlock) return

      setLoading(true)
      let _proposals = []
      for (let i = 1; i < Number(proposalCount) + 1; i++) {
        const _proposalData = await readContract(config, {
          address: governorAddress as `0x${string}`,
          abi: GOVERNOR_ABI,
          functionName: 'proposals',
          args: [i.toString()],
          account: address,
        })

        const getReceipt = await readContract(config, {
          address: governorAddress as `0x${string}`,
          abi: GOVERNOR_ABI,
          functionName: 'getReceipt',
          args: [i.toString(), address],
        })

        const options = ['For Vote', 'Against Vote']

        const isEnded =
          currentBlock >
          Number(
            Array.isArray(_proposalData) ? Number(String(_proposalData[4])) : 0
          )
        _proposals.push({
          pID: i,
          description: Array.isArray(_proposalData)
            ? (_proposalData[9] as string)
            : '',
          options: options,
          start: Array.isArray(_proposalData)
            ? (_proposalData[3] as number)
            : 0,
          end: Array.isArray(_proposalData) ? (_proposalData[4] as number) : 0,
          totalVotes: Array.isArray(_proposalData)
            ? (_proposalData[5] as number)
            : 0,
          status: isEnded ? 'Ended' : 'Active',
          hasVoted: (getReceipt as any)?.hasVoted ?? false,
          optionVotes: [
            Array.isArray(_proposalData)
              ? (_proposalData[5] as bigint)
              : BigInt(0),
            Array.isArray(_proposalData)
              ? (_proposalData[6] as bigint)
              : BigInt(0),
          ],
          isMultipleChoice: false,
          isCanceled: Array.isArray(_proposalData)
            ? (_proposalData[7] as boolean)
            : false,
          isExecuted: Array.isArray(_proposalData)
            ? (_proposalData[8] as boolean)
            : false,
        })
      }

      setProposals(_proposals)
      setLoading(false)
    }
    fetchProposals()
  }, [proposalCount, address, chainId, isRefetching])

  // Filter proposals based on status
  useEffect(() => {
    let filtered = multipleOptions
    filtered.push(...proposals)

    if (statusFilter === 'active') {
      filtered = filtered.filter((option) => option.status === 'Active')
    } else if (statusFilter === 'ended') {
      filtered = filtered.filter((option) => option.status === 'Ended')
    }

    filtered.sort((a, b) => {
      // If end is a BigInt, convert to Number safely, else use as is
      const endA = typeof a.end === 'bigint' ? Number(a.end) : a.end
      const endB = typeof b.end === 'bigint' ? Number(b.end) : b.end
      return endB - endA
    })

    setFilteredProposals(filtered)
  }, [multipleOptions, proposals, statusFilter])

  const handleCreateProposal = async () => {
    setIsCreateProposalDialogOpened(false)

    setLoading(true)

    if (category.length == 0) {
      toast({ title: 'Please Select Category' })
      return
    }

    if (category === '7') {
      if (description == '') {
        toast({ title: 'Please enter a valid description' })
        return
      }

      for (let i = 0; i < options.length; i++) {
        if (options[i] == '') {
          toast({ title: 'Please enter a valid option' })
          return
        }
      }

      const startTimeTimestamp = startTime
        ? Math.floor(new Date(startTime).getTime() / 1000)
        : 0
      const endTimeTimestamp = endTime
        ? Math.floor(new Date(endTime).getTime() / 1000)
        : 0
      try {
        const simulateResult = await simulateContract(config, {
          abi: MULTIPLE_VOTINGS_ABI,
          address: MultipleVotingAddress[
            chainId || defaultChainId
          ] as `0x${string}`,
          functionName: 'proposeMultipleChoice',
          args: [options, description, startTimeTimestamp, endTimeTimestamp],
        })

        const pID = (simulateResult.result as bigint).toString()

        const tx = await writeContractAsync({
          abi: MULTIPLE_VOTINGS_ABI,
          address: MultipleVotingAddress[
            chainId || defaultChainId
          ] as `0x${string}`,
          functionName: 'proposeMultipleChoice',
          args: [options, description, startTimeTimestamp, endTimeTimestamp],
        })

        await waitForTransactionReceipt(config, {
          hash: tx,
          confirmations: 1,
        })

        // await supabase.from('MultipleOptions').insert({
        //   pID: Number(pID),
        //   description: _proposalDataObject.description,
        //   options: _proposalDataObject.options.join(','),
        //   start: _proposalDataObject.start.toString(),
        //   end: _proposalDataObject.end.toString(),
        //   values: _optionVotes.join(','),
        //   proposer: address,
        // })

        refetchMultipleProposalCount()
      } catch (error) {
        console.error('Error creating proposal:', error)
      } finally {
        setLoading(false)
      }

      return
    }

    if (tokenAddress.length == 0) {
      toast({ title: 'Please enter a valid token address' })
      return
    }

    let _signature = 'approve(address,uint256)'
    let _value = '0'
    let _calldata = ''
    let _address

    if (category === '2') {
      _calldata = new ethers.AbiCoder().encode(
        ['address', 'uint256'],
        [address, parseEther(values)]
      )
      _signature = 'transfer(address,uint256)'
      _address = tokenAddress
    } else if (category === '4') {
      _signature = 'deploy(bytes)'
      _calldata = new ethers.AbiCoder().encode(['bytes'], [bytescode])
      _address = daoStudioAddress[chainId || defaultChainId]
    } else if (category === '5') {
      _address = timelockAddress[chainId || defaultChainId]
      _signature = 'updateVariables(uint256,uint256,uint256)'
      _calldata = new ethers.AbiCoder().encode(
        ['uint256', 'uint256', 'uint256'],
        [variable1, variable2, variable3]
      )
    } else if (category === '6') {
      _address = governorAddress as `0x${string}`
      _signature = 'updateVariables(uint256,uint256,uint256)'
      _calldata = new ethers.AbiCoder().encode(
        ['uint256', 'uint256', 'uint256'],
        [parseEther(variable1), parseEther(variable2), parseEther(variable3)]
      )
    } else {
      _address = tokenAddress
      _calldata = new ethers.AbiCoder().encode(
        ['address', 'uint256'],
        [address, parseEther(values)]
      )
    }

    try {
      const simulateResult = await simulateContract(config, {
        abi: GOVERNOR_ABI,
        address: governorAddress as `0x${string}`,
        functionName: 'propose',
        args: [[_address], [_value], [_signature], [_calldata], description],
      })

      // To get the return value, await and store the result from writeContract
      const tx = await writeContractAsync({
        abi: GOVERNOR_ABI,
        address: governorAddress as `0x${string}`,
        functionName: 'propose',
        args: [[_address], [_value], [_signature], [_calldata], description],
      })
      await waitForTransactionReceipt(config, {
        hash: tx,
        confirmations: 1,
      })

      refetchProposalCount()
    } catch (error) {
      console.error('Error creating proposal:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateSocials = async () => {
    setIsUpdatingSocials(true)
    try {
      // Update the social links with the new values
      // In a real implementation, you might want to save to a database or smart contract

      await writeContract({
        abi: GOVERNOR_ABI,
        address: governorAddress as `0x${string}`,
        functionName: 'updateSocialConfig',
        args: [
          '',
          editingSocials.website,
          editingSocials.linkedin,
          editingSocials.twitter,
          editingSocials.telegram,
        ],
      })

      toast({ title: 'Social links updated successfully!' })
      setIsEditingSocials(false)

      // Update the constants to reflect the new values
      // Note: In a real app, you'd typically update a database or smart contract
      // For now, we'll just show the updated values in the UI
    } catch (error) {
      console.error('Error updating social links:', error)
    } finally {
      setIsUpdatingSocials(false)
    }
  }

  useEffect(() => {
    const notify = async () => {
      if (isConfirmed) {
        toast({
          title: 'Transaction Succeed!',
        })
      } else if (isConfirming) {
        toast({ title: 'TX is Pending, Please Wait...' })
      } else if (error) {
        toast({ title: (error as BaseError).shortMessage })
      }
    }

    notify()
  }, [isConfirmed, isConfirming, error, hash])

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

  // Reset options when dialog opens
  useEffect(() => {
    if (isCreateProposalDialogOpened) {
      setOptions(['', ''])
      setDescription('')
      setCategory('')
    }
  }, [isCreateProposalDialogOpened])

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-row items-center gap-4">
        <Image
          src="/pce_logo.png"
          alt="PCE Logo"
          width={48}
          height={48}
          priority={true}
          quality={100}
        />
        <PageHeaderSection title={localDict.title ?? ''} />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-row w-full items-center">
          <Tabs
            defaultValue="about"
            className="w-full sm:justify-start justify-center"
            value={tabContent}
          >
            <TabsList className="max-sm:flex max-sm:justify-center justify-start">
              <TabsTrigger value="about" onClick={() => setTabContent('about')}>
                {localDict.aboutDao}
              </TabsTrigger>
              <TabsTrigger
                value="proposals"
                onClick={() => setTabContent('proposals')}
              >
                {localDict.allProposals}
              </TabsTrigger>
              <TabsTrigger value="holds" onClick={() => setTabContent('holds')}>
                Holds
              </TabsTrigger>
            </TabsList>
            <TabsContent value="about" className="w-full">
              <div className="flex flex-row gap-8 w-full flex-3">
                {/* Replace two-column layout with a single column for full-width display */}
                <div className="flex flex-col gap-4 w-full flex-1">
                  <h1 className="text-2xl font-bold">{localDict.about}</h1>

                  <div className="flex flex-col border rounded-xl p-4 mt-2 bg-gray-100 gap-2 w-full">
                    <div className="flex flex-row justify-between items-center rounded-xl mt-2 w-full">
                      <TooltipComponent
                        title={localDict.govenorToken ?? 'Governor Token'}
                        tooltipText="A token that represents voting power in the DAO. Holders can vote on proposals and participate in governance decisions."
                        className="font-bold rounded-xl flex"
                      />
                      <CustomLink.default
                        chainId={chainId}
                        type="address"
                        address={
                          WPCE_ADDRESS[
                          chainId || defaultChainId
                          ] as `0x${string}`
                        }
                        message={shortenAddress(
                          WPCE_ADDRESS[
                          chainId || defaultChainId
                          ] as `0x${string}`
                        )}
                      ></CustomLink.default>
                    </div>

                    <div className="flex flex-row justify-between items-center rounded-xl mt-2 w-full">
                      <TooltipComponent
                        title={localDict.timelock ?? 'Timelock'}
                        tooltipText="A smart contract that adds a delay between when a proposal passes and when it can be executed. This delay gives token holders time to review and react to approved proposals before they take effect."
                        className="font-bold rounded-xl flex"
                      />
                      <CustomLink.default
                        chainId={chainId}
                        type="address"
                        address={
                          timelockAddress[
                          chainId || defaultChainId
                          ] as `0x${string}`
                        }
                        message={shortenAddress(
                          timelockAddress[
                          chainId || defaultChainId
                          ] as `0x${string}`
                        )}
                      ></CustomLink.default>
                    </div>

                    <div className="flex flex-row justify-between items-center rounded-xl mt-2 w-full">
                      <TooltipComponent
                        title={localDict.governor ?? 'Governor'}
                        tooltipText="The core contract that manages the DAO's governance process. It handles proposal creation, voting, and execution of approved proposals. This contract implements the rules and parameters for how governance works."
                        className="font-bold rounded-xl flex"
                      />
                      <CustomLink.default
                        chainId={chainId}
                        type="address"
                        address={governorAddress as `0x${string}`}
                        message={shortenAddress(
                          governorAddress as `0x${string}`
                        )}
                      ></CustomLink.default>
                    </div>
                  </div>

                  <div className="flex flex-col border rounded-xl p-4 bg-gray-100 gap-4 w-full">
                    <InfoCell
                      title={localDict.voteDelay ?? 'Vote Delay'}
                      tooltipText="The number of blocks that must pass between when a proposal is created and when voting begins. This delay gives token holders time to research and discuss the proposal before voting starts."
                      value={votingDelay}
                      formatter={(val) => formatString(String(val))}
                    />

                    <InfoCell
                      title={localDict.votingPeriod ?? 'Voting Period'}
                      tooltipText="The duration (in blocks) during which token holders can cast their votes on a proposal. Once this period ends, no more votes can be cast and the proposal's outcome is determined based on the votes received."
                      value={votingPeriod}
                      formatter={(val) => formatString(String(val))}
                    />

                    <InfoCell
                      title={localDict.timelockDelay ?? 'Timelock Delay'}
                      tooltipText="The mandatory waiting period between when a proposal passes and when it can be executed. This delay gives token holders time to prepare for the changes and exit the protocol if they disagree with a passed proposal. Longer delays provide more security but reduce governance agility."
                      value={timelockDelay}
                      formatter={(val) => formatString(String(val))}
                    />

                    <InfoCell
                      title={
                        localDict.proposalThreshold ?? 'Proposal Threshold'
                      }
                      tooltipText="The minimum number of votes a delegate must have to create a proposal. This threshold ensures that only members with sufficient stake in the DAO can initiate governance actions."
                      value={proposalThreshold}
                      formatter={(val) =>
                        formatString(formatEther(String(val)))
                      }
                    />

                    <InfoCell
                      title={localDict.quorumVotes ?? 'Quorum Votes'}
                      tooltipText="The minimum number of votes required for a proposal to be considered valid. This ensures that major decisions have sufficient participation from the community. If a proposal doesn't reach the quorum threshold, it fails regardless of the voting outcome."
                      value={quorum}
                      formatter={(val) =>
                        formatString(formatEther(String(val)))
                      }
                    />
                  </div>

                  <InfoCell
                    title={localDict.myPower ?? 'My Power'}
                    tooltipText={
                      'Your current voting power in this DAO, ' +
                      'determined by the number of governance tokens you hold ' +
                      'or have been delegated. This power allows you to vote on proposals ' +
                      'and create new ones if you meet the proposal threshold.'
                    }
                    value={getVotes ?? '0'}
                    formatter={(val) =>
                      formatString(formatEther(val as string).toString())
                    }
                    className="border rounded-xl p-4 bg-gray-100 w-full"
                  />

                  <div className="flex flex-col border rounded-xl p-4 gap-4 bg-gray-100 w-full">
                    <h1 className="font-bold rounded-xl  flex">
                      {localDict.createdAt ?? 'Created at'}{' '}
                      {new Date(
                        Number(createdAt[chainId || defaultChainId]) * 1000
                      ).toLocaleString()}
                    </h1>
                  </div>

                  <div className="flex flex-col border rounded-xl p-4 gap-4 mb-40 bg-gray-100 w-full">
                    <div className="flex flex-row justify-between items-center mb-2">
                      <h1 className="font-bold">Socials</h1>
                      <Button
                        variant="outline"
                        className="w-auto"
                        onClick={() => {
                          setIsEditingSocials(!isEditingSocials)
                          setEditingSocials({
                            website: socials.website,
                            linkedin: socials.linkedin,
                            twitter: socials.twitter,
                            telegram: socials.telegram,
                          })
                        }}
                      >
                        {isEditingSocials ? 'Cancel' : 'Edit'}
                      </Button>
                    </div>

                    {isEditingSocials ? (
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-medium">
                            PCE Website
                          </label>
                          <Input
                            value={editingSocials.website}
                            onChange={(e) =>
                              setEditingSocials((prev) => ({
                                ...prev,
                                website: e.target.value,
                              }))
                            }
                            placeholder="https://website.com"
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-medium">
                            LinkedIn
                          </label>
                          <Input
                            value={editingSocials.linkedin}
                            onChange={(e) =>
                              setEditingSocials((prev) => ({
                                ...prev,
                                linkedin: e.target.value,
                              }))
                            }
                            placeholder="https://www.linkedin.com/"
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-medium">Twitter</label>
                          <Input
                            value={editingSocials.twitter}
                            onChange={(e) =>
                              setEditingSocials((prev) => ({
                                ...prev,
                                twitter: e.target.value,
                              }))
                            }
                            placeholder="https://twitter.com"
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-medium">
                            Telegram
                          </label>
                          <Input
                            value={editingSocials.telegram}
                            onChange={(e) =>
                              setEditingSocials((prev) => ({
                                ...prev,
                                telegram: e.target.value,
                              }))
                            }
                            placeholder="https://t.me/"
                          />
                        </div>

                        <div className="flex flex-row gap-2 mt-2">
                          <Button
                            onClick={handleUpdateSocials}
                            className="flex-1"
                            disabled={isUpdatingSocials}
                          >
                            {isUpdatingSocials ? 'Saving...' : 'Save Changes'}
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => {
                              setIsEditingSocials(false)
                              setSocials({
                                website: socials.website,
                                linkedin: socials.linkedin,
                                twitter: socials.twitter,
                                telegram: socials.telegram,
                              })
                            }}
                            className="flex-1"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-row justify-between items-center">
                          <span className="font-medium">PCE Site:</span>
                          <Link
                            href={socials.website}
                            className="text-primary_blue hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {socials.website}
                          </Link>
                        </div>

                        <div className="flex flex-row justify-between items-center">
                          <span className="font-medium">LinkedIn:</span>
                          <Link
                            href={socials.linkedin}
                            className="text-primary_blue hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {socials.linkedin}
                          </Link>
                        </div>

                        <div className="flex flex-row justify-between items-center">
                          <span className="font-medium">Twitter:</span>
                          <Link
                            href={socials.twitter}
                            className="text-primary_blue hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {socials.twitter}
                          </Link>
                        </div>

                        <div className="flex flex-row justify-between items-center">
                          <span className="font-medium">Telegram:</span>
                          <Link
                            href={socials.telegram}
                            className="text-primary_blue hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {socials.telegram}
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="proposals">
              <div className="flex flex-col mt-4 gap-4 w-full">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-2 mb-4">
                  <Button
                    className="bg-primary_blue text-white w-48 ml-auto"
                    onClick={() => setIsCreateProposalDialogOpened(true)}
                  >
                    {localDict.createProposal ?? 'Create Proposal'}
                  </Button>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Popover
                      open={isStatusFilterOpen}
                      onOpenChange={setIsStatusFilterOpen}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          className="w-full sm:w-[200px] justify-between bg-white"
                        >
                          {statusFilter === 'all'
                            ? (localDict.all ?? 'All')
                            : statusFilter === 'active'
                              ? (localDict.active ?? 'Active')
                              : (localDict.ended ?? 'Ended')}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full sm:w-[200px] p-0">
                        <Command>
                          <CommandList>
                            <CommandGroup>
                              <CommandItem
                                value="all"
                                onSelect={() => {
                                  setStatusFilter('all')
                                  setIsStatusFilterOpen(false)
                                }}
                              >
                                {localDict.all ?? 'All'}
                              </CommandItem>
                              <CommandItem
                                value="active"
                                onSelect={() => {
                                  setStatusFilter('active')
                                  setIsStatusFilterOpen(false)
                                }}
                              >
                                {localDict.active ?? 'Active'}
                              </CommandItem>
                              <CommandItem
                                value="ended"
                                onSelect={() => {
                                  setStatusFilter('ended')
                                  setIsStatusFilterOpen(false)
                                }}
                              >
                                {localDict.ended ?? 'Ended'}
                              </CommandItem>
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* <div className="flex flex-col mt-4 gap-4 w-full">
                  {proposals.length > 0 &&
                    proposals.map((proposal) => (
                      <ProposalCard key={proposal.pID} proposal={proposal} />
                    ))}
                </div> */}

                <div className="flex flex-col mt-4 gap-4 w-full">
                  {filteredProposals.length > 0 &&
                    filteredProposals.map((option) => (
                      <OptionsCard
                        key={option.pID}
                        multipleOptionProposalData={option}
                      />
                    ))}
                  {filteredProposals.length == 0 && !loading && (
                    <div className="flex justify-center items-center p-4 bg-gray-100 rounded-xl text-gray-500">
                      {localDict.noProposals}
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="holds">
              <div className="flex flex-col sm:flex-row mt-4 gap-4 sm:items-start items-center">
                <div className="flex flex-col w-full">
                  <h1 className="text-2xl font-bold text-center sm:text-left">
                    {localDict.treasury ?? 'Treasury'}
                  </h1>
                  <div className="rounded-xl flex border mt-4 flex-col w-full gap-4 p-4">
                    <div className="hidden sm:block">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="font-bold">
                              {localDict.token ?? 'Token'}
                            </TableHead>
                            <TableHead className="font-bold">
                              {localDict.amount ?? 'Amount'}
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {treasuryBalances?.map((token, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-bold">
                                {token.name === '' ? 'PCE TEST' : token.name}
                              </TableCell>
                              <TableCell className="font-bold">
                                {formatString(
                                  formatEther(
                                    BigInt(token.tokenBalance).toString()
                                  )
                                )}{' '}
                                {token.symbol === ''
                                  ? 'PCE TEST'
                                  : token.symbol}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>

                    <div className="sm:hidden space-y-3">
                      {treasuryBalances && treasuryBalances.length > 0 ? (
                        treasuryBalances.map((token, index) => (
                          <div
                            key={`treasury-card-${index}`}
                            className="rounded-xl border p-4 shadow-sm space-y-2"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="space-y-1">
                                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                                  {localDict.token ?? 'Token'}
                                </p>
                                <p className="text-base font-semibold">
                                  {token.name === '' ? 'PCE TEST' : token.name}
                                </p>
                              </div>
                              <span className="text-xs font-medium text-muted-foreground">
                                {token.symbol === ''
                                  ? 'PCE TEST'
                                  : token.symbol}
                              </span>
                            </div>
                            <div className="text-sm">
                              <span className="text-muted-foreground">
                                {localDict.amount ?? 'Amount'}:{' '}
                              </span>
                              <span className="font-semibold">
                                {formatString(
                                  formatEther(
                                    BigInt(token.tokenBalance).toString()
                                  )
                                )}
                              </span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="rounded-xl border border-dashed p-4 text-center text-sm text-muted-foreground">
                          {localDict.noTokens ?? 'No tokens in treasury'}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col w-full sm:w-[40%]">
                  <h1 className="text-2xl font-bold text-center sm:text-left">
                    {localDict.daoBalance ?? 'DAO Balance'}
                  </h1>

                  <div className="flex flex-col justify-between border rounded-xl p-4 mt-4 gap-4 bg-gray-100">
                    <h1 className="font-bold rounded-xl flex">
                      {localDict.daoTreasury ?? 'DAO Treasury'}
                    </h1>
                    <div className="flex flex-row justify-between">
                      <h1 className="font-bold rounded-xl  flex">
                        {localDict.totalValue ?? 'Total Value'}
                      </h1>
                      <h1 className="font-bold rounded-xl  flex">$0</h1>
                    </div>

                    <div className="flex flex-row justify-between">
                      <h1 className="font-bold rounded-xl  flex">
                        {localDict.numberOfTokens ?? 'Number of Tokens'}
                      </h1>
                      <h1 className="font-bold rounded-xl  flex">
                        {treasuryBalances.length}
                      </h1>
                    </div>

                    <div className="flex flex-row justify-between">
                      <h1 className="font-bold rounded-xl  flex">
                        {localDict.numberOfNfts ?? 'Number of NFTs'}
                      </h1>
                      <h1 className="font-bold rounded-xl  flex">$0</h1>
                    </div>

                    <Dialog
                      open={isDepositDialogOpened}
                      onOpenChange={() => {
                        setIsDepositDialogOpened(!isDepositDialogOpened)
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button className="w-full">
                          {localDict.depositToDaoTreasury ??
                            'Deposit to DAO Treasury'}
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader className="flex flex-col gap-2">
                          <DialogTitle>
                            {localDict.address ?? 'Address'}
                          </DialogTitle>
                          <DialogDescription>
                            {localDict.tokenAddress ??
                              'Token address to deposit'}
                          </DialogDescription>
                          <Input
                            onChange={(e) => setTokenAddress(e.target.value)}
                            placeholder="Address"
                          />
                          <DialogTitle>
                            {localDict.amount ?? 'Amount'}
                          </DialogTitle>
                          <DialogDescription>
                            {localDict.amountToDeposit ?? 'Amount to deposit'}
                          </DialogDescription>
                          <Input
                            onChange={(e) => setTransferAmount(e.target.value)}
                            placeholder="Amount"
                          />
                          <Button
                            className="w-full"
                            onClick={async () => {
                              try {
                                await writeContract({
                                  abi: PCE_ABI,
                                  address: tokenAddress as `0x${string}`,
                                  functionName: 'transfer',
                                  args: [
                                    timelockAddress[
                                    chainId || defaultChainId
                                    ] as `0x${string}`,
                                    parseEther(transferAmount),
                                  ],
                                })

                                setTokenAddress('')
                                setTransferAmount('')
                                setIsDepositDialogOpened(!isDepositDialogOpened)
                                refetchPCEBalance()
                              } catch (error) {
                                console.error('Error depositing tokens:', error)
                                return
                              }
                            }}
                          >
                            {localDict.deposit ?? 'Deposit'}
                          </Button>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <Dialog
          open={isCreateProposalDialogOpened}
          onOpenChange={setIsCreateProposalDialogOpened}
        >
          <DialogContent>
            <DialogTitle>
              {localDict.createProposal ?? 'Create a Proposal'}
            </DialogTitle>
            <DialogDescription>
              Configure the proposal details below
            </DialogDescription>
            <div className="flex flex-col gap-4 mt-4 mb-2">
              <Select onValueChange={(value) => handleSelect(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={
                      localDict.selectACategory ?? 'Select a category'
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">{dict?.submit?.category1}</SelectItem>
                  <SelectItem value="2">{dict?.submit?.category2}</SelectItem>
                  <SelectItem value="3">{dict?.submit?.category3}</SelectItem>
                  <SelectItem value="4">{dict?.submit?.category4}</SelectItem>
                  <SelectItem value="5">{dict?.submit?.category5}</SelectItem>
                  <SelectItem value="6">{dict?.submit?.category6}</SelectItem>
                  <SelectItem value="7">{dict?.submit?.category7}</SelectItem>
                </SelectContent>
              </Select>

              {category === '7' ? (
                <div className="w-full flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">
                      {localDict.description ?? 'Description'}
                    </label>
                    <Textarea
                      className="max-sm:h-40 h-40 w-full align-center p-2 rounded-md border-[1px] border-gray94"
                      placeholder={
                        localDict.enterDescription ??
                        'Enter proposal description'
                      }
                      name="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-medium">
                        {localDict.startTimeLabel ?? 'Start Time'}
                      </label>
                      <DateTimePicker
                        value={startTime}
                        onChange={setStartTime}
                        placeholder={
                          localDict.selectDateTime ?? 'Select date & time'
                        }
                        dateLabel={localDict.dateLabel ?? 'Date'}
                        timeLabel={localDict.timeLabel ?? 'Time'}
                        okLabel={localDict.confirm ?? 'OK'}
                        cancelLabel={localDict.cancel ?? 'Cancel'}
                        className="w-full"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-sm font-medium">
                        {localDict.endTimeLabel ?? 'End Time'}
                      </label>
                      <DateTimePicker
                        value={endTime}
                        onChange={setEndTime}
                        placeholder={
                          localDict.selectDateTime ?? 'Select date & time'
                        }
                        dateLabel={localDict.dateLabel ?? 'Date'}
                        timeLabel={localDict.timeLabel ?? 'Time'}
                        okLabel={localDict.confirm ?? 'OK'}
                        cancelLabel={localDict.cancel ?? 'Cancel'}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Options</label>
                    <div className="flex flex-col gap-3">
                      {options.map((option, index) => (
                        <div
                          key={index}
                          className="flex flex-row gap-2 items-center"
                        >
                          <Input
                            placeholder={`Option ${index + 1}`}
                            value={option}
                            onChange={(e) => {
                              const newOptions = [...options]
                              newOptions[index] = e.target.value
                              setOptions(newOptions)
                            }}
                            className="flex-1"
                          />
                          {options.length > 2 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="h-10 w-10 text-red-500 hover:text-red-600 hover:bg-red-50"
                              onClick={() => {
                                const newOptions = options.filter(
                                  (_, i) => i !== index
                                )
                                setOptions(newOptions)
                              }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full sm:w-auto"
                        onClick={() => {
                          setOptions([...options, ''])
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Option
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full flex flex-col gap-4">
                  <Input
                    className={`${category == '4' || category == '5' || category == '6' ? 'hidden' : ''}`}
                    onChange={(e) => setTokenAddress(e.target.value)}
                    placeholder={localDict.address ?? 'Address'}
                  />

                  <Input
                    className={`${category == '4' || category == '5' || category == '6' ? 'hidden' : ''}`}
                    type="number"
                    min="0"
                    step="0.1"
                    placeholder={dict?.submit?.amount ?? ''}
                    name="values"
                    onChange={handleChange}
                  />

                  <Input
                    className={`${category !== '5' && category !== '6' ? 'hidden' : ''}`}
                    type="number"
                    min="0"
                    step="0.1"
                    placeholder={
                      category === '5'
                        ? dict?.submit?.gracePeriod
                        : dict?.submit?.quorum_votes
                    }
                    name="variable1"
                    onChange={handleChange}
                  />

                  <Input
                    className={`${category !== '5' && category !== '6' ? 'hidden' : ''}`}
                    type="number"
                    min="0"
                    step="0.1"
                    placeholder={
                      category === '5'
                        ? dict?.submit?.min_delay
                        : dict?.submit?.proposal_threshold
                    }
                    name="variable2"
                    onChange={handleChange}
                  />

                  <Input
                    className={` ${category !== '5' && category !== '6' ? 'hidden' : ''}`}
                    type="number"
                    min="0"
                    step="0.1"
                    placeholder={
                      category === '5'
                        ? dict?.submit?.max_delay
                        : dict?.submit?.proposal_maxOperations
                    }
                    name="variable3"
                    onChange={handleChange}
                  />

                  <Textarea
                    className="max-sm:h-60 h-60 w-full align-center p-2 rounded-md border-[1px] border-gray94"
                    placeholder={dict?.submit?.description ?? ''}
                    name="description"
                    onChange={handleChange}
                  />

                  <Textarea
                    className={`max-sm:h-60 h-40 w-full align-center p-2 rounded-md border-[1px] border-gray94 outline-none ${category != '4' ? 'hidden' : ''}`}
                    placeholder={dict?.submit?.bytescode ?? ''}
                    name="byescode"
                    onChange={handleChange}
                  />
                </div>
              )}

              <Button onClick={handleCreateProposal}>Create</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <RingLoader
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 9999,
        }}
        color={'#000000'}
        loading={loading}
        cssOverride={ringStyle}
        size={50}
      />
    </div>
  )
}
