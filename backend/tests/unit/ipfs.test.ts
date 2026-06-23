import { describe, it, expect } from 'vitest'
import { extractCidFromTokenUri } from '../../src/utils/ipfs.js'

describe('extractCidFromTokenUri', () => {
  it('extracts cid from gateway url', () => {
    expect(
      extractCidFromTokenUri(
        'https://ipfs-dao-studio.mypinata.cloud/ipfs/bafyMetadataCid'
      )
    ).toBe('bafyMetadataCid')
  })

  it('returns raw cid when already a cid', () => {
    expect(extractCidFromTokenUri('bafyMetadataCid')).toBe('bafyMetadataCid')
  })
})
