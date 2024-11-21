'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import 'react-toastify/dist/ReactToastify.css'

import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
  type BaseError,
} from 'wagmi'
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
import { Table, TableBody, TableRow } from '~/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '~/components/ui/dialog'

import { createDaoFactoryClient } from '~/app/apollo-client'
import { gql } from '@apollo/client'

import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { POLY_SCAN_TX } from '~/app/constants/constants'

import { getDict } from '~/i18n/get-dict'

import { PagePropsWithLocale, Dictionary } from '~/i18n/types'

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
        daoForm.proposalThreshold,
        daoForm.quorumVotes,
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

        setDaos(data.daocreateds)
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

        <Dialog
          open={isDialogOpened}
          onOpenChange={() => {
            setIsDialogOpened(!isDialogOpened)
          }}
        >
          <DialogTrigger
            className="bg-dark_blue text-white w-60 p-2 rounded-md"
            onClick={() => setIsDialogOpened(true)}
          >
            Create a DAO
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>DAO Settings</DialogTitle>
              <DialogDescription>
                Once created, the DAO settings can be changed only by voting via
                the appropriated proposal.
              </DialogDescription>
            </DialogHeader>

            <DialogHeader>
              <DialogTitle>About DAO</DialogTitle>
              <DialogDescription>
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
                    onChange={(e) =>
                      updateDaoMetadata('website', e.target.value)
                    }
                    value={daoForm.metadata.website}
                  />
                </div>
              </DialogDescription>
            </DialogHeader>

            <DialogHeader>
              <DialogTitle>Social Links</DialogTitle>
              <DialogDescription>
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
                    onChange={(e) =>
                      updateDaoMetadata('twitter', e.target.value)
                    }
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
              </DialogDescription>
            </DialogHeader>

            <DialogHeader>
              <DialogTitle>Enter community token address</DialogTitle>
              <DialogDescription>
                <Input
                  placeholder="Token Address"
                  onChange={(e) =>
                    updateDaoForm('tokenAddress', e.target.value)
                  }
                  value={daoForm.tokenAddress}
                />
              </DialogDescription>
            </DialogHeader>

            <DialogHeader>
              <DialogTitle>Voting Parameters</DialogTitle>
              <DialogDescription>
                <div className="flex flex-col gap-2">
                  <Input
                    placeholder="Voting Delay"
                    onChange={(e) =>
                      updateDaoForm('votingDelay', e.target.value)
                    }
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
                    onChange={(e) =>
                      updateDaoForm('quorumVotes', e.target.value)
                    }
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
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <Button
                onClick={() => {
                  handleCreateDao()
                }}
              >
                Confirm
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col md:flex-row w-full md:gap-4 gap-2">
        <Tabs
          defaultValue="account"
          className="flex flex-row w-full items-center"
        >
          <TabsList className="flex flex-row w-full">
            <TabsTrigger className="w-full flex" value="account">
              All DAOs
            </TabsTrigger>
            <TabsTrigger className="w-full flex" value="password">
              My activity
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex flex-row gap-4">
          <Input placeholder="Search" className="w-full md:w-80" />
          <DropdownMenu>
            <DropdownMenuTrigger>Filter</DropdownMenuTrigger>
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
      <div className="flex flex-col w-full items-center justify-center">
        <Table>
          <TableBody>
            {daos.map((dao: Dao) => (
              <TableRow
                key={dao.id}
                className="flex flex-col xl:flex-row bg-gray-100 rounded-xl p-4 md:px-10 items-start xl:items-center cursor-pointer my-4 gap-4 "
                onClick={() => {
                  navigate(`/${locale}/dao/detail/${dao.id}`)
                }}
              >
                <div className="flex flex-row w-full items-center justify-between">
                  {/* DAO Info Section */}
                  <div className="flex flex-row gap-4 md:gap-8 items-center border-none">
                    <Image
                      className="rounded-full w-16 h-16 xl:w-[120px] xl:h-[120px]"
                      src="/images/dexe.jpeg"
                      alt="logo"
                      width={120}
                      height={120}
                    />
                    <div className="flex flex-col gap-2 w-full">
                      <div className="font-bold text-xl md:text-2xl w-full flex">
                        {dao.name}
                      </div>
                      <div className="flex bg-light_dark rounded-xl text-dark_blue font-bold p-1 w-16 items-center justify-center">
                        DAO
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 md:hidden">
                    <div className="font-bold text-lg md:text-2xl">-</div>
                    <div className="text-heavy_white text-sm w-full">
                      My power
                    </div>
                  </div>
                </div>

                <div className="flex flex-row gap-4 w-full items-center">
                  <div className="flex-col gap-2 w-full hidden md:flex">
                    <div className="text-heavy_white text-sm">My power</div>
                    <div className="font-bold text-lg md:text-2xl">-</div>
                    <div className="flex bg-light_dark rounded-xl text-dark_blue font-bold p-1 w-16 items-center justify-center text-sm">
                      Votes
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 w-full">
                    <div className="text-heavy_white text-sm">TVL</div>
                    <div className="font-bold text-lg md:text-2xl">-</div>
                    <div className="flex bg-light_dark rounded-xl text-dark_blue font-bold p-1 w-16 items-center justify-center text-sm">
                      $0
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 w-full">
                    <div className="text-heavy_white text-sm">TVG</div>
                    <div className="font-bold text-lg md:text-2xl">-</div>
                    <div className="flex bg-light_dark rounded-xl text-dark_blue font-bold p-1 w-16 items-center justify-center text-sm">
                      0%
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <div className="text-heavy_white text-sm">Members</div>
                    <div className="font-bold text-lg md:text-2xl">-</div>
                    <div className="flex bg-light_dark rounded-xl text-dark_blue font-bold p-1 w-16 items-center justify-center text-sm">
                      0%
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <div className="text-heavy_white text-sm">LAU</div>
                    <div className="font-bold text-lg md:text-2xl">-</div>
                    <div className="flex bg-light_dark rounded-xl text-dark_blue font-bold p-1 w-16 items-center justify-center text-sm">
                      0%
                    </div>
                  </div>
                </div>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
