import dotenv from 'dotenv'
import type { Environment, PinataGroupKind } from '../types/index.js'

dotenv.config()

function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

function optionalEnv(name: string, fallback: string): string {
  return process.env[name] ?? fallback
}

const PLACEHOLDER_VALUES = new Set([
  'your-service-role-key',
  'your-pinata-jwt',
  '0xYourPrivateKey',
  'your-key',
])

function isPlaceholder(value: string | undefined): boolean {
  if (!value) return true
  const trimmed = value.trim()
  return PLACEHOLDER_VALUES.has(trimmed) || trimmed.includes('your-')
}

function resolveEnv(
  primary: string,
  ...fallbackKeys: string[]
): string | undefined {
  const keys = [primary, ...fallbackKeys]
  for (const key of keys) {
    const value = process.env[key]
    if (value && !isPlaceholder(value)) return value
  }
  return undefined
}

export const config = {
  port: parseInt(optionalEnv('PORT', '3001'), 10),
  nodeEnv: optionalEnv('NODE_ENV', 'development'),
  supabaseUrl: () =>
    optionalEnv('SUPABASE_URL', optionalEnv('NEXT_PUBLIC_SUPABASE_URL', '')) ||
    requireEnv('SUPABASE_URL'),
  supabaseServiceRoleKey: () => {
    const key =
      resolveEnv('SUPABASE_SERVICE_ROLE_KEY') ??
      resolveEnv('SUPABASE_ANON_KEY', 'NEXT_PUBLIC_SUPABASE_ANON_KEY')
    if (key) return key
    throw new Error(
      'Missing Supabase key: set SUPABASE_SERVICE_ROLE_KEY or SUPABASE_ANON_KEY'
    )
  },
  pinataJwt: () => {
    const jwt = resolveEnv('PINATA_JWT')
    if (jwt) return jwt
    throw new Error('Missing PINATA_JWT')
  },
  pinataGatewayUrl: optionalEnv(
    'PINATA_GATEWAY_URL',
    'https://ipfs-dao-studio.mypinata.cloud'
  ),
  polygonRpcUrl: (environment: Environment): string => {
    const envKeys: Record<Environment, string> = {
      dev: 'POLYGON_RPC_URL_DEV',
      stg: 'POLYGON_RPC_URL_STG',
      production: 'POLYGON_RPC_URL_PRODUCTION',
    }
    const envKey = envKeys[environment]
    const specific = process.env[envKey]
    if (specific) return specific
    const shared =
      process.env.POLYGON_RPC_URL ?? process.env.NEXT_PUBLIC_POLYGON_RPC_URL
    if (shared) return shared
    return requireEnv(envKey)
  },
  issuanceSchedulerEnabled:
    optionalEnv('ISSUANCE_SCHEDULER_ENABLED', 'true') !== 'false',
  issuanceSchedulerIntervalMs: parseInt(
    optionalEnv('ISSUANCE_SCHEDULER_INTERVAL_MS', '60000'),
    10
  ),
  maxImageSizeBytes: 10 * 1024 * 1024,
  allowedImageMimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/gif'],
  pinataGroupId: (kind: PinataGroupKind, environment: Environment): string => {
    const suffixes: Record<Environment, string> = {
      dev: 'DEV',
      stg: 'STG',
      production: 'PROD',
    }
    const suffix = suffixes[environment]
    const envKeys: Record<PinataGroupKind, string> = {
      sbt: `PINATA_SBT_GROUP_ID_${suffix}`,
      nft: `PINATA_NFT_GROUP_ID_${suffix}`,
      json: `PINATA_JSON_GROUP_ID_${suffix}`,
      dao: `PINATA_DAO_GROUP_ID_${suffix}`,
    }
    return requireEnv(envKeys[kind])
  },
  validateForStartup(): string[] {
    const warnings: string[] = []
    if (isPlaceholder(process.env.PINATA_JWT)) {
      warnings.push('PINATA_JWT is not set — upload-metadata will fail.')
    }
    if (
      isPlaceholder(process.env.SUPABASE_SERVICE_ROLE_KEY) &&
      !resolveEnv('SUPABASE_ANON_KEY', 'NEXT_PUBLIC_SUPABASE_ANON_KEY')
    ) {
      warnings.push('No Supabase key configured — wallet-balances will fail.')
    }
    return warnings
  },
}
