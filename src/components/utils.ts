import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { ethers } from 'ethers'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const LINKS = {
  VOTE: {
    label: 'Proposals',
    link: '/proposals',
  },
  TOKEN: {
    label: 'Token',
    link: '/token',
  },
  BOUNTY: {
    label: 'Bounty',
    link: '/bounty',
  },
  TWITTER: {
    label: 'Twitter',
    link: 'https://twitter.com/',
  },
  DISCORD: {
    label: 'Discord',
    link: 'https://discord.com/invite/',
  },
}

export const shortenAddress = (address: any) => {
  if (!address) return ''
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
}

export const encodeCalldata = (abi: any, functionName: any, params: any) => {
  const iface = new ethers.Interface(abi)
  return iface.encodeFunctionData(functionName, params)
}
