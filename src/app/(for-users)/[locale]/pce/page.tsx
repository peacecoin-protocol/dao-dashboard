'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import * as CustomLink from '~/components/custom/Link'

import { useNavigate } from 'react-router-dom'

import { Alchemy, Network } from 'alchemy-sdk'

import 'react-toastify/dist/ReactToastify.css'
import RingLoader from 'react-spinners/RingLoader'
import { ringStyle } from '~/app/constants/styles'
import { Line } from 'rc-progress'
import { generateIdenteapot } from '@teapotlabs/identeapots'

import { Tabs, TabsList, TabsTrigger, TabsContent } from '~/components/ui/tabs'
import { Button } from '~/components/ui/button'
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

import { AmountInput } from '~/components/custom/amount-input'
import { getDict } from '~/i18n/get-dict'

import { PagePropsWithLocale, Dictionary } from '~/i18n/types'

import { formatString, shortenAddress } from '~/components/utils'
import { PCE_ABI } from '~/app/ABIs/PCEToken'
import { GOVERNOR_ABI } from '~/app/ABIs/Governor'
import { Textarea } from '~/components/ui/textarea'
import { config } from '~/lib/config'
import { TIMELOCK_ABI } from '~/app/ABIs/Timelock'
import { TooltipComponent } from '~/components/custom/TooltipComponent'
import { CommunityGov_ABI } from '~/app/ABIs/CommunityGov'
import { localhost } from '~/app/providers'
import { waitForTransactionReceipt } from '@wagmi/core'
import { useBlock } from 'wagmi'
import {
  governorAddress,
  pceAddress,
  pceGovToken,
  timelockAddress,
  factoryAddress,
} from '~/app/constants/constants'
import { PCE_C_GOV_TOKEN_ABI } from '~/app/ABIs/PCECGovToken'

import { createdAt, WEB, LINKEDIN, TWITTER } from '~/app/constants/constants'
import { Env } from '~/env'
import { timestampToDate } from '~/components/utils'

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

export default function PCEPage({
  params: { locale },
}: PagePropsWithLocale<{}>) {
  const navigate = useNavigate()
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

  const [proposals, setProposals] = useState<any[]>([])
  const [proposalStatus, setStatus] = useState<any[]>([])
  let [loading, setLoading] = useState(true)

  const [category, setCategory] = useState('')

  const [stakingAmount, setStakingAmount] = useState('')

  const [isDelegateDialogOpened, setIsDelegateDialogOpened] = useState(false)
  const [isDepositDialogOpened, setIsDepositDialogOpened] = useState(false)
  const [isCreateProposalDialogOpened, setIsCreateProposalDialogOpened] =
    useState(false)
  const [identicon, setIdenticon] = useState('')
  const [file, setFile] = useState<File>()
  const [imageHash, setImageHash] = useState('')
  const [tabContent, setTabContent] = useState('about')

  const [treasuryBalances, setTreasuryBalances] = useState<TokenBalance[]>([])

  const { address, chainId } = useAccount()

  const alchemyConfig = {
    apiKey: Env.ALCHEMY_API_KEY,
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

  useEffect(() => {
    if (timelockAddress[chainId || localhost.id]) {
      getTreasuryBalances(
        timelockAddress[chainId || localhost.id] as `0x${string}`
      )
    }
  }, [timelockAddress])

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
    address: governorAddress[chainId || localhost.id] as `0x${string}`,
    abi: GOVERNOR_ABI,
    functionName: 'quorumVotes',
  })

  const { data: votingDelay, refetch: refetchVotingDelay } = useReadContract({
    address: governorAddress[chainId || localhost.id] as `0x${string}`,
    abi: GOVERNOR_ABI,
    functionName: 'votingDelay',
    chainId: localhost.id,
  })

  const { data: pceBalance, refetch: refetchPCEBalance } = useReadContract({
    address: pceAddress[chainId || localhost.id] as `0x${string}`,
    abi: PCE_ABI,
    functionName: 'balanceOf',
    args: [address],
  })

  const { data: governanceTokenBalance, refetch: refetchGovTokenBalance } =
    useReadContract({
      address: pceGovToken[chainId || localhost.id] as `0x${string}`,
      abi: PCE_ABI,
      functionName: 'balanceOf',
      args: [address],
    })

  const { data: totalSupply, refetch: refetchTotalSupply } = useReadContract({
    address: pceGovToken[chainId || localhost.id] as `0x${string}`,
    abi: PCE_ABI,
    functionName: 'totalSupply',
  })

  const { data: proposalThreshold, refetch: refetchProposalThreshold } =
    useReadContract({
      address: governorAddress[chainId || localhost.id] as `0x${string}`,
      abi: GOVERNOR_ABI,
      functionName: 'proposalThreshold',
    })

  const { data: votingPeriod, refetch: refetchVotingPeriod } = useReadContract({
    address: governorAddress[chainId || localhost.id] as `0x${string}`,
    abi: GOVERNOR_ABI,
    functionName: 'votingPeriod',
  })

  const { data: timelockDelay, refetch: refetchTimelockDelay } =
    useReadContract({
      address: timelockAddress[chainId || localhost.id] as `0x${string}`,
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
    <article className="flex flex-col w-full bg-gray-100 p-4 rounded-xl gap-2">
      <div
        className="flex flex-col gap-2 cursor-pointer"
        onClick={() => {
          navigate(`/${locale}/pce/detail/`, {
            state: { proposal },
          })
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

        <div className="flex flex-row gap-1 sm:gap-4 w-full">
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
      {/* <Dialog
        open={isProposalDetailDialogOpened}
        onOpenChange={(open) => {
          setIsProposalDetailDialogOpened(open)
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Proposal Details</DialogTitle>
            <DialogDescription>
              <div className="flex flex-col gap-2">
                <h1>Proposal ID: {index}</h1>
                <h1>Proposal Description: {proposal[9]}</h1>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog> */}
    </article>
  )

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

  const { data: votes, refetch: refetchVotes } = useReadContract({
    address: pceGovToken[chainId || localhost.id] as `0x${string}`,
    abi: PCE_C_GOV_TOKEN_ABI,
    functionName: 'getVotes',
    args: [address],
  })

  const { data: proposalCount, refetch: refetchProposalCount } =
    useReadContract({
      address: governorAddress[chainId || localhost.id] as `0x${string}`,
      abi: GOVERNOR_ABI,
      functionName: 'proposalCount',
    })

  const fetchData = async (count: number) => {
    setLoading(true)
    if (!count || !governorAddress || count == 0) {
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
          address: governorAddress[chainId || localhost.id] as `0x${string}`,
          abi: GOVERNOR_ABI,
          functionName: 'proposals',
          args: [i],
        })

        status = await readContract(config, {
          address: governorAddress[chainId || localhost.id] as `0x${string}`,
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
    fetchData(Number(proposalCount))
  }, [proposalCount, governorAddress, chainId, isConfirmed])

  useEffect(() => {
    const fetchIdenticon = async () => {
      if (governorAddress) {
        setIdenticon(
          await generateIdenteapot(
            governorAddress[chainId || localhost.id] as `0x${string}`,
            ''
          )
        )
      }
    }
    fetchIdenticon()
  }, [governorAddress, chainId])

  const handleCreateProposal = async () => {
    setIsCreateProposalDialogOpened(false)

    if (category.length == 0) {
      toast.error('Please Select Category')
      return
    }

    if (tokenAddress.length == 0) {
      toast.error('Please enter a valid token address')
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
      _address = factoryAddress[chainId || localhost.id]
    } else if (category === '5') {
      _address = timelockAddress[chainId || localhost.id]
      _signature = 'updateVariables(uint256,uint256,uint256)'
      _calldata = new ethers.AbiCoder().encode(
        ['uint256', 'uint256', 'uint256'],
        [variable1, variable2, variable3]
      )
    } else if (category === '6') {
      _address = governorAddress[chainId || localhost.id]
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

    writeContract({
      abi: GOVERNOR_ABI,
      address: governorAddress[chainId || localhost.id] as `0x${string}`,
      functionName: 'propose',
      args: [[_address], [_value], [_signature], [_calldata], description],
    })

    await refetchProposalCount()
  }

  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    abi: PCE_ABI,
    address: pceAddress[chainId || localhost.id] as `0x${string}`,
    functionName: 'allowance',
    args: [address, pceGovToken[chainId || localhost.id] as `0x${string}`],
  })

  const handleStake = async () => {
    if (stakingAmount === '' || stakingAmount === '0') {
      toast.error('Please enter a valid amount')
      return
    }

    const allowance = await readContract(config, {
      abi: PCE_ABI,
      address: pceAddress[chainId || localhost.id] as `0x${string}`,
      functionName: 'allowance',
      args: [address, pceGovToken[chainId || localhost.id] as `0x${string}`],
    })

    if (
      (BigInt(allowance as string) as bigint) <
      BigInt(parseEther(stakingAmount))
    ) {
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

    await refetchGovTokenBalance()
    await refetchPCEBalance()
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  const handleWithdraw = async () => {
    if (BigInt(governanceTokenBalance as string) > 0) {
      let tx
      try {
        tx = await writeContractAsync({
          abi: PCE_C_GOV_TOKEN_ABI,
          address: pceGovToken[chainId || localhost.id] as `0x${string}`,
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
      await refetchPCEBalance()
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
          address: pceGovToken[chainId || localhost.id] as `0x${string}`,
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
        await getTreasuryBalances(
          timelockAddress[chainId || localhost.id] as `0x${string}`
        )
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

  return (
    <div className="items-center justify-center flex flex-col mx-4 sm:mx-20 gap-4">
      <div className="flex flex-row w-full items-center gap-4 mt-8">
        <img src="/pce_logo.jpg" alt="" className="w-36 h-36" />

        <div className="flex flex-row gap-2 font-bold text-5xl">
          {localDict.title}
        </div>
      </div>

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
            <div className="flex sm:flex-row flex-col w-full gap-8">
              <div className="flex flex-col w-full mt-4 gap-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full gap-2">
                  <h1 className="text-2xl font-bold">
                    {localDict.latestProposals}
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
              <div className="flex flex-col sm:w-[40%] gap-4">
                <h1 className="text-2xl font-bold mt-4">{localDict.about}</h1>

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
                      address={
                        pceGovToken[chainId || localhost.id] as `0x${string}`
                      }
                      message={shortenAddress(
                        pceGovToken[chainId || localhost.id] as `0x${string}`
                      )}
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
                      address={
                        timelockAddress[
                          chainId || localhost.id
                        ] as `0x${string}`
                      }
                      message={shortenAddress(
                        timelockAddress[
                          chainId || localhost.id
                        ] as `0x${string}`
                      )}
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
                      address={
                        governorAddress[
                          chainId || localhost.id
                        ] as `0x${string}`
                      }
                      message={shortenAddress(
                        governorAddress[
                          chainId || localhost.id
                        ] as `0x${string}`
                      )}
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
                      title={localDict.quorumVotes ?? 'Quorum Votes'}
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
                      Number(createdAt[chainId || localhost.id]) * 1000
                    ).toLocaleString()}
                  </h1>
                </div>
                <div className="flex flex-col  border rounded-xl p-4 gap-4 mb-40 bg-gray-100">
                  <div className="flex flex-row justify-between items-center">
                    <h1 className="font-bold rounded-xl flex">
                      <Link href={WEB || '#'} className="text-dark_blue">
                        {localDict.daoSite ?? 'DAO Site'}
                      </Link>
                    </h1>
                  </div>
                  <div className="flex flex-row justify-between items-center">
                    <h1 className="font-bold rounded-xl flex">
                      <Link href={LINKEDIN || '#'} className="text-dark_blue">
                        {localDict.linkedin ?? 'Linkedin'}
                      </Link>
                    </h1>
                  </div>
                  <div className="flex flex-row justify-between items-center">
                    <h1 className="font-bold rounded-xl flex">
                      <Link href={TWITTER || '#'} className="text-dark_blue">
                        {localDict.twitter ?? 'Twitter'}
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
                    {localDict.all ?? 'All'}
                  </TabsTrigger>
                  <TabsTrigger className="w-20" value="active">
                    {localDict.active ?? 'Active'}
                  </TabsTrigger>
                  <TabsTrigger className="w-20" value="executed">
                    {localDict.executed ?? 'Executed'}
                  </TabsTrigger>
                  <TabsTrigger className="w-20" value="defeated">
                    {localDict.defeated ?? 'Defeated'}
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
            <div className="flex flex-col sm:flex-row mt-4 gap-4 ">
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
              <div className="flex flex-col w-full sm:w-[40%]">
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
                        <DialogTitle>
                          {localDict.address ?? 'Address'}
                        </DialogTitle>
                        <DialogDescription>
                          {localDict.tokenAddress ?? 'Token address to deposit'}
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
                          className="w-full bg-dark_blue"
                          onClick={async () => {
                            await writeContract({
                              abi: PCE_ABI,
                              address: tokenAddress as `0x${string}`,
                              functionName: 'transfer',
                              args: [
                                timelockAddress[
                                  chainId || localhost.id
                                ] as `0x${string}`,
                                parseEther(transferAmount),
                              ],
                            })

                            setTokenAddress('')
                            setTransferAmount('')
                            setIsDepositDialogOpened(!isDepositDialogOpened)
                            await refetchPCEBalance()
                            await refetchGovTokenBalance()
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
                </div>

                <div className="flex flex-col justify-between border rounded-xl p-4 mt-4 gap-4 bg-gray-100">
                  <h1 className="font-bold rounded-xl flex">
                    Delegated to DAO
                  </h1>
                  <div className="flex flex-row justify-between">
                    <h1 className="font-bold rounded-xl  flex">
                      Delegated to DAO
                    </h1>
                    <h1 className="font-bold rounded-xl  flex">$0</h1>
                  </div>

                  <div className="flex flex-row justify-between">
                    <h1 className="font-bold rounded-xl  flex">
                      Historical Rewards Earned
                    </h1>
                    <h1 className="font-bold rounded-xl  flex">$0</h1>
                  </div>

                  <div className="flex flex-row justify-between">
                    <h1 className="font-bold rounded-xl  flex">
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
                <div className="flex flex-col sm:flex-row w-full gap-4 items-center justify-between">
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
                    className="w-60 bg-dark_blue"
                    setStakingAmount={setStakingAmount}
                    localDict={localDict}
                    handleStake={handleStake}
                    maxAmount={
                      pceBalance
                        ? Number(formatEther(BigInt(pceBalance as string)))
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
                          {localDict.pceTokenAmount ?? 'PCE Token Amount'}
                        </TableHead>
                        <TableHead>
                          {localDict.governanceTokenAmount ??
                            'Governance Token Amount'}
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
                              {pceAddress[chainId || localhost.id]
                                ? pceAddress[chainId || localhost.id]
                                : '-'}
                            </h1>
                          </div>
                        </TableCell>
                        <TableCell className="font-bold font-md text-dark_blue">
                          {pceBalance
                            ? formatString(
                                formatEther(BigInt(pceBalance as string))
                              )
                            : '0'}{' '}
                          PCE
                        </TableCell>
                        <TableCell className="font-bold font-md text-dark_blue">
                          {governanceTokenBalance
                            ? formatString(
                                formatEther(
                                  BigInt(governanceTokenBalance as string)
                                )
                              )
                            : '0'}{' '}
                          PCE
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
              handleDelegate={handleDelegate}
              localDict={localDict}
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
          <DialogDescription className="flex flex-col gap-4 mb-2">
            <Select onValueChange={(value) => handleSelect(value)}>
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder={localDict.selectACategory ?? 'Select a category'}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">{dict?.submit?.category1}</SelectItem>
                <SelectItem value="2">{dict?.submit?.category2}</SelectItem>
                <SelectItem value="3">{dict?.submit?.category3}</SelectItem>
                <SelectItem value="4">{dict?.submit?.category4}</SelectItem>
                <SelectItem value="5">{dict?.submit?.category5}</SelectItem>
                <SelectItem value="6">{dict?.submit?.category6}</SelectItem>
              </SelectContent>
            </Select>

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

            <Button onClick={handleCreateProposal}>Create</Button>
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
