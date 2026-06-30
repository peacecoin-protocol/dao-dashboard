type AppEnv = 'dev' | 'stg' | 'prod'

const getPublicEnv = (
  name: string,
  value: string | undefined,
  fallback?: string
): string => {
  const resolvedValue = value ?? fallback

  if (!resolvedValue) {
    throw new Error(`Missing required public environment variable: ${name}`)
  }

  return resolvedValue
}

const resolveAppEnv = (): AppEnv => {
  const value = process.env.NEXT_PUBLIC_APP_ENV ?? 'dev'

  switch (value.toLowerCase()) {
    case 'dev':
      return 'dev'
    case 'stg':
    case 'staging':
    case 'preview':
      return 'stg'
    default:
      return 'prod'
  }
}

const appEnv = resolveAppEnv()

const pickByAppEnv = (values: Record<AppEnv, string>): string => values[appEnv]

export const Env = {
  NEXT_PUBLIC_WC_PROJECT_ID: getPublicEnv(
    'NEXT_PUBLIC_WC_PROJECT_ID',
    process.env.NEXT_PUBLIC_WC_PROJECT_ID
  ),
  NEXT_PUBLIC_ENABLE_TESTNETS: getPublicEnv(
    'NEXT_PUBLIC_ENABLE_TESTNETS',
    process.env.NEXT_PUBLIC_ENABLE_TESTNETS,
    'true'
  ),
  NEXT_PUBLIC_ALCHEMY_API_KEY: getPublicEnv(
    'NEXT_PUBLIC_ALCHEMY_API_KEY',
    process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
  ),
  NEXT_PUBLIC_SEPOLIA_RPC_URL: getPublicEnv(
    'NEXT_PUBLIC_SEPOLIA_RPC_URL',
    process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL
  ),
  NEXT_PUBLIC_HOODI_RPC_URL: getPublicEnv(
    'NEXT_PUBLIC_HOODI_RPC_URL',
    process.env.NEXT_PUBLIC_HOODI_RPC_URL
  ),
  NEXT_PUBLIC_POLYGON_RPC_URL: getPublicEnv(
    'NEXT_PUBLIC_POLYGON_RPC_URL',
    process.env.NEXT_PUBLIC_POLYGON_RPC_URL
  ),
  NEXT_PUBLIC_SEPOLIA_WEBSOCKET_URL: getPublicEnv(
    'NEXT_PUBLIC_SEPOLIA_WEBSOCKET_URL',
    process.env.NEXT_PUBLIC_SEPOLIA_WEBSOCKET_URL
  ),
  NEXT_PUBLIC_LOCALHOST_RPC_URL: getPublicEnv(
    'NEXT_PUBLIC_LOCALHOST_RPC_URL',
    process.env.NEXT_PUBLIC_LOCALHOST_RPC_URL,
    'http://localhost:8545'
  ),
  PINATA_GATEWAY_URL: getPublicEnv(
    'NEXT_PUBLIC_PINATA_GATEWAY_URL',
    process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL
  ),
  PINATA_SBT_GROUP_ID: pickByAppEnv({
    dev: getPublicEnv(
      'NEXT_PUBLIC_PINATA_SBT_GROUP_ID_DEV',
      process.env.NEXT_PUBLIC_PINATA_SBT_GROUP_ID_DEV
    ),
    stg: getPublicEnv(
      'NEXT_PUBLIC_PINATA_SBT_GROUP_ID_STG',
      process.env.NEXT_PUBLIC_PINATA_SBT_GROUP_ID_STG
    ),
    prod: getPublicEnv(
      'NEXT_PUBLIC_PINATA_SBT_GROUP_ID_PROD',
      process.env.NEXT_PUBLIC_PINATA_SBT_GROUP_ID_PROD
    ),
  }),
  PINATA_NFT_GROUP_ID: pickByAppEnv({
    dev: getPublicEnv(
      'NEXT_PUBLIC_PINATA_NFT_GROUP_ID_DEV',
      process.env.NEXT_PUBLIC_PINATA_NFT_GROUP_ID_DEV
    ),
    stg: getPublicEnv(
      'NEXT_PUBLIC_PINATA_NFT_GROUP_ID_STG',
      process.env.NEXT_PUBLIC_PINATA_NFT_GROUP_ID_STG
    ),
    prod: getPublicEnv(
      'NEXT_PUBLIC_PINATA_NFT_GROUP_ID_PROD',
      process.env.NEXT_PUBLIC_PINATA_NFT_GROUP_ID_PROD
    ),
  }),
  PINATA_DAO_GROUP_ID: pickByAppEnv({
    dev: getPublicEnv(
      'NEXT_PUBLIC_PINATA_DAO_GROUP_ID_DEV',
      process.env.NEXT_PUBLIC_PINATA_DAO_GROUP_ID_DEV
    ),
    stg: getPublicEnv(
      'NEXT_PUBLIC_PINATA_DAO_GROUP_ID_STG',
      process.env.NEXT_PUBLIC_PINATA_DAO_GROUP_ID_STG
    ),
    prod: getPublicEnv(
      'NEXT_PUBLIC_PINATA_DAO_GROUP_ID_PROD',
      process.env.NEXT_PUBLIC_PINATA_DAO_GROUP_ID_PROD
    ),
  }),
  PINATA_JSON_GROUP_ID: pickByAppEnv({
    dev: getPublicEnv(
      'NEXT_PUBLIC_PINATA_JSON_GROUP_ID_DEV',
      process.env.NEXT_PUBLIC_PINATA_JSON_GROUP_ID_DEV
    ),
    stg: getPublicEnv(
      'NEXT_PUBLIC_PINATA_JSON_GROUP_ID_STG',
      process.env.NEXT_PUBLIC_PINATA_JSON_GROUP_ID_STG
    ),
    prod: getPublicEnv(
      'NEXT_PUBLIC_PINATA_JSON_GROUP_ID_PROD',
      process.env.NEXT_PUBLIC_PINATA_JSON_GROUP_ID_PROD
    ),
  }),
}
