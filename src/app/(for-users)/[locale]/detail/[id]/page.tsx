'use client'

import { CopyIcon } from 'lucide-react'
import { useEffect, useState, useMemo, useRef } from 'react'
import Link from 'next/link'
import * as CustomLink from '~/components/custom/Link'
import Image from 'next/image'
import RingLoader from 'react-spinners/RingLoader'
import { ringStyle } from '~/app/constants/styles'
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
import { readContract } from '@wagmi/core'

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
import { getDict } from '~/i18n/get-dict'

import { Dictionary, Locale } from '~/i18n/types'

import { formatString, shortenAddress } from '~/components/utils'
import { PCE_ABI } from '~/app/ABIs/PCEToken'
// import { Textarea } from '~/components/ui/textarea'
import { config } from '~/lib/config'
import { TIMELOCK_ABI } from '~/app/ABIs/Timelock'
import { TooltipComponent } from '~/components/custom/TooltipComponent'
import { CommunityGov_ABI } from '~/app/ABIs/CommunityGov'
import { defaultChainId } from '~/app/constants/constants'
import { waitForTransactionReceipt } from '@wagmi/core'
import { daoStudioAddress } from '~/app/constants/constants'
import { useBlockNumber, useBlock } from 'wagmi'
import { pinata } from '~/lib/config'
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
import { DAO_FACTORY_ABI } from '~/app/ABIs/DAOFactory'
import { DialogTrigger } from '~/components/ui/dialog'
import { AmountInput } from '~/components/custom/amount-input'
import { GOVERNOR_ABI } from '~/app/ABIs/Governor'
import {
  addFilesToGroupPublic,
  DAO_GROUP_ID,
  getFilesFromGroup,
} from '~/app/pinata/pinataAPI'
import { PageSubHeaderSection } from '~/components/custom/page-sub-header-section'

type Proposal = {
  id: number
  description: string
  status: string
}

type TokenBalance = {
  contractAddress: string
  tokenBalance: number
  name: string
  symbol: string
  decimals: number
  logo: string
}

export default function ForDaoDetailPage({
  params,
}: {
  params: { locale: Locale }
}) {
  const { locale } = params
  const { toast } = useToast()
  const supabase = createClient()

  const [dict, setDict] = useState<Dictionary | null>(null)
  const localDict = useMemo(() => dict?.daoInfo ?? {}, [dict])

  const [delegateAddr, setDelegateAddr] = useState('')
  const [transferAddr, setTransferAddr] = useState('')
  const [description, setDescription] = useState('')
  const [transferAmount, setTransferAmount] = useState('')
  const [tokenAddress, setTokenAddress] = useState('')
  const [imageHash, setImageHash] = useState('')

  const [id, setId] = useState('')

  const [proposals, setProposals] = useState<any[]>([])
  const [proposalStatus, setStatus] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const [category, setCategory] = useState('')

  const [stakingAmount, setStakingAmount] = useState('')

  const [isDelegateDialogOpened, setIsDelegateDialogOpened] = useState(false)
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
  const imageLoadedRef = useRef(false)
  const lastToastStateRef = useRef<{
    isConfirmed?: boolean
    isConfirming?: boolean
    error?: any
  }>({})
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
  const { data: blockNumber } = useBlockNumber()
  const { data: block } = useBlock({
    blockNumber,
  })

  const getTreasuryBalances = async (address: string) => {
    // Fetch ERC20 token balances for the given address using Moralis API
    const url = `https://deep-index.moralis.io/api/v2.2/${address}/erc20?chain=eth`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'X-API-Key': Env.MORALIS_API_KEY,
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch ERC20 balances: ${response.statusText}`)
    }

    const balances = await response.json()

    const formatedBalances = (await Promise.all(
      balances.map(async (balance: any) => ({
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
      const pceFiles = files.filter((file: any) => file.name == name)

      if (pceFiles.length > 0) {
        return pceFiles[0]
      }
      return ''
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
        .single()

      if (dao) {
        setImageHash(dao.image)
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

  const DelegateDialog = ({
    isOpen,
    onOpenChange,
    delegateAddr,
    localDict,
    handleDelegate,
  }: {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    delegateAddr: string
    localDict: any
    handleDelegate: () => void
  }) => (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{localDict.delegate ?? 'Delegate'}</DialogTitle>
          <DialogDescription>
            Enter the address to delegate your voting power
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 mt-4">
          <Input
            placeholder={localDict.enterAddress ?? 'Enter address'}
            value={delegateAddr}
            name="delegateAddr"
            onChange={(e) => setDelegateAddr(e.target.value)}
          />
          <div>
            <Button onClick={handleDelegate}>
              {localDict.delegate ?? 'Delegate'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )

  // Handle updating DAO social links
  const handleUpdateSocials = async () => {
    setIsEditingSocials(false)

    if (!id) {
      toast({
        title: 'Error',
        description: 'DAO ID not found. Please refresh the page and try again.',
        variant: 'destructive',
      })
      return
    }

    if (!chainId || !daoStudioAddress[chainId]) {
      toast({
        title: 'Error',
        description:
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
        confirmations: 2,
      })

      await refetchSocialConfig()
    } catch (error) {
      console.error('Error updating social links:', error)

      let errorMessage = 'Failed to update social links. Please try again.'
      if (error instanceof Error) {
        errorMessage = error.message
      }

      toast({
        title: localDict.errorUpdatingSocials ?? 'Error updating social links',
        description: errorMessage,
        variant: 'destructive',
      })
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

  const { data: timelockAddress, refetch: refetchTimelockAddress } =
    useReadContract({
      address: daoStudioAddress[chainId || defaultChainId] as `0x${string}`,
      abi: DAO_FACTORY_ABI,
      functionName: 'timelock',
      args: [id],
    }) as { data?: string; refetch: () => void }

  // useEffect(() => {
  //   if (timelockAddress) {
  //     getTreasuryBalances(timelockAddress as `0x${string}`)
  //   }
  // }, [timelockAddress])

  const { data: governorAddress, refetch: refetchGovernorAddress } =
    useReadContract({
      address: timelockAddress as `0x${string}`,
      abi: TIMELOCK_ABI,
      functionName: 'admin',
    }) as { data?: `0x${string}`; refetch: () => void }

  const { data: socialConfig, refetch: refetchSocialConfig } = useReadContract({
    address: governorAddress as `0x${string}`,
    abi: GOVERNOR_ABI,
    functionName: 'socialConfig',
  })

  const { data: name } = useReadContract({
    address: governorAddress as `0x${string}`,
    abi: GOVERNOR_ABI,
    functionName: 'name',
  }) as { data?: string; refetch: () => void }

  const { data: governanceTokenAddress } = useReadContract({
    address: governorAddress as `0x${string}`,
    abi: GOVERNOR_ABI,
    functionName: 'token',
  }) as { data?: string; refetch: () => void }

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

  const { data: daoCreator } = useReadContract({
    address: daoStudioAddress[chainId || defaultChainId] as `0x${string}`,
    abi: DAO_FACTORY_ABI,
    functionName: 'daoCreators',
    args: [id],
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

  const { data: communityTokenAddress } = useReadContract({
    address: governanceTokenAddress as `0x${string}`,
    abi: PCE_C_GOV_TOKEN_ABI,
    functionName: 'communityToken',
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
    return Number(block?.timestamp)
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
      className="flex flex-col w-full bg-gray-100 p-4 rounded-xl gap-2 cursor-pointer"
      onClick={(e) => {
        // Prevent onClick if a button inside the card was pressed
        if ((e.target as HTMLElement).closest('button')) {
          return
        }
        setSelectedProposalIndex(index)
        setIsProposalDetailDialogOpened(true)
      }}
    >
      <div className="flex flex-row items-center justify-between w-full rounded-xl">
        <h1 className="flex flex-row text-xl font-bold w-full">
          {proposal[9] || 'Description'}
        </h1>
      </div>
      <p className="description">{proposal[9] || 'Description'}</p>
      <div className="flex flex-row gap-2">
        <span className="flex bg-dark_blue rounded-xl text-white font-bold w-44 p-1 items-center justify-center text-sm px-4">
          {localDict.transferTokens ?? 'Transfer tokens'}
        </span>
        <span className="flex bg-dark_blue rounded-xl text-white font-bold p-1 items-center justify-center text-sm px-4">
          {status}
        </span>
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row justify-between">
            <h1>{localDict.voteFor ?? 'Vote For'}</h1>
            <h1>
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
          <div className="flex flex-row justify-between">
            <h1>{localDict.voteAgainst ?? 'Vote Against'}</h1>
            <h1>
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
          <div className="flex flex-row justify-between">
            <h1>{localDict.votingPeriod ?? 'Voting Period'}</h1>
            <h1>
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
            strokeColor="#1995AD"
            trailColor="#A1D6E2"
            strokeWidth={1}
            trailWidth={1}
          />

          <div className="flex flex-row justify-between">
            <h1>
              {localDict.startedAt ?? 'Started at'} {Number(proposal[3])}
            </h1>
            <h1>
              {localDict.endingAt ?? 'Ending at'} {Number(proposal[4])}
            </h1>
          </div>
        </div>

        {Number(proposal[2]) !== 0 && status === 'Queued' && (
          <div className="flex flex-col justify-between gap-2">
            <div className="flex flex-row justify-between">
              <h1>{localDict.timelockDelay ?? 'Timelock Delay'}</h1>
              <h1>{timestampToDate(Number(proposal[2]))}</h1>
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

            <div className="flex flex-row justify-between">
              <h1>
                {localDict.startedAt ?? 'Started at'}
                {Number(proposal[2]) > 0
                  ? timestampToDate(Number(proposal[2]) - Number(timelockDelay))
                  : '-'}
              </h1>
              <h1>
                {localDict.endingAt ?? 'Ending at'}
                {Number(proposal[2]) > 0
                  ? timestampToDate(Number(proposal[2]))
                  : 0}
              </h1>
            </div>
          </div>
        )}

        <div className="flex flex-row gap-1 md:gap-4 w-full">
          <Button
            className="w-full bg-dark_blue"
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
            className="w-full bg-dark_blue"
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
            className="w-full bg-dark_blue"
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
            className="w-full bg-dark_blue"
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

  function handleSelect(value: any) {
    setCategory(value)
  }

  const { data: votes, refetch: refetchVotes } = useReadContract({
    address: governanceTokenAddress as `0x${string}`,
    abi: PCE_C_GOV_TOKEN_ABI,
    functionName: 'getVotes',
    args: [address],
  }) as { data?: string; refetch: () => void }

  const { data: proposalCount, refetch: refetchProposalCount } =
    useReadContract({
      address: governorAddress as `0x${string}`,
      abi: GOVERNOR_ABI,
      functionName: 'proposalCount',
    }) as { data?: number; refetch: () => void }

  const fetchData = async (count: number) => {
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
  }
  useEffect(() => {
    if (governorAddress) {
      fetchData(Number(proposalCount))
    }
  }, [proposalCount, isConfirmed, governorAddress])

  useEffect(() => {
    const fetchIdenticon = async () => {
      if (governorAddress) {
        setIdenticon(await generateIdenteapot(id, ''))
      }
    }
    fetchIdenticon()
  }, [governorAddress])

  const handleCreateProposal = async () => {
    setIsCreateProposalDialogOpened(false)

    const _calldata = new ethers.AbiCoder().encode(
      ['address', 'uint256'],
      [transferAddr, parseEther(transferAmount)]
    )
    const _signature = 'transfer(address,uint256)'

    const proposeTx = await writeContractAsync({
      abi: GOVERNOR_ABI,
      address: governorAddress as `0x${string}`,
      functionName: 'propose',
      args: [
        [tokenAddress as `0x${string}`],
        [0],
        [_signature],
        [_calldata],
        description,
      ],
    })

    await waitForTransactionReceipt(config, {
      hash: proposeTx,
      confirmations: 1,
    })

    const { data: proposal } = await supabase.from('Proposal').insert({
      daoId: id,
      category: category,
      tokenAddress: tokenAddress,
      amount: transferAmount,
      description: description,
      transferTo: transferAddr,
      proposer: address,
      proposalId: Number(proposalCount) + 1,
      created_at: new Date().toISOString(),
    })

    toast({
      title: 'Proposal created successfully',
    })

    await refetchProposalCount()
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
        title: 'Please enter a valid amount',
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
      } catch (error) {
        console.error('Error approving tokens:', error)
        return
      }
      await waitForTransactionReceipt(config, {
        hash: tx,
        confirmations: 2,
      })
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
        confirmations: 2,
      })
    } catch (error) {
      console.error('Error depositing tokens:', error)
      return
    }

    setStakingAmount('')

    await refetchGovTokenBalance()
    await refetchCommunityTokenBalance()
    await new Promise((resolve) => setTimeout(resolve, 1000))
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
      } catch (error) {
        console.error('Error withdrawing tokens:', error)
        return
      }

      await waitForTransactionReceipt(config, {
        hash: tx,
        confirmations: 2,
      })
      await refetchGovTokenBalance()
      await refetchCommunityTokenBalance()
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }
  }

  const handleDelegate = async () => {
    setIsDelegateDialogOpened(false)

    toast({
      title: 'Delegating voting power...',
    })

    if (BigInt(governanceTokenBalance as string) > 0) {
      let tx
      try {
        tx = await writeContractAsync({
          abi: CommunityGov_ABI,
          address: governanceTokenAddress as `0x${string}`,
          functionName: 'delegate',
          args: [delegateAddr],
        })

        await waitForTransactionReceipt(config, {
          hash: tx,
          confirmations: 2,
        })

        await refetchVotes()
      } catch (error) {
        console.error('Error delegating tokens:', error)
        return
      }
    }
  }

  useEffect(() => {
    if (isConfirmed) {
      toast({ title: 'Transaction Succeeded!' })
    } else if (isConfirming) {
      toast({ title: 'Transaction Pending, Please Wait...' })
    } else if (error) {
      toast({ title: (error as BaseError).shortMessage })
    }
  }, [isConfirmed, isConfirming, error, toast])

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

  useEffect(() => {
    const updateImage = async () => {
      try {
        if (!id || !croppedImage) return

        // Only update if croppedImage has actually changed
        if (lastCroppedImageRef.current === croppedImage) return

        lastCroppedImageRef.current = croppedImage

        toast({
          title: localDict.updatingImage ?? 'Updating image...',
        })

        const response = await fetch(croppedImage as string)
        const blob = await response.blob()
        const _file = new File([blob], id || 'dao-image', {
          type: 'image/png',
        })
        const upload = await addFilesToGroupPublic(_file, DAO_GROUP_ID)

        if (upload?.cid) {
          setImageHash(upload?.cid)
          const { data: dao } = await supabase
            .from('DAO')
            .update({
              image: upload?.cid,
            })
            .eq('daoId', id)

          toast({
            title:
              localDict.imageUpdatedSuccessfully ??
              'Image updated successfully',
          })
        } else {
          toast({
            title: 'Failed to update image',
          })
        }
      } catch (error) {
        console.error('Error updating image:', error)
        toast({
          title: 'Failed to update image',
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
        title: 'Deleting image...',
      })
      const prevImages = await fetchImage(id)
      if (prevImages) {
        try {
          const deleted = await pinata.files.public.delete([prevImages.id])
        } catch (deleteError) {
          console.error('Error deleting from Pinata:', deleteError)
          // Continue with setting imageHash to empty even if delete fails
        }

        setImageHash('')

        toast({
          title: 'Image deleted successfully',
        })
      }
    } catch (error) {
      console.error('Error deleting image:', error)
      toast({
        title: 'Failed to delete image',
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
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-dark_blue"></div>
            </div>
          ) : imageHash ? (
            <Image
              src={`${Env.PINATA_GATEWAY_URL}/ipfs/${imageHash}?pinataGatewayToken=${Env.PINATA_GATEWAY_TOKEN}`}
              alt="DAO Image"
              width={96}
              priority
              height={96}
            />
          ) : (
            <>
              {identicon && (
                <Image src={identicon} alt="DAO Image" width={96} height={96} />
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
                    if (daoCreator !== address) {
                      toast({
                        title: 'You are not the creator of this DAO',
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
                    if (daoCreator !== address) {
                      toast({
                        title: 'You are not the creator of this DAO',
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
          <h2 className="text-3xl font-bold">{name}</h2>
          <span
            className="text-sm text-gray-500 mt-1 break-all flex flex-row items-center gap-2 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation()
              navigator.clipboard.writeText(id as string)
              toast({
                title: 'DAO ID copied!',
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

                {proposals.length === 0 && (
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
                      tooltipText="A token that represents voting power in the DAO. Holders can vote on proposals and participate in governance decisions."
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
                      tooltipText="A smart contract that adds a delay between when a proposal passes and when it can be executed. This delay gives token holders time to review and react to approved proposals before they take effect."
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
                      tooltipText="The core contract that manages the DAO's governance process. It handles proposal creation, voting, and execution of approved proposals. This contract implements the rules and parameters for how governance works."
                      className="font-bold rounded-xl flex"
                    />
                    <CustomLink.default
                      chainId={chainId}
                      type="address"
                      address={governorAddress}
                      message={shortenAddress(governorAddress)}
                    ></CustomLink.default>
                  </div>
                </div>

                <div className="flex flex-col border rounded-xl p-4 bg-gray-100 gap-4">
                  <div className="flex flex-row justify-between items-center">
                    <TooltipComponent
                      title={localDict.voteDelay ?? 'Vote Delay'}
                      tooltipText="The number of blocks that must pass between when a proposal is created and when voting begins. This delay gives token holders time to research and discuss the proposal before voting starts."
                      className="font-bold rounded-xl flex"
                    />
                    <div className="text-dark_blue">
                      {votingDelay ? formatString(votingDelay as string) : '0'}
                    </div>
                  </div>
                  <div className="flex flex-row justify-between items-center">
                    <TooltipComponent
                      title={localDict.votingPeriod ?? 'Voting Period'}
                      tooltipText="The duration (in blocks) during which token holders can cast their votes on a proposal. Once this period ends, no more votes can be cast and the proposal's outcome is determined based on the votes received."
                      className="font-bold rounded-xl flex"
                    />
                    <div className="text-dark_blue">
                      {votingPeriod
                        ? formatString(votingPeriod as string)
                        : '0'}
                    </div>
                  </div>
                  <div className="flex flex-row justify-between items-center">
                    <TooltipComponent
                      title={localDict.timelockDelay ?? 'Timelock Delay'}
                      tooltipText="The mandatory waiting period between when a proposal passes and when it can be executed. This delay gives token holders time to prepare for the changes and exit the protocol if they disagree with a passed proposal. Longer delays provide more security but reduce governance agility."
                      className="font-bold rounded-xl flex"
                    />

                    <div className="text-dark_blue">
                      {timelockDelay
                        ? formatString(timelockDelay as string)
                        : '0'}
                    </div>
                  </div>
                  <div className="flex flex-row justify-between items-center">
                    <TooltipComponent
                      title={
                        localDict.proposalThreshold ?? 'Proposal Threshold'
                      }
                      tooltipText="The minimum number of votes a delegate must have to create a proposal. This threshold ensures that only members with sufficient stake in the DAO can initiate governance actions."
                      className="font-bold rounded-xl flex"
                    />

                    <div className="text-dark_blue">
                      {proposalThreshold
                        ? formatString(formatEther(proposalThreshold as string))
                        : '0'}
                    </div>
                  </div>

                  <div className="flex flex-row gap-4 justify-between items-center">
                    <TooltipComponent
                      title={localDict.quorum ?? 'Quorum Votes'}
                      tooltipText="The minimum number of votes required for a proposal to be considered valid. This ensures that major decisions have sufficient participation from the community. If a proposal doesn't reach the quorum threshold, it fails regardless of the voting outcome."
                      className="font-bold rounded-xl flex"
                    />
                    <div className="text-dark_blue">
                      {quorum
                        ? formatString(formatEther(BigInt(quorum as string)))
                        : '0'}
                    </div>
                  </div>
                </div>

                <div className="flex flex-row justify-between items-center border rounded-xl p-4 bg-gray-100">
                  <TooltipComponent
                    title={localDict.myPower ?? 'My Power'}
                    tooltipText={
                      'Your current voting power in this DAO, ' +
                      'determined by the number of governance tokens you hold ' +
                      'or have been delegated. This power allows you to vote on proposals ' +
                      'and create new ones if you meet the proposal threshold.'
                    }
                    className="font-bold rounded-xl flex"
                  />
                  <div className="text-dark_blue">
                    {votes ? formatString(formatEther(votes as string)) : '0'}
                  </div>
                </div>

                <div className="flex bg-gray-100 rounded-xl items-center justify-between cursor-pointer">
                  <div className="flex flex-row gap-4 w-full items-center p-4 justify-center">
                    <div className="flex flex-col gap-2 w-full justify-center">
                      <div className="text-heavy_white text-sm flex justify-center items-center">
                        TVL
                      </div>

                      <div className="flex bg-dark_blue rounded-xl text-white font-bold p-1 w-full items-center justify-center text-sm">
                        $0
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                      <div className="text-heavy_white text-sm flex justify-center items-center">
                        Memebers
                      </div>
                      <div className="flex bg-dark_blue rounded-xl text-white font-bold p-1 w-full items-center justify-center text-sm">
                        0%
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col border rounded-xl p-4 gap-4 bg-gray-100">
                  <h1 className="font-bold rounded-xl  flex">
                    {localDict.createdAt ?? 'Created at'}{' '}
                    {new Date(Number(172839000) * 1000).toLocaleString()}
                  </h1>
                </div>
                <div className="flex flex-col border rounded-xl p-4 gap-4 mb-40 bg-gray-100">
                  <div className="flex flex-row justify-between items-center mb-2">
                    <h1 className="font-bold">DAO Socials</h1>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setIsEditingSocials(!isEditingSocials)
                        setEditingSocials(socials)
                      }}
                    >
                      {isEditingSocials ? 'Cancel' : 'Edit'}
                    </Button>
                  </div>

                  {isEditingSocials ? (
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">
                          DAO Website
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
                        <label className="text-sm font-medium">LinkedIn</label>
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
                        <label className="text-sm font-medium">Telegram</label>
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
                          {isEditingSocials ? 'Saving...' : 'Save Changes'}
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
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-row justify-between items-center">
                        <span className="font-medium">DAO Site:</span>
                        <Link
                          href={
                            socials.website
                              ? socials.website
                              : 'https://website.com'
                          }
                          className="text-dark_blue hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {socials.website ? socials.website : 'Not set'}
                        </Link>
                      </div>

                      <div className="flex flex-row justify-between items-center">
                        <span className="font-medium">LinkedIn:</span>
                        <Link
                          href={
                            socials.linkedin
                              ? socials.linkedin
                              : 'https://www.linkedin.com/'
                          }
                          className="text-dark_blue hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {socials.linkedin ? socials.linkedin : 'Not set'}
                        </Link>
                      </div>

                      <div className="flex flex-row justify-between items-center">
                        <span className="font-medium">Twitter:</span>
                        <Link
                          href={
                            socials.twitter
                              ? socials.twitter
                              : 'https://twitter.com'
                          }
                          className="text-dark_blue hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {socials.twitter ? socials.twitter : 'Not set'}
                        </Link>
                      </div>

                      <div className="flex flex-row justify-between items-center">
                        <span className="font-medium">Telegram:</span>
                        <Link
                          href={
                            socials.telegram
                              ? socials.telegram
                              : 'https://t.me/'
                          }
                          className="text-dark_blue hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {socials.telegram ? socials.telegram : 'Not set'}
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="all">
            <div className="flex flex-row w-full items-center">
              <Tabs defaultValue="all" className="gap-0 w-full">
                <TabsList>
                  <TabsTrigger className="w-20" value="all">
                    {localDict.all}
                  </TabsTrigger>
                  <TabsTrigger className="w-20" value="active">
                    {localDict.active}
                  </TabsTrigger>
                  <TabsTrigger className="w-20" value="executed">
                    {localDict.executed}
                  </TabsTrigger>
                  <TabsTrigger className="w-20" value="defeated">
                    {localDict.defeated}
                  </TabsTrigger>
                </TabsList>
                <TabsContent
                  value="all"
                  className="flex w-full flex-col gap-4 mt-4"
                >
                  {proposals.length > 0 ? (
                    proposals.map((proposal, index) => {
                      return (
                        <ProposalCard
                          key={index}
                          proposal={proposal}
                          status={proposalStatus[index]}
                          index={index}
                        />
                      )
                    })
                  ) : (
                    <div className="flex justify-center items-center p-4 bg-gray-100 rounded-xl text-gray-500">
                      {localDict.noProposals ?? 'No proposals at the moment'}
                    </div>
                  )}
                </TabsContent>
                <TabsContent
                  value="active"
                  className="flex w-full flex-col mt-0"
                >
                  {proposals.filter(
                    (_, index) => proposalStatus[index] === 'Active'
                  ).length > 0 ? (
                    proposals.map((proposal, index) => {
                      if (proposalStatus[index] === 'Active') {
                        return (
                          <ProposalCard
                            key={index}
                            proposal={proposal}
                            status={proposalStatus[index]}
                            index={index}
                          />
                        )
                      }
                      return null
                    })
                  ) : (
                    <div className="flex justify-center items-center p-4 bg-gray-100 rounded-xl text-gray-500">
                      {localDict.noProposals ??
                        'No active proposals at the moment'}
                    </div>
                  )}
                </TabsContent>

                <TabsContent
                  value="executed"
                  className="flex w-full flex-col mt-0"
                >
                  {proposals.filter(
                    (_, index) => proposalStatus[index] === 'Executed'
                  ).length > 0 ? (
                    proposals.map((proposal, index) => {
                      if (proposalStatus[index] === 'Executed') {
                        return (
                          <ProposalCard
                            key={index}
                            proposal={proposal}
                            status={proposalStatus[index]}
                            index={index}
                          />
                        )
                      }
                      return null
                    })
                  ) : (
                    <div className="flex justify-center items-center p-4 bg-gray-100 rounded-xl text-gray-500">
                      {localDict.noProposals ??
                        'No succeeded proposals at the moment'}
                    </div>
                  )}
                </TabsContent>

                <TabsContent
                  value="defeated"
                  className="flex w-full flex-col gap-4 mt-0"
                >
                  {proposals.filter(
                    (_, index) => proposalStatus[index] === 'Defeated'
                  ).length > 0 ? (
                    proposals.map((proposal, index) => {
                      if (proposalStatus[index] === 'Defeated') {
                        return (
                          <ProposalCard
                            key={index}
                            proposal={proposal}
                            status={proposalStatus[index]}
                            index={index}
                          />
                        )
                      }
                      return null
                    })
                  ) : (
                    <div className="flex justify-center items-center p-4 bg-gray-100 rounded-xl text-gray-500">
                      {localDict.noProposals ??
                        'No defeated proposals at the moment'}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
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
                              {formatString(
                                formatEther(
                                  BigInt(token.tokenBalance).toString()
                                )
                              )}{' '}
                              {token.symbol === '' ? 'PCE TEST' : token.symbol}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={2} className="text-center">
                            No tokens found
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
                      <Button className="w-full bg-dark_blue">
                        {localDict.depositToDaoTreasury ??
                          'Deposit to DAO Treasury'}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader className="flex flex-col gap-2">
                        <DialogTitle>Address</DialogTitle>
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
                          className="w-full bg-dark_blue"
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
                <div className="flex flex-col md:flex-row w-full gap-4 items-center justify-between">
                  <div className="flex flex-col gap-4">
                    <PageSubHeaderSection
                      title={
                        localDict.votingPowerBreakdown ??
                        'Voting Power Breakdown'
                      }
                    />
                  </div>
                </div>

                {/* Responsive buttons/input row */}
                <div className="flex flex-col sm:flex-row gap-4 w-full">
                  <AmountInput
                    localDict={localDict}
                    className="w-full sm:w-60 bg-dark_blue"
                    setStakingAmount={setStakingAmount}
                    handleStake={handleStake}
                    maxAmount={
                      communityTokenBalance
                        ? Number(formatEther(BigInt(communityTokenBalance)))
                        : 0
                    }
                  />
                  <Button
                    className="w-full sm:w-60 bg-dark_blue"
                    onClick={handleWithdraw}
                  >
                    {localDict.withdraw ?? 'Withdraw'}
                  </Button>

                  <Button
                    className="w-full sm:w-60 bg-dark_blue"
                    onClick={async () => {
                      setIsDelegateDialogOpened(true)
                    }}
                  >
                    {localDict.delegate ?? 'Delegate'}
                  </Button>
                </div>
                {/* Responsive table container */}
                <div className="rounded-xl flex border mt-4 w-full overflow-x-auto">
                  <Table className="w-full">
                    <TableHeader>
                      <TableRow>
                        <TableHead>
                          <div className="flex flex-row gap-4">
                            {localDict.address ?? 'Address'}
                          </div>
                        </TableHead>
                        <TableHead>
                          {localDict.communityToken ?? 'Community Token'}
                        </TableHead>
                        <TableHead>
                          {localDict.governanceToken ?? 'Governance Token'}
                        </TableHead>
                        <TableHead>
                          {localDict.delegatedAmount ?? 'Delegated Amount'}
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <div className="flex flex-row gap-2 items-center">
                            <h1 className="text-md text-dark_blue font-bold break-all">
                              {communityTokenAddress
                                ? shortenAddress(communityTokenAddress, 4)
                                : '-'}
                            </h1>
                          </div>
                        </TableCell>
                        <TableCell className="font-bold font-md text-dark_blue">
                          {communityTokenBalance
                            ? formatString(
                                formatEther(
                                  BigInt(communityTokenBalance as string)
                                )
                              )
                            : '0'}{' '}
                          {communityTokenSymbol}
                        </TableCell>
                        <TableCell className="font-bold font-md text-dark_blue">
                          {governanceTokenBalance
                            ? formatString(
                                formatEther(
                                  BigInt(governanceTokenBalance as string)
                                )
                              )
                            : '0'}{' '}
                          {communityTokenSymbol}
                        </TableCell>
                        <TableCell className="font-bold font-md text-dark_blue">
                          {votes
                            ? formatString(formatEther(BigInt(votes as string)))
                            : '0'}{' '}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>

            <DelegateDialog
              isOpen={isDelegateDialogOpened}
              onOpenChange={setIsDelegateDialogOpened}
              delegateAddr={delegateAddr}
              localDict={localDict}
              handleDelegate={handleDelegate}
            />
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
          <div className="flex flex-col gap-4 mt-4">
            <Select onValueChange={handleSelect}>
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder={localDict.selectACategory ?? 'Select a category'}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">
                  {localDict.transferTokens ?? 'Transfer Tokens'}
                </SelectItem>
              </SelectContent>
            </Select>

            <Input
              placeholder={localDict.enterTokenAddress ?? 'Enter Token Address'}
              value={tokenAddress}
              onChange={(e) => setTokenAddress(e.target.value)}
            />

            <Input
              placeholder={localDict.enterAmount ?? 'Enter amount'}
              value={transferAmount}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTransferAmount(e.target.value)
              }
            />

            <Input
              placeholder={
                localDict.enterAddressToTransferTo ??
                'Enter Address To Transfer To'
              }
              value={transferAddr}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTransferAddr(e.target.value)
              }
            />

            <Textarea
              placeholder={localDict.enterDescription ?? 'Enter description'}
              value={description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setDescription(e.target.value)
              }
            />

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
