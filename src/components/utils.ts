import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const LINKS = {
  VOTE: {
    label: 'Vote',
    link: '/vote',
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
