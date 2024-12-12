'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useNavigate } from 'react-router-dom'

import 'react-toastify/dist/ReactToastify.css'
import RingLoader from 'react-spinners/RingLoader'
import { ringStyle } from '~/app/constants/styles'
import { Line } from 'rc-progress'

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

import { ethers, formatEther } from 'ethers'
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
} from '~/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'

import { createDaoFactoryClient } from '~/app/apollo-client'
import { gql } from '@apollo/client'

import { getDict } from '~/i18n/get-dict'

import { PagePropsWithLocale, Dictionary } from '~/i18n/types'
import { Checkbox } from '~/components/ui/checkbox'

import BackIcon from '../../../../../../../public/svg/back'
import { useParams } from 'react-router-dom'
import { formatString, shortenAddress } from '~/components/utils'
import { PCE_ABI } from '~/app/ABIs/PCEToken'
import { GOVERNOR_ABI } from '~/app/ABIs/Governor'
import { POLY_SCAN_TX } from '~/app/constants/constants'
import { Textarea } from '~/components/ui/textarea'
import { config } from '~/lib/config'
import { TIMELOCK_ABI } from '~/app/ABIs/Timelock'

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
}

type Proposal = {
  id: number
  description: string
  status: string
}

const DelegateDialog = ({
  isOpen,
  onOpenChange,
  delegateAddr,
  handleChange,
  handleDelegate,
}: {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  delegateAddr: string
  handleChange: (e: any) => void
  handleDelegate: () => void
}) => (
  <Dialog open={isOpen} onOpenChange={onOpenChange}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Delegate</DialogTitle>
        <DialogDescription className="flex flex-col gap-4">
          <Input
            placeholder="Enter address"
            value={delegateAddr}
            name="delegateAddr"
            onChange={handleChange}
          />
          <div>
            <Button onClick={handleDelegate}>Delegate</Button>
          </div>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
)

export default function ForSubmitPage({
  params: { locale },
}: PagePropsWithLocale<{}>) {
  const navigate = useNavigate()
  const [dict, setDict] = useState<Dictionary | null>(null)
  const client = createDaoFactoryClient()

  const [daoInfo, setDaoInfo] = useState<Dao[]>([])
  const [delegateAddr, setDelegateAddr] = useState('')
  const [transferAddr, setTransferAddr] = useState('')
  const [description, setDescription] = useState('')
  const [transferAmount, setTransferAmount] = useState('')

  const [proposals, setProposals] = useState<any[]>([])
  const [proposalStatus, setStatus] = useState<any[]>([])
  let [loading, setLoading] = useState(true)

  const [category, setCategory] = useState('')
  const [isDelegateDialogOpened, setIsDelegateDialogOpened] = useState(false)
  const [isCreateProposalDialogOpened, setIsCreateProposalDialogOpened] =
    useState(false)
  const [isProposalDetailDialogOpened, setIsProposalDetailDialogOpened] =
    useState(false)

  const [tabContent, setTabContent] = useState('about')

  const pathname = useParams()
  const id = pathname.id

  const { address, chainId } = useAccount()
  const { data: hash, error, writeContract } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })

  const transferInterface = new ethers.Interface([
    'function transfer(address to, uint256 amount)',
  ])
  const { data: quorum, refetch: refetchQuorum } = useReadContract({
    address: daoInfo[0]?.governor as `0x${string}`,
    abi: GOVERNOR_ABI,
    functionName: 'quorumVotes',
    chainId: chainId,
  })

  const { data: votingDelay, refetch: refetchVotingDelay } = useReadContract({
    address: daoInfo[0]?.governor as `0x${string}`,
    abi: GOVERNOR_ABI,
    functionName: 'votingDelay',
    chainId: chainId,
  })

  const { data: treasuryBalance, refetch: refetchTreasuryBalance } =
    useReadContract({
      address: daoInfo[0]?.governanceToken as `0x${string}`,
      abi: PCE_ABI,
      functionName: 'balanceOf',
      args: [daoInfo[0]?.timelock as `0x${string}`],
    })

  const { data: totalSupply, refetch: refetchTotalSupply } = useReadContract({
    address: daoInfo[0]?.governanceToken as `0x${string}`,
    abi: PCE_ABI,
    functionName: 'totalSupply',
  })

  const { data: proposalThreshold, refetch: refetchProposalThreshold } =
    useReadContract({
      address: daoInfo[0]?.governor as `0x${string}`,
      abi: GOVERNOR_ABI,
      functionName: 'proposalThreshold',
      chainId: chainId,
    })

  const { data: votingPeriod, refetch: refetchVotingPeriod } = useReadContract({
    address: daoInfo[0]?.governor as `0x${string}`,
    abi: GOVERNOR_ABI,
    functionName: 'votingPeriod',
    chainId: chainId,
  })

  const { data: timelockDelay, refetch: refetchTimelockDelay } =
    useReadContract({
      address: daoInfo[0]?.timelock as `0x${string}`,
      abi: TIMELOCK_ABI,
      functionName: 'delay',
      chainId: chainId,
    })

  const ProposalCard = ({
    proposal,
    status,
  }: {
    proposal: any
    status: string
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
        <span className="flex bg-light_dark rounded-xl text-dark_blue font-bold p-1 items-center justify-center text-sm px-4">
          {status}
        </span>
      </div>
      <p className="description">{proposal[9] || 'Description'}</p>
      <span className="flex bg-light_dark rounded-xl text-dark_blue font-bold w-44 p-1 items-center justify-center text-sm px-4">
        Transfer tokens
      </span>
      <Dialog
        open={isProposalDetailDialogOpened}
        onOpenChange={(open) => {
          setIsProposalDetailDialogOpened(open)
        }}
      >
        <div className="flex flex-col gap-2">
          <div className="flex flex-row justify-between">
            <h1>Vote For</h1>
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
            strokeColor="#1588C8"
            trailColor="#D3D3D3"
            strokeWidth={1}
            trailWidth={1}
          />
          <div className="flex flex-row justify-between">
            <h1>Vote Against</h1>
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
            strokeColor="#1588C8"
            trailColor="#D3D3D3"
            strokeWidth={1}
            trailWidth={1}
          />

          <div className="flex flex-row gap-4 w-full">
            <Button
              className="w-full"
              disabled={status !== 'Active'}
              onClick={async () => {
                await writeContract({
                  abi: GOVERNOR_ABI,
                  address: daoInfo[0]?.governor as `0x${string}`,
                  functionName: 'castVote',
                  args: [proposal[0], true],
                })
                setIsProposalDetailDialogOpened(false)
              }}
            >
              Vote For
            </Button>
            <Button
              className="w-full"
              disabled={status !== 'Active'}
              onClick={async () => {
                await writeContract({
                  abi: GOVERNOR_ABI,
                  address: daoInfo[0]?.governor as `0x${string}`,
                  functionName: 'castVote',
                  args: [proposal[0], false],
                })
                setIsProposalDetailDialogOpened(false)
              }}
            >
              Vote Against
            </Button>
            <Button
              className="w-full"
              disabled={status !== 'Succeeded'}
              onClick={async () => {
                await writeContract({
                  abi: GOVERNOR_ABI,
                  address: daoInfo[0]?.governor as `0x${string}`,
                  functionName: 'queue',
                  args: [proposal[0]],
                })
                setIsProposalDetailDialogOpened(false)
              }}
            >
              Queue
            </Button>
            <Button
              className="w-full"
              disabled={status !== 'Queued'}
              onClick={async () => {
                await writeContract({
                  abi: GOVERNOR_ABI,
                  address: daoInfo[0]?.governor as `0x${string}`,
                  functionName: 'execute',
                  args: [proposal[0]],
                })
                setIsProposalDetailDialogOpened(false)
              }}
            >
              Execute
            </Button>
          </div>
        </div>
      </Dialog>
    </article>
  )

  function handleSelect(value: any) {
    setCategory(value)
  }

  function handleChange(event: any) {
    const name = event.target.name
    const value = event.target.value
    if (name === 'delegateAddr') {
      setDelegateAddr(value)
    } else if (name === 'transferAddr') {
      setTransferAddr(value)
    } else if (name === 'description') {
      setDescription(value)
    } else if (name === 'transferAmount') {
      setTransferAmount(value)
    }
  }

  const { data: votes, refetch: refetchVotes } = useReadContract({
    address: daoInfo[0]?.governanceToken as `0x${string}`,
    abi: PCE_ABI,
    functionName: 'getVotes',
    args: [address],
    chainId: chainId,
  })

  const { data: proposalCount, refetch: refetchProposalCount } =
    useReadContract({
      address: daoInfo[0]?.governor as `0x${string}`,
      abi: GOVERNOR_ABI,
      functionName: 'proposalCount',
      chainId: chainId,
    })

  const fetchData = async (count: any) => {
    setLoading(true)
    if (!count || !daoInfo[0]?.governor || count === 0) {
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
          address: daoInfo[0]?.governor as `0x${string}`,
          abi: GOVERNOR_ABI,
          functionName: 'proposals',
          args: [i],
        })

        status = await readContract(config, {
          address: daoInfo[0]?.governor as `0x${string}`,
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
  }, [proposalCount, isConfirmed])

  const handleCreateProposal = async () => {
    setIsCreateProposalDialogOpened(false)

    const _calldata = new ethers.AbiCoder().encode(
      ['address', 'uint256'],
      [transferAddr, BigInt(transferAmount) * BigInt(1e18)]
    )
    const _signature = 'transfer(address,uint256)'

    writeContract({
      abi: GOVERNOR_ABI,
      address: daoInfo[0]?.governor as `0x${string}`,
      functionName: 'propose',
      args: [
        [daoInfo[0]?.governanceToken as `0x${string}`],
        [0],
        [_signature],
        [_calldata],
        description,
      ],
    })

    await refetchProposalCount()
  }

  const handleDelegate = async () => {
    setIsDelegateDialogOpened(false)
    writeContract({
      abi: PCE_ABI,
      address: daoInfo[0]?.governanceToken as `0x${string}`,
      functionName: 'delegate',
      args: [delegateAddr],
    })
  }

  useEffect(() => {
    const notify = async () => {
      if (isConfirmed) {
        toast.success(
          <div onClick={(e) => e.stopPropagation()}>
            <Link href={`${POLY_SCAN_TX}${hash}`} target="_blank">
              Transaction Succeed!
            </Link>
          </div>
        )

        setDelegateAddr('')
        await refetchVotes()
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
              blockTimestamp
            }
          }
          `,
        })

        setDaoInfo(data.daocreateds)
      } catch (error) {
        console.error('Error fetching data', error)
      }
    }

    fetchData()
  }, [id])

  return (
    <div className="items-center justify-center flex flex-col mx-4 md:mx-20 gap-4">
      <div
        className="flex flex-row gap-2 w-full mt-4 items-center"
        onClick={() => {
          navigate(`/${locale}/dao`)
        }}
      >
        <BackIcon colorClass="fill-heavy_white"></BackIcon>
        <button className="text-heavy_white">Back</button>
      </div>
      <div className="flex flex-row w-full items-center justify-between py-4">
        <div className="flex flex-row w-full items-center gap-4">
          <div
            className="rounded-full flex items-center justify-center"
            style={{
              backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
            }}
          >
            <span className="text-4xl text-white font-bold w-20 h-20 xl:w-24 xl:h-24 flex items-center justify-center">
              {daoInfo[0]?.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2 font-bold text-3xl">
              {daoInfo[0]?.name}{' '}
            </div>
            <div className="text-dark_blue text-xl items-center flex">
              {shortenAddress(daoInfo[0]?.governanceToken)}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row w-full items-center">
        <Tabs defaultValue="about" className="w-full" value={tabContent}>
          <TabsList>
            <TabsTrigger value="about" onClick={() => setTabContent('about')}>
              About DAO
            </TabsTrigger>
            <TabsTrigger value="all" onClick={() => setTabContent('all')}>
              All Proposals
            </TabsTrigger>
            <TabsTrigger
              value="balance"
              onClick={() => setTabContent('balance')}
            >
              DAO Balance
            </TabsTrigger>
            <TabsTrigger
              value="holders"
              onClick={() => setTabContent('holders')}
            >
              Holders
            </TabsTrigger>
          </TabsList>
          <TabsContent value="about" className="">
            <div className="flex md:flex-row flex-col w-full gap-8">
              <div className="flex flex-col w-full mt-4 gap-4">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center w-full gap-2">
                  <h1 className="text-2xl font-bold">Latest Proposals</h1>
                  <div className="flex flex-row gap-4">
                    <Button
                      onClick={() => {
                        setIsCreateProposalDialogOpened(true)
                      }}
                    >
                      + Create new
                    </Button>
                    <Button onClick={() => setTabContent('all')}>
                      View all
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
                    />
                  ))}
              </div>
              <div className="flex flex-col md:w-[40%] gap-4">
                <h1 className="text-2xl font-bold mt-4">About DAO</h1>

                <div className="flex flex-row justify-between items-center border rounded-xl p-4 mt-2 bg-gray-100">
                  <h1 className="font-bold rounded-xl  flex">
                    Governance Token
                  </h1>
                  <Link
                    href={`https://amoy.polygonscan.com/address/${daoInfo[0]?.governanceToken}`}
                    className="text-dark_blue"
                  >
                    {shortenAddress(daoInfo[0]?.governanceToken)}
                  </Link>
                </div>

                <div className="flex flex-row justify-between items-center border rounded-xl p-4 mt-2 bg-gray-100 w-full">
                  <h1 className="font-bold rounded-xl  flex">Timelock</h1>
                  <Link
                    href={`https://amoy.polygonscan.com/address/${daoInfo[0]?.timelock}`}
                    className="text-dark_blue"
                  >
                    {shortenAddress(daoInfo[0]?.timelock)}
                  </Link>
                </div>

                <div className="flex flex-row justify-between items-center border rounded-xl p-4 mt-2 bg-gray-100">
                  <h1 className="font-bold rounded-xl  flex">Governor</h1>
                  <Link
                    href={`https://amoy.polygonscan.com/address/${daoInfo[0]?.governor}`}
                    className="text-dark_blue"
                  >
                    {shortenAddress(daoInfo[0]?.governor)}
                  </Link>
                </div>

                <div className="flex flex-col border rounded-xl p-4 bg-gray-100 gap-4">
                  <div className="flex flex-row justify-between items-center">
                    <h1 className="font-bold rounded-xl flex">Vote Delay</h1>

                    <div className="text-dark_blue">
                      {votingDelay ? formatString(votingDelay as string) : '0'}
                    </div>
                  </div>

                  <div className="flex flex-row justify-between items-center">
                    <h1 className="font-bold rounded-xl flex">Voting Period</h1>

                    <div className="text-dark_blue">
                      {votingPeriod
                        ? formatString(votingPeriod as string)
                        : '0'}
                    </div>
                  </div>

                  <div className="flex flex-row justify-between items-center">
                    <h1 className="font-bold rounded-xl flex">
                      Timelock Delay
                    </h1>

                    <div className="text-dark_blue">
                      {timelockDelay
                        ? formatString(timelockDelay as string)
                        : '0'}
                    </div>
                  </div>

                  <div className="flex flex-row justify-between items-center">
                    <h1 className="font-bold rounded-xl flex">
                      Proposal Threshold
                    </h1>

                    <div className="text-dark_blue">
                      {proposalThreshold
                        ? formatString(proposalThreshold as string)
                        : '0'}
                    </div>
                  </div>

                  <div className="flex flex-row gap-4 justify-between items-center">
                    <h1 className="font-bold rounded-xl  flex">Quorum Votes</h1>
                    <div className="text-dark_blue">
                      {quorum ? formatString(quorum as string) : '0'}
                    </div>
                  </div>
                </div>

                <div className="flex flex-row justify-between items-center border rounded-xl p-4 bg-gray-100">
                  <h1 className="font-bold rounded-xl  flex">My Power</h1>
                  <div className="text-dark_blue">
                    {votes
                      ? formatString(formatEther(BigInt(votes as string)))
                      : '0'}
                  </div>
                </div>

                <div className="flex bg-gray-100 rounded-xl items-center justify-between cursor-pointer">
                  <div className="flex flex-row gap-4 w-full items-center p-4">
                    <div className="flex flex-col gap-2 w-full">
                      <div className="text-heavy_white text-sm">TVL</div>

                      <div className="flex bg-light_dark rounded-xl text-dark_blue font-bold p-1 w-16 items-center justify-center text-sm">
                        $0
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                      <div className="text-heavy_white text-sm">TVG</div>

                      <div className="flex bg-light_dark rounded-xl text-dark_blue font-bold p-1 w-16 items-center justify-center text-sm">
                        0%
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                      <div className="text-heavy_white text-sm">Members</div>

                      <div className="flex bg-light_dark rounded-xl text-dark_blue font-bold p-1 w-16 items-center justify-center text-sm">
                        0%
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                      <div className="text-heavy_white text-sm">LAU</div>

                      <div className="flex bg-light_dark rounded-xl text-dark_blue font-bold p-1 w-16 items-center justify-center text-sm">
                        0%
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col border rounded-xl p-4 gap-4 bg-gray-100">
                  <h1 className="font-bold rounded-xl flex">
                    {daoInfo[0]?.name} - Essence and Oversight
                  </h1>
                  <h1 className="font-bold rounded-xl  flex">
                    Created Nov{' '}
                    {new Date(
                      Number(daoInfo[0]?.blockTimestamp) * 1000
                    ).toLocaleString()}
                  </h1>
                </div>
                <div className="flex flex-col  border rounded-xl p-4 gap-4 mb-40 bg-gray-100">
                  <div className="flex flex-row justify-between items-center">
                    <h1 className="font-bold rounded-xl flex">DAO Site</h1>
                    <Link
                      href={
                        daoInfo[0] ? daoInfo[0]?.website : 'https://website.com'
                      }
                      className="text-dark_blue"
                    >
                      {shortenAddress(daoInfo[0]?.website)}
                    </Link>
                  </div>
                  <div className="flex flex-row justify-between items-center">
                    <h1 className="font-bold rounded-xl  flex">Linkedin</h1>
                    <Link
                      href={
                        daoInfo[0]?.linkedin
                          ? daoInfo[0]?.linkedin
                          : 'https://www.linkedin.com/'
                      }
                      className="text-dark_blue"
                    >
                      {shortenAddress(daoInfo[0]?.linkedin)}
                    </Link>
                  </div>
                  <div className="flex flex-row justify-between items-center">
                    <h1 className="font-bold rounded-xl  flex">Twitter</h1>
                    <Link
                      href={
                        daoInfo[0]?.twitter
                          ? daoInfo[0]?.twitter
                          : 'https://www.twitter.com/'
                      }
                      className="text-dark_blue"
                    >
                      {shortenAddress(daoInfo[0]?.twitter)}
                    </Link>
                  </div>
                  <div className="flex flex-row justify-between items-center">
                    <h1 className="font-bold rounded-xl  flex">Audits</h1>
                    <Link
                      href={
                        daoInfo[0]?.website
                          ? daoInfo[0]?.website
                          : 'https://website.com'
                      }
                      className="text-dark_blue"
                    >
                      {shortenAddress(daoInfo[0]?.website)}
                    </Link>
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
                    All
                  </TabsTrigger>
                  <TabsTrigger className="w-20" value="active">
                    Active
                  </TabsTrigger>
                  <TabsTrigger className="w-20" value="accepted">
                    Accepted
                  </TabsTrigger>
                  <TabsTrigger className="w-20" value="rejected">
                    Rejected
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="flex w-full flex-col gap-4">
                  {proposals.map((proposal, index) => (
                    <ProposalCard
                      key={index}
                      proposal={proposal}
                      status={proposalStatus[index]}
                    />
                  ))}
                </TabsContent>
                <TabsContent
                  value="active"
                  className="flex w-full flex-col gap-4"
                >
                  {' '}
                  {proposals.map((proposal, index) => {
                    if (proposalStatus[index] === 'Active') {
                      return (
                        <ProposalCard
                          key={index}
                          proposal={proposal}
                          status={proposalStatus[index]}
                        />
                      )
                    }
                    return null
                  })}
                </TabsContent>
                <TabsContent
                  value="accepted"
                  className="flex w-full flex-col gap-4"
                >
                  {' '}
                  {(proposalCount as number) >= 100 && (
                    <div className="flex flex-col w-full bg-gray-100 p-4 rounded-xl gap-2">
                      <div className="flex flex-row items-center justify-between w-full rounded-xl">
                        <h1 className="flex flex-row text-xl font-bold w-full">
                          Transferring liquidity from Uniswap v2 to PancakeSwap
                          v3 (on Ethereum) - Dummy Proposal
                        </h1>
                        <div className="flex bg-light_dark rounded-xl text-dark_blue font-bold p-1 items-center justify-center text-sm px-4">
                          Approved
                        </div>
                      </div>

                      <div>
                        Executive Summary: As a member of the DeXe Association
                        Council and the appointed Validator of DeXe DAO, I
                        propose reserving liquidity within the Ethereum
                        network... - Dummy Proposal
                      </div>

                      <div className="flex bg-light_dark rounded-xl text-dark_blue font-bold w-44 p-1 items-center justify-center text-sm px-4">
                        Single-option voting
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent
                  value="rejected"
                  className="flex w-full flex-col gap-4"
                >
                  {proposals.map((proposal, index) => {
                    if (proposalStatus[index] === 'Defeated') {
                      return (
                        <ProposalCard
                          key={index}
                          proposal={proposal}
                          status={proposalStatus[index]}
                        />
                      )
                    }
                    return null
                  })}
                </TabsContent>
              </Tabs>
            </div>
          </TabsContent>
          <TabsContent value="balance">
            <div className="flex flex-col md:flex-row mt-4 gap-4 ">
              <div className="flex flex-col w-full">
                <h1 className="text-2xl font-bold">Treasury</h1>
                <div className="rounded-xl flex border mt-4 flex-col w-full gap-4 p-4">
                  <div className="flex flex-row gap-2 justify-between items-center">
                    <h1>{daoInfo[0]?.name} Token</h1>
                  </div>
                  <div className="flex flex-row gap-2 justify-between items-center">
                    <h1>DAO Supply Token</h1>
                    <h1>
                      {treasuryBalance
                        ? formatString(
                            formatEther(BigInt(treasuryBalance as string))
                          )
                        : '0'}
                    </h1>
                  </div>

                  <div className="flex flex-row gap-2 justify-between items-center">
                    <h1>% of total Supply</h1>
                    <h1>
                      {totalSupply && treasuryBalance
                        ? Number(
                            (BigInt(treasuryBalance as string) *
                              BigInt(100) *
                              BigInt(1e18)) /
                              BigInt(totalSupply as string)
                          ) / 1e18
                        : 0}
                      %
                    </h1>
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full md:w-[40%]">
                <h1 className="text-2xl font-bold">DAO Balance</h1>

                <div className="flex flex-col justify-between border rounded-xl p-4 mt-4 gap-4 bg-gray-100">
                  <h1 className="font-bold rounded-xl flex text-dark_blue">
                    DAO Treasury
                  </h1>
                  <div className="flex flex-row justify-between">
                    <h1 className="font-bold rounded-xl  flex">Total Value</h1>
                    <h1 className="font-bold rounded-xl  flex">$0</h1>
                  </div>

                  <div className="flex flex-row justify-between">
                    <h1 className="font-bold rounded-xl  flex">
                      Number of Tokens
                    </h1>
                    <h1 className="font-bold rounded-xl  flex">$0</h1>
                  </div>

                  <div className="flex flex-row justify-between">
                    <h1 className="font-bold rounded-xl  flex">
                      Number of NFTs
                    </h1>
                    <h1 className="font-bold rounded-xl  flex">$0</h1>
                  </div>

                  <Button className="w-full">Deposit to DAO Treasury</Button>
                </div>

                <div className="flex flex-col justify-between border rounded-xl p-4 mt-4 gap-4 bg-gray-100">
                  <h1 className="font-bold rounded-xl flex text-dark_blue">
                    DAO Delegated
                  </h1>
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
                    <h1 className="font-bold rounded-xl  flex">$0</h1>
                  </div>

                  <div className="flex flex-row justify-between">
                    <h1 className="font-bold rounded-xl  flex">
                      Available to claim
                    </h1>
                    <h1 className="font-bold rounded-xl  flex">$0</h1>
                  </div>
                </div>

                <div className="flex flex-col justify-between border rounded-xl p-4 mt-4 gap-4 bg-gray-100">
                  <h1 className="font-bold rounded-xl flex text-dark_blue">
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
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="holders">
            <div className="flex flex-row mt-4 gap-4">
              <div className="flex flex-col w-full gap-4">
                <div className="flex flex-col md:flex-row w-full gap-4 items-center justify-between">
                  <div className="flex flex-col gap-4">
                    <h1 className="flex flex-row text-2xl font-bold gap-4">
                      Voting Power Breakdown{' '}
                      <div className="flex bg-light_dark rounded-xl text-dark_blue font-bold items-center justify-center text-xs px-4">
                        45062
                      </div>
                    </h1>

                    <div className="flex flex-row gap-6">
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
                    </div>
                  </div>
                  <Button
                    className="w-80"
                    onClick={() => setIsDelegateDialogOpened(true)}
                  >
                    Delegate to custom address
                  </Button>
                </div>

                <div className="rounded-xl flex border mt-4 flex-row w-full gap-4">
                  <Table className="w-full">
                    <TableHeader>
                      <TableRow>
                        <TableHead>
                          <div className="flex flex-row gap-4">
                            Name/Address
                          </div>
                        </TableHead>
                        <TableHead>Balance</TableHead>
                        <TableHead>Delegated Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <div className="flex flex-row gap-2 items-center">
                            <h1 className="text-md text-dark_blue font-bold">
                              0x0000...67e9
                            </h1>
                          </div>
                        </TableCell>
                        <TableCell className="font-bold font-md">
                          0 {daoInfo[0]?.name}
                        </TableCell>
                        <TableCell className="font-bold font-md">
                          0 {daoInfo[0]?.name}
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
              handleChange={handleChange}
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
          <DialogTitle>Create a Proposal</DialogTitle>
          <DialogDescription className="flex flex-col gap-4">
            <Select onValueChange={handleSelect}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Transfer Tokens</SelectItem>
              </SelectContent>
            </Select>

            <Input
              placeholder="Enter address"
              value={transferAddr}
              name="transferAddr"
              onChange={handleChange}
            />

            <Input
              placeholder="Enter amount"
              value={transferAmount}
              name="transferAmount"
              onChange={handleChange}
            />

            <Textarea
              placeholder="Enter description"
              value={description}
              name="description"
              onChange={handleChange}
            />

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