import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { defaultChainId } from '~/app/constants/constants'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function resolveAddress(
  addressMap: Record<number, `0x${string}`>,
  chainId: number | undefined
): `0x${string}` {
  const resolvedAddress =
    addressMap[chainId ?? defaultChainId] ?? addressMap[defaultChainId]

  if (!resolvedAddress) {
    throw new Error(
      `Missing contract address for chain ${chainId ?? defaultChainId}`
    )
  }

  return resolvedAddress
}
