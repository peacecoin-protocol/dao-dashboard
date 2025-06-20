'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import * as CustomLink from '~/components/custom/Link'

import { Alchemy } from 'alchemy-sdk'

import 'react-toastify/dist/ReactToastify.css'
import RingLoader from 'react-spinners/RingLoader'
import { ringStyle } from '~/app/constants/styles'
import { Line } from 'rc-progress'
import { generateIdenteapot } from '@teapotlabs/identeapots'

import { Tabs, TabsList, TabsTrigger, TabsContent } from '~/components/ui/tabs'
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

import { ethers, formatEther, parseEther } from 'ethers'
import { ToastContainer, toast } from 'react-toastify'
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
  DialogTrigger,
} from '~/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'

import { AmountInput } from '~/components/custom/amount-input'

import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

import { getDict } from '~/i18n/get-dict'

import { PagePropsWithLocale, Dictionary } from '~/i18n/types'

import { useParams } from 'react-router-dom'
import { formatString, shortenAddress } from '~/components/utils'
import { PCE_ABI } from '~/app/ABIs/PCEToken'
import { GOVERNOR_ABI } from '~/app/ABIs/Governor'
import { Textarea } from '~/components/ui/textarea'
import { config } from '~/lib/config'
import { TIMELOCK_ABI } from '~/app/ABIs/Timelock'
import { TooltipComponent } from '~/components/custom/TooltipComponent'
import { CommunityGov_ABI } from '~/app/ABIs/CommunityGov'
import { localhost } from '~/lib/config'
import { waitForTransactionReceipt } from '@wagmi/core'
import { governorAddress, SUBGRAPH_URL } from '~/app/constants/constants'
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
  params: { locale },
}: PagePropsWithLocale<{}>) {
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

  const pathname = useParams()
  const id = pathname.id

  const { address, chainId } = useAccount()
  const { data: blockNumber } = useBlockNumber()
  const { data: block } = useBlock({
    blockNumber,
  })

  const alchemy = new Alchemy(ALCHEMY_CONFIG)

  const getTokenMetadata = async (address: string) => {
    const metadata = await alchemy.core.getTokenMetadata(address)
    return metadata
  }

  const getTreasuryBalances = async (address: string) => {
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

  useEffect(() => {
    if (daoInfo?.timelock) {
      getTreasuryBalances(daoInfo?.timelock)
    }
  }, [daoInfo])

  const fetchImage = async (name: string) => {
    const file = await pinata.files.public.list().then((files) => {
      const pceFiles = files.files.filter((file) => file.name == name)

      if (pceFiles.length > 0) {
        setImageHash(pceFiles[0]?.cid as string)
      }
      return pceFiles
    })
    return file
  }

  useEffect(() => {
    if (daoInfo?.id && localDict) {
      toast.info(localDict.fetchingImage ?? 'Fetching image...')
      fetchImage(daoInfo?.id)
      toast.success(
        localDict.imageFetchedSuccessfully ?? 'Image fetched successfully'
      )
    }
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

  const client = new ApolloClient({
    uri: SUBGRAPH_URL[chainId || localhost.id] as string,
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
                  chainId || localhost.id
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
                  chainId || localhost.id
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
                  chainId || localhost.id
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
                  chainId || localhost.id
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
    fetchData(proposalCount)
  }, [proposalCount, isConfirmed, daoInfo])

  useEffect(() => {
    const fetchIdenticon = async () => {
      if (daoInfo?.governor) {
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
      toast.error('Please enter a valid amount')
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
        toast.success(
          <div onClick={(e) => e.stopPropagation()}>
            <CustomLink.default
              chainId={chainId}
              type="txHash"
              hash={hash}
              message="Transaction Succeed!"
            ></CustomLink.default>
          </div>
        )

        setDelegateAddr('')
        await refetchVotes()
        await getTreasuryBalances(daoInfo?.timelock as `0x${string}`)
        await refetchProposalCount()
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
      try {
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

        const symbol = await readContract(config, {
          abi: PCE_ABI,
          address: data.daocreateds[0]?.communityToken as `0x${string}`,
          functionName: 'symbol',
        })

        setDaoInfo({
          ...data.daocreateds[0],
          communityTokenSymbol: symbol as string,
        })
      } catch (error) {
        console.error('Error fetching data', error)
      }
    }

    fetchData()
  }, [id])

  useEffect(() => {
    const updateImage = async () => {
      try {
        if (!daoInfo?.id) return

        toast.info(localDict.updatingImage ?? 'Updating image...')
        const prevImages = await fetchImage(daoInfo?.id)
        if (prevImages) {
          const res = await pinata.files.public.delete(
            prevImages.map((file: any) => file.id)
          )
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
        toast.success(
          localDict.imageUpdatedSuccessfully ?? 'Image updated successfully'
        )
      } catch (error) {
        console.log(error)
      }
    }

    updateImage()
  }, [croppedImage])

  const deleteImage = async () => {
    try {
      if (!daoInfo?.id) return

      toast.info('Deleting image...')
      const prevImages = await fetchImage(daoInfo?.id)
      if (prevImages) {
        const res = await pinata.files.public.delete(
          prevImages.map((file: any) => file.id)
        )
      }
      setImageHash('')
      toast.success('Image deleted successfully')
    } catch (error) {
      console.log(error)
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
          <img
            src={
              imageHash
                ? `https://orange-elegant-takin-78.mypinata.cloud/ipfs/${imageHash}`
                : identicon
            }
            alt=""
            className="w-24 h-24"
          />
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
                    if (address != (_owner as `0x${string}`)) {
                      toast.error('You are not the owner of this DAO')
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

        <div className="flex flex-row gap-2 font-bold text-5xl">
          {daoInfo?.name}{' '}
        </div>
      </div>
      {selectedImage && isCropModalOpen && (
        <ImageCropModal
          localDict={localDict}
          imageSrc={selectedImage}
          onClose={() => setIsCropModalOpen(false)}
          onCropComplete={(cropped) => setCroppedImage(cropped)}
        />
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

                {/* <div className="flex bg-gray-100 rounded-xl items-center justify-between cursor-pointer">
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
                </div> */}

                <div className="flex flex-col border rounded-xl p-4 gap-4 bg-gray-100">
                  <h1 className="font-bold rounded-xl  flex">
                    {localDict.createdAt ?? 'Created at'}{' '}
                    {new Date(
                      Number(daoInfo?.blockTimestamp) * 1000
                    ).toLocaleString()}
                  </h1>
                </div>
                <div className="flex flex-col  border rounded-xl p-4 gap-4 mb-40 bg-gray-100">
                  <div className="flex flex-row justify-between items-center">
                    <h1 className="font-bold rounded-xl flex">
                      <Link
                        href={
                          daoInfo?.website
                            ? daoInfo?.website
                            : 'https://website.com'
                        }
                        className="text-dark_blue"
                      >
                        DAO Site
                      </Link>
                    </h1>
                  </div>
                  <div className="flex flex-row justify-between items-center">
                    <h1 className="font-bold rounded-xl flex">
                      <Link
                        href={
                          daoInfo?.linkedin
                            ? daoInfo?.linkedin
                            : 'https://www.linkedin.com/'
                        }
                        className="text-dark_blue"
                      >
                        Linkedin
                      </Link>
                    </h1>
                  </div>
                  <div className="flex flex-row justify-between items-center">
                    <h1 className="font-bold rounded-xl flex">
                      <Link
                        href={
                          daoInfo?.twitter
                            ? daoInfo?.twitter
                            : 'https://twitter.com'
                        }
                        className="text-dark_blue"
                      >
                        Twitter
                      </Link>
                    </h1>
                  </div>
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
                <h1 className="text-2xl font-bold">
                  {localDict.treasury ?? 'Treasury'}
                </h1>
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
                      {treasuryBalances?.map((token, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-bold">
                            {token.name === '' ? 'PCE TEST' : token.name}
                          </TableCell>
                          <TableCell className="font-bold">
                            {formatString(
                              formatEther(BigInt(token.tokenBalance).toString())
                            )}{' '}
                            {token.symbol === '' ? 'PCE TEST' : token.symbol}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
              <div className="flex flex-col w-full md:w-[40%]">
                <h1 className="text-2xl font-bold">
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
                    <DialogTrigger>
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
                                daoInfo?.timelock,
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
          <TabsContent value="holders">
            <div className="flex flex-row mt-4 gap-4">
              <div className="flex flex-col w-full gap-4">
                <div className="flex flex-col md:flex-row w-full gap-4 items-center justify-between">
                  <div className="flex flex-col gap-4">
                    <h1 className="flex flex-row text-2xl font-bold gap-4">
                      {localDict.votingPowerBreakdown ??
                        'Voting Power Breakdown'}
                      {/* <div className="flex bg-dark_blue rounded-xl text-white font-bold items-center justify-center text-xs px-4">
                        0
                      </div> */}
                    </h1>

                    {/* <div className="flex flex-row gap-6">
                      <div className="flex flex-row gap-2 items-center">
                        <Checkbox />
                        <h1>DAO Holders</h1>
                      </div>
                      <div className="flex flex-row gap-2 items-center">
                        <Checkbox />
                        <h1>Global Experts</h1>
                      </div>
                      <div className="flex flex-row gap-2 items-center">
                        <Checkbox />
                        <h1>Local Experts</h1>
                      </div>
                    </div> */}
                  </div>
                </div>
                <div className="flex flex-row gap-4">
                  <AmountInput
                    localDict={localDict}
                    className="w-60 bg-dark_blue"
                    setStakingAmount={setStakingAmount}
                    handleStake={handleStake}
                    maxAmount={
                      communityTokenBalance
                        ? Number(
                            formatEther(BigInt(communityTokenBalance as string))
                          )
                        : 0
                    }
                  />
                  <Button
                    className="w-60 bg-dark_blue"
                    onClick={handleWithdraw}
                  >
                    {localDict.withdraw ?? 'Withdraw'}
                  </Button>

                  <Button
                    className="w-60 bg-dark_blue"
                    onClick={async () => {
                      setIsDelegateDialogOpened(true)
                    }}
                  >
                    {localDict.delegate ?? 'Delegate'}
                  </Button>
                </div>
                <div className="rounded-xl flex border mt-4 flex-row w-full gap-4">
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
                            <h1 className="text-md text-dark_blue font-bold">
                              {daoInfo ? daoInfo.communityToken : '-'}
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
                          {daoInfo?.communityTokenSymbol}
                        </TableCell>
                        <TableCell className="font-bold font-md text-dark_blue">
                          {governanceTokenBalance
                            ? formatString(
                                formatEther(
                                  BigInt(governanceTokenBalance as string)
                                )
                              )
                            : '0'}{' '}
                          {daoInfo?.communityTokenSymbol}
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
      </Dialog>
      <ToastContainer position="bottom-right" draggable></ToastContainer>
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
