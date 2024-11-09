'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useNavigate } from 'react-router-dom'

import 'react-toastify/dist/ReactToastify.css'
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

import { getDict } from '~/i18n/get-dict'

import { PagePropsWithLocale, Dictionary } from '~/i18n/types'
import { Checkbox } from '~/components/ui/checkbox'

import BackIcon from '../../../../../../public/svg/back'

export default function ForSubmitPage({
  params: { locale, ...params },
}: PagePropsWithLocale<{}>) {
  const navigate = useNavigate()
  const [dict, setDict] = useState<Dictionary | null>(null)

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
    <div className="items-center justify-center flex flex-col mx-20 gap-4">
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
          <Image
            className="rounded-full"
            src="/images/dexe.jpeg"
            alt="logo"
            width={120}
            height={120}
          />
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2 font-bold text-2xl">
              DeXe Protocol{' '}
              <div className="text-dark_blue text-sm items-center flex">
                0xb56...f0b
              </div>
            </div>
            <div className="flex flex-row gap-2 items-center text-gray-500">
              Your status:{' '}
              <div className="flex bg-light_dark rounded-xl text-dark_blue font-bold w-8 h-8 items-center justify-center">
                -
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-4">
          <Button className="bg-dark_blue text-white w-40">
            + Create a Proposal
          </Button>
          <Button className="bg-dark_blue text-white w-10">N</Button>
        </div>
      </div>

      <div className="flex flex-row w-full items-center">
        <Tabs defaultValue="about" className="w-full">
          <TabsList>
            <TabsTrigger className="w-40" value="about">
              About DAO
            </TabsTrigger>
            <TabsTrigger className="w-40" value="all">
              All Proposals
            </TabsTrigger>
            <TabsTrigger className="w-40" value="balance">
              DAO Balance
            </TabsTrigger>
            <TabsTrigger className="w-40" value="holders">
              Holders
            </TabsTrigger>
          </TabsList>
          <TabsContent value="about" className="">
            <div className="flex flex-row w-full gap-8">
              <div className="flex flex-col w-full mt-4 gap-4">
                <div className="flex flex-row justify-between items-center w-full">
                  <h1 className="text-2xl font-bold">Latest Proposals</h1>
                  <div className="flex flex-row gap-4">
                    <Button>+ Create new</Button>
                    <Button>View all</Button>
                  </div>
                </div>

                <div className="flex flex-col w-full bg-gray-100 p-4 rounded-xl gap-2">
                  <div className="flex flex-row items-center justify-between w-full rounded-xl">
                    <h1 className="flex flex-row text-xl font-bold w-full">
                      Transferring liquidity from Uniswap v2 to PancakeSwap v3
                      (on Ethereum)
                    </h1>
                    <div className="flex bg-light_dark rounded-xl text-dark_blue font-bold p-1 items-center justify-center text-sm px-4">
                      Approved
                    </div>
                  </div>

                  <div>
                    Executive Summary: As a member of the DeXe Association
                    Council and the appointed Validator of DeXe DAO, I propose
                    reserving liquidity within the Ethereum network...
                  </div>

                  <div className="flex bg-light_dark rounded-xl text-dark_blue font-bold w-44 p-1 items-center justify-center text-sm px-4">
                    Transfer tokens
                  </div>
                </div>

                <div className="flex flex-col w-full bg-gray-100 p-4 rounded-xl gap-2">
                  <div className="flex flex-row items-center justify-between w-full rounded-xl">
                    <h1 className="flex flex-row text-xl font-bold w-full">
                      Transferring liquidity from Uniswap v2 to PancakeSwap v3
                      (on Ethereum)
                    </h1>
                    <div className="flex bg-light_dark rounded-xl text-dark_blue font-bold p-1 items-center justify-center text-sm px-4">
                      Approved
                    </div>
                  </div>

                  <div>
                    Executive Summary: As a member of the DeXe Association
                    Council and the appointed Validator of DeXe DAO, I propose
                    reserving liquidity within the Ethereum network...
                  </div>

                  <div className="flex bg-light_dark rounded-xl text-dark_blue font-bold w-44 p-1 items-center justify-center text-sm px-4">
                    Transfer tokens
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-[40%] gap-4">
                <h1 className="text-2xl font-bold mt-4">About DAO</h1>

                <div className="flex flex-row justify-between items-center border rounded-xl p-4 mt-2 bg-gray-100">
                  <h1 className="font-bold rounded-xl  flex">
                    Governance Token
                  </h1>
                  <Link
                    href="https://bscscan.com/token/0x6E88056E8376Ae7709496Ba64d37fa2f8015ce3e"
                    className="text-dark_blue"
                  >
                    DEXE
                  </Link>
                </div>

                <div className="flex flex-row justify-between items-center border rounded-xl p-4 bg-gray-100">
                  <h1 className="font-bold rounded-xl  flex">
                    DAO Voting Rules
                  </h1>
                  <Link
                    href="https://bscscan.com/token/0x6E88056E8376Ae7709496Ba64d37fa2f8015ce3e"
                    className="text-dark_blue"
                  >
                    Open
                  </Link>
                </div>

                <Table>
                  <TableBody>
                    <TableRow className="flex bg-gray-100 rounded-xl items-center justify-between cursor-pointer">
                      <TableCell className="font-medium">
                        <div className="flex flex-col gap-2">
                          <div className="text-heavy_white">My power</div>
                          <div className="font-bold text-2xl">-</div>
                          <div className="flex bg-light_dark rounded-xl text-dark_blue font-bold p-1 w-16 items-center justify-center">
                            Votes
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="flex flex-col gap-2">
                            <div className="text-heavy_white">TVL</div>
                            <div className="font-bold text-2xl">$31.75M</div>
                            <div className="flex bg-light_dark rounded-xl text-dark_blue font-bold p-1 w-16 items-center justify-center">
                              $0
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="flex flex-col gap-2">
                            <div className="text-heavy_white">TVG</div>
                            <div className="font-bold text-2xl">$21.89</div>
                            <div className="flex bg-light_dark rounded-xl text-dark_blue font-bold p-1 w-16 items-center justify-center">
                              0%
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="flex flex-col gap-2">
                            <div className="text-heavy_white">Members</div>
                            <div className="font-bold text-2xl">41</div>
                            <div className="flex bg-light_dark rounded-xl text-dark_blue font-bold p-1 w-16 items-center justify-center">
                              0%
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="flex flex-col gap-2">
                            <div className="text-heavy_white">LAU</div>
                            <div className="font-bold text-2xl">100%</div>
                            <div className="flex bg-light_dark rounded-xl text-dark_blue font-bold p-1 w-16 items-center justify-center">
                              0%
                            </div>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <div className="flex flex-col border rounded-xl p-4 gap-4 bg-gray-100">
                  <h1 className="font-bold rounded-xl flex">
                    DeXe Protocol DAO - Essence and Oversight
                  </h1>
                  <h1 className="font-bold rounded-xl  flex">
                    Created Nov 13, 2023, 17:46
                  </h1>
                </div>
                <div className="flex flex-col  border rounded-xl p-4 gap-4 mb-40 bg-gray-100">
                  <div className="flex flex-row justify-between items-center">
                    <h1 className="font-bold rounded-xl flex">DAO Site</h1>
                    <Link
                      href="https://bscscan.com/token/0x6E88056E8376Ae7709496Ba64d37fa2f8015ce3e"
                      className="text-dark_blue"
                    >
                      dexe.network
                    </Link>
                  </div>
                  <div className="flex flex-row justify-between items-center">
                    <h1 className="font-bold rounded-xl  flex">
                      DAO Memorandum
                    </h1>
                    <Link
                      href="https://bscscan.com/token/0x6E88056E8376Ae7709496Ba64d37fa2f8015ce3e"
                      className="text-dark_blue"
                    >
                      dexe.network
                    </Link>
                  </div>
                  <div className="flex flex-row justify-between items-center">
                    <h1 className="font-bold rounded-xl  flex">Whitepaper</h1>
                    <Link
                      href="https://bscscan.com/token/0x6E88056E8376Ae7709496Ba64d37fa2f8015ce3e"
                      className="text-dark_blue"
                    >
                      dexe.network
                    </Link>
                  </div>
                  <div className="flex flex-row justify-between items-center">
                    <h1 className="font-bold rounded-xl  flex">Audits</h1>
                    <Link
                      href="https://bscscan.com/token/0x6E88056E8376Ae7709496Ba64d37fa2f8015ce3e"
                      className="text-dark_blue"
                    >
                      dexe.network
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="all">
            <div className="flex flex-row w-full items-center">
              <Tabs defaultValue="all" className="gap-0">
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
                <TabsContent value="all" className="flex w-full">
                  <div className="flex flex-col w-full bg-gray-100 p-4 rounded-xl gap-2">
                    <div className="flex flex-row items-center justify-between w-full rounded-xl">
                      <h1 className="flex flex-row text-xl font-bold w-full">
                        Transferring liquidity from Uniswap v2 to PancakeSwap v3
                        (on Ethereum)
                      </h1>
                      <div className="flex bg-light_dark rounded-xl text-dark_blue font-bold p-1 items-center justify-center text-sm px-4">
                        Approved
                      </div>
                    </div>

                    <div>
                      Executive Summary: As a member of the DeXe Association
                      Council and the appointed Validator of DeXe DAO, I propose
                      reserving liquidity within the Ethereum network...
                    </div>

                    <div className="flex bg-light_dark rounded-xl text-dark_blue font-bold w-44 p-1 items-center justify-center text-sm px-4">
                      Single-option voting
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="active" className="flex w-full">
                  <div className="flex flex-col w-full bg-gray-100 p-4 rounded-xl gap-2">
                    <div className="flex flex-row items-center justify-between w-full rounded-xl">
                      <h1 className="flex flex-row text-xl font-bold w-full">
                        Transferring liquidity from Uniswap v2 to PancakeSwap v3
                        (on Ethereum)
                      </h1>
                      <div className="flex bg-light_dark rounded-xl text-dark_blue font-bold p-1 items-center justify-center text-sm px-4">
                        Approved
                      </div>
                    </div>

                    <div>
                      Executive Summary: As a member of the DeXe Association
                      Council and the appointed Validator of DeXe DAO, I propose
                      reserving liquidity within the Ethereum network...
                    </div>

                    <div className="flex bg-light_dark rounded-xl text-dark_blue font-bold w-44 p-1 items-center justify-center text-sm px-4">
                      Single-option voting
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="accepted" className="flex w-full">
                  <div className="flex flex-col w-full bg-gray-100 p-4 rounded-xl gap-2">
                    <div className="flex flex-row items-center justify-between w-full rounded-xl">
                      <h1 className="flex flex-row text-xl font-bold w-full">
                        Transferring liquidity from Uniswap v2 to PancakeSwap v3
                        (on Ethereum)
                      </h1>
                      <div className="flex bg-light_dark rounded-xl text-dark_blue font-bold p-1 items-center justify-center text-sm px-4">
                        Approved
                      </div>
                    </div>

                    <div>
                      Executive Summary: As a member of the DeXe Association
                      Council and the appointed Validator of DeXe DAO, I propose
                      reserving liquidity within the Ethereum network...
                    </div>

                    <div className="flex bg-light_dark rounded-xl text-dark_blue font-bold w-44 p-1 items-center justify-center text-sm px-4">
                      Single-option voting
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="rejected" className="flex w-full">
                  <div className="flex flex-col w-full bg-gray-100 p-4 rounded-xl gap-2">
                    <div className="flex flex-row items-center justify-between w-full rounded-xl">
                      <h1 className="flex flex-row text-xl font-bold w-full">
                        Transferring liquidity from Uniswap v2 to PancakeSwap v3
                        (on Ethereum)
                      </h1>
                      <div className="flex bg-light_dark rounded-xl text-dark_blue font-bold p-1 items-center justify-center text-sm px-4">
                        Approved
                      </div>
                    </div>

                    <div>
                      Executive Summary: As a member of the DeXe Association
                      Council and the appointed Validator of DeXe DAO, I propose
                      reserving liquidity within the Ethereum network...
                    </div>

                    <div className="flex bg-light_dark rounded-xl text-dark_blue font-bold w-44 p-1 items-center justify-center text-sm px-4">
                      Single-option voting
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </TabsContent>
          <TabsContent value="balance">
            <div className="flex flex-row mt-4 gap-4 ">
              <div className="flex flex-col w-full">
                <h1 className="text-2xl font-bold">Treasury</h1>

                <div className="rounded-xl flex border mt-4 flex-row w-full gap-4">
                  <Table className="w-full">
                    <TableHeader>
                      <TableRow>
                        <TableHead>
                          <div className="flex flex-row gap-4">
                            <button>All</button>
                            <button>NFT</button>
                            <button>Tokens</button>
                          </div>
                        </TableHead>
                        <TableHead>DAO Supply</TableHead>
                        <TableHead>% of total Supply</TableHead>
                        <TableHead>Type</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <div className="flex flex-row gap-2 items-center">
                            <Image
                              className="rounded-full"
                              src="/images/dexe.jpeg"
                              alt="logo"
                              width={30}
                              height={30}
                            />
                            <h1 className="text-md text-dark_blue font-bold">
                              DEXE
                            </h1>
                          </div>
                        </TableCell>
                        <TableCell className="font-bold font-md">
                          45,467(%0)
                        </TableCell>
                        <TableCell className="font-bold font-md">
                          0.05%
                        </TableCell>
                        <TableCell>
                          <div className="flex bg-light_dark rounded-xl text-dark_blue font-bold p-1 items-center justify-center text-sm px-4 w-28">
                            Governance
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
              <div className="flex flex-col w-[40%]">
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
                <div className="flex flex-row w-full gap-4 items-center justify-between">
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
                  <Button className="w-80">Delegate to custom address</Button>
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
                        <TableHead>VEI</TableHead>
                        <TableHead>Balance</TableHead>
                        <TableHead>Delegated Amount</TableHead>
                        <TableHead>Delegators</TableHead>
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
                          1.00
                        </TableCell>
                        <TableCell className="font-bold font-md">
                          0.003145 DEXE
                        </TableCell>
                        <TableCell className="font-bold font-md">
                          0.003145 DEXE
                        </TableCell>
                        <TableCell className="font-bold font-md">0</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
