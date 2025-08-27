'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import * as CustomLink from '~/components/custom/Link'

import { Alchemy } from 'alchemy-sdk'

import RingLoader from 'react-spinners/RingLoader'
import { ringStyle } from '~/app/constants/styles'
import { Line } from 'rc-progress'
import { generateIdenteapot } from '@teapotlabs/identeapots'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '~/components/ui/tabs'
import { Button } from '~/components/custom/button'
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '~/components/ui/table'
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
  // DialogTrigger,
} from '~/components/ui/dialog'
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '~/components/ui/select'

// import { AmountInput } from '~/components/custom/amount-input'

import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

import { getDict } from '~/i18n/get-dict'

import { Dictionary, Locale } from '~/i18n/types'

import { formatString, shortenAddress } from '~/components/utils'
import { PCE_ABI } from '~/app/ABIs/PCEToken'
import { GOVERNOR_ABI } from '~/app/ABIs/Governor'
// import { Textarea } from '~/components/ui/textarea'
import { config } from '~/lib/config'
import { TIMELOCK_ABI } from '~/app/ABIs/Timelock'
import { TooltipComponent } from '~/components/custom/TooltipComponent'
import { CommunityGov_ABI } from '~/app/ABIs/CommunityGov'
import { defaultChainId } from '~/app/constants/constants'
import { waitForTransactionReceipt } from '@wagmi/core'
import {
  factoryAddress,
  governorAddress,
  SUBGRAPH_URL,
} from '~/app/constants/constants'
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
import { ALCHEMY_CONFIG } from '~/app/constants/constants'
import { PCE_C_GOV_TOKEN_ABI } from '~/app/ABIs/PCECGovToken'
import { Env } from '~/env'
import { useToast } from '~/hooks/use-toast'
import { DAO_FACTORY_ABI } from '~/app/ABIs/DAOFactory'

type Dao = {
  id: string
  daoId: string
  name: string
  governor: string
  blockTimestamp: string
  website: string
  linkedin: string
  twitter: string
  telegram: string
  governanceToken: string
  timelock: string
  communityToken: string
  communityTokenSymbol: string
}

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

export default function ForSubmitPage({
  params,
}: {
  params: { locale: Locale }
}) {
  const { locale } = params
  const { toast } = useToast()

  // To get the full path of the current file in a Next.js app, you can use the `window.location.pathname` in the browser.
  // For server-side or Node.js, you can use __filename, but in a Next.js page component, you typically want the route path.
  // Example for client-side full path:
  const fullPath = typeof window !== 'undefined' ? window.location.pathname : ''
  const id = fullPath.split('/').pop()

  const [dict, setDict] = useState<Dictionary | null>(null)
  const localDict = dict?.daoInfo ?? {}

  const [daoInfo, setDaoInfo] = useState<Dao>()
  const [delegateAddr, setDelegateAddr] = useState('')
  const [transferAddr, setTransferAddr] = useState('')
  const [description, setDescription] = useState('')
  const [transferAmount, setTransferAmount] = useState('')
  const [tokenAddress, setTokenAddress] = useState('')
  const [imageHash, setImageHash] = useState('')

  const [proposals, setProposals] = useState<any[]>([])
  const [proposalStatus, setStatus] = useState<any[]>([])
  let [loading, setLoading] = useState(true)

  const [category, setCategory] = useState('')

  const [stakingAmount, setStakingAmount] = useState('')

  const [isDelegateDialogOpened, setIsDelegateDialogOpened] = useState(false)
  const [isDepositDialogOpened, setIsDepositDialogOpened] = useState(false)
  const [isCreateProposalDialogOpened, setIsCreateProposalDialogOpened] =
    useState(false)
  const [isProposalDetailDialogOpened, setIsProposalDetailDialogOpened] =
    useState(false)
  const [identicon, setIdenticon] = useState('')

  const [tabContent, setTabContent] = useState('about')

  const [treasuryBalances, setTreasuryBalances] = useState<TokenBalance[]>([])

  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [croppedImage, setCroppedImage] = useState<string | null>(null)
  const [isCropModalOpen, setIsCropModalOpen] = useState(false)
  const [isImageLoading, setIsImageLoading] = useState(false)

  // Social editing state variables
  const [isEditingSocials, setIsEditingSocials] = useState(false)
  const [isUpdatingSocials, setIsUpdatingSocials] = useState(false)
  const [editingSocials, setEditingSocials] = useState({
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

  const alchemy = new Alchemy(ALCHEMY_CONFIG)

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

  useEffect(() => {
    if (daoInfo?.timelock) {
      getTreasuryBalances(daoInfo?.timelock)
    }
  }, [daoInfo])

  const fetchImage = async (name: string) => {
    try {
      const files = await pinata.files.public.list()
      const pceFiles = files.files.filter((file) => file.name == name)

      if (pceFiles.length > 0) {
        return pceFiles[0]?.cid as string
      }
      return ''
    } catch (error) {
      console.error('Error fetching image from Pinata:', error)
      return ''
    }
  }

  useEffect(() => {
    const loadImage = async () => {
      if (daoInfo?.id && localDict) {
        try {
          setIsImageLoading(true)
          toast({
            title: localDict.fetchingImage ?? 'Fetching image...',
          })
          const fetchedImageHash = await fetchImage(daoInfo?.id)
          setImageHash(fetchedImageHash)
          toast({
            title:
              localDict.imageFetchedSuccessfully ??
              'Image fetched successfully',
          })
        } catch (error) {
          console.error('Error loading image:', error)
          toast({
            title: 'Failed to load image',
          })
        } finally {
          setIsImageLoading(false)
        }
      }
    }

    loadImage()
  }, [daoInfo, localDict])

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
          <DialogDescription className="flex flex-col gap-4">
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
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )

  // Handle updating DAO social links
  const handleUpdateSocials = async () => {
    setIsEditingSocials(false)

    if (!daoInfo?.id) {
      toast({
        title: 'Error',
        description: 'DAO ID not found. Please refresh the page and try again.',
        variant: 'destructive',
      })
      return
    }

    if (!chainId || !factoryAddress[chainId]) {
      toast({
        title: 'Error',
        description:
          'Unsupported network. Please switch to a supported network.',
        variant: 'destructive',
      })
      return
    }

    try {
      setIsUpdatingSocials(true)

      const socialConfig = {
        description: '',
        website: editingSocials.website || '',
        linkedin: editingSocials.linkedin || '',
        twitter: editingSocials.twitter || '',
        telegram: editingSocials.telegram || '',
      }

      // Use writeContractAsync for better error handling
      const contractConfig = {
        abi: DAO_FACTORY_ABI,
        address: factoryAddress[chainId || defaultChainId] as `0x${string}`,
        functionName: 'updateDAOSocialConfig',
        args: [daoInfo.daoId, socialConfig],
      }

      const hash = await writeContractAsync(contractConfig)

      // Show pending message
      toast({
        title: 'Transaction Submitted',
        description:
          'Your transaction is being processed. Please wait for confirmation.',
      })

      // Wait for transaction confirmation
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
    } finally {
      setIsUpdatingSocials(false)
    }
  }

  const client = new ApolloClient({
    uri: SUBGRAPH_URL[chainId || defaultChainId] as string,
    cache: new InMemoryCache(),
  })

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

  const { data: quorum, refetch: refetchQuorum } = useReadContract({
    address: daoInfo?.governor as `0x${string}`,
    abi: GOVERNOR_ABI,
    functionName: 'quorumVotes',
  })

  const { data: votingDelay, refetch: refetchVotingDelay } = useReadContract({
    address: daoInfo?.governor as `0x${string}`,
    abi: GOVERNOR_ABI,
    functionName: 'votingDelay',
  })

  const { data: communityTokenBalance, refetch: refetchCommunityTokenBalance } =
    useReadContract({
      address: daoInfo?.communityToken as `0x${string}`,
      abi: PCE_ABI,
      functionName: 'balanceOf',
      args: [address],
    })

  const { data: governanceTokenBalance, refetch: refetchGovTokenBalance } =
    useReadContract({
      address: daoInfo?.governanceToken as `0x${string}`,
      abi: PCE_ABI,
      functionName: 'balanceOf',
      args: [address],
    })

  const { data: totalSupply, refetch: refetchTotalSupply } = useReadContract({
    address: daoInfo?.governanceToken as `0x${string}`,
    abi: PCE_ABI,
    functionName: 'totalSupply',
  })

  const { data: _owner, refetch: refetchOwner } = useReadContract({
    address: daoInfo?.communityToken as `0x${string}`,
    abi: PCE_ABI,
    functionName: 'owner',
  })

  const { data: proposalThreshold, refetch: refetchProposalThreshold } =
    useReadContract({
      address: daoInfo?.governor as `0x${string}`,
      abi: GOVERNOR_ABI,
      functionName: 'proposalThreshold',
    })

  const { data: votingPeriod, refetch: refetchVotingPeriod } = useReadContract({
    address: daoInfo?.governor as `0x${string}`,
    abi: GOVERNOR_ABI,
    functionName: 'votingPeriod',
  })

  const { data: timelockDelay, refetch: refetchTimelockDelay } =
    useReadContract({
      address: daoInfo?.timelock as `0x${string}`,
      abi: TIMELOCK_ABI,
      functionName: 'delay',
    })

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
      onClick={() => {
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
                address: governorAddress[
                  chainId || defaultChainId
                ] as `0x${string}`,
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
                address: governorAddress[
                  chainId || defaultChainId
                ] as `0x${string}`,
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
                address: governorAddress[
                  chainId || defaultChainId
                ] as `0x${string}`,
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
                address: governorAddress[
                  chainId || defaultChainId
                ] as `0x${string}`,
                functionName: 'execute',
                args: [proposal[0]],
              })
            }}
          >
            {localDict.execute ?? 'Execute'}
          </Button>
        </div>
      </div>
      <Dialog
        open={isProposalDetailDialogOpened}
        onOpenChange={(open) => {
          setIsProposalDetailDialogOpened(open)
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {localDict.proposalDetails ?? 'Proposal Details'}
            </DialogTitle>
            <DialogDescription>
              <div className="flex flex-col gap-2">
                <h1>
                  {localDict.proposalId ?? 'Proposal ID'}: {index}
                </h1>
                <h1>
                  {localDict.proposalDescription ?? 'Proposal Description'}:{' '}
                  {proposal[9]}
                </h1>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </article>
  )

  function handleSelect(value: any) {
    setCategory(value)
  }

  const { data: votes, refetch: refetchVotes } = useReadContract({
    address: daoInfo?.governanceToken as `0x${string}`,
    abi: PCE_C_GOV_TOKEN_ABI,
    functionName: 'getVotes',
    args: [address],
  })

  const { data: proposalCount, refetch: refetchProposalCount } =
    useReadContract({
      address: daoInfo?.governor as `0x${string}`,
      abi: GOVERNOR_ABI,
      functionName: 'proposalCount',
    })

  const { data: daoData, refetch: refetchDaoData } = useReadContract({
    address: factoryAddress[chainId || defaultChainId] as `0x${string}`,
    abi: DAO_FACTORY_ABI,
    functionName: 'daos',
    args: [daoInfo?.daoId],
  }) as any

  const fetchData = async (count: any) => {
    setLoading(true)
    if (!count || !daoInfo?.governor || count === 0) {
      setProposals([])
      setStatus([])
      setLoading(false)
      return
    }
    const proposalCount = typeof count === 'bigint' ? Number(count) : count

    let temp = []
    let _status = []
    for (let i = 1; i <= proposalCount; i++) {
      let proposal = null
      let status = null
      try {
        proposal = await readContract(config, {
          address: daoInfo?.governor as `0x${string}`,
          abi: GOVERNOR_ABI,
          functionName: 'proposals',
          args: [i],
        })

        status = await readContract(config, {
          address: daoInfo?.governor as `0x${string}`,
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
    if (daoInfo && daoInfo?.governor) {
      fetchData(proposalCount)
    }
  }, [proposalCount, isConfirmed, daoInfo])

  useEffect(() => {
    const fetchIdenticon = async () => {
      if (daoInfo && daoInfo?.governor) {
        setIdenticon(await generateIdenteapot(daoInfo?.governor, ''))
      }
    }
    fetchIdenticon()
  }, [daoInfo])

  const handleCreateProposal = async () => {
    setIsCreateProposalDialogOpened(false)

    const _calldata = new ethers.AbiCoder().encode(
      ['address', 'uint256'],
      [transferAddr, parseEther(transferAmount)]
    )
    const _signature = 'transfer(address,uint256)'

    writeContract({
      abi: GOVERNOR_ABI,
      address: daoInfo?.governor as `0x${string}`,
      functionName: 'propose',
      args: [
        [tokenAddress as `0x${string}`],
        [0],
        [_signature],
        [_calldata],
        description,
      ],
    })

    await refetchProposalCount()
  }

  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    abi: PCE_ABI,
    address: daoInfo?.communityToken as `0x${string}`,
    functionName: 'allowance',
    args: [address, daoInfo?.governanceToken as `0x${string}`],
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
      address: daoInfo?.communityToken as `0x${string}`,
      functionName: 'allowance',
      args: [address, daoInfo?.governanceToken as `0x${string}`],
    })

    if (
      (BigInt(allowance as string) as bigint) <
      BigInt(parseEther(stakingAmount))
    ) {
      let tx
      try {
        tx = await writeContractAsync({
          abi: PCE_ABI,
          address: daoInfo?.communityToken as `0x${string}`,
          functionName: 'approve',
          args: [
            daoInfo?.governanceToken as `0x${string}`,
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
        abi: CommunityGov_ABI,
        address: daoInfo?.governanceToken as `0x${string}`,
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
          address: daoInfo?.governanceToken as `0x${string}`,
          functionName: 'withdraw',
          args: [governanceTokenBalance],
        })
      } catch (error) {
        console.error('Error withdrawing tokens:', error)
        return
      }

      await waitForTransactionReceipt(config, {
        hash: tx,
        confirmations: 1,
      })
      await refetchGovTokenBalance()
      await refetchCommunityTokenBalance()
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }
  }

  const handleDelegate = async () => {
    setIsDelegateDialogOpened(false)

    if (BigInt(governanceTokenBalance as string) > 0) {
      let tx
      try {
        tx = await writeContractAsync({
          abi: CommunityGov_ABI,
          address: daoInfo?.governanceToken as `0x${string}`,
          functionName: 'delegate',
          args: [delegateAddr],
        })
      } catch (error) {
        console.error('Error delegating tokens:', error)
        return
      }
    }
  }

  useEffect(() => {
    const notify = async () => {
      if (isConfirmed) {
        toast({
          title: 'Transaction Succeed!',
        })

        setDelegateAddr('')
        await refetchVotes()
        await getTreasuryBalances(daoInfo?.timelock as `0x${string}`)
        await refetchProposalCount()
      } else if (isConfirming) {
        toast({
          title: 'TX is Pending, Please Wait...',
        })
      } else if (error) {
        toast({
          title: (error as BaseError).shortMessage,
        })
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

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return
      try {
        setLoading(true)

        const { data } = await client.query({
          query: gql`
            query GetDao {
            daocreateds(where: { id: "${id}" }) {
              id
              daoId
              description
              website
              linkedin
              twitter
              telegram
              name
              governor
              timelock
              governanceToken
              communityToken
              blockTimestamp
            }
          }
          `,
        })

        let _daoInfo = data.daocreateds[0]

        if (_daoInfo.website && _daoInfo.website === 'https://') {
          _daoInfo = { ..._daoInfo, website: 'https://website.com' }
        }

        if (_daoInfo.linkedin && _daoInfo.linkedin === 'https://') {
          _daoInfo = { ..._daoInfo, linkedin: 'https://www.linkedin.com/' }
        }

        if (_daoInfo.twitter && _daoInfo.twitter === 'https://') {
          _daoInfo = { ..._daoInfo, twitter: 'https://twitter.com' }
        }

        const symbol = await readContract(config, {
          abi: PCE_ABI,
          address: _daoInfo.communityToken as `0x${string}`,
          functionName: 'symbol',
        })

        if (_daoInfo) {
          setDaoInfo({
            ..._daoInfo,
            communityTokenSymbol: symbol as string,
          })
        } else {
          toast({
            title: 'DAO not found',
          })
          console.error('DAO not found for ID:', id)
        }
      } catch (error) {
        console.error('Error fetching data', error)
        toast({
          title: 'Failed to fetch DAO data',
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id, chainId])

  useEffect(() => {
    const updateImage = async () => {
      try {
        if (!daoInfo?.id) return

        toast({
          title: localDict.updatingImage ?? 'Updating image...',
        })
        const prevImages = await fetchImage(daoInfo?.id)
        if (prevImages) {
          const res = await pinata.files.public.delete([prevImages])
        }

        const response = await fetch(croppedImage as string)
        const blob = await response.blob()
        const _file = new File([blob], daoInfo?.id || 'dao-image', {
          type: 'image/png',
        })
        const upload = await pinata.upload.public.file(_file, {
          metadata: {
            name: daoInfo?.id,
          },
        })
        setImageHash(upload.cid)
        toast({
          title:
            localDict.imageUpdatedSuccessfully ?? 'Image updated successfully',
        })
      } catch (error) {
        console.error('Error updating image:', error)
        toast({
          title: 'Failed to update image',
        })
      }
    }

    updateImage()
  }, [croppedImage])

  const deleteImage = async () => {
    try {
      if (!daoInfo?.id) return

      toast({
        title: 'Deleting image...',
      })
      const prevImages = await fetchImage(daoInfo?.id)
      if (prevImages) {
        await pinata.files.public.delete([prevImages])
      }
      setImageHash('')

      toast({
        title: 'Image deleted successfully',
      })
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
          setIsCropModalOpen(true)
        }
      }
    }
  }

  return (
    <div className="items-center justify-center flex flex-col mx-4 md:mx-20 gap-4">
      <div className="flex flex-row w-full items-center gap-4 mt-8">
        <div className="relative group">
          {isImageLoading ? (
            <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-dark_blue"></div>
            </div>
          ) : imageHash ? (
            <img
              src={`https://orange-elegant-takin-78.mypinata.cloud/ipfs/${imageHash}?pinataGatewayToken=7uMh9158Kl1jPcpgtNigRgAa_Y_t9CHZLpSRRiimEd9_fX6DzoGSOgmdOii1wiqg`}
              alt=""
              className="w-24 h-24"
            />
          ) : (
            <img src={identicon} alt="" className="w-24 h-24 " />
          )}
          <div className="absolute inset-0 flex items-end justify-start opacity-0 group-hover:opacity-80 transition-opacity bg-black/50">
            {/* <button
              className="p-2 text-white hover:text-gray-200"
              onClick={() => {
                if (address != (_owner as `0x${string}`)) {
                  toast.error('You are not the owner of this DAO')
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </button> */}
            {/* <button
              className="p-2 text-white hover:text-gray-200"
              onClick={async () => {
                if (address != (_owner as `0x${string}`)) {
                  toast.error('You are not the owner of this DAO')
                  return
                }

                await deleteImage()
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button> */}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {/* <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button> */}
                <Button className="w-full h-full bg-transparent gap-2 items-end justify-center">
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
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => {
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
                    // if (address != (_owner as `0x${string}`)) {
                    //   toast.error('You are not the owner of this DAO')
                    //   return
                    // }
                    await deleteImage()
                  }}
                >
                  {localDict.delete ?? 'Delete'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex flex-row gap-2 font-bold text-5xl">
          {daoInfo?.name}{' '}
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
            <div className="flex md:flex-row flex-col w-full gap-8">
              <div className="flex flex-col w-full mt-4 gap-4">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center w-full gap-2">
                  <h1 className="text-2xl font-bold">
                    {localDict.lastProposal}
                  </h1>
                  <div className="flex flex-row gap-4">
                    <Button
                      className="w-full bg-dark_blue"
                      onClick={() => {
                        setIsCreateProposalDialogOpened(true)
                      }}
                    >
                      {localDict.createNewProposal}
                    </Button>
                  </div>
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
                <h1 className="text-2xl font-bold mt-4">{localDict.daoInfo}</h1>

                <div className="flex flex-col border rounded-xl p-4 mt-2 bg-gray-100 gap-2">
                  <div className="flex flex-row justify-between items-center rounded-xl mt-2 w-full">
                    <TooltipComponent
                      title={localDict.govenorToken ?? 'Governor Token'}
                      tooltipText="A token that represents voting power in the DAO. Holders can vote on proposals and participate in governance decisions."
                      className="font-bold rounded-xl flex"
                    />
                    <CustomLink.default
                      chainId={chainId}
                      type="address"
                      address={daoInfo?.governanceToken}
                      message={shortenAddress(daoInfo?.governanceToken)}
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
                      address={daoInfo?.timelock}
                      message={shortenAddress(daoInfo?.timelock)}
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
                      address={daoInfo?.governor}
                      message={shortenAddress(daoInfo?.governor)}
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
                    {votes
                      ? formatString(formatEther(BigInt(votes as string)))
                      : '0'}
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
                    {new Date(
                      Number(daoInfo?.blockTimestamp) * 1000
                    ).toLocaleString()}
                  </h1>
                </div>
                <div className="flex flex-col border rounded-xl p-4 gap-4 mb-40 bg-gray-100">
                  <div className="flex flex-row justify-between items-center mb-2">
                    <h1 className="font-bold">DAO Socials</h1>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditingSocials(!isEditingSocials)}
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
                          disabled={isUpdatingSocials}
                        >
                          {isUpdatingSocials ? 'Saving...' : 'Save Changes'}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setIsEditingSocials(false)
                            setEditingSocials({
                              website: daoInfo?.website || '',
                              linkedin: daoInfo?.linkedin || '',
                              twitter: daoInfo?.twitter || '',
                              telegram: daoInfo?.telegram || '',
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
                            daoData && daoData[9]
                              ? daoData[9].website
                              : 'https://website.com'
                          }
                          className="text-dark_blue hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {daoData && daoData[9]?.website
                            ? daoData[9].website
                            : 'Not set'}
                        </Link>
                      </div>

                      <div className="flex flex-row justify-between items-center">
                        <span className="font-medium">LinkedIn:</span>
                        <Link
                          href={
                            daoData && daoData[9]
                              ? daoData[9].linkedin
                              : 'https://www.linkedin.com/'
                          }
                          className="text-dark_blue hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {daoData && daoData[9]?.linkedin
                            ? daoData[9].linkedin
                            : 'Not set'}
                        </Link>
                      </div>

                      <div className="flex flex-row justify-between items-center">
                        <span className="font-medium">Twitter:</span>
                        <Link
                          href={
                            daoData && daoData[9]
                              ? daoData[9].twitter
                              : 'https://twitter.com'
                          }
                          className="text-dark_blue hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {daoData && daoData[9]?.twitter
                            ? daoData[9].twitter
                            : 'Not set'}
                        </Link>
                      </div>

                      <div className="flex flex-row justify-between items-center">
                        <span className="font-medium">Telegram:</span>
                        <Link
                          href={
                            daoData && daoData[9]
                              ? daoData[9].telegram
                              : 'https://t.me/'
                          }
                          className="text-dark_blue hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {daoData && daoData[9]?.telegram
                            ? daoData[9].telegram
                            : 'Not set'}
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      {/* <Dialog
        open={isCreateProposalDialogOpened}
        onOpenChange={setIsCreateProposalDialogOpened}
      >
        <DialogContent>
          <DialogTitle>
            {localDict.createProposal ?? 'Create a Proposal'}
          </DialogTitle>
          <DialogDescription className="flex flex-col gap-4">
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
          </DialogDescription>
        </DialogContent>
      </Dialog> */}
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
