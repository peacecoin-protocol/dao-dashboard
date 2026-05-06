type AppEnv = 'dev' | 'stg' | 'prod'

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
  NEXT_PUBLIC_WC_PROJECT_ID: '71e7256c9ebc4818fd7d76d7fcae403a',
  NEXT_PUBLIC_ENABLE_TESTNETS: 'true',
  NEXT_PUBLIC_ALCHEMY_API_KEY: '7fsZZN_84W4-C4Sq_HSCS',
  NEXT_PUBLIC_SEPOLIA_RPC_URL:
    'https://eth-sepolia.g.alchemy.com/v2/7fsZZN_84W4-C4Sq_HSCS',
  NEXT_PUBLIC_HOODI_RPC_URL:
    'https://eth-hoodi.g.alchemy.com/v2/7fsZZN_84W4-C4Sq_HSCS',
  NEXT_PUBLIC_POLYGON_RPC_URL:
    'https://polygon-mainnet.g.alchemy.com/v2/7fsZZN_84W4-C4Sq_HSCS',
  NEXT_PUBLIC_SEPOLIA_WEBSOCKET_URL: `wss://eth-sepolia.g.alchemy.com/v2/7fsZZN_84W4-C4Sq_HSCS`,
  NEXT_PUBLIC_LOCALHOST_RPC_URL: 'http://localhost:8545',
  PINATA_JWT:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJlMTYzNjE2Yy01NzY2LTQxZmQtYTZhZi05NjhmOGU4ZjY4MzgiLCJlbWFpbCI6InBlYWNlY29pbmZvdW5kYXRpb25AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjY1NzczOGU0MTRiMzQxMWQ4NDM3Iiwic2NvcGVkS2V5U2VjcmV0IjoiOGNjZTJhNzI0NGEzZjFhZDU3N2QwNjk1ZDJjYTQ3ZTI1MDBkNWIwOTM0OWVmZTY1NTA5ZDE5Y2I0OWQ0YTVlNyIsImV4cCI6MTc5NDMyMzYzOX0.Ig3ObDPgnaDxr6JBHl8nOQmpIZ-FZldUMZDUZQ_dmZc',
  MORALIS_API_KEY:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImUzZTUzMTg0LWRlYTctNGNjZS1iYmUyLTA5YzVlNTAxNTg4MiIsIm9yZ0lkIjoiMzk1MzE2IiwidXNlcklkIjoiNDA2MjE2IiwidHlwZUlkIjoiYTdiZTM0YzEtZjdmOS00ZWM3LTlmNmQtMjQyNzEyZTk1MzRhIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MTc2ODM3NjksImV4cCI6NDg3MzQ0Mzc2OX0.DY1svaKLFchcxzHR1_HNXA-vDS4NbVHzn9o3cjro8W0',
  PINATA_GATEWAY_URL: 'https://ipfs-dao-studio.mypinata.cloud',
  PINATA_SBT_GROUP_ID: pickByAppEnv({
    dev:
      process.env.NEXT_PUBLIC_PINATA_SBT_GROUP_ID_DEV ??
      'ec1ac640-dd34-4da3-b7f9-9ca9826dcb50',
    stg:
      process.env.NEXT_PUBLIC_PINATA_SBT_GROUP_ID_STG ??
      'ec1ac640-dd34-4da3-b7f9-9ca9826dcb50',
    prod:
      process.env.NEXT_PUBLIC_PINATA_SBT_GROUP_ID_PROD ??
      'ec1ac640-dd34-4da3-b7f9-9ca9826dcb50',
  }),
  PINATA_NFT_GROUP_ID: pickByAppEnv({
    dev:
      process.env.NEXT_PUBLIC_PINATA_NFT_GROUP_ID_DEV ??
      '12757d64-9c40-48d1-b2b2-616d0fe9708f',
    stg:
      process.env.NEXT_PUBLIC_PINATA_NFT_GROUP_ID_STG ??
      '12757d64-9c40-48d1-b2b2-616d0fe9708f',
    prod:
      process.env.NEXT_PUBLIC_PINATA_NFT_GROUP_ID_PROD ??
      '12757d64-9c40-48d1-b2b2-616d0fe9708f',
  }),
  PINATA_DAO_GROUP_ID: pickByAppEnv({
    dev:
      process.env.NEXT_PUBLIC_PINATA_DAO_GROUP_ID_DEV ??
      '3f83ddff-6587-4430-b4d9-da5c8ef56985',
    stg:
      process.env.NEXT_PUBLIC_PINATA_DAO_GROUP_ID_STG ??
      '3f83ddff-6587-4430-b4d9-da5c8ef56985',
    prod:
      process.env.NEXT_PUBLIC_PINATA_DAO_GROUP_ID_PROD ??
      '3f83ddff-6587-4430-b4d9-da5c8ef56985',
  }),
  PINATA_JSON_GROUP_ID: pickByAppEnv({
    dev:
      process.env.NEXT_PUBLIC_PINATA_JSON_GROUP_ID_DEV ??
      'e9cea556-1e9d-4d16-a247-feb8d32e7de5',
    stg:
      process.env.NEXT_PUBLIC_PINATA_JSON_GROUP_ID_STG ??
      'e9cea556-1e9d-4d16-a247-feb8d32e7de5',
    prod:
      process.env.NEXT_PUBLIC_PINATA_JSON_GROUP_ID_PROD ??
      'e9cea556-1e9d-4d16-a247-feb8d32e7de5',
  }),
}
