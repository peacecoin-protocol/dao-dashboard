'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useToast } from '~/hooks/use-toast'

import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
  useSwitchChain,
  type BaseError,
} from 'wagmi'

import { readContract, waitForTransactionReceipt } from '@wagmi/core'
import { generateIdenteapot } from '@teapotlabs/identeapots'
import { ringStyle } from '~/app/constants/styles'

import { DAO_STUDIO_ABI } from '~/app/ABIs/DAOStudio'
import {
  DAO_STUDIO_SUBGRAPH_URL,
  daoStudioAddress,
} from '~/app/constants/constants'

import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from '~/components/ui/dropdown-menu'
import { Dialog, DialogContent, DialogTitle } from '~/components/ui/dialog'

import { ApolloClient, gql, HttpLink, InMemoryCache } from '@apollo/client'

import { useRouter } from 'next/navigation'

import { getDict } from '~/i18n/get-dict'

import { PagePropsWithLocale, Dictionary } from '~/i18n/types'
import { parseEther } from 'viem'

import { Env } from '~/env'

// Fetch token holders from Moralis API, paginating until cursor is null
async function getHolders(chainId: number, tokenAddress: string) {
  // Moralis API endpoint and key
  const apiKey = Env.MORALIS_API_KEY // Replace with your Moralis API key if not using PINATA_JWT
  const chain = chainId === sepolia.id ? 'sepolia' : 'eth' // fallback to eth if not sepolia
  const baseUrl = `https://deep-index.moralis.io/api/v2.2/erc20/${tokenAddress}/owners`
  let countHolders = 0
  let cursor: string | null = null
  let page = 1

  do {
    const url = new URL(baseUrl)
    url.searchParams.set('chain', chain)
    url.searchParams.set('order', 'DESC')
    if (cursor) url.searchParams.set('cursor', cursor)

    const res = await fetch(url.toString(), {
      headers: {
        accept: 'application/json',
        'X-API-Key': apiKey,
      },
    })
    if (!res.ok) throw new Error('Failed to fetch token holders')
    const data = await res.json()

    if (Array.isArray(data.result)) {
      countHolders += data.result.length
    }

    cursor = data.cursor
    page += 1
  } while (cursor)

  // Filter out holders with zero balance and return as [address, balance] tuples
  return countHolders
}

type Dao = {
  id: string
  daoId: string
  daoName: string
  creator: string
  imageHash: string
  identicon: string
  blockTimestamp: string
}

type DaoMetadata = {
  description: string
  website: string
  linkedin: string
  twitter: string
  telegram: string
}

type DaoFormState = {
  name: string
  metadata: DaoMetadata
  tokenAddress: string
  votingDelay: string
  votingPeriod: string
  proposalThreshold: string
  quorumVotes: string
  timelockDelay: string
}
import { TabsContent } from '@radix-ui/react-tabs'
import RingLoader from 'react-spinners/RingLoader'

import { config } from '~/lib/config'
import { sepolia } from 'wagmi/chains'
import { defaultChainId } from '~/app/constants/constants'
import { PCE_C_GOV_TOKEN_ABI } from '~/app/ABIs/PCECGovToken'
import { pinata } from '~/lib/config'
import { DAO_FACTORY_ABI } from '~/app/ABIs/DAOFactory'
import { TIMELOCK_ABI } from '~/app/ABIs/Timelock'
import { GOVERNOR_ABI } from '~/app/ABIs/Governor'
import { shortenAddress } from '~/components/utils'
import { CopyIcon } from 'lucide-react'

const DaoCard = ({
  dao,
  locale,
  router,
  chainId,
  localeDict,
}: {
  dao: Dao
  locale: string
  localeDict: any
  router: any
  chainId: number
}) => {
  const { toast } = useToast()

  const showConnectWalletAlert = () => {
    toast({ title: 'Please connect wallet' })
  }

  return (
    <div
      key={dao.id}
      className="flex flex-col xl:flex-row bg-gray-100 rounded-xl md:px-10 items-start xl:items-center cursor-pointer my-4 gap-4 w-full py-6"
      onClick={() => {
        if (chainId === 0) {
          showConnectWalletAlert()
          return
        }
        router.push(`/${locale}/dao/detail/${dao.daoId}`)
      }}
    >
      <div className="flex flex-row w-full items-center ">
        <div className="flex flex-row gap-4 md:gap-8 items-center border-none mx-8 md:mx-4">
          <div className="w-24 min-w-24 h-24">
            {dao.imageHash ? (
              <Image
                src={`${Env.PINATA_GATEWAY_URL}/ipfs/${dao.imageHash}`}
                alt="DAO Image"
                width={96}
                height={96}
                priority
              />
            ) : (
              <Image
                src={dao.identicon}
                alt="DAO Image"
                width={96}
                height={96}
              />
            )}
          </div>

          <div className="flex flex-col gap-4 w-full">
            <div className="font-bold text-xl md:text-2xl w-full flex flex-col">
              {dao.daoName}
              <span
                className="text-sm text-gray-500 block mt-1 break-all flex items-center gap-2"
                onClick={(e) => {
                  e.stopPropagation()
                  navigator.clipboard.writeText(dao.daoId)
                  toast({
                    title: 'DAO ID copied!',
                  })
                }}
              >
                {shortenAddress(dao.daoId, 12)}
                <button
                  type="button"
                  className="ml-1 p-1 hover:bg-gray-200 rounded"
                  title="Copy DAO ID"
                >
                  <CopyIcon className="h-4 w-4 text-gray-400" />
                </button>
              </span>
            </div>
            {/* <div className="flex bg-dark_blue rounded-xl text-white font-bold p-1 w-16 items-center justify-center">
            DAO
          </div> */}
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-4 items-center justify-center w-full">
        <StatItem
          label={localeDict.myPower}
          // value={dao.votes ? formatString(formatEther(BigInt(dao.votes))) : 0}
          value={0}
        />

        <StatItem
          label={localeDict.members}
          // value={dao.holders ? dao.holders + 1 : 1}
          value={1}
        />
      </div>
    </div>
  )
}

const StatItem = ({
  label,
  value,
}: {
  label: string
  value: string | number
}) => (
  <div className="flex flex-col gap-4 w-full justify-center items-center w-full">
    <div className="text-gray-500 text-sm w-full items-center justify-center text-center">
      {label}
    </div>
    <div className="flex rounded-xl text-dark_blue font-bold py-1 px-2 min-w-16 items-center justify-center text-lg w-full">
      {value}
    </div>
  </div>
)

export default function ForDAOPage({
  params: { locale, ...params },
}: PagePropsWithLocale<{}>) {
  const router = useRouter()
  const { toast } = useToast()
  const { data: hash, error, writeContractAsync } = useWriteContract()

  const [dict, setDict] = useState<Dictionary | null>(null)
  const localeDict = dict?.studio ?? {}

  const [daos, setDaos] = useState<any[]>([])

  const { address, chainId } = useAccount()

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: DAO_STUDIO_SUBGRAPH_URL[chainId || defaultChainId] as string,
    }),
  })

  const showConnectWalletAlert = () => {
    toast({ title: 'Please connect wallet' })
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
      confirmations: 1,
    })

  const { chains, switchChain } = useSwitchChain()

  useEffect(() => {
    const switchChainAndReload = async () => {
      if (chainId && !chains.some((chain) => chain.id === chainId)) {
        switchChain({ chainId: sepolia.id })
      }
    }
    switchChainAndReload()
  }, [chainId])

  useEffect(() => {
    switchChain({ chainId: sepolia.id })
  }, [])

  let [loading, setLoading] = useState(true)

  const [daoForm, setDaoForm] = useState<DaoFormState>({
    name: '',
    metadata: {
      description: '',
      website: '',
      linkedin: '',
      twitter: '',
      telegram: '',
    },
    tokenAddress: '',
    votingDelay: '',
    votingPeriod: '',
    proposalThreshold: '',
    quorumVotes: '',
    timelockDelay: '',
  })

  const [isDialogOpened, setIsDialogOpened] = useState(false)
  const [search, setSearch] = useState('')
  const handleCreateDao = async () => {
    setIsDialogOpened(false)

    const tx = await writeContractAsync({
      abi: DAO_STUDIO_ABI,
      address: daoStudioAddress[chainId || defaultChainId] as `0x${string}`,
      functionName: 'createDAO',
      args: [
        daoForm.name,
        daoForm.metadata,
        daoForm.tokenAddress,
        daoForm.votingDelay,
        daoForm.votingPeriod,
        parseEther(daoForm.proposalThreshold),
        daoForm.timelockDelay,
        parseEther(daoForm.quorumVotes),
      ],
      gas: BigInt(1000000),
    })

    await waitForTransactionReceipt(config, {
      hash: tx,
      confirmations: 2,
    })
  }

  const updateDaoForm = (field: keyof DaoFormState, value: string) => {
    setDaoForm((prev) => ({ ...prev, [field]: value }))
  }

  const updateDaoMetadata = (field: keyof DaoMetadata, value: string) => {
    setDaoForm((prev) => ({
      ...prev,
      metadata: { ...prev.metadata, [field]: value },
    }))
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
    const fetchData = async () => {
      try {
        setLoading(true)

        const { data } = await client.query({
          query: gql`
            query totalDaos {
              daocreateds(
                first: 100
                orderBy: timestamp_
                orderDirection: desc
              ) {
                id
                daoId
                daoName
                creator
                timestamp_
              }
            }
          `,
        })

        let updatedDaos = []
        for (let i = 0; i < data.daocreateds.length; i++) {
          const dao = data.daocreateds[i]
          try {
            let votes = 0
            let holders = 0

            try {
              const timelock = await readContract(config, {
                address: daoStudioAddress[
                  chainId || defaultChainId
                ] as `0x${string}`,
                abi: DAO_FACTORY_ABI,
                functionName: 'timelock',
                args: [dao.daoId],
              })

              const admin = await readContract(config, {
                address: timelock as `0x${string}`,
                abi: TIMELOCK_ABI,
                functionName: 'admin',
                args: [],
              })

              const token = await readContract(config, {
                address: admin as `0x${string}`,
                abi: GOVERNOR_ABI,
                functionName: 'token',
                args: [],
              })

              votes = (await readContract(config, {
                address: token as `0x${string}`,
                abi: PCE_C_GOV_TOKEN_ABI,
                functionName: 'getVotes',
                args: [address],
              })) as unknown as number

              holders = await getHolders(
                chainId == undefined ? defaultChainId : chainId,
                dao.governanceToken as string
              )
            } catch (error) {
              console.error('Error fetching votes:', error)
            }
            const identicon = await generateIdenteapot(dao.daoId, '')
            const imageHash = await fetchImage(dao.daoId)

            updatedDaos.push({
              ...dao,
              votes,
              identicon,
              holders: holders,
              imageHash,
            })
          } catch (error) {
            const identicon = await generateIdenteapot(dao.governor, '')
            updatedDaos.push({ ...dao, votes: 0, identicon, imageHash: '' })
          }
        }

        setDaos(updatedDaos)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data', error)
        setLoading(false)
      }
    }

    fetchData()
  }, [isConfirmed, chainId])

  return (
    <div className="items-center justify-center flex flex-col mx-10 md:mx-20 gap-4">
      <div className="flex flex-col md:flex-row h-20 w-full justify-between items-center">
        <h1 className="text-2xl font-bold text-dark_bg">{localeDict.title}</h1>

        <Button
          className="w-full sm:w-auto sm:min-w-[200px] text-sm sm:text-base"
          onClick={() => {
            if (chainId === 0 || chainId === undefined) {
              showConnectWalletAlert()
              return
            }
            setIsDialogOpened(!isDialogOpened)
          }}
        >
          {localeDict.createDao}
        </Button>

        <Dialog
          open={isDialogOpened}
          onOpenChange={() => {
            setIsDialogOpened(!isDialogOpened)
          }}
        >
          <DialogContent className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <DialogTitle>DAO Settings</DialogTitle>
            </div>
            <div className="flex flex-col gap-2">
              <h1>About DAO</h1>
              <div className="flex flex-col gap-2">
                <Input
                  placeholder={localeDict.daoName}
                  onChange={(e) => updateDaoForm('name', e.target.value)}
                  value={daoForm.name}
                />
                <Input
                  placeholder={localeDict.description}
                  onChange={(e) =>
                    updateDaoMetadata('description', e.target.value)
                  }
                  value={daoForm.metadata.description}
                />
                <Input
                  placeholder={localeDict.website}
                  onChange={(e) => updateDaoMetadata('website', e.target.value)}
                  value={daoForm.metadata.website}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h1>Social Links</h1>
              <div className="flex flex-col gap-2">
                <Input
                  placeholder={localeDict.linkedin}
                  onChange={(e) =>
                    updateDaoMetadata('linkedin', e.target.value)
                  }
                  value={daoForm.metadata.linkedin}
                />
                <Input
                  placeholder={localeDict.twitter}
                  onChange={(e) => updateDaoMetadata('twitter', e.target.value)}
                  value={daoForm.metadata.twitter}
                />
                <Input
                  placeholder={localeDict.telegram}
                  onChange={(e) =>
                    updateDaoMetadata('telegram', e.target.value)
                  }
                  value={daoForm.metadata.telegram}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h1>{localeDict.enterAddress}</h1>
              <div className="flex flex-col gap-2">
                <Input
                  placeholder={localeDict.tokenAddress}
                  onChange={(e) =>
                    updateDaoForm('tokenAddress', e.target.value)
                  }
                  value={daoForm.tokenAddress}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h1>Voting Parameters</h1>
              <div className="flex flex-col gap-2">
                <Input
                  placeholder={localeDict.votingDelay + ' - 1 Block'}
                  onChange={(e) => updateDaoForm('votingDelay', e.target.value)}
                  value={daoForm.votingDelay}
                />
                <Input
                  placeholder={localeDict.votingPeriod + ' - 100 Blocks'}
                  onChange={(e) =>
                    updateDaoForm('votingPeriod', e.target.value)
                  }
                  value={daoForm.votingPeriod}
                />
                <Input
                  placeholder={localeDict.proposalThreshold + ' - 1000 Power'}
                  onChange={(e) =>
                    updateDaoForm('proposalThreshold', e.target.value)
                  }
                  value={daoForm.proposalThreshold}
                />
                <Input
                  placeholder={localeDict.quorum + ' - 2000 Power'}
                  onChange={(e) => updateDaoForm('quorumVotes', e.target.value)}
                  value={daoForm.quorumVotes}
                />
                <Input
                  placeholder={localeDict.timelockDelay + ' - 86400 (1day)'}
                  onChange={(e) =>
                    updateDaoForm('timelockDelay', e.target.value)
                  }
                  value={daoForm.timelockDelay}
                />
              </div>
            </div>
            <Button
              onClick={() => {
                handleCreateDao()
              }}
            >
              {localeDict.confirm}
            </Button>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-col w-full md:gap-4 gap-2">
        <Tabs defaultValue="all" className="flex flex-col w-full items-center">
          <TabsList className="flex flex-row w-full">
            <TabsTrigger className="w-full flex" value="all">
              {localeDict.allDaos}
            </TabsTrigger>
            <TabsTrigger className="w-full flex" value="my">
              {localeDict.allActivities}
            </TabsTrigger>
          </TabsList>
          <div className="flex flex-row gap-4 w-full mt-4">
            <Input
              placeholder={localeDict.search}
              className="w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <DropdownMenu>
              <DropdownMenuContent>
                <DropdownMenuItem>Sort Dao</DropdownMenuItem>
                <DropdownMenuItem>Date of Creation</DropdownMenuItem>
                <DropdownMenuItem>Members</DropdownMenuItem>
                <DropdownMenuItem>Proposals</DropdownMenuItem>
                <DropdownMenuItem>Total token delegated</DropdownMenuItem>
                <DropdownMenuItem>Total token delegatees</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <TabsContent
            value="all"
            className="flex flex-col w-full items-center justify-center"
          >
            {daos
              .filter((dao) =>
                dao.daoName.toLowerCase().includes(search.toLowerCase())
              )
              .map((dao) => (
                <DaoCard
                  key={dao.id}
                  dao={dao}
                  locale={locale}
                  localeDict={localeDict}
                  router={router}
                  chainId={chainId || 0}
                />
              ))}
          </TabsContent>
        </Tabs>
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
