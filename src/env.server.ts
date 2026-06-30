import 'server-only'

const getOptionalServerEnv = (name: string): string | undefined => {
  const value = process.env[name]
  return value && value.length > 0 ? value : undefined
}

const getServerEnv = (name: string, fallback?: string): string => {
  const value = getOptionalServerEnv(name) ?? fallback

  if (!value) {
    throw new Error(`Missing required server environment variable: ${name}`)
  }

  return value
}

export const ServerEnv = {
  PINATA_JWT: getServerEnv('PINATA_JWT'),
  MORALIS_API_KEY: getServerEnv('MORALIS_API_KEY'),
  GITHUB_ACCESS_TOKEN:
    getOptionalServerEnv('GITHUB_ACCESS_TOKEN') ??
    getOptionalServerEnv('NEXT_PUBLIC_GITHUB_ACCESS'),
  PINATA_GATEWAY_URL: getServerEnv(
    'NEXT_PUBLIC_PINATA_GATEWAY_URL',
    getOptionalServerEnv('PINATA_GATEWAY_URL')
  ),
}
