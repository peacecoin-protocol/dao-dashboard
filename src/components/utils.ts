import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

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
  PIP: {
    label: 'PIP',
    link: '/pip',
  },
  TWITTER: {
    label: 'Twitter',
    link: 'https://x.com/peace_coin_fund',
  },
  DISCORD: {
    label: 'Discord',
    link: 'https://discord.gg/CP8NQsMq5R',
  },
}

export const shortenAddress = (address: any) => {
  if (!address) return ''
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
}

export const formatString = (str: string) => {
  if (str.length == 0) return 0
  return parseFloat(parseFloat(str).toFixed(2))
}

export const formatNumber = (num: number) => {
  return parseFloat(num.toFixed(2))
}

export const timestampToDate = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleString()
}
