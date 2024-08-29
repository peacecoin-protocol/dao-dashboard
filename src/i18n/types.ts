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

export interface Contributor {
  contributor: string | null
  totalAmount: BigNumberish
  id?: string
}

export interface Proposal {
  id: string | null
  amount: BigNumberish
}
