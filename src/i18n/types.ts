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
  campaignId: string
  amount: BigNumberish
  title: string
  description: string
  startDate: string
  endDate: string
  validateSignatures: boolean
  isNFT: boolean
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
}

export interface TOKEN {
  address: string
  name: string
  symbol: string
  balance: bigint
  swapToLocalAllowance: number
}

export interface Metadata {
  image: string
  name: string
  description: string
  attributes?: {
    key: string
    trait_type: string
    value: string
  }[]
  external_url?: string
  token_id?: number
}

export interface LABEL {
  name: string
  color: string
  id: number
}

export interface ISSUE {
  number: number
  title: string
  body: string
  created_at: string
  closed_at: string
  updated_at: string
  state: string
  labels: LABEL[]
  url: string
  html_url: string
  author: string
  avatar_url: string
  isPullRequest: boolean
}
