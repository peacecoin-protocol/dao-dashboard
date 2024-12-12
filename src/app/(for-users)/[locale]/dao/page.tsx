'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
  type BaseError,
} from 'wagmi'
import { readContract } from '@wagmi/core'

import { DAO_STUDIO_ABI } from '~/app/ABIs/DAOStudio'
import { daoStudioAddress } from '~/app/constants/constants'

import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { Dialog, DialogContent, DialogTitle } from '~/components/ui/dialog'

import { createDaoFactoryClient } from '~/app/apollo-client'
import { gql } from '@apollo/client'

import { useNavigate } from 'react-router-dom'
import { POLY_SCAN_TX } from '~/app/constants/constants'

import { getDict } from '~/i18n/get-dict'

import { PagePropsWithLocale, Dictionary } from '~/i18n/types'
import { createClient, formatEther, parseEther } from 'viem'
import { PCE_ABI } from '~/app/ABIs/PCEToken'

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
  votes: number
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
import { polygonAmoy } from '@wagmi/core/chains'
import { http, createConfig } from '@wagmi/core'
import { formatString } from '~/components/utils'
import { TabsContent } from '@radix-ui/react-tabs'

const config = createConfig({
  chains: [polygonAmoy],
  client({ chain }) {
    return createClient({ chain, transport: http() })
  },
})

export default function ForDAOPage({
  params: { locale, ...params },
}: PagePropsWithLocale<{}>) {
  const navigate = useNavigate()

  const [dict, setDict] = useState<Dictionary | null>(null)
  const client = createDaoFactoryClient()

  const [daos, setDaos] = useState<any[]>([])

  const { address, chainId } = useAccount()
  const { data: hash, error, writeContract } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })
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

  const handleCreateDao = async () => {
    setIsDialogOpened(false)

    writeContract({
      abi: DAO_STUDIO_ABI,
      address: daoStudioAddress,
      functionName: 'createDAO',
      args: [
        daoForm.name,
        daoForm.metadata,
        daoForm.tokenAddress,
        daoForm.votingDelay,
        daoForm.votingPeriod,
        parseEther(daoForm.proposalThreshold),
        parseEther(daoForm.quorumVotes),
        daoForm.timelockDelay,
      ],
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
    const notify = async () => {
      if (isConfirmed) {
        toast.success(
          <Link href={`${POLY_SCAN_TX}${hash}`} target="_blank">
            Transaction Succeed!
          </Link>
        )
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
            query totalDaos {
              daocreateds(first: 100) {
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

        let updatedDaos = []
        for (let i = 0; i < data.daocreateds.length; i++) {
          const dao = data.daocreateds[i]
          try {
            const votes = await readContract(config, {
              address: dao.governanceToken as `0x${string}`,
              abi: PCE_ABI,
              functionName: 'getVotes',
              args: [address],
            })

            updatedDaos.push({ ...dao, votes })
          } catch (error) {
            updatedDaos.push({ ...dao, votes: 0 })

            console.log('error', error)
          }
        }

        setDaos(updatedDaos)
        console.log(updatedDaos)
      } catch (error) {
        console.error('Error fetching data', error)
      }
    }

    fetchData()
  }, [isConfirmed])

  return (
    <div className="items-center justify-center flex flex-col mx-10 md:mx-20 gap-4">
      <div className="flex flex-col md:flex-row h-20 w-full justify-between items-center">
        <h1 className="text-2xl font-bold text-dark_bg">
          DAO: What's in it for me?
        </h1>

        <Button
          onClick={() => {
            setIsDialogOpened(!isDialogOpened)
          }}
        >
          Create a DAO
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
                  placeholder="DAO Name"
                  onChange={(e) => updateDaoForm('name', e.target.value)}
                  value={daoForm.name}
                />
                <Input
                  placeholder="DAO Description"
                  onChange={(e) =>
                    updateDaoMetadata('description', e.target.value)
                  }
                  value={daoForm.metadata.description}
                />
                <Input
                  placeholder="DAO Site"
                  onChange={(e) => updateDaoMetadata('website', e.target.value)}
                  value={daoForm.metadata.website}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h1>Social Links</h1>
              <div className="flex flex-col gap-2">
                <Input
                  placeholder="Linkedin"
                  onChange={(e) =>
                    updateDaoMetadata('linkedin', e.target.value)
                  }
                  value={daoForm.metadata.linkedin}
                />
                <Input
                  placeholder="Twitter"
                  onChange={(e) => updateDaoMetadata('twitter', e.target.value)}
                  value={daoForm.metadata.twitter}
                />
                <Input
                  placeholder="Telegram"
                  onChange={(e) =>
                    updateDaoMetadata('telegram', e.target.value)
                  }
                  value={daoForm.metadata.telegram}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h1>Enter community token address</h1>
              <div className="flex flex-col gap-2">
                <Input
                  placeholder="Token Address"
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
                  placeholder="Voting Delay"
                  onChange={(e) => updateDaoForm('votingDelay', e.target.value)}
                  value={daoForm.votingDelay}
                />
                <Input
                  placeholder="Voting Period"
                  onChange={(e) =>
                    updateDaoForm('votingPeriod', e.target.value)
                  }
                  value={daoForm.votingPeriod}
                />
                <Input
                  placeholder="Proposal Threshold"
                  onChange={(e) =>
                    updateDaoForm('proposalThreshold', e.target.value)
                  }
                  value={daoForm.proposalThreshold}
                />
                <Input
                  placeholder="Quorum Votes"
                  onChange={(e) => updateDaoForm('quorumVotes', e.target.value)}
                  value={daoForm.quorumVotes}
                />
                <Input
                  placeholder="Timelock Delay"
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
              Confirm
            </Button>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-col md:flex-row w-full md:gap-4 gap-2">
        <Tabs defaultValue="all" className="flex flex-col w-full items-center">
          <TabsList className="flex flex-row w-full">
            <TabsTrigger className="w-full flex" value="all">
              All DAOs
            </TabsTrigger>
            <TabsTrigger className="w-full flex" value="my">
              My activity
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="all"
            className="flex flex-col w-full items-center justify-center"
          >
            {daos.map((dao: Dao) => (
              <div
                key={dao.id}
                className="flex flex-col xl:flex-row bg-gray-100 rounded-xl p-4 md:px-10 items-start xl:items-center cursor-pointer my-4 gap-4 w-full"
                onClick={() => {
                  navigate(`/${locale}/dao/detail/${dao.id}`)
                }}
              >
                <div className="flex flex-row w-full items-center justify-between">
                  <div className="flex flex-row gap-4 md:gap-8 items-center border-none">
                    <div
                      className="rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
                      }}
                    >
                      <span className="text-4xl text-white font-bold w-20 h-20 xl:w-24 xl:h-24 flex items-center justify-center">
                        {dao.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex flex-col gap-4 w-full">
                      <div className="font-bold text-xl md:text-2xl w-full flex">
                        {dao.name}
                      </div>
                      <div className="flex bg-light_dark rounded-xl text-dark_blue font-bold p-1 w-16 items-center justify-center">
                        DAO
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row gap-4 w-full items-center">
                  <div className="flex flex-col gap-4 w-full justify-center items-center">
                    <div className="text-heavy_white text-sm">My Power</div>

                    <div className="flex bg-light_dark rounded-xl text-dark_blue font-bold py-1 px-2 min-w-16 items-center justify-center text-sm">
                      {dao.votes
                        ? formatString(formatEther(BigInt(dao.votes)))
                        : 0}
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 w-full justify-center items-center">
                    <div className="text-heavy_white text-sm">TVL</div>

                    <div className="flex bg-light_dark rounded-xl text-dark_blue font-bold py-1 px-2 w-16 items-center justify-center text-sm">
                      $0
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 w-full justify-center items-center">
                    <div className="text-heavy_white text-sm">Members</div>

                    <div className="flex bg-light_dark rounded-xl text-dark_blue font-bold py-1 px-2 w-16 items-center justify-center text-sm">
                      0
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent
            value="my"
            className="flex flex-col w-full items-center justify-center"
          >
            {daos
              .filter((dao) => dao.votes > 0)
              .map((dao: Dao) => (
                <div
                  key={dao.id}
                  className="flex flex-col xl:flex-row bg-gray-100 rounded-xl p-4 md:px-10 items-start xl:items-center cursor-pointer my-4 gap-4 w-full"
                  onClick={() => {
                    navigate(`/${locale}/dao/detail/${dao.id}`)
                  }}
                >
                  <div className="flex flex-row w-full items-center justify-between">
                    <div className="flex flex-row gap-4 md:gap-8 items-center border-none">
                      <div
                        className="rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
                        }}
                      >
                        <span className="text-4xl text-white font-bold w-20 h-20 xl:w-24 xl:h-24 flex items-center justify-center">
                          {dao.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex flex-col gap-4 w-full">
                        <div className="font-bold text-xl md:text-2xl w-full flex">
                          {dao.name}
                        </div>
                        <div className="flex bg-light_dark rounded-xl text-dark_blue font-bold p-1 w-16 items-center justify-center">
                          DAO
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row gap-4 w-full items-center">
                    <div className="flex flex-col gap-4 w-full justify-center items-center">
                      <div className="text-heavy_white text-sm">My Power</div>

                      <div className="flex bg-light_dark rounded-xl text-dark_blue font-bold py-1 px-2 min-w-16 items-center justify-center text-sm">
                        {dao.votes
                          ? formatString(formatEther(BigInt(dao.votes)))
                          : 0}
                      </div>
                    </div>

                    <div className="flex flex-col gap-4 w-full justify-center items-center">
                      <div className="text-heavy_white text-sm">TVL</div>

                      <div className="flex bg-light_dark rounded-xl text-dark_blue font-bold py-1 px-2 w-16 items-center justify-center text-sm">
                        $0
                      </div>
                    </div>

                    <div className="flex flex-col gap-4 w-full justify-center items-center">
                      <div className="text-heavy_white text-sm">Members</div>

                      <div className="flex bg-light_dark rounded-xl text-dark_blue font-bold py-1 px-2 w-16 items-center justify-center text-sm">
                        0
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </TabsContent>
        </Tabs>

        <div className="flex flex-row gap-4 h-8">
          <Input placeholder="Search" className="w-full md:w-80" />
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center">
              Filter
            </DropdownMenuTrigger>
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
      </div>

      <ToastContainer position="bottom-right" draggable></ToastContainer>
    </div>
  )
}
