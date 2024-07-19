'use client'

import Image from 'next/image'
import { FC, useState } from 'react'

import copy from 'clipboard-copy'
import Link from 'next/link'
import MenuIcon from '../ui/menu'
import { Transition } from '@headlessui/react'
import { useDisconnect, useAccount, useBalance } from 'wagmi'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { Button } from '~/components/ui/button'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover'

import CloseIcon from '../ui/close'
import logo from '../../../public/images/Peace_coin_brand.png'
import { LINKS, shortenAddress } from '~/components/utils'

import TwitterIcon from '../../../public/svg/twitter'
import DiscordIcon from '../../../public/svg/discord'

const AppBar: FC = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const [isOpenPop, setIsOpenPop] = useState(false)
  const handleToggleMenu = () => setMenuOpen(!menuOpen)
  const { disconnect } = useDisconnect()
  const { openConnectModal } = useConnectModal()
  const { address, isConnected, chain } = useAccount()
  const {
    data: balance,
    isError,
    isLoading,
  } = useBalance({
    address,
  })

  return (
    <header className="border-light_green py-4 sticky top-0 z-40  border-b-2">
      <div className="standardContainer flex justify-between items-center container">
        <div className="flex items-center w-full">
          <Link href="/" className="mr-10">
            <Image src={logo} alt="" width="100" height="100" />
          </Link>
          <div className="max-md:hidden gap-10 uppercase flex w-full">
            <Link
              className="cursor-pointer hover:underline"
              href={LINKS.VOTE.link}
            >
              {LINKS.VOTE.label}
            </Link>
            <Link
              className="cursor-pointer hover:underline"
              href={LINKS.TOKEN.link}
            >
              {LINKS.TOKEN.label}
            </Link>
            <Link
              className="cursor-pointer hover:underline"
              href={LINKS.BOUNTY.link}
            >
              {LINKS.BOUNTY.label}
            </Link>

            <Link
              className="cursor-pointer hover:underline"
              href={LINKS.PIP.link}
            >
              {LINKS.PIP.label}
            </Link>
          </div>
        </div>

        <div className="flex gap-4 ml-auto flex-row items-center mr-4">
          <Button
            hidden={balance ? false : true}
            className="hidden xl:visible xl:flex mx-auto border-2 border-oil bg-transparent hover:bg-whiteDark text-oil text-base"
          >
            {balance ? Number(balance.formatted).toFixed(4) : '0'}{' '}
            {balance?.symbol}
          </Button>

          <Button
            hidden={chain === undefined}
            className="hidden xl:visible xl:flex mx-auto border-2 border-oil bg-transparent hover:bg-whiteDark text-oil text-base"
          >
            {chain ? chain.name : ''}
          </Button>

          <Popover open={isOpenPop}>
            <PopoverTrigger
              className="hidden xl:visible xl:flex mx-auto border-2 border-oil bg-transparent hover:bg-whiteDark text-oil text-base h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              onClick={() => {
                if (isConnected) {
                  // disconnect()
                  setIsOpenPop(!isOpenPop)
                } else {
                  if (openConnectModal) {
                    openConnectModal()
                  }
                }
              }}
            >
              <div>
                {isConnected ? shortenAddress(address) : 'CONNECT WALLET'}
              </div>
            </PopoverTrigger>
            {isConnected ? (
              <PopoverContent
                className="custom-gradient"
                onClick={() => {
                  setIsOpenPop(false)
                }}
              >
                <div className="gap-2 flex flex-col">
                  <Button
                    onClick={() => {
                      copy(address ? address : '')
                      setIsOpenPop(false)
                    }}
                    className="hidden xl:visible xl:flex mx-auto border-2 border-oil bg-transparent hover:bg-whiteDark text-oil text-base min-w-[150px]"
                  >
                    Copy Address
                  </Button>
                  <Button
                    onClick={() => {
                      disconnect()
                      setIsOpenPop(false)
                    }}
                    className="hidden xl:visible xl:flex mx-auto border-2 border-oil bg-transparent hover:bg-whiteDark text-oil text-base min-w-[150px]"
                  >
                    Disconnect
                  </Button>
                </div>
              </PopoverContent>
            ) : (
              ''
            )}
          </Popover>

          <Link href={LINKS.TWITTER.link} target="_blank">
            <TwitterIcon colorClass="fill-oil" />
          </Link>
          <Link href={LINKS.DISCORD.link} target="_blank">
            <DiscordIcon colorClass="fill-oil" />
          </Link>
        </div>

        <button onClick={handleToggleMenu} className="xl:hidden">
          <MenuIcon colorClass="fill-oil" sizeClass="w-8 h-5" />
        </button>
      </div>
      <MobileMenu open={menuOpen} setOpen={setMenuOpen} />
    </header>
  )
}

export default AppBar
interface MobileMenuProps {
  open: boolean
  setOpen: (open: boolean) => void
}
const MobileMenu: FC<MobileMenuProps> = ({ open, setOpen }) => {
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const { openConnectModal } = useConnectModal()
  return (
    <Transition
      // className="mx:hidden"
      show={open}
      enter="duration-300 ease-out"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="duration-100 ease-out"
      leaveFrom=" opacity-100"
      leaveTo="opacity-0"
    >
      <div
        className="w-full h-screen bg-oil/90 absolute top-0 left-0"
        onClick={() => setOpen(false)}
      >
        <div className="bg-whiteLight max-w-[20.5rem] w-full float-right h-screen px-9 md:px-10 py-2 md:py-7 overflow-auto">
          <div className="flex justify-between">
            <Image src={logo} alt="" width="40" height="40" />
            <button onClick={() => setOpen(false)}>
              <CloseIcon colorClass="fill-oil" sizeClass="w-6 h-6" />
            </button>
          </div>
          <h3 className="text-3xl md:text-4xl md:my-14 mt-14 mb-4">Menu</h3>
          <div className="flex flex-col gap-4 md:gap-6 uppercase text-lg md:text-xl">
            <Link
              className="cursor-pointer hover:underline"
              href={LINKS.VOTE.link}
            >
              {LINKS.VOTE.label}
            </Link>
            <Link
              className="cursor-pointer hover:underline"
              href={LINKS.TOKEN.link}
            >
              {LINKS.TOKEN.label}
            </Link>
            <Link
              className="cursor-pointer hover:underline"
              href={LINKS.BOUNTY.link}
            >
              {LINKS.BOUNTY.label}
            </Link>

            <Link
              className="cursor-pointer hover:underline"
              href={LINKS.PIP.link}
            >
              {LINKS.PIP.label}
            </Link>
            <span
              className="cursor-pointer hover:underline"
              onClick={() => {
                if (isConnected) {
                  disconnect()
                } else {
                  if (openConnectModal) {
                    openConnectModal()
                  }
                }
              }}
            >
              {isConnected ? 'Disconnect' : 'Connect'}
            </span>
            <div className="flex gap-4 pt-4">
              <Link href={LINKS.TWITTER.link} target="_blank">
                <TwitterIcon colorClass="fill-oil" />
              </Link>
              <Link href={LINKS.DISCORD.link} target="_blank">
                <DiscordIcon colorClass="fill-oil" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  )
}
