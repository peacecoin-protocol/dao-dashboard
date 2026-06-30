'use client'

import { CopyIcon, Plus, X, ChevronsUpDown } from 'lucide-react'
import { useCallback, useEffect, useState, useMemo, useRef } from 'react'
import Link from 'next/link'
import * as CustomLink from '~/components/custom/Link'
import Image from 'next/image'
import { Line } from 'rc-progress'
import { generateIdenteapot } from '@teapotlabs/identeapots'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '~/components/ui/tabs'
import { Button } from '~/components/ui/button'
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
import { Textarea } from '~/components/ui/textarea'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import { Input } from '~/components/ui/input'
import { Checkbox } from '~/components/ui/checkbox'
import { DateTimePicker } from '~/components/ui/date-time-picker'
import { readContract, simulateContract } from '@wagmi/core'
import { ethers, formatEther, parseEther } from 'ethers'
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  type BaseError,
} from 'wagmi'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog'
import { createClient } from '~/utils/supabase/client'

import { Locale } from '~/i18n/types'

import { formatNumber, formatString, shortenAddress } from '~/components/utils'
import { PCE_ABI } from '~/app/ABIs/PCEToken'
import { config } from '~/lib/config'
import { TIMELOCK_ABI } from '~/app/ABIs/Timelock'
import { TooltipComponent } from '~/components/custom/TooltipComponent'
import { ProposalBadges } from '~/components/custom/proposal-badges'
import { FormattedValue } from '~/components/custom/formatted-value'
import { CommunityGov_ABI } from '~/app/ABIs/CommunityGov'
import { MULTIPLE_VOTINGS_ABI } from '~/app/ABIs/MultipleVotings'
import {
  appDeploymentEnv,
  defaultChainId,
  pceAddress,
} from '~/app/constants/constants'
import { waitForTransactionReceipt } from '@wagmi/core'
import { daoStudioAddress } from '~/app/constants/constants'
import ImageCropModal from '~/components/ui/ImageCropModal'
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { timestampToDate } from '~/components/utils'
import { PCE_C_GOV_TOKEN_ABI } from '~/app/ABIs/PCECGovToken'
import { Env } from '~/env'
import { useToast } from '~/hooks/use-toast'
import { DAO_STUDIO_ABI } from '~/app/ABIs/DAOStudio'
import { DialogTrigger } from '~/components/ui/dialog'
import { GOVERNOR_ABI } from '~/app/ABIs/Governor'
import {
  addFilesToGroupPublic,
  createFile,
  DAO_GROUP_ID,
  getFilesFromGroup,
  type PinataFile,
  revokeFile,
} from '~/app/pinata/pinataAPI'
import { PageSubHeaderSection } from '~/components/custom/page-sub-header-section'
import { StatsSection } from '~/components/custom/stats-section'
import { SBTInfo } from '~/components/custom/sbt-tableComponent'
import { SBT_ABI } from '~/app/ABIs/SBT'
import { SBTTableComponent } from '~/components/custom/sbt-tableComponent'
import { PageHeaderSection } from '~/components/custom/page-header-section'
import { LoadingOverlay } from '~/components/ui/loading-overlay'
import { useDictionary } from '~/hooks/use-dictionary'
import { useEnsureSupportedChain } from '~/hooks/use-ensure-supported-chain'
import { useTransactionToast } from '~/hooks/use-transaction-toast'
import { fetchOwnedTokenBalances } from '~/lib/campaigns'
import { fetchErc20Balances, type MoralisErc20Balance } from '~/lib/moralis'

type TokenBalance = {
  contractAddress: string
  tokenBalance: number
  name: string
  symbol: string
  decimals: number
  logo: string
}

type CustomAction = {
  id: string
  target: string
  value: string
  abiJson: string
  abiFileName: string
  abiError?: string
  functionSignature: string
  args: string[]
}

type SimulationStatus = 'idle' | 'success' | 'error'

const createActionId = () =>
  `${Date.now()}-${Math.random().toString(16).slice(2)}`

const createEmptyCustomAction = (): CustomAction => ({
  id: createActionId(),
  target: '',
  value: '',
  abiJson: '',
  abiFileName: '',
  abiError: '',
  functionSignature: '',
  args: [],
})

const getInitialCustomActions = () => [createEmptyCustomAction()]

const toBigInt = (value?: string | bigint) => {
  if (value === undefined || value === null) return BigInt(0)
  return typeof value === 'bigint' ? value : BigInt(value)
}

export default function ForDaoDetailPage({
  params,
}: {
  params: { locale: Locale }
}) {
  const { locale } = params
  const { toast } = useToast()
  const supabase = useMemo(() => createClient(), [])
  const dict = useDictionary(locale)
  const localDict = useMemo(() => dict?.daoInfo ?? {}, [dict])
  const votingPowerDict = dict?.votingPower ?? {}

  const [delegateAddr, setDelegateAddr] = useState('')
  const [description, setDescription] = useState('')
  const [transferAmount, setTransferAmount] = useState('')
  const [tokenAddress, setTokenAddress] = useState('')
  const [imageHash, setImageHash] = useState('')
  const [values, setValues] = useState('')
  const [bytescode, setBytesCodes] = useState('')
  const [variable1, setVariable1] = useState('')
  const [variable2, setVariable2] = useState('')
  const [variable3, setVariable3] = useState('')

  const [id, setId] = useState('')

  const [proposals, setProposals] = useState<any[]>([])
  const [proposalStatus, setStatus] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [daoInfo, setDaoInfo] = useState<any>(null)
  const [multipleOptions, setMultipleOptions] = useState<any[]>([])
  const [isRefetching, setIsRefetching] = useState(false)

  const [governorAddress, setGovernorAddress] = useState<string | undefined>('')
  const [governanceTokenAddress, setGovernanceTokenAddress] = useState<
    string | undefined
  >('')
  const [timelockAddress, setTimelockAddress] = useState<string | undefined>('')
  const [communityTokenAddress, setCommunityTokenAddress] = useState<
    string | undefined
  >('')
  const [multipleVotingAddress, setMultipleVotingAddress] = useState<
    string | undefined
  >('')
  const [sbtAddress, setSbtAddress] = useState<string | undefined>('')
  const [nftAddress, setNftAddress] = useState<string | undefined>('')

  const [tokenData, setTokenData] = useState<SBTInfo[]>([])
  const [refetchTokenData, setRefetchTokenData] = useState(false)

  const [category, setCategory] = useState('')
  const [options, setOptions] = useState<string[]>(['', ''])
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [customActions, setCustomActions] = useState<CustomAction[]>(
    getInitialCustomActions
  )
  const [selectedActionIndex, setSelectedActionIndex] = useState(0)
  const [simulationStatus, setSimulationStatus] =
    useState<SimulationStatus>('idle')
  const [simulationMessage, setSimulationMessage] = useState('')
  const [filteredProposals, setFilteredProposals] = useState<any[]>([])
  const [statusFilter, setStatusFilter] = useState('all')
  const [isStatusFilterOpen, setIsStatusFilterOpen] = useState(false)

  const [stakingAmount, setStakingAmount] = useState('')
  const [getVotes, setGetVotes] = useState<bigint | undefined>(undefined)

  const [isDepositDialogOpened, setIsDepositDialogOpened] = useState(false)
  const [isCreateProposalDialogOpened, setIsCreateProposalDialogOpened] =
    useState(false)
  const [isProposalDetailDialogOpened, setIsProposalDetailDialogOpened] =
    useState(false)
  const [selectedProposalIndex, setSelectedProposalIndex] = useState<
    number | null
  >(null)
  const [identicon, setIdenticon] = useState('')

  const [tabContent, setTabContent] = useState('about')

  const [treasuryBalances, setTreasuryBalances] = useState<TokenBalance[]>([])

  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [croppedImage, setCroppedImage] = useState<string | null>(null)
  const [isImageLoading, setIsImageLoading] = useState(false)
  const lastCroppedImageRef = useRef<string | null>(null)

  // Social editing state variables
  const [isEditingSocials, setIsEditingSocials] = useState(false)
  const [editingSocials, setEditingSocials] = useState({
    website: '',
    linkedin: '',
    twitter: '',
    telegram: '',
  })

  const [socials, setSocials] = useState({
    name: '',
    website: '',
    linkedin: '',
    twitter: '',
    telegram: '',
  })

  const { address, chainId } = useAccount()
  useEnsureSupportedChain()

  const provider = useMemo(
    () =>
      new ethers.JsonRpcProvider(
        chainId === 137
          ? Env.NEXT_PUBLIC_POLYGON_RPC_URL
          : Env.NEXT_PUBLIC_SEPOLIA_RPC_URL
      ),
    [chainId]
  )

  const [blockNumber, setBlockNumber] = useState<number | undefined>(undefined)

  useEffect(() => {
    const fetchBlockNumber = async () => {
      const blockNumber = await provider.getBlockNumber()
      setBlockNumber(blockNumber)
    }
    fetchBlockNumber()
  }, [provider])

  const getTreasuryBalances = async (address: string) => {
    const balances = await fetchErc20Balances({
      address,
      chain: 'eth',
    })

    const formatedBalances = (await Promise.all(
      balances.map(async (balance: MoralisErc20Balance) => ({
        tokenBalance: Number(balance.balance) / 10 ** balance.decimals,
        contractAddress: balance.token_address,
        name: balance.name,
        symbol: balance.symbol,
        decimals: balance.decimals,
        logo: balance.logo,
      }))
    )) as TokenBalance[]

    setTreasuryBalances(formatedBalances)
  }

  const fetchImage = async (name: string) => {
    try {
      const files = await getFilesFromGroup(DAO_GROUP_ID)
      return files.find((file: PinataFile) => file.name === name) ?? ''
    } catch (error) {
      console.error('Error fetching image from Pinata:', error)
      return ''
    }
  }

  useEffect(() => {
    const fetchDAO = async () => {
      if (!id) return

      const { data: dao } = await supabase
        .from('DAO')
        .select()
        .eq('daoId', id)
        .eq('environment', appDeploymentEnv)
        .single()

      if (dao) {
        setImageHash(dao.image)
        setDaoInfo(dao)
      }
    }
    fetchDAO()
  }, [id, supabase])

  useEffect(() => {
    const fullPath =
      typeof window !== 'undefined' ? window.location.pathname : ''
    const id = fullPath.split('/').pop()
    setId(id as string)
  }, [])

  // Handle updating DAO social links
  const handleUpdateSocials = async () => {
    setIsEditingSocials(false)

    if (!id) {
      toast({
        title: localDict.errorTitle ?? 'Error',
        description:
          localDict.daoIdNotFound ??
          'DAO ID not found. Please refresh the page and try again.',
        variant: 'destructive',
      })
      return
    }

    if (!chainId || !daoStudioAddress[chainId]) {
      toast({
        title: localDict.errorTitle ?? 'Error',
        description:
          localDict.unsupportedNetwork ??
          'Unsupported network. Please switch to a supported network.',
        variant: 'destructive',
      })
      return
    }

    try {
      const contractConfig = {
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
      }

      const hash = await writeContractAsync(contractConfig)

      await waitForTransactionReceipt(config, {
        hash,
        confirmations: 1,
      })

      refetchSocialConfig()
    } catch (error) {
      console.error('Error updating social links:', error)
    }
  }

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
    args: [id],
  }) as { data?: string; refetch: () => void }

  useEffect(() => {
    if (daoConfigs?.length == 8) {
      setTimelockAddress(daoConfigs[0])
      setMultipleVotingAddress(daoConfigs[1])
      setSbtAddress(daoConfigs[2])
      setNftAddress(daoConfigs[3])
      setGovernorAddress(daoConfigs[4])
      setGovernanceTokenAddress(daoConfigs[5])
      setCommunityTokenAddress(daoConfigs[6])
    }
  }, [daoConfigs, id])

  const { data: socialConfig, refetch: refetchSocialConfig } = useReadContract({
    address: governorAddress as `0x${string}`,
    abi: GOVERNOR_ABI,
    functionName: 'socialConfig',
  })

  const { data: votingDelay, refetch: refetchVotingDelay } = useReadContract({
    address: governorAddress as `0x${string}`,
    abi: GOVERNOR_ABI,
    functionName: 'votingDelay',
  }) as { data?: string; refetch: () => void }

  const { data: quorum, refetch: refetchQuorum } = useReadContract({
    address: governorAddress as `0x${string}`,
    abi: GOVERNOR_ABI,
    functionName: 'quorumVotes',
  }) as { data?: string; refetch: () => void }

  const { data: governanceTokenBalance, refetch: refetchGovTokenBalance } =
    useReadContract({
      address: governanceTokenAddress as `0x${string}`,
      abi: PCE_ABI,
      functionName: 'balanceOf',
      args: [address],
    }) as { data?: string; refetch: () => void }

  const { data: proposalThreshold, refetch: refetchProposalThreshold } =
    useReadContract({
      address: governorAddress as `0x${string}`,
      abi: GOVERNOR_ABI,
      functionName: 'proposalThreshold',
    }) as { data?: string; refetch: () => void }

  const { data: votingPeriod, refetch: refetchVotingPeriod } = useReadContract({
    address: governorAddress as `0x${string}`,
    abi: GOVERNOR_ABI,
    functionName: 'votingPeriod',
  }) as { data?: string; refetch: () => void }

  const { data: timelockDelay, refetch: refetchTimelockDelay } =
    useReadContract({
      address: timelockAddress as `0x${string}`,
      abi: TIMELOCK_ABI,
      functionName: 'delay',
    }) as { data?: string; refetch: () => void }

  const { data: communityTokenBalance, refetch: refetchCommunityTokenBalance } =
    useReadContract({
      address: communityTokenAddress as `0x${string}`,
      abi: PCE_ABI,
      functionName: 'balanceOf',
      args: [address],
    }) as { data?: string; refetch: () => void }

  const { data: communityTokenSymbol } = useReadContract({
    address: communityTokenAddress as `0x${string}`,
    abi: PCE_C_GOV_TOKEN_ABI,
    functionName: 'symbol',
  }) as { data?: string; refetch: () => void }

  const getCurrentTimestamp = () => {
    return Math.floor(Date.now() / 1000)
  }

  useEffect(() => {
    const fetchTokenData = async () => {
      if (!address || !id) {
        setTokenData([])
        setLoading(false)
        return
      }

      setLoading(true)
      try {
        setTokenData(
          await fetchOwnedTokenBalances({
            account: address,
            daoId: id,
            supabase,
          })
        )
      } finally {
        setLoading(false)
      }
    }
    fetchTokenData()
  }, [address, refetchTokenData, supabase, chainId, id])

  const OptionsCard = ({
    multipleOptionProposalData,
  }: {
    multipleOptionProposalData: any
  }) => {
    const [selectedOption, setSelectedOption] = useState<number | null>(null)
    let options = multipleOptionProposalData?.options ?? []
    let optionVotes = multipleOptionProposalData?.optionVotes ?? []
    let description = multipleOptionProposalData?.description ?? ''
    let status = multipleOptionProposalData?.status ?? ''
    let hasVoted = multipleOptionProposalData?.hasVoted ?? false
    const statusLabel =
      status === 'Active'
        ? (localDict.active ?? status)
        : status === 'Pending'
          ? (localDict.pending ?? status)
          : status === 'Ended'
            ? (localDict.ended ?? status)
            : status === 'Succeeded'
              ? (localDict.succeeded ?? status)
              : status === 'Queued'
                ? (localDict.queued ?? status)
                : status === 'Cancelled' || status === 'Canceled'
                  ? (localDict.cancelled ?? status)
                  : status

    const totalVotes = optionVotes.reduce((acc: bigint, curr: any) => {
      const currValue =
        typeof curr === 'bigint' ? curr : BigInt(String(curr || 0))
      return acc + currValue
    }, BigInt(0))

    const optionPercentages = options.map((option: string, index: number) => {
      const optionValue = optionVotes[index] || BigInt(0)
      const value =
        typeof optionValue === 'bigint'
          ? optionValue
          : BigInt(String(optionValue || 0))
      return totalVotes > 0 ? (Number(value) / Number(totalVotes)) * 100 : 0
    })

    const maxPercentage = Math.max(...optionPercentages)

    const getColor = (percentage: number) => {
      if (percentage === maxPercentage && maxPercentage > 0) {
        return 'bg-green-500'
      } else if (percentage > 0) {
        const sorted = [...optionPercentages].sort((a, b) => b - a)
        if (percentage === sorted[1] && sorted[1] > 0) {
          return 'bg-orange-500'
        }
        return 'bg-red-500'
      }
      return 'bg-gray-300'
    }

    return (
      <article className="flex flex-col w-full max-w-full bg-blue-50 p-4 sm:p-6 rounded-xl gap-4 shadow-sm">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-2">
            <h1 className="text-base sm:text-xl font-bold text-gray-800 flex-1 break-words">
              {description || localDict.description || 'Description'}
            </h1>
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full
      ${
        status === 'Active'
          ? 'bg-green-200 text-green-900'
          : status === 'Pending'
            ? 'bg-yellow-200 text-yellow-900'
            : status === 'Ended'
              ? 'bg-gray-300 text-gray-700'
              : 'bg-gray-200 text-gray-800'
      }`}
              style={{ textAlign: 'center' }}
            >
              {statusLabel}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
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
                <div className="flex flex-col sm:flex-row sm:items-center items-start gap-2">
                  <Checkbox
                    checked={selectedOption === index}
                    onCheckedChange={() => setSelectedOption(index)}
                    className="h-5 w-5"
                    disabled={status !== 'Active' || hasVoted}
                  />
                  <span className="flex-1 text-gray-700 whitespace-pre-line break-words text-sm sm:text-base">
                    {option}
                  </span>
                  <span className="text-gray-700 font-medium text-xs sm:text-sm sm:whitespace-nowrap">
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
        <Button
          className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 rounded-lg"
          disabled={status !== 'Active' || selectedOption === null}
          onClick={async () => {
            if (selectedOption !== null) {
              setLoading(true)
              try {
                const tx = await writeContractAsync({
                  abi: MULTIPLE_VOTINGS_ABI,
                  address: multipleVotingAddress as `0x${string}`,
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
          {localDict.submitVote ?? 'Submit'}
        </Button>
        {status === 'Ended' && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">
              {localDict?.resultsTitle ?? 'Voting Results'}
            </h3>
            <ul className="space-y-2">
              {multipleOptionProposalData.options &&
                (() => {
                  let valuesArr: number[] = []
                  if (Array.isArray(multipleOptionProposalData.optionVotes)) {
                    valuesArr = multipleOptionProposalData.optionVotes.map(
                      (v: any) => Number(v)
                    )
                  }

                  let total = valuesArr.reduce((acc, curr) => acc + curr, 0)
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

                      const isMostChosen = maxIndices.includes(idx)

                      return (
                        <li
                          key={idx}
                          className={`flex items-center gap-2 ${
                            isMostChosen ? 'font-bold text-green-700' : ''
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
                              {localDict.mostChosenLabel ?? 'Most chosen'}
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

  const ProposalCard = ({
    proposal,
    status,
    index,
  }: {
    proposal: any
    status: string
    index: number
  }) => (
    <article
      className="flex flex-col w-full max-w-full bg-gray-100 p-4 sm:p-6 rounded-xl gap-3 cursor-pointer"
      onClick={(e) => {
        // Prevent onClick if a button inside the card was pressed
        if ((e.target as HTMLElement).closest('button')) {
          return
        }
        setSelectedProposalIndex(index)
        setIsProposalDetailDialogOpened(true)
      }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full rounded-xl gap-2">
        <h1 className="flex flex-row text-base sm:text-xl font-bold w-full break-words">
          {proposal[9] || localDict.description || 'Description'}
        </h1>
      </div>
      <p className="description text-sm sm:text-base break-words">
        {proposal[9] || localDict.description || 'Description'}
      </p>
      <ProposalBadges
        label={localDict.transferTokens ?? 'Transfer tokens'}
        status={status}
      />

      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
            <h1 className="text-sm sm:text-base">
              {localDict.voteFor ?? 'Vote For'}
            </h1>
            <h1 className="text-xs sm:text-sm">
              {Number(formatEther(proposal[5] || 0)).toLocaleString()} (
              {proposal[5] && proposal[6] !== undefined
                ? proposal[6] === 0 && proposal[5] > 0
                  ? 100
                  : (
                      (Number(formatEther(proposal[5])) /
                        (Number(formatEther(proposal[5])) +
                          Number(formatEther(proposal[6])))) *
                      100
                    ).toFixed(2)
                : '0'}
              %)
            </h1>
          </div>
          <Line
            percent={
              Number(proposal[5] || 0) > 0 &&
              Number(BigInt(quorum?.toString() || '0')) > 0
                ? (Number(formatEther(proposal[5])) /
                    Number(formatEther(quorum?.toString() || '0'))) *
                  100
                : 0
            }
            strokeColor="#1995AD"
            trailColor="#A1D6E2"
            strokeWidth={1}
            trailWidth={1}
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
            <h1 className="text-sm sm:text-base">
              {localDict.voteAgainst ?? 'Vote Against'}
            </h1>
            <h1 className="text-xs sm:text-sm">
              {Number(formatEther(proposal[6] || 0)).toLocaleString()} (
              {proposal[5] && proposal[6] !== undefined
                ? proposal[5] === 0 && proposal[6] > 0
                  ? 100
                  : (
                      (Number(formatEther(proposal[6])) /
                        (Number(formatEther(proposal[5])) +
                          Number(formatEther(proposal[6])))) *
                      100
                    ).toFixed(2)
                : '0'}
              %)
            </h1>
          </div>

          <Line
            percent={
              Number(proposal[6] || 0) > 0 &&
              Number(BigInt(quorum?.toString() || '0')) > 0
                ? (Number(formatEther(proposal[6])) /
                    Number(formatEther(quorum?.toString() || '0'))) *
                  100
                : 0
            }
            strokeColor="#1995AD"
            trailColor="#A1D6E2"
            strokeWidth={1}
            trailWidth={1}
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
            <h1 className="text-sm sm:text-base">
              {localDict.votingPeriod ?? 'Voting Period'}
            </h1>
            <h1 className="text-xs sm:text-sm">
              {localDict.currentBlock ?? 'Current Block'}: {Number(blockNumber)}
            </h1>
          </div>

          <Line
            percent={
              Number(proposal[3]) < Number(blockNumber)
                ? Math.min(
                    ((Number(blockNumber) - Number(proposal[3])) /
                      Number(votingPeriod)) *
                      100,
                    100
                  )
                : 0
            }
            className="w-full"
            strokeColor="#primary_blue"
            trailColor="#A1D6E2"
            strokeWidth={1}
            trailWidth={1}
          />

          <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
            <h1 className="text-xs sm:text-sm">
              {localDict.startedAt ?? 'Started at'} {Number(proposal[3])}
            </h1>
            <h1 className="text-xs sm:text-sm">
              {localDict.endingAt ?? 'Ending at'} {Number(proposal[4])}
            </h1>
          </div>
        </div>

        {Number(proposal[2]) !== 0 && status === 'Queued' && (
          <div className="flex flex-col justify-between gap-2">
            <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
              <h1 className="text-sm sm:text-base">
                {localDict.timelockDelay ?? 'Timelock Delay'}
              </h1>
              <h1 className="text-xs sm:text-sm">
                {timestampToDate(Number(proposal[2]))}
              </h1>
            </div>

            <Line
              percent={
                Number(proposal[2]) > 0
                  ? Math.min(
                      ((getCurrentTimestamp() -
                        (Number(proposal[2]) - Number(timelockDelay))) *
                        100) /
                        Number(timelockDelay),
                      100
                    )
                  : 0
              }
              strokeColor="#1995AD"
              trailColor="#A1D6E2"
              strokeWidth={1}
              trailWidth={1}
            />

            <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
              <h1 className="text-xs sm:text-sm">
                {localDict.startedAt ?? 'Started at'}
                {Number(proposal[2]) > 0
                  ? timestampToDate(Number(proposal[2]) - Number(timelockDelay))
                  : '-'}
              </h1>
              <h1 className="text-xs sm:text-sm">
                {localDict.endingAt ?? 'Ending at'}
                {Number(proposal[2]) > 0
                  ? timestampToDate(Number(proposal[2]))
                  : 0}
              </h1>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-row sm:gap-4 w-full">
          <Button
            className="w-full"
            disabled={status !== 'Active'}
            onClick={async () => {
              await writeContract({
                abi: GOVERNOR_ABI,
                address: governorAddress as `0x${string}`,
                functionName: 'castVote',
                args: [proposal[0], true],
              })
            }}
          >
            {localDict.voteFor ?? 'Vote For'}
          </Button>
          <Button
            className="w-full"
            disabled={status !== 'Active'}
            onClick={async () => {
              await writeContract({
                abi: GOVERNOR_ABI,
                address: governorAddress as `0x${string}`,
                functionName: 'castVote',
                args: [proposal[0], false],
              })
            }}
          >
            {localDict.voteAgainst ?? 'Vote Against'}
          </Button>
          <Button
            className="w-full"
            disabled={status !== 'Succeeded'}
            onClick={async () => {
              await writeContract({
                abi: GOVERNOR_ABI,
                address: governorAddress as `0x${string}`,
                functionName: 'queue',
                args: [proposal[0]],
              })
            }}
          >
            {localDict.queue ?? 'Queue'}
          </Button>
          <Button
            className="w-full"
            disabled={
              Math.floor(Date.now() / 1000) < Number(proposal[2]) ||
              status !== 'Queued'
            }
            onClick={async () => {
              await writeContract({
                abi: GOVERNOR_ABI,
                address: governorAddress as `0x${string}`,
                functionName: 'execute',
                args: [proposal[0]],
              })
            }}
          >
            {localDict.execute ?? 'Execute'}
          </Button>
        </div>
      </div>
    </article>
  )

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const name = event.target.name
    const value = event.target.value
    if (name === 'values') {
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

  const resetSimulation = () => {
    setSimulationStatus('idle')
    setSimulationMessage('')
  }

  const resetCreateProposalForm = () => {
    setCategory('')
    setDescription('')
    setTokenAddress('')
    setValues('')
    setBytesCodes('')
    setVariable1('')
    setVariable2('')
    setVariable3('')
    setOptions(['', ''])
    setStartTime('')
    setEndTime('')
    setCustomActions(getInitialCustomActions())
    setSelectedActionIndex(0)
    resetSimulation()
  }

  const handleCreateProposalDialogOpenChange = (open: boolean) => {
    setIsCreateProposalDialogOpened(open)
    if (!open) {
      resetCreateProposalForm()
    }
  }

  const updateCustomAction = (
    index: number,
    updates: Partial<CustomAction>
  ) => {
    setCustomActions((prev) =>
      prev.map((action, i) =>
        i === index ? { ...action, ...updates } : action
      )
    )
  }

  const normalizeAbiJsonValue = (value: any) => {
    if (Array.isArray(value)) return value
    if (value && typeof value === 'object' && Array.isArray(value.abi)) {
      return value.abi
    }
    return null
  }

  const parseAbiJson = (abiJson: string) => {
    if (!abiJson.trim()) return null
    try {
      const parsed = JSON.parse(abiJson)
      return normalizeAbiJsonValue(parsed)
    } catch (error) {
      return null
    }
  }

  const handleCustomActionAbiFileUpload = async (
    index: number,
    file: File | null
  ) => {
    if (!file) return
    resetSimulation()
    try {
      const fileText = await file.text()
      const parsed = JSON.parse(fileText)
      const normalized = normalizeAbiJsonValue(parsed)
      if (!normalized) {
        updateCustomAction(index, {
          abiJson: '',
          abiFileName: file.name,
          abiError: 'Unsupported ABI file format.',
          functionSignature: '',
          args: [],
        })
        return
      }

      updateCustomAction(index, {
        abiJson: JSON.stringify(normalized, null, 2),
        abiFileName: file.name,
        abiError: '',
        functionSignature: '',
        args: [],
      })
    } catch (error) {
      updateCustomAction(index, {
        abiJson: '',
        abiFileName: file.name,
        abiError: 'Invalid ABI JSON file.',
        functionSignature: '',
        args: [],
      })
    }
  }

  const getFunctionFragments = (abiJson: string) => {
    const parsedAbi = parseAbiJson(abiJson)
    if (!parsedAbi) return []
    try {
      const iface = new ethers.Interface(parsedAbi)
      return iface.fragments.filter((fragment) => fragment.type === 'function')
    } catch (error) {
      return []
    }
  }

  const formatFunctionSignature = (fragment: any) => {
    const inputTypes = Array.isArray(fragment.inputs)
      ? fragment.inputs.map((input: any) => input.type).join(',')
      : ''
    return `${fragment.name}(${inputTypes})`
  }

  const getFunctionFragmentBySignature = (
    abiJson: string,
    signature: string
  ) => {
    if (!signature) return null
    const fragments = getFunctionFragments(abiJson)
    return (
      fragments.find(
        (fragment) => formatFunctionSignature(fragment) === signature
      ) ?? null
    )
  }

  const parseArrayValue = (raw: string, baseType: string) => {
    const trimmed = raw.trim()
    if (!trimmed) return []
    let values: any[] = []
    if (trimmed.startsWith('[')) {
      const parsed = JSON.parse(trimmed)
      if (!Array.isArray(parsed)) {
        throw new Error('Array inputs must be a JSON array')
      }
      values = parsed
    } else {
      values = trimmed
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)
    }
    return values.map((item) => parseArgValue(String(item), baseType))
  }

  const parseArgValue = (raw: string, type: string): any => {
    const trimmed = raw.trim()
    if (!trimmed && !type.endsWith(']')) {
      throw new Error('Missing input value')
    }
    if (type.endsWith(']')) {
      const baseType = type.replace(/\[[^\]]*\]$/, '')
      return parseArrayValue(raw, baseType)
    }
    if (type === 'bool') {
      if (trimmed === 'true' || trimmed === '1') return true
      if (trimmed === 'false' || trimmed === '0') return false
      throw new Error('Boolean values must be true or false')
    }
    if (type.startsWith('uint') || type.startsWith('int')) {
      try {
        return BigInt(trimmed)
      } catch (error) {
        throw new Error('Integer values must be whole numbers')
      }
    }
    return trimmed
  }

  const buildCustomActionPayloads = () => {
    if (customActions.length === 0) {
      throw new Error('Add at least one action')
    }

    const targets: `0x${string}`[] = []
    const values: bigint[] = []
    const signatures: string[] = []
    const calldatas: `0x${string}`[] = []
    const simulations: {
      abi: any[]
      address: `0x${string}`
      functionName: string
      args: any[]
      value: bigint
    }[] = []

    customActions.forEach((action, index) => {
      if (!ethers.isAddress(action.target)) {
        throw new Error(`Action #${index + 1}: invalid target address`)
      }
      const parsedAbi = parseAbiJson(action.abiJson)
      if (!parsedAbi) {
        throw new Error(`Action #${index + 1}: invalid ABI JSON`)
      }
      const fragment = getFunctionFragmentBySignature(
        action.abiJson,
        action.functionSignature
      )
      if (!fragment) {
        throw new Error(`Action #${index + 1}: select a contract method`)
      }

      const inputTypes = fragment.inputs.map((input: any) => input.type)
      const args = fragment.inputs.map((input: any, inputIndex: number) => {
        const rawValue = action.args[inputIndex] ?? ''
        if (!rawValue.trim()) {
          throw new Error(
            `Action #${index + 1}: missing value for ${
              input.name || `arg${inputIndex + 1}`
            }`
          )
        }
        return parseArgValue(rawValue, input.type)
      })

      const signature = formatFunctionSignature(fragment)
      const functionName = signature.split('(')[0] ?? ''
      if (!functionName) {
        throw new Error(`Action #${index + 1}: invalid contract method`)
      }
      const calldata = new ethers.AbiCoder().encode(inputTypes, args)

      let value = BigInt(0)
      if (action.value.trim()) {
        try {
          value = parseEther(action.value)
        } catch (error) {
          throw new Error(`Action #${index + 1}: invalid ETH value`)
        }
      }

      let simulationAbi = parsedAbi
      if (typeof fragment.format === 'function') {
        try {
          const fragmentJson = fragment.format('json')
          const fragmentEntry =
            typeof fragmentJson === 'string'
              ? JSON.parse(fragmentJson)
              : fragmentJson
          if (fragmentEntry) {
            simulationAbi = [fragmentEntry]
          }
        } catch (error) {
          simulationAbi = parsedAbi
        }
      }

      targets.push(action.target as `0x${string}`)
      values.push(value)
      signatures.push(signature)
      calldatas.push(calldata as `0x${string}`)
      simulations.push({
        abi: simulationAbi,
        address: action.target as `0x${string}`,
        functionName,
        args,
        value,
      })
    })

    return { targets, values, signatures, calldatas, simulations }
  }

  const handleSimulateCustomActions = async () => {
    resetSimulation()
    try {
      const { simulations } = buildCustomActionPayloads()
      for (const simulation of simulations) {
        await simulateContract(config, {
          abi: simulation.abi,
          address: simulation.address,
          functionName: simulation.functionName,
          args: simulation.args,
          value: simulation.value,
          account: address ?? undefined,
        })
      }
      setSimulationStatus('success')
      setSimulationMessage('Simulation succeeded.')
    } catch (error) {
      const message =
        error && typeof error === 'object' && 'shortMessage' in error
          ? String((error as BaseError).shortMessage)
          : error instanceof Error
            ? error.message
            : 'Simulation failed.'
      setSimulationStatus('error')
      setSimulationMessage(message)
    }
  }

  function handleSelect(value: any) {
    setCategory(value)
    resetSimulation()
  }

  const handleAddCustomAction = () => {
    const newAction: CustomAction = {
      id: createActionId(),
      target: '',
      value: '',
      abiJson: '',
      abiFileName: '',
      abiError: '',
      functionSignature: '',
      args: [],
    }
    setCustomActions((prev) => {
      const next = [...prev, newAction]
      setSelectedActionIndex(next.length - 1)
      return next
    })
    resetSimulation()
  }

  const handleRemoveCustomAction = (index: number) => {
    if (customActions.length <= 1) return
    setCustomActions((prev) => prev.filter((_, i) => i !== index))
    setSelectedActionIndex((current) => {
      if (current === index) return Math.max(0, index - 1)
      if (current > index) return current - 1
      return current
    })
    resetSimulation()
  }

  const handleSelectCustomAction = (index: number) => {
    setSelectedActionIndex(index)
    resetSimulation()
  }

  const handleCustomActionAbiChange = (index: number, value: string) => {
    const signature = customActions[index]?.functionSignature ?? ''
    const signatures = getFunctionFragments(value).map(formatFunctionSignature)
    const isSignatureValid = signature && signatures.includes(signature)
    updateCustomAction(index, {
      abiJson: value,
      abiFileName: '',
      abiError: '',
      functionSignature: isSignatureValid ? signature : '',
      args: isSignatureValid ? (customActions[index]?.args ?? []) : [],
    })
    resetSimulation()
  }

  const handleCustomActionFunctionChange = (
    index: number,
    signature: string
  ) => {
    const fragment = getFunctionFragmentBySignature(
      customActions[index]?.abiJson ?? '',
      signature
    )
    const nextArgs = fragment?.inputs?.map(() => '') ?? []
    updateCustomAction(index, { functionSignature: signature, args: nextArgs })
    resetSimulation()
  }

  const handleCustomActionArgChange = (
    actionIndex: number,
    argIndex: number,
    value: string
  ) => {
    setCustomActions((prev) => {
      const next = [...prev]
      const action = next[actionIndex]
      if (!action) return prev
      const args = [...action.args]
      args[argIndex] = value
      next[actionIndex] = { ...action, args }
      return next
    })
    resetSimulation()
  }

  const selectedAction = customActions[selectedActionIndex] ?? customActions[0]
  const selectedActionFunctions = selectedAction
    ? getFunctionFragments(selectedAction.abiJson)
    : []
  const selectedActionFragment =
    selectedAction && selectedAction.functionSignature
      ? getFunctionFragmentBySignature(
          selectedAction.abiJson,
          selectedAction.functionSignature
        )
      : null
  const isSelectedActionAbiInvalid =
    !!selectedAction?.abiError ||
    (!!selectedAction?.abiJson?.trim() && !parseAbiJson(selectedAction.abiJson))

  const { data: tokenVote, refetch: refetchGetTokenVote } = useReadContract({
    address: governanceTokenAddress as `0x${string}`,
    abi: PCE_C_GOV_TOKEN_ABI,
    functionName: 'getVotes',
    args: [address],
  }) as { data?: string; refetch: () => void }

  const { data: sbtVotingPower, refetch: refetchGetSBTVotingPower } =
    useReadContract({
      abi: SBT_ABI,
      address: sbtAddress as `0x${string}`,
      functionName: 'getVotes',
      args: [address],
    }) as { data?: string | bigint; refetch: () => void }

  const { data: nftVotingPower, refetch: refetchGetNFTVotingPower } =
    useReadContract({
      abi: SBT_ABI,
      address: nftAddress as `0x${string}`,
      functionName: 'getVotes',
      args: [address],
    }) as { data?: string | bigint; refetch: () => void }

  useEffect(() => {
    setGetVotes(
      toBigInt(tokenVote) + toBigInt(sbtVotingPower) + toBigInt(nftVotingPower)
    )
  }, [tokenVote, sbtVotingPower, nftVotingPower])

  useEffect(() => {
    let filtered = [
      ...multipleOptions.map((option) => ({
        type: 'multiple',
        data: option,
      })),
      ...proposals.map((proposal, index) => ({
        type: 'governor',
        data: proposal,
        status: proposalStatus[index],
        index,
      })),
    ]

    const getItemStatus = (item: {
      type: string
      data: any
      status?: string
    }) => (item.type === 'multiple' ? item.data?.status : item.status)

    if (statusFilter === 'active') {
      filtered = filtered.filter((item) => getItemStatus(item) === 'Active')
    } else if (statusFilter === 'ended') {
      filtered = filtered.filter((item) => {
        const status = getItemStatus(item)
        return status ? status !== 'Active' : false
      })
    }

    filtered.sort((a, b) => {
      const endA =
        a.type === 'multiple'
          ? Number(a.data.end)
          : typeof a.data?.[4] === 'bigint'
            ? Number(a.data?.[4])
            : Number(a.data?.[4] ?? 0)
      const endB =
        b.type === 'multiple'
          ? Number(b.data.end)
          : typeof b.data?.[4] === 'bigint'
            ? Number(b.data?.[4])
            : Number(b.data?.[4] ?? 0)
      return endB - endA
    })

    setFilteredProposals(filtered)
  }, [multipleOptions, proposals, proposalStatus, statusFilter])

  const { data: proposalCount, refetch: refetchProposalCount } =
    useReadContract({
      address: governorAddress as `0x${string}`,
      abi: GOVERNOR_ABI,
      functionName: 'proposalCount',
    }) as { data?: number; refetch: () => void }

  const { data: multipleProposalCount, refetch: refetchMultipleProposalCount } =
    useReadContract({
      address: multipleVotingAddress as `0x${string}`,
      abi: MULTIPLE_VOTINGS_ABI,
      functionName: 'proposalCount',
    }) as { data?: number; refetch: () => void }

  const fetchData = useCallback(
    async (count: number) => {
      setLoading(true)
      if (!count || !governorAddress || count === 0) {
        setProposals([])
        setStatus([])
        setLoading(false)
        return
      }

      let temp = []
      let _status = []
      for (let i = 1; i <= count; i++) {
        let proposal = null
        let status = null
        try {
          proposal = await readContract(config, {
            address: governorAddress as `0x${string}`,
            abi: GOVERNOR_ABI,
            functionName: 'proposals',
            args: [i],
          })

          status = await readContract(config, {
            address: governorAddress as `0x${string}`,
            abi: GOVERNOR_ABI,
            functionName: 'state',
            args: [i],
          })
        } catch (error) {
          i--
          continue
        }

        switch (status as number) {
          case 0:
            _status.push('Pending')
            temp.push(proposal)
            break
          case 1:
            _status.push('Active')
            temp.push(proposal)
            break
          case 2:
            _status.push('Canceled')
            temp.push(proposal)
            break
          case 3:
            _status.push('Defeated')
            temp.push(proposal)
            break
          case 4:
            _status.push('Succeeded')
            temp.push(proposal)
            break
          case 5:
            _status.push('Queued')
            temp.push(proposal)
            break
          case 6:
            _status.push('Expired')
            temp.push(proposal)
            break
          case 7:
            _status.push('Executed')
            temp.push(proposal)
            break
          default:
            break
        }
      }
      setProposals(temp)
      setStatus(_status)
      setLoading(false)
    },
    [governorAddress]
  )
  useEffect(() => {
    if (governorAddress) {
      fetchData(Number(proposalCount))
    }
  }, [fetchData, proposalCount, isConfirmed, governorAddress])

  useEffect(() => {
    async function fetchMultipleProposals() {
      const currentTimestamp = Math.floor(Date.now() / 1000)

      if (!multipleProposalCount || !address || !chainId || !currentTimestamp)
        return

      setLoading(true)
      let _multipleOptions = []
      for (let i = Number(multipleProposalCount); i > 0; i--) {
        const _proposalData = await readContract(config, {
          address: multipleVotingAddress as `0x${string}`,
          abi: MULTIPLE_VOTINGS_ABI,
          functionName: 'getProposal',
          args: [i.toString()],
          account: address,
        })

        const _optionVotes = await readContract(config, {
          address: multipleVotingAddress as `0x${string}`,
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
  }, [
    multipleProposalCount,
    address,
    chainId,
    isRefetching,
    multipleVotingAddress,
  ])

  useEffect(() => {
    const fetchIdenticon = async () => {
      if (governorAddress) {
        setIdenticon(await generateIdenteapot(id, ''))
      }
    }
    fetchIdenticon()
  }, [governorAddress, id])

  const handleCreateProposal = async () => {
    handleCreateProposalDialogOpenChange(false)
    setLoading(true)

    try {
      if (category.length === 0) {
        toast({
          title: localDict.selectCategoryPrompt ?? 'Please select a category',
        })
        setLoading(false)
        return
      }

      if (category === '7') {
        if (description === '') {
          toast({
            title:
              localDict.invalidDescription ??
              'Please enter a valid description',
          })
          setLoading(false)
          return
        }

        for (let i = 0; i < options.length; i++) {
          if (options[i] === '') {
            toast({
              title: localDict.invalidOption ?? 'Please enter a valid option',
            })
            setLoading(false)
            return
          }
        }

        const startTimeTimestamp = startTime
          ? Math.floor(new Date(startTime).getTime() / 1000)
          : 0
        const endTimeTimestamp = endTime
          ? Math.floor(new Date(endTime).getTime() / 1000)
          : 0

        const targetAddress = multipleVotingAddress as `0x${string}`

        try {
          const simulateResult = await simulateContract(config, {
            abi: MULTIPLE_VOTINGS_ABI,
            address: targetAddress,
            functionName: 'proposeMultipleChoice',
            args: [options, description, startTimeTimestamp, endTimeTimestamp],
          })
        } catch (error) {
          toast({ title: (error as BaseError).shortMessage })
          setLoading(false)
          return
        }

        try {
          const tx = await writeContractAsync({
            abi: MULTIPLE_VOTINGS_ABI,
            address: targetAddress,
            functionName: 'proposeMultipleChoice',
            args: [options, description, startTimeTimestamp, endTimeTimestamp],
          })

          await waitForTransactionReceipt(config, {
            hash: tx,
            confirmations: 1,
          })

          const { data: existingMember, error: memberFetchError } =
            await supabase
              .from('Members')
              .select('id')
              .eq('daoId', id)
              .eq('userAddr', address)
              .maybeSingle()

          if (!existingMember) {
            await supabase.from('Members').insert({
              daoId: id,
              userAddr: address,
              created_at: new Date().toISOString(),
            })
          }
        } catch (error) {
          console.error('Error creating proposal:', error)
          setLoading(false)
          return
        }

        refetchMultipleProposalCount()
        setIsRefetching(!isRefetching)
        setLoading(false)
        return
      }

      if (category === '3') {
        let payloads: ReturnType<typeof buildCustomActionPayloads>
        try {
          payloads = buildCustomActionPayloads()
        } catch (error) {
          const message =
            error instanceof Error
              ? error.message
              : 'Invalid custom action configuration.'
          toast({ title: message })
          setLoading(false)
          return
        }

        try {
          const proposeTx = await writeContractAsync({
            abi: GOVERNOR_ABI,
            address: governorAddress as `0x${string}`,
            functionName: 'propose',
            args: [
              payloads.targets,
              payloads.values,
              payloads.signatures,
              payloads.calldatas,
              description,
            ],
          })

          await waitForTransactionReceipt(config, {
            hash: proposeTx,
            confirmations: 1,
          })
        } catch (error) {
          console.error('Error creating proposal:', error)
          setLoading(false)
          return
        }
      } else {
        const resolvedTokenAddress =
          category === '1'
            ? pceAddress[chainId || defaultChainId]
            : tokenAddress
        const resolvedValues = category === '1' ? '0' : values

        if (
          (!resolvedTokenAddress || resolvedTokenAddress.length === 0) &&
          category !== '4' &&
          category !== '5' &&
          category !== '6'
        ) {
          toast({
            title:
              localDict.invalidTokenAddress ??
              'Please enter a valid token address',
          })
          setLoading(false)
          return
        }

        let _signature = 'approve(address,uint256)'
        let _value = '0'
        let _calldata = ''
        let _address: `0x${string}` | undefined

        if (category === '2') {
          _calldata = new ethers.AbiCoder().encode(
            ['address', 'uint256'],
            [address, parseEther(resolvedValues)]
          )
          _signature = 'transfer(address,uint256)'
          _address = resolvedTokenAddress as `0x${string}`
        } else if (category === '4') {
          _signature = 'deploy(bytes)'
          _calldata = new ethers.AbiCoder().encode(['bytes'], [bytescode])
          _address = daoStudioAddress[
            chainId || defaultChainId
          ] as `0x${string}`
        } else if (category === '5') {
          _address = timelockAddress as `0x${string}`
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
            [
              parseEther(variable1),
              parseEther(variable2),
              parseEther(variable3),
            ]
          )
        } else {
          _address = resolvedTokenAddress as `0x${string}`
          _calldata = new ethers.AbiCoder().encode(
            ['address', 'uint256'],
            [address, parseEther(resolvedValues)]
          )
        }

        const proposeTx = await writeContractAsync({
          abi: GOVERNOR_ABI,
          address: governorAddress as `0x${string}`,
          functionName: 'propose',
          args: [[_address], [_value], [_signature], [_calldata], description],
        })

        await waitForTransactionReceipt(config, {
          hash: proposeTx,
          confirmations: 1,
        })
      }
    } catch (error) {
      console.error('Error creating proposal:', error)
      setLoading(false)
      return
    }

    // const { data: proposal } = await supabase.from('Proposal').insert({
    //   daoId: id,
    //   category: category,
    //   tokenAddress: tokenAddress,
    //   amount: values,
    //   description: description,
    //   transferTo: category === '2' ? (address ?? '') : '',
    //   proposer: address,
    //   proposalId: Number(proposalCount) + 1,
    //   created_at: new Date().toISOString(),
    // })

    // Insert member if not exist
    const { data: existingMember, error: memberFetchError } = await supabase
      .from('Members')
      .select('id')
      .eq('daoId', id)
      .eq('userAddr', address)
      .maybeSingle()

    if (!existingMember) {
      await supabase.from('Members').insert({
        daoId: id,
        userAddr: address,
        created_at: new Date().toISOString(),
      })
    }

    refetchProposalCount()
    setLoading(false)
  }

  useEffect(() => {
    if (socialConfig && Array.isArray(socialConfig)) {
      setSocials({
        name: socialConfig[0] as string,
        website: socialConfig[1] as string,
        linkedin: socialConfig[2] as string,
        twitter: socialConfig[3] as string,
        telegram: socialConfig[4] as string,
      })
    }
  }, [socialConfig])

  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    abi: PCE_ABI,
    address: communityTokenAddress as `0x${string}`,
    functionName: 'allowance',
    args: [address, governanceTokenAddress as `0x${string}`],
  })

  const handleStake = async () => {
    if (stakingAmount === '' || stakingAmount === '0') {
      toast({
        title:
          votingPowerDict.pleaseEnterValidAmount ??
          'Please enter a valid amount',
      })
      return
    }

    const allowance = await readContract(config, {
      abi: PCE_ABI,
      address: communityTokenAddress as `0x${string}`,
      functionName: 'allowance',
      args: [address, governanceTokenAddress as `0x${string}`],
    })

    if (
      (BigInt(allowance as string) as bigint) <
      BigInt(parseEther(stakingAmount))
    ) {
      let tx
      try {
        tx = await writeContractAsync({
          abi: PCE_ABI,
          address: communityTokenAddress as `0x${string}`,
          functionName: 'approve',
          args: [
            governanceTokenAddress as `0x${string}`,
            parseEther(stakingAmount),
          ],
        })

        await waitForTransactionReceipt(config, {
          hash: tx,
          confirmations: 1,
        })
      } catch (error) {
        console.error('Error approving tokens:', error)

        return
      }
    }

    let tx
    try {
      tx = await writeContractAsync({
        abi: CommunityGov_ABI,
        address: governanceTokenAddress as `0x${string}`,
        functionName: 'deposit',
        args: [parseEther(stakingAmount)],
      })

      await waitForTransactionReceipt(config, {
        hash: tx,
        confirmations: 1,
      })
    } catch (error) {
      console.error('Error depositing tokens:', error)

      return
    }

    setStakingAmount('')

    refetchGovTokenBalance()
    refetchCommunityTokenBalance()
    refetchGetTokenVote()
  }

  const handleWithdraw = async () => {
    if (BigInt(governanceTokenBalance as string) > 0) {
      let tx
      try {
        tx = await writeContractAsync({
          abi: CommunityGov_ABI,
          address: governanceTokenAddress as `0x${string}`,
          functionName: 'withdraw',
          args: [governanceTokenBalance],
        })

        await waitForTransactionReceipt(config, {
          hash: tx,
          confirmations: 1,
        })
      } catch (error) {
        console.error('Error withdrawing tokens:', error)

        return
      }
      refetchGovTokenBalance()
      refetchCommunityTokenBalance()
      refetchGetTokenVote()
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

  const handleSelfDelegate = async () => {
    if (!address) {
      toast({ title: localDict.connectWallet ?? 'Connect your wallet' })
      return
    }

    setLoading(true)
    try {
      const tx = await writeContractAsync({
        abi: CommunityGov_ABI,
        address: governanceTokenAddress as `0x${string}`,
        functionName: 'delegate',
        args: [address],
      })

      await waitForTransactionReceipt(config, {
        hash: tx,
        confirmations: 1,
      })

      refetchGetTokenVote()
    } catch (error) {
      console.error('Error delegating voting power:', error)
    } finally {
      setLoading(false)
    }
  }

  useTransactionToast({
    error,
    isConfirmed,
    isConfirming,
    pendingMessage:
      votingPowerDict.txPending ?? 'Transaction Pending, Please Wait...',
    successMessage:
      votingPowerDict.transactionSucceed ?? 'Transaction Succeeded!',
  })

  useEffect(() => {
    const updateImage = async () => {
      if (!id || !croppedImage) return
      if (lastCroppedImageRef.current === croppedImage) return

      lastCroppedImageRef.current = croppedImage

      try {
        toast({
          title: localDict.updatingImage ?? 'Updating image...',
        })

        const file = await createFile(croppedImage, id || 'dao-image')
        const upload = await addFilesToGroupPublic(file, DAO_GROUP_ID)

        if (!upload?.cid) {
          toast({
            title: localDict.failedToUpdateImage ?? 'Failed to update image',
          })
          return
        }

        setImageHash(upload.cid)

        // Use up-to-date daoInfo for mutation
        const { data: dao, error: daoErr } = await supabase
          .from('DAO')
          .update({ image: upload.cid })
          .eq('daoId', id)
          .eq('environment', appDeploymentEnv)
          .select('*')
          .single()

        if (daoErr) {
          console.error('Error updating DAO image in Supabase:', daoErr)
          toast({
            title: localDict.failedToUpdateImage ?? 'Failed to update image',
          })
          return
        }

        // Only update state via setDaoInfo to avoid mutating react state directly
        setDaoInfo((prev: any) =>
          prev ? { ...prev, image: upload.cid } : prev
        )

        toast({
          title:
            localDict.imageUpdatedSuccessfully ?? 'Image updated successfully',
        })
      } catch (error) {
        console.error('Error updating image:', error)
        toast({
          title: localDict.failedToUpdateImage ?? 'Failed to update image',
        })
      }
    }

    if (croppedImage) {
      updateImage()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [croppedImage])

  const deleteImage = async () => {
    try {
      if (!id) return

      toast({
        title: localDict.deletingImage ?? 'Deleting image...',
      })
      const prevImages = await fetchImage(id)
      if (prevImages) {
        try {
          await revokeFile([prevImages.id])
        } catch (deleteError) {
          console.error('Error deleting from Pinata:', deleteError)
          // Continue with setting imageHash to empty even if delete fails
        }

        setImageHash('')

        toast({
          title:
            localDict.imageDeletedSuccessfully ?? 'Image deleted successfully',
        })
      }
    } catch (error) {
      console.error('Error deleting image:', error)
      toast({
        title: localDict.failedToDeleteImage ?? 'Failed to delete image',
      })
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          setSelectedImage(reader.result as string)
        }
      }
    }
  }

  return (
    <div className="w-full mx-auto items-center justify-center flex flex-col gap-4">
      <div className="flex flex-row w-full items-center gap-4 mt-8">
        <div className="relative group">
          {isImageLoading ? (
            <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary_blue"></div>
            </div>
          ) : imageHash ? (
            <Image
              src={`${Env.PINATA_GATEWAY_URL}/ipfs/${imageHash}`}
              alt={localDict.daoImageAlt ?? 'DAO Image'}
              width={96}
              priority
              height={96}
            />
          ) : (
            <>
              {identicon && (
                <Image
                  src={identicon}
                  alt={localDict.daoImageAlt ?? 'DAO Image'}
                  width={96}
                  height={96}
                />
              )}
            </>
          )}
          <div className="absolute inset-0 flex items-end justify-start opacity-0 group-hover:opacity-80 transition-opacity bg-black/50">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-full h-full bg-gray-200 gap-2 items-end justify-center flex p-2 hover:opacity-80 transition-opacity">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                    <path d="m15 5 4 4" />
                  </svg>
                  {localDict.edit ?? 'Edit'}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => {
                    if (daoInfo?.creator !== address) {
                      toast({
                        title:
                          localDict.notCreator ??
                          'You are not the creator of this DAO',
                        variant: 'destructive',
                      })
                      return
                    }

                    const fileInput = document.createElement('input')
                    fileInput.type = 'file'
                    fileInput.onchange = (e) => {
                      const event =
                        e as unknown as React.ChangeEvent<HTMLInputElement>
                      handleFileChange(event)
                    }
                    fileInput.click()
                  }}
                >
                  {localDict.edit ?? 'Edit'}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={async () => {
                    if (daoInfo?.creator !== address) {
                      toast({
                        title:
                          localDict.notCreator ??
                          'You are not the creator of this DAO',
                        variant: 'destructive',
                      })
                      return
                    }
                    await deleteImage()
                  }}
                >
                  {localDict.delete ?? 'Delete'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold">{daoInfo?.daoName}</h2>
          <span
            className="text-sm text-gray-500 mt-1 break-all flex flex-row items-center gap-2 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation()
              navigator.clipboard.writeText(id as string)
              toast({
                title: localDict.daoIdCopied ?? 'DAO ID copied!',
              })
            }}
          >
            {shortenAddress(id, 12)}
            <CopyIcon className="h-4 w-4 text-gray-400" />
          </span>
        </div>
      </div>
      {selectedImage && (
        <Dialog open={!!selectedImage}>
          <DialogContent>
            <ImageCropModal
              localDict={localDict}
              imageSrc={selectedImage}
              onClose={() => setSelectedImage(null)}
              onCropComplete={(cropped) => setCroppedImage(cropped)}
            />
          </DialogContent>
        </Dialog>
      )}
      <div className="flex flex-row w-full items-center">
        <Tabs defaultValue="about" className="w-full" value={tabContent}>
          <TabsList>
            <TabsTrigger value="about" onClick={() => setTabContent('about')}>
              {localDict.aboutDao}
            </TabsTrigger>
            <TabsTrigger value="all" onClick={() => setTabContent('all')}>
              {localDict.allProposals}
            </TabsTrigger>
            <TabsTrigger
              value="balance"
              onClick={() => setTabContent('balance')}
            >
              {localDict.balance}
            </TabsTrigger>
            <TabsTrigger
              value="holders"
              onClick={() => setTabContent('holders')}
            >
              {localDict.holders}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="about" className="">
            <div className="flex md:flex-row flex-col w-full gap-8 mt-4">
              <div className="flex flex-col w-full gap-4">
                <div className="flex flex-row gap-2 h-10 justify-center items-center">
                  <div className="flex flex-col w-full">
                    <PageSubHeaderSection
                      title={localDict.lastProposal ?? ''}
                    />
                  </div>

                  <Button
                    className="w-auto"
                    onClick={() => {
                      setIsCreateProposalDialogOpened(true)
                    }}
                  >
                    {localDict.createNewProposal}
                  </Button>
                </div>
                {[...multipleOptions]
                  .reverse()
                  .slice(0, 2)
                  .map((multipleOption) => (
                    <OptionsCard
                      key={`multiple-${multipleOption.pID}`}
                      multipleOptionProposalData={multipleOption}
                    />
                  ))}
                {[...proposals]
                  .reverse()
                  .slice(0, 2)
                  .map((proposal, index) => (
                    <ProposalCard
                      key={index}
                      proposal={proposal}
                      status={[...proposalStatus].reverse()[index]}
                      index={index}
                    />
                  ))}

                {proposals.length === 0 && multipleOptions.length === 0 && (
                  <div className="flex justify-center items-center p-4 bg-gray-100 rounded-xl text-gray-500">
                    {localDict.noProposals}
                  </div>
                )}
              </div>
              <div className="flex flex-col md:w-[40%] gap-4">
                <div className="flex flex-col h-10 justify-center">
                  <PageSubHeaderSection title={localDict.daoInfo ?? ''} />
                </div>
                <div className="flex flex-col border rounded-xl p-4 bg-gray-100 gap-2">
                  <div className="flex flex-row justify-between items-center rounded-xl mt-2 w-full">
                    <TooltipComponent
                      title={localDict.govenorToken ?? 'Governor Token'}
                      tooltipText={
                        localDict.tooltipGovernorToken ??
                        'A token that represents voting power in the DAO. Holders can vote on proposals and participate in governance decisions.'
                      }
                      className="font-bold rounded-xl flex"
                    />
                    <CustomLink.default
                      chainId={chainId}
                      type="address"
                      address={governanceTokenAddress}
                      message={shortenAddress(governanceTokenAddress)}
                    ></CustomLink.default>
                  </div>

                  <div className="flex flex-row justify-between items-center rounded-xl mt-2  w-full">
                    <TooltipComponent
                      title={localDict.timelock ?? 'Timelock'}
                      tooltipText={
                        localDict.tooltipTimelock ??
                        'A smart contract that adds a delay between when a proposal passes and when it can be executed. This delay gives token holders time to review and react to approved proposals before they take effect.'
                      }
                      className="font-bold rounded-xl flex"
                    />
                    <CustomLink.default
                      chainId={chainId}
                      type="address"
                      address={timelockAddress}
                      message={shortenAddress(timelockAddress)}
                    ></CustomLink.default>
                  </div>

                  <div className="flex flex-row justify-between items-center rounded-xl mt-2  w-full">
                    <TooltipComponent
                      title={localDict.governor ?? 'Governor'}
                      tooltipText={
                        localDict.tooltipGovernor ??
                        "The core contract that manages the DAO's governance process. It handles proposal creation, voting, and execution of approved proposals. This contract implements the rules and parameters for how governance works."
                      }
                      className="font-bold rounded-xl flex"
                    />
                    <CustomLink.default
                      chainId={chainId}
                      type="address"
                      address={governorAddress}
                      message={shortenAddress(governorAddress)}
                    ></CustomLink.default>
                  </div>

                  <div className="flex flex-row justify-between items-center rounded-xl mt-2  w-full">
                    <TooltipComponent
                      title={localDict.multipleVoting ?? 'Multiple Voting'}
                      tooltipText={
                        localDict.tooltipMultipleVoting ??
                        "The contract that manages the DAO's multiple voting process."
                      }
                      className="font-bold rounded-xl flex"
                    />
                    <CustomLink.default
                      chainId={chainId}
                      type="address"
                      address={multipleVotingAddress}
                      message={shortenAddress(multipleVotingAddress)}
                    ></CustomLink.default>
                  </div>

                  <div className="flex flex-row justify-between items-center rounded-xl mt-2  w-full">
                    <TooltipComponent
                      title={localDict.sbt ?? 'SBT'}
                      tooltipText={
                        localDict.tooltipSbt ??
                        'The SBT contract represents unique, self-sovereign tokens that can be issued by the DAO.'
                      }
                      className="font-bold rounded-xl flex"
                    />
                    <CustomLink.default
                      chainId={chainId}
                      type="address"
                      address={sbtAddress}
                      message={shortenAddress(sbtAddress)}
                    ></CustomLink.default>
                  </div>

                  <div className="flex flex-row justify-between items-center rounded-xl mt-2  w-full">
                    <TooltipComponent
                      title={localDict.nft ?? 'NFT'}
                      tooltipText={
                        localDict.tooltipNft ??
                        'The NFT contract represents unique, non-fungible tokens that can be issued by the DAO.'
                      }
                      className="font-bold rounded-xl flex"
                    />
                    <CustomLink.default
                      chainId={chainId}
                      type="address"
                      address={nftAddress}
                      message={shortenAddress(nftAddress)}
                    ></CustomLink.default>
                  </div>
                </div>

                <div className="flex flex-col border rounded-xl p-4 bg-gray-100 gap-4">
                  <div className="flex flex-row justify-between items-center">
                    <TooltipComponent
                      title={localDict.voteDelay ?? 'Vote Delay'}
                      tooltipText={
                        localDict.tooltipVoteDelay ??
                        'The number of blocks that must pass between when a proposal is created and when voting begins. This delay gives token holders time to research and discuss the proposal before voting starts.'
                      }
                      className="font-bold rounded-xl flex"
                    />
                    <FormattedValue value={votingDelay} />
                  </div>
                  <div className="flex flex-row justify-between items-center">
                    <TooltipComponent
                      title={localDict.votingPeriod ?? 'Voting Period'}
                      tooltipText={
                        localDict.tooltipVotingPeriod ??
                        "The duration (in blocks) during which token holders can cast their votes on a proposal. Once this period ends, no more votes can be cast and the proposal's outcome is determined based on the votes received."
                      }
                      className="font-bold rounded-xl flex"
                    />
                    <FormattedValue value={votingPeriod} />
                  </div>
                  <div className="flex flex-row justify-between items-center">
                    <TooltipComponent
                      title={localDict.timelockDelay ?? 'Timelock Delay'}
                      tooltipText={
                        localDict.tooltipTimelockDelay ??
                        'The mandatory waiting period between when a proposal passes and when it can be executed. This delay gives token holders time to prepare for the changes and exit the protocol if they disagree with a passed proposal. Longer delays provide more security but reduce governance agility.'
                      }
                      className="font-bold rounded-xl flex"
                    />

                    <FormattedValue value={timelockDelay} />
                  </div>
                  <div className="flex flex-row justify-between items-center">
                    <TooltipComponent
                      title={
                        localDict.proposalThreshold ?? 'Proposal Threshold'
                      }
                      tooltipText={
                        localDict.tooltipProposalThreshold ??
                        'The minimum number of votes a delegate must have to create a proposal. This threshold ensures that only members with sufficient stake in the DAO can initiate governance actions.'
                      }
                      className="font-bold rounded-xl flex"
                    />

                    <FormattedValue
                      value={proposalThreshold}
                      formatter={(val) => formatEther(val as string)}
                    />
                  </div>

                  <div className="flex flex-row gap-4 justify-between items-center">
                    <TooltipComponent
                      title={localDict.quorum ?? 'Quorum Votes'}
                      tooltipText={
                        localDict.tooltipQuorum ??
                        "The minimum number of votes required for a proposal to be considered valid. This ensures that major decisions have sufficient participation from the community. If a proposal doesn't reach the quorum threshold, it fails regardless of the voting outcome."
                      }
                      className="font-bold rounded-xl flex"
                    />
                    <FormattedValue
                      value={quorum}
                      formatter={(val) => formatEther(BigInt(val as string))}
                    />
                  </div>
                </div>

                <div className="flex flex-row justify-between items-center border rounded-xl p-4 bg-gray-100">
                  <TooltipComponent
                    title={localDict.myPower ?? 'My Power'}
                    tooltipText={
                      localDict.tooltipMyPower ??
                      'Your current voting power in this DAO, determined by the number of governance tokens you hold or have been delegated. This power allows you to vote on proposals and create new ones if you meet the proposal threshold.'
                    }
                    className="font-bold rounded-xl flex"
                  />
                  <FormattedValue
                    value={getVotes ?? '0'}
                    formatter={(val) => formatEther(val as string)}
                  />
                </div>

                <StatsSection tvl="$0" members="0%" />

                <div className="flex flex-col border rounded-xl p-4 gap-4 bg-gray-100">
                  <h1 className="font-bold rounded-xl  flex">
                    {localDict.createdAt ?? 'Created at'}{' '}
                    {daoInfo?.created_at
                      ? new Date(daoInfo?.created_at).toLocaleString()
                      : '-'}
                  </h1>
                </div>
                <div className="flex flex-col border rounded-xl p-4 gap-4 mb-40 bg-gray-100">
                  <div className="flex flex-row justify-between items-center mb-2">
                    <h1 className="font-bold">
                      {localDict.social ?? 'Social:'}
                    </h1>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-auto"
                      onClick={() => {
                        setIsEditingSocials(!isEditingSocials)
                        setEditingSocials(socials)
                      }}
                    >
                      {isEditingSocials
                        ? (localDict.cancel ?? 'Cancel')
                        : (localDict.edit ?? 'Edit')}
                    </Button>
                  </div>

                  {isEditingSocials ? (
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">
                          {localDict.website ?? 'Website:'}
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
                          {localDict.linkedin ?? 'LinkedIn'}
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
                        <label className="text-sm font-medium">
                          {localDict.twitter ?? 'Twitter'}
                        </label>
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
                          {localDict.telegram ?? 'Telegram'}
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
                        >
                          {isEditingSocials
                            ? (localDict.saving ?? 'Saving...')
                            : (localDict.saveChanges ?? 'Save Changes')}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setIsEditingSocials(false)
                            setEditingSocials({
                              website: socials.website,
                              linkedin: socials.linkedin,
                              twitter: socials.twitter,
                              telegram: socials.telegram,
                            })
                          }}
                          className="flex-1"
                        >
                          {localDict.cancel ?? 'Cancel'}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-row justify-between items-center">
                        <span className="font-medium">
                          {localDict.daoSiteLabel ?? 'DAO Site:'}
                        </span>
                        <Link
                          href={
                            socials.website
                              ? socials.website
                              : 'https://website.com'
                          }
                          className="text-primary_blue hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {socials.website
                            ? socials.website
                            : (localDict.notSet ?? 'Not set')}
                        </Link>
                      </div>

                      <div className="flex flex-row justify-between items-center">
                        <span className="font-medium">
                          {(localDict.linkedin ?? 'LinkedIn') + ':'}
                        </span>
                        <Link
                          href={
                            socials.linkedin
                              ? socials.linkedin
                              : 'https://www.linkedin.com/'
                          }
                          className="text-primary_blue hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {socials.linkedin
                            ? socials.linkedin
                            : (localDict.notSet ?? 'Not set')}
                        </Link>
                      </div>

                      <div className="flex flex-row justify-between items-center">
                        <span className="font-medium">
                          {(localDict.twitter ?? 'Twitter') + ':'}
                        </span>
                        <Link
                          href={
                            socials.twitter
                              ? socials.twitter
                              : 'https://twitter.com'
                          }
                          className="text-primary_blue hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {socials.twitter
                            ? socials.twitter
                            : (localDict.notSet ?? 'Not set')}
                        </Link>
                      </div>

                      <div className="flex flex-row justify-between items-center">
                        <span className="font-medium">
                          {(localDict.telegram ?? 'Telegram') + ':'}
                        </span>
                        <Link
                          href={
                            socials.telegram
                              ? socials.telegram
                              : 'https://t.me/'
                          }
                          className="text-primary_blue hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {socials.telegram
                            ? socials.telegram
                            : (localDict.notSet ?? 'Not set')}
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="all">
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

              <div className="flex flex-col mt-4 gap-4 w-full">
                {filteredProposals.length > 0 ? (
                  filteredProposals.map((item) =>
                    item.type === 'multiple' ? (
                      <OptionsCard
                        key={`multiple-${item.data.pID}`}
                        multipleOptionProposalData={item.data}
                      />
                    ) : (
                      <ProposalCard
                        key={`proposal-${item.index}`}
                        proposal={item.data}
                        status={item.status}
                        index={item.index}
                      />
                    )
                  )
                ) : (
                  <div className="flex justify-center items-center p-4 bg-gray-100 rounded-xl text-gray-500">
                    {localDict.noProposals ?? 'No proposals at the moment'}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="balance">
            <div className="flex flex-col md:flex-row mt-4 gap-4 ">
              <div className="flex flex-col w-full">
                <PageSubHeaderSection
                  title={localDict.treasury ?? 'Treasury'}
                />
                <div className="rounded-xl flex border mt-4 flex-col w-full gap-4 p-4">
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
                      {treasuryBalances.length > 0 ? (
                        treasuryBalances.map((token, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-bold">
                              {token.name === '' ? 'PCE TEST' : token.name}
                            </TableCell>
                            <TableCell className="font-bold">
                              <FormattedValue
                                value={BigInt(token.tokenBalance).toString()}
                                formatter={(val) => formatEther(val as string)}
                                inline
                              />{' '}
                              {token.symbol === '' ? 'PCE TEST' : token.symbol}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={2} className="text-center">
                            {localDict.noTokensFound ?? 'No tokens found'}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
              <div className="flex flex-col w-full md:w-[40%]">
                <PageSubHeaderSection
                  title={localDict.daoBalance ?? 'DAO Balance'}
                />
                <div className="flex flex-col justify-between border rounded-xl p-4 mt-4 gap-4 bg-gray-100">
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
                          {localDict.tokenAddressToDeposit ??
                            'Token address to deposit'}
                        </DialogDescription>
                        <Input
                          onChange={(e) => setTokenAddress(e.target.value)}
                          placeholder={localDict.address ?? 'Address'}
                        />
                        <DialogTitle>
                          {localDict.amount ?? 'Amount'}
                        </DialogTitle>
                        <DialogDescription>
                          {localDict.amountToDeposit ?? 'Amount to deposit'}
                        </DialogDescription>
                        <Input
                          onChange={(e) => setTransferAmount(e.target.value)}
                          placeholder={localDict.amount ?? 'Amount'}
                        />
                        <Button
                          className="w-full"
                          onClick={async () => {
                            await writeContract({
                              abi: PCE_ABI,
                              address: tokenAddress as `0x${string}`,
                              functionName: 'transfer',
                              args: [
                                timelockAddress as `0x${string}`,
                                parseEther(transferAmount),
                              ],
                            })

                            setTokenAddress('')
                            setTransferAmount('')
                            setIsDepositDialogOpened(!isDepositDialogOpened)
                          }}
                        >
                          {localDict.deposit ?? 'Deposit'}
                        </Button>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* <div className="flex flex-col justify-between border rounded-xl p-4 mt-4 gap-4 bg-gray-100">
                  <h1 className="font-bold rounded-xl flex">DAO Delegated</h1>
                  <div className="flex flex-row justify-between">
                    <h1 className="font-bold rounded-xl  flex">
                      DAO Delegated to
                    </h1>
                    <h1 className="font-bold rounded-xl  flex">$0</h1>
                  </div>

                  <div className="flex flex-row justify-between">
                    <h1 className="font-bold rounded-xl  flex">
                      Historical Rewards Earned
                    </h1>
                    <h1 className="font-bold rounded-xl flex">$0</h1>
                  </div>

                  <div className="flex flex-row justify-between">
                    <h1 className="font-bold rounded-xl flex">
                      Available to claim
                    </h1>
                    <h1 className="font-bold rounded-xl  flex">$0</h1>
                  </div>
                </div> */}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="holders" className="w-full">
            <div className="flex flex-col mt-4 gap-4">
              <div className="flex flex-col w-full gap-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
                  <div className="rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
                    <div className="text-center mb-6">
                      <PageHeaderSection
                        title={
                          votingPowerDict.stakeYourCommunityTokens ??
                          'Stake your community tokens'
                        }
                        description={
                          votingPowerDict.stakeDescription ??
                          'Start earning by staking your tokens in the pool.'
                        }
                      />
                    </div>

                    <div className="gap-4">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-center sm:text-left gap-1 rounded-lg py-4">
                        <span className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 w-full">
                          {votingPowerDict.tokenBalance ?? 'Token Balance'}
                        </span>
                        <span className="text-lg font-semibold text-blue-600 dark:text-blue-400 w-full text-right">
                          {communityTokenBalance
                            ? formatNumber(
                                parseFloat(
                                  formatEther(toBigInt(communityTokenBalance))
                                )
                              )
                            : '0'}{' '}
                          {communityTokenSymbol ?? 'TOKEN'}
                        </span>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-center sm:text-left gap-1 rounded-lg pb-4">
                        <span className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 w-full">
                          {votingPowerDict.amountStaked ?? 'Amount Staked'}
                        </span>
                        <span className="text-lg font-semibold text-purple-600 dark:text-purple-400 w-full text-right">
                          {governanceTokenBalance
                            ? formatNumber(
                                parseFloat(
                                  formatEther(toBigInt(governanceTokenBalance))
                                )
                              )
                            : '0'}{' '}
                          {communityTokenSymbol ?? 'TOKEN'}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <Input
                          type="number"
                          min="0"
                          placeholder={
                            votingPowerDict.enterAmount ?? 'Enter amount'
                          }
                          value={stakingAmount}
                          onChange={(e) => setStakingAmount(e.target.value)}
                          className="w-full"
                        />
                      </div>

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
                          onClick={handleSelfDelegate}
                        >
                          {votingPowerDict.delegate ?? 'Delegate'}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
                    <div className="text-center space-y-4">
                      <PageHeaderSection
                        title={
                          votingPowerDict.myVotingPower ?? 'My Voting Power'
                        }
                        description={''}
                      />

                      <div className="text-3xl sm:text-4xl font-bold text-teal-600 dark:text-teal-400 mb-4">
                        {getVotes
                          ? formatNumber(
                              Number(formatEther(getVotes as bigint))
                            )
                          : '0'}
                      </div>

                      <div className="space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-center sm:text-left">
                          <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300 w-full">
                            {votingPowerDict.delegationPower ??
                              'Delegation Power'}
                          </span>
                          <span className="text-sm sm:text-base font-semibold text-gray-800 dark:text-white w-full text-right">
                            {tokenVote
                              ? formatNumber(
                                  parseFloat(formatEther(toBigInt(tokenVote)))
                                )
                              : '0'}
                          </span>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-center sm:text-left">
                          <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300 w-full">
                            {votingPowerDict.sbtVotingPower ??
                              'SBT Voting Power'}
                          </span>
                          <span className="text-sm sm:text-base font-semibold text-gray-800 dark:text-white w-full text-right">
                            {sbtVotingPower
                              ? formatNumber(
                                  Number(formatEther(toBigInt(sbtVotingPower)))
                                )
                              : '0'}
                          </span>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-center sm:text-left">
                          <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300 w-full">
                            {votingPowerDict.nftVotingPower ??
                              'NFT Voting Power'}
                          </span>
                          <span className="text-sm sm:text-base font-semibold text-gray-800 dark:text-white w-full text-right">
                            {nftVotingPower
                              ? formatNumber(
                                  Number(formatEther(toBigInt(nftVotingPower)))
                                )
                              : '0'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 my-6 text-center sm:text-left">
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white w-full">
                        {votingPowerDict.votingPowerAndInfo ??
                          'Voting Power & Info'}
                      </h2>
                      <span className="text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {votingPowerDict.active ?? 'Active'}
                      </span>
                    </div>

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
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <Dialog
        open={isCreateProposalDialogOpened}
        onOpenChange={handleCreateProposalDialogOpenChange}
      >
        <DialogContent className="max-h-[85vh] overflow-y-auto">
          <DialogTitle>
            {localDict.createProposal ?? 'Create a Proposal'}
          </DialogTitle>
          <DialogDescription>
            {localDict.configureProposalHelp ??
              'Configure the proposal details below'}
          </DialogDescription>
          <div className="flex flex-col gap-4 mt-4 mb-2">
            <Select onValueChange={handleSelect}>
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder={localDict.selectACategory ?? 'Select a category'}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">{dict?.submit?.category1}</SelectItem>
                <SelectItem value="2">{dict?.submit?.category2}</SelectItem>
                <SelectItem value="4">{dict?.submit?.category4}</SelectItem>
                <SelectItem value="5">{dict?.submit?.category5}</SelectItem>
                <SelectItem value="6">{dict?.submit?.category6}</SelectItem>
                <SelectItem value="7">{dict?.submit?.category7}</SelectItem>
                <SelectItem value="3">{dict?.submit?.category3}</SelectItem>
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
                      localDict.enterDescription ?? 'Enter proposal description'
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
                  <label className="text-sm font-medium">
                    {localDict.optionsLabel ?? 'Options'}
                  </label>
                  <div className="flex flex-col gap-3">
                    {options.map((option, index) => (
                      <div
                        key={index}
                        className="flex flex-row gap-2 items-center"
                      >
                        <Input
                          placeholder={`${localDict.optionLabel ?? 'Option'} ${
                            index + 1
                          }`}
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
                      {localDict.addOption ?? 'Add Option'}
                    </Button>
                  </div>
                </div>
              </div>
            ) : category === '3' ? (
              <div className="w-full flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">
                    {localDict.proposalText ?? 'Proposal text'}
                  </label>
                  <p className="text-xs text-gray-500">
                    {localDict.proposalTextHelp ??
                      'Explain what this proposal does and why it matters.'}
                  </p>
                  <Textarea
                    className="max-sm:h-60 h-40 w-full align-center p-3 rounded-md border-[1px] border-gray94"
                    placeholder={
                      localDict.enterDescription ?? 'Enter proposal description'
                    }
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-sm font-semibold">
                        {localDict.actionsLabel ?? 'Actions'}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {localDict.actionsHelp ??
                          'Add one or more on-chain actions this proposal will execute.'}
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleAddCustomAction}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      {localDict.addAction ?? 'Add Action'}
                    </Button>
                  </div>

                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {customActions.map((action, index) => (
                      <button
                        key={action.id}
                        type="button"
                        onClick={() => handleSelectCustomAction(index)}
                        className={`min-w-[170px] rounded-lg border px-3 py-2 text-left transition-colors ${
                          index === selectedActionIndex
                            ? 'border-primary_blue bg-primary_blue/10'
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      >
                        <div className="text-sm font-semibold">{`Action #${index + 1}`}</div>
                        <div className="text-xs text-gray-500">
                          {action.functionSignature
                            ? action.functionSignature
                            : (localDict.customAction ?? 'Custom action')}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-6 rounded-xl border bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-semibold">
                        {`Action #${selectedActionIndex + 1}`}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {localDict.configureAction ??
                          'Choose a target contract and method.'}
                      </p>
                    </div>
                    {customActions.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() =>
                          handleRemoveCustomAction(selectedActionIndex)
                        }
                      >
                        {localDict.removeAction ?? 'Remove action'}
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium">
                        {localDict.targetContractAddress ??
                          'Target contract address'}
                      </label>
                      <Input
                        value={selectedAction?.target ?? ''}
                        onChange={(e) => {
                          updateCustomAction(selectedActionIndex, {
                            target: e.target.value,
                          })
                          resetSimulation()
                        }}
                        placeholder="0x..."
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium">
                        {localDict.ethValueOptional ?? 'ETH value (optional)'}
                      </label>
                      <Input
                        type="number"
                        min="0"
                        step="0.0001"
                        placeholder="0"
                        value={selectedAction?.value ?? ''}
                        onChange={(e) => {
                          updateCustomAction(selectedActionIndex, {
                            value: e.target.value,
                          })
                          resetSimulation()
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 rounded-lg border bg-gray-50 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-gray-800">
                          {localDict.abiJson ?? 'ABI'}
                        </p>
                        <p className="text-xs text-gray-500">
                          {localDict.uploadAbiHelp ??
                            'Upload your ABI file to list available methods.'}
                        </p>
                      </div>
                      <label className="inline-flex items-center gap-2 rounded-md border bg-white px-3 py-2 text-xs font-semibold text-gray-700 cursor-pointer hover:bg-gray-100">
                        {localDict.chooseFile ?? 'Choose file'}
                        <input
                          type="file"
                          accept=".json,application/json"
                          className="hidden"
                          onChange={(e) =>
                            handleCustomActionAbiFileUpload(
                              selectedActionIndex,
                              e.target.files?.[0] ?? null
                            )
                          }
                        />
                      </label>
                    </div>
                    <div className="text-xs text-gray-500">
                      {selectedAction?.abiFileName
                        ? selectedAction.abiFileName
                        : (localDict.noFileSelected ?? 'No file selected')}
                    </div>

                    <details className="rounded-lg border bg-white px-3 py-2">
                      <summary className="cursor-pointer text-xs font-medium text-gray-600">
                        {localDict.pasteAbiOptional ??
                          'Paste ABI JSON (advanced)'}
                      </summary>
                      <Textarea
                        className="mt-3 max-sm:h-40 h-32 w-full align-center p-2 rounded-md border-[1px] border-gray94 bg-white"
                        value={selectedAction?.abiJson ?? ''}
                        onChange={(e) =>
                          handleCustomActionAbiChange(
                            selectedActionIndex,
                            e.target.value
                          )
                        }
                        placeholder='[{"inputs":[],"name":"...","type":"function"}]'
                      />
                    </details>

                    {isSelectedActionAbiInvalid && (
                      <p className="text-sm text-red-600">
                        {selectedAction?.abiError ||
                          localDict.invalidAbi ||
                          'Invalid ABI JSON.'}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">
                      {localDict.contractMethod ?? 'Contract method'}
                    </label>
                    <Select
                      value={selectedAction?.functionSignature ?? ''}
                      onValueChange={(value) =>
                        handleCustomActionFunctionChange(
                          selectedActionIndex,
                          value
                        )
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder={
                            localDict.selectMethod ?? 'Select a method'
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedActionFunctions.map((fragment) => {
                          const signature = formatFunctionSignature(fragment)
                          return (
                            <SelectItem key={signature} value={signature}>
                              {signature}
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedActionFragment?.inputs?.length ? (
                    <div className="flex flex-col gap-3">
                      <label className="text-sm font-medium">
                        {localDict.calldatas ?? 'Inputs'}
                      </label>
                      {selectedActionFragment.inputs.map(
                        (input: any, inputIndex: number) => (
                          <div
                            key={`${input.name}-${inputIndex}`}
                            className="flex flex-col gap-1"
                          >
                            <label className="text-xs text-gray-500">
                              {input.name
                                ? `${input.name} (${input.type})`
                                : input.type}
                            </label>
                            <Input
                              value={selectedAction?.args?.[inputIndex] ?? ''}
                              onChange={(e) =>
                                handleCustomActionArgChange(
                                  selectedActionIndex,
                                  inputIndex,
                                  e.target.value
                                )
                              }
                              placeholder={input.type}
                            />
                          </div>
                        )
                      )}
                    </div>
                  ) : selectedAction?.functionSignature ? (
                    <p className="text-sm text-gray-500">
                      {localDict.noInputsRequired ?? 'No inputs required.'}
                    </p>
                  ) : null}

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">
                      {localDict.simulationLabel ?? 'Simulation'}
                    </label>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleSimulateCustomActions}
                    >
                      {localDict.simulateTransaction ?? 'Simulate transaction'}
                    </Button>
                    {simulationMessage && (
                      <p
                        className={`text-sm ${
                          simulationStatus === 'success'
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}
                      >
                        {simulationMessage}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full flex flex-col gap-4">
                <Input
                  className={`${category == '1' || category == '4' || category == '5' || category == '6' ? 'hidden' : ''}`}
                  onChange={(e) => setTokenAddress(e.target.value)}
                  placeholder={localDict.address ?? 'Address'}
                />

                <Input
                  className={`${category == '1' || category == '4' || category == '5' || category == '6' ? 'hidden' : ''}`}
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
                  name="bytescode"
                  onChange={handleChange}
                />
              </div>
            )}

            <Button onClick={handleCreateProposal}>
              {localDict.create ?? 'Create'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Proposal Detail Dialog - Single shared instance */}
      <Dialog
        open={isProposalDetailDialogOpened}
        onOpenChange={(open) => {
          setIsProposalDetailDialogOpened(open)
          if (!open) {
            setSelectedProposalIndex(null)
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {localDict.proposalDetails ?? 'Proposal Details'}
            </DialogTitle>
            <DialogDescription>
              {selectedProposalIndex !== null &&
              proposals[selectedProposalIndex] ? (
                <div className="flex flex-col gap-2">
                  <h1>
                    {localDict.proposalId ?? 'Proposal ID'}:{' '}
                    {selectedProposalIndex + 1}
                  </h1>
                  <h1>
                    {localDict.proposalDescription ?? 'Proposal Description'}:{' '}
                    {proposals[selectedProposalIndex][9]}
                  </h1>
                </div>
              ) : null}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <LoadingOverlay isLoading={loading} />
    </div>
  )
}
