interface ApiResponseLike {
  success?: boolean
  status?: string
  message?: string
  error?: string
  data?: unknown
}

export interface FormattedError {
  title: string
  hint?: string
  details?: string
}

const STATUS_HINTS: Record<string, string> = {
  FAILED_TO_CREATE_TOKEN:
    'On-chain token creation failed. The provided signer must be default admin on the contract.',
  FAILED_TO_SAVE_TOKEN:
    'The token was created on-chain but could not be saved to Supabase. You may need to insert the record manually.',
  FAILED_TO_LIST_TOKENS: 'Could not load tokens from Supabase for this DAO.',
  FAILED_TO_LIST_COMMUNITY_TOKENS:
    'Could not load community tokens from Supabase for this environment.',
  MISSING_SIGNER_PRIVATE_KEY:
    'Provide a signer private key before sending create, mint, or schedule requests.',
  INVALID_SIGNER_PRIVATE_KEY:
    'The supplied private key format is invalid. Use a 32-byte hex string.',
  NOT_DAO_MANAGER:
    'The provided signer needs minter role to mint and default admin role to create tokens.',
  FAILED_TO_SET_TOKEN_URI:
    'Token ID must already exist on the contract. Use Create SBT to register new tokens.',
  FAILED_TO_MINT:
    'Minting failed. Token IDs must exist on the contract and the provided signer must be a minter.',
  FAILED_TO_UPLOAD_IMAGE:
    'Pinata image upload failed. Check PINATA_JWT and group IDs in backend/.env.',
  FAILED_TO_UPLOAD_METADATA:
    'Pinata metadata upload failed. Check PINATA_JWT and JSON group ID.',
  DAO_NOT_FOUND: 'No DAO in Supabase matches this daoId and environment.',
  SBT_CONTRACT_NOT_FOUND:
    'The DAO record is missing a valid contract address for the selected asset type.',
  FAILED_TO_FETCH_BALANCE:
    'Could not read balances from Supabase or Polygon RPC.',
  FAILED_TO_SCHEDULE_ISSUANCE:
    'Could not save the scheduled issuance to Supabase. Make sure the ScheduledIssuance table exists (backend/sql/scheduled_issuance.sql).',
  FAILED_TO_LIST_SCHEDULED_ISSUANCES:
    'Could not load scheduled issuances from Supabase.',
  FAILED_TO_CANCEL_SCHEDULED_ISSUANCE:
    'Could not cancel the scheduled issuance.',
  SCHEDULED_ISSUANCE_NOT_FOUND: 'No scheduled issuance exists with this id.',
  SCHEDULED_ISSUANCE_NOT_CANCELLABLE:
    'Only pending issuances can be cancelled. This one already ran, failed, or was cancelled.',
  VALIDATION_ERROR: 'Check that all required fields are filled in correctly.',
}

const REVERT_HINTS: Array<{ pattern: RegExp; hint: string }> = [
  {
    pattern: /PermissionDenied|0x3f6cc768/i,
    hint: 'The provided signer does not have default admin role on this contract.',
  },
  {
    pattern: /InvalidTokenId|0x[0-9a-f]{8}.*InvalidTokenId/i,
    hint: 'This token ID does not exist on the contract yet. It must be between 1 and numberOfTokens. Use createToken on-chain first, or pick an existing ID.',
  },
  {
    pattern: /InvalidMinter/i,
    hint: 'The provided signer is not registered as a minter on this contract.',
  },
]

function shortenHexStrings(text: string): string {
  return text.replace(/0x[0-9a-fA-F]{40,}/gi, (match) => {
    if (match.length <= 18) return match
    return `${match.slice(0, 10)}…${match.slice(-6)}`
  })
}

function extractRevertHint(raw: string): string | undefined {
  for (const { pattern, hint } of REVERT_HINTS) {
    if (pattern.test(raw)) return hint
  }
  if (/execution reverted/i.test(raw)) {
    return 'The smart contract rejected this transaction during gas estimation.'
  }
  return undefined
}

function buildStepHint(data: unknown): string | undefined {
  if (!data || typeof data !== 'object') return undefined
  const record = data as Record<string, unknown>
  const parts: string[] = []
  if (typeof record.step === 'string') {
    parts.push(`Failed at step: ${record.step}`)
  }
  if (typeof record.tokenIndex === 'number') {
    parts.push(`Token row: ${record.tokenIndex + 1}`)
  }
  return parts.length ? parts.join(' · ') : undefined
}

export function formatApiError(
  response: ApiResponseLike
): FormattedError | null {
  if (response.success !== false) return null

  const title = response.message || 'Request failed'
  const raw = response.error ?? ''
  const statusHint = response.status ? STATUS_HINTS[response.status] : undefined
  const revertHint = raw ? extractRevertHint(raw) : undefined
  const stepHint = buildStepHint(response.data)

  const hints = [stepHint, statusHint, revertHint].filter(Boolean)
  const hint = hints.length ? hints.join(' ') : undefined
  const details = raw ? shortenHexStrings(raw) : undefined

  return { title, hint, details }
}

export function isApiResponse(value: unknown): value is ApiResponseLike {
  return Boolean(value && typeof value === 'object' && 'success' in value)
}
