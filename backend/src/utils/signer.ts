import { ethers } from 'ethers'
import type { Request } from 'express'

export const SIGNER_PRIVATE_KEY_HEADER = 'x-signer-private-key'

export function normalizeSignerPrivateKey(privateKey: string): string | null {
  const trimmed = privateKey.trim()
  if (!trimmed) {
    return null
  }

  const normalized = trimmed.startsWith('0x') ? trimmed : `0x${trimmed}`

  try {
    new ethers.Wallet(normalized)
    return normalized
  } catch {
    return null
  }
}

export function parseSignerPrivateKeyFromRequest(req: Request):
  | { ok: true; privateKey: string }
  | {
      ok: false
      reason: 'MISSING_SIGNER_PRIVATE_KEY' | 'INVALID_SIGNER_PRIVATE_KEY'
      error: string
    } {
  const rawHeader = req.header(SIGNER_PRIVATE_KEY_HEADER)

  if (!rawHeader?.trim()) {
    return {
      ok: false,
      reason: 'MISSING_SIGNER_PRIVATE_KEY',
      error: `Send a signer private key in the ${SIGNER_PRIVATE_KEY_HEADER} header.`,
    }
  }

  const privateKey = normalizeSignerPrivateKey(rawHeader)
  if (!privateKey) {
    return {
      ok: false,
      reason: 'INVALID_SIGNER_PRIVATE_KEY',
      error: 'Private key must be a valid 32-byte hex string.',
    }
  }

  return { ok: true, privateKey }
}
