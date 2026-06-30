import { describe, expect, it } from 'vitest'
import {
  formatVotingPowerToEther,
  parseEtherToWei,
  resolveTokenImageUrl,
  sortItemsByTokenId,
  sortMintableTokens,
} from './tokenDisplay'
import type { MintableTokenItem, WalletBalanceItem } from '../types/api'

function item(
  partial: Partial<WalletBalanceItem> & Pick<WalletBalanceItem, 'tokenId'>
): WalletBalanceItem {
  return {
    dbId: Number(partial.tokenId),
    name: partial.name ?? 'Token',
    description: null,
    image: null,
    votingPower: null,
    isRevoked: false,
    isSBT: true,
    balance: partial.balance ?? '1',
    owned: true,
    ...partial,
  }
}

describe('formatVotingPowerToEther', () => {
  it('converts wei to ether', () => {
    expect(formatVotingPowerToEther('1000000000000000000')).toBe('1 ETH')
    expect(formatVotingPowerToEther('3000000')).toBe('0.000000000003 ETH')
  })

  it('returns dash for empty values', () => {
    expect(formatVotingPowerToEther(null)).toBe('—')
    expect(formatVotingPowerToEther('')).toBe('—')
  })
})

describe('parseEtherToWei', () => {
  it('converts ether to wei', () => {
    expect(parseEtherToWei('1')).toBe('1000000000000000000')
    expect(parseEtherToWei('10000')).toBe('10000000000000000000000')
    expect(parseEtherToWei('1.5')).toBe('1500000000000000000')
  })

  it('rejects invalid values', () => {
    expect(parseEtherToWei('')).toBeNull()
    expect(parseEtherToWei('abc')).toBeNull()
    expect(parseEtherToWei('1.1234567890123456789')).toBeNull()
  })
})

describe('resolveTokenImageUrl', () => {
  it('returns null for empty values', () => {
    expect(resolveTokenImageUrl(null)).toBeNull()
    expect(resolveTokenImageUrl('')).toBeNull()
  })

  it('returns http urls unchanged', () => {
    expect(resolveTokenImageUrl('https://example.com/a.png')).toBe(
      'https://example.com/a.png'
    )
  })

  it('resolves ipfs urls via gateway', () => {
    expect(resolveTokenImageUrl('ipfs://bafy123')).toBe(
      'https://ipfs-dao-studio.mypinata.cloud/ipfs/bafy123'
    )
  })

  it('resolves bare cids via gateway', () => {
    expect(resolveTokenImageUrl('bafy123')).toBe(
      'https://ipfs-dao-studio.mypinata.cloud/ipfs/bafy123'
    )
  })
})

describe('sortItemsByTokenId', () => {
  it('sorts items by token id', () => {
    const result = sortItemsByTokenId([
      item({ tokenId: '10' }),
      item({ tokenId: '3' }),
      item({ tokenId: '1' }),
    ])

    expect(result.map((row) => row.tokenId)).toEqual(['1', '3', '10'])
  })
})

describe('sortMintableTokens', () => {
  it('sorts by token id then db id', () => {
    const tokens: MintableTokenItem[] = [
      {
        dbId: 2,
        tokenId: '4',
        name: 'B',
        description: null,
        image: null,
        votingPower: null,
        isRevoked: false,
      },
      {
        dbId: 1,
        tokenId: '4',
        name: 'A',
        description: null,
        image: null,
        votingPower: null,
        isRevoked: false,
      },
      {
        dbId: 3,
        tokenId: '2',
        name: 'C',
        description: null,
        image: null,
        votingPower: null,
        isRevoked: false,
      },
    ]

    const result = sortMintableTokens(tokens)
    expect(result.map((row) => row.dbId)).toEqual([3, 1, 2])
  })
})
