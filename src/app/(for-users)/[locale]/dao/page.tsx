'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

import 'react-toastify/dist/ReactToastify.css'

import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableRow } from '~/components/ui/table'
import { useNavigate } from 'react-router-dom'

import { getDict } from '~/i18n/get-dict'

import { PagePropsWithLocale, Dictionary } from '~/i18n/types'

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
      <div className="flex flex-row h-20 w-full justify-between items-center">
        <h1 className="text-2xl font-bold text-dark_bg">
          DAO: What's in it for me?
        </h1>

        <Button className="bg-dark_blue text-white w-60">Create a DAO</Button>
      </div>

      <div className="flex flex-row w-full items-center justify-between max-xl:mx-10 mx-80 my-10 max-xl:my-0 gap-4">
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList>
            <TabsTrigger className="w-40" value="account">
              All DAOs
            </TabsTrigger>
            <TabsTrigger className="w-40" value="password">
              My activity
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex flex-row gap-4">
          <Input placeholder="Search" className="w-80" />
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
            <TableRow
              className="flex bg-gray-100 rounded-xl px-20 items-center justify-between cursor-pointer"
              onClick={() => {
                navigate(`/${locale}/dao/detail`)
              }}
            >
              <TableCell className="flex flex-row gap-6 items-center">
                <Image
                  className="rounded-full"
                  src="/images/dexe.jpeg"
                  alt="logo"
                  width={120}
                  height={120}
                />
                <div className="flex flex-col gap-2">
                  <div className="text-heavy_white">Nov 13, 2023, 17:46</div>
                  <div className="font-bold text-2xl">DeXe Protocol</div>
                  <div className="flex bg-light_dark rounded-xl text-dark_blue font-bold p-1 w-16 items-center justify-center">
                    DEXE
                  </div>
                </div>
              </TableCell>
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
      </div>

      <div className="flex flex-col w-full items-center justify-center">
        <Table>
          <TableBody>
            <TableRow
              className="flex bg-gray-100 rounded-xl px-20 items-center justify-between cursor-pointer"
              onClick={() => {
                navigate(`/${locale}/dao/detail`)
              }}
            >
              <TableCell className="flex flex-row gap-6 items-center">
                <Image
                  className="rounded-full"
                  src="/images/dexe.jpeg"
                  alt="logo"
                  width={120}
                  height={120}
                />
                <div className="flex flex-col gap-2">
                  <div className="text-heavy_white">Nov 13, 2023, 17:46</div>
                  <div className="font-bold text-2xl">DeXe Protocol</div>
                  <div className="flex bg-light_dark rounded-xl text-dark_blue font-bold p-1 w-16 items-center justify-center">
                    DEXE
                  </div>
                </div>
              </TableCell>
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
      </div>
    </div>
  )
}
