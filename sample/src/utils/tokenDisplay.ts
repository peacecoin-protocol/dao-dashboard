import type { MintableTokenItem, WalletBalanceItem } from '../types/api'

const PINATA_GATEWAY =
  import.meta.env.VITE_PINATA_GATEWAY_URL ??
  'https://ipfs-dao-studio.mypinata.cloud'
const WEI_PER_ETHER = 10n ** 18n

export function parseEtherToWei(ether: string): string | null {
  const trimmed = ether.trim()
  if (!trimmed || !/^\d+(\.\d+)?$/.test(trimmed)) {
    return null
  }

  const [wholePart = '0', fractionPart = ''] = trimmed.split('.')
  if (fractionPart.length > 18) {
    return null
  }

  try {
    const wei =
      BigInt(wholePart) * WEI_PER_ETHER + BigInt(fractionPart.padEnd(18, '0'))
    return wei.toString()
  } catch {
    return null
  }
}

export function formatVotingPowerToEther(
  wei: string | null | undefined
): string {
  if (wei == null || !wei.trim()) {
    return '—'
  }

  try {
    const value = BigInt(wei.trim())
    const whole = value / WEI_PER_ETHER
    const fraction = value % WEI_PER_ETHER

    if (fraction === 0n) {
      return `${whole} ETH`
    }

    const fractionText = fraction
      .toString()
      .padStart(18, '0')
      .replace(/0+$/, '')
    return `${whole}.${fractionText} ETH`
  } catch {
    return wei
  }
}

export function resolveTokenImageUrl(
  image: string | null | undefined
): string | null {
  if (!image?.trim()) {
    return null
  }

  const value = image.trim()
  if (/^https?:\/\//i.test(value) || value.startsWith('data:')) {
    return value
  }

  const gateway = PINATA_GATEWAY.replace(/\/ipfs\/?$/, '').replace(/\/$/, '')
  const cid = value.startsWith('ipfs://')
    ? value.slice('ipfs://'.length)
    : value
  return `${gateway}/ipfs/${cid}`
}

function compareTokenIds(a: string, b: string): number {
  try {
    const diff = BigInt(a) - BigInt(b)
    if (diff < 0n) return -1
    if (diff > 0n) return 1
    return 0
  } catch {
    return a.localeCompare(b, undefined, { numeric: true })
  }
}

export function sortItemsByTokenId(
  items: WalletBalanceItem[]
): WalletBalanceItem[] {
  return [...items].sort((a, b) => compareTokenIds(a.tokenId, b.tokenId))
}

export function sortMintableTokens(
  items: MintableTokenItem[]
): MintableTokenItem[] {
  return [...items].sort((a, b) => {
    const byTokenId = compareTokenIds(a.tokenId, b.tokenId)
    return byTokenId !== 0 ? byTokenId : a.dbId - b.dbId
  })
}
