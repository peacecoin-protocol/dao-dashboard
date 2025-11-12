import { BigNumberish } from 'ethers'

export type Locale = 'en' | 'ja' | 'cn' | 'es' | 'fr' | 'pt'

export type PagePropsWithLocale<T> = T & {
  params: { locale: Locale }
}

export interface SVGProps {
  sizeClass?: string
  colorClass?: string
  className?: string
}

export interface BOUNTY_CONTRIBUTOR {
  contributor: string
  amount: BigNumberish
  id: string
  blockTimestamp?: number
}

export interface CAMPAIGN {
  sbtId: number
  campaignId: number
  totalAmount: BigNumberish
  claimAmount: BigNumberish
  claimedAmount: BigNumberish
  title: string
  description: string
  startDate: string
  endDate: string
  validateSignatures: boolean
  tokenType: number
  token: string
}

export interface BOUNTY_PROPOSAL {
  amount: BigNumberish
  proposalId: string
  id: string
  blockTimestamp?: number
}

export interface Proposal {
  id: string
  amount: BigNumberish
}

export interface Section {
  [key: string]: string
}

export interface Dictionary {
  navigation: Section
  dashboard: Section
  proposal: Section
  sidebar: Section
  home: Section
  submit: Section
  vote: Section
  token: Section
  bounty: Section
  pipBar: Section
  pending: Section
  closed: Section
  delegate: Section
  faq: Section
  daofaq: Section
  studio: Section
  daoInfo: Section
  pceDetail: Section
  campaign: Section
  pipAll: Section
  votingPower: Section
  sbt: Section
}

export interface TOKEN {
  address: string
  name: string
  symbol: string
  balance: bigint
  swapToLocalAllowance: number
}

export interface Metadata {
  tokenId: string
  image: string
  name: string
  description: string
}

export interface PIP {
  number: string
  title: string
  proposer: string
  content: string
  created: string
  status: string
  category: string
  type: string
  path: string
}

export interface ActionInfo {
  title: string
}
