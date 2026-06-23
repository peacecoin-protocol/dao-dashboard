# PeaceCoin SBT Backend

TypeScript + Express API for managing PeaceCoin SBTs and NFTs on Polygon.

This service handles:

- Token creation with Pinata image and metadata uploads
- Contract and token lookup from Supabase
- On-chain batch minting
- Scheduled issuances through the backend worker
- Wallet balance lookup for a selected contract

The frontend client lives in `../sample`.

## Stack

- Node.js
- TypeScript
- Express
- ethers.js
- Supabase
- Pinata
- Zod
- Multer

## Project structure

```txt
backend/
├── src/
│   ├── abi/             # Contract ABI
│   ├── config/          # Env parsing and startup config
│   ├── lib/             # Pinata integration
│   ├── middleware/      # Upload and error middleware
│   ├── routes/          # REST endpoints
│   ├── services/        # Blockchain, SBT, Supabase logic
│   ├── utils/           # Validation and response helpers
│   ├── app.ts           # Express app factory
│   ├── index.ts         # Server entry point
│   └── scheduler.ts     # Scheduled issuance worker
├── sql/
│   └── scheduled_issuance.sql
└── tests/
```

## Prerequisites

- Node.js 18+; 20+ recommended
- npm
- Polygon RPC access
- Supabase project with `DAO`, `Token`, and scheduled issuance data
- Pinata JWT and group IDs
- Backend signer wallet with required contract permissions

## Setup

Install dependencies:

```bash
npm install
```

Create the env file:

```bash
cp .env.example .env
```

If you will use scheduled minting, run this SQL in Supabase first:

```bash
sql/scheduled_issuance.sql
```

Then update `.env` with your signer key, RPC URLs, Supabase keys, Pinata JWT, gateway URL, and group IDs.

## Scripts

- `npm run dev` starts the API with `tsx watch`
- `npm run build` compiles TypeScript to `dist/`
- `npm run start` runs the compiled server
- `npm run test` runs the Vitest suite
- `npm run test:watch` runs tests in watch mode
- `npm run test:coverage` runs tests with coverage

By default the API listens on `http://localhost:3001`.

## API surface

Health:

- `GET /health`

SBT routes:

- `POST /api/sbt/create-token`
- `GET /api/sbt/contracts`
- `GET /api/sbt/tokens`
- `POST /api/sbt/batch-mint`
- `GET /api/sbt/wallet-balances`
- `GET /api/sbt/community-tokens`
- `POST /api/sbt/upload-metadata`
- `POST /api/sbt/set-token-uri`
- `POST /api/sbt/scheduled-issuances`
- `GET /api/sbt/scheduled-issuances`
- `POST /api/sbt/scheduled-issuances/:id/cancel`

Full request and response details are in [API.md](../API.md).

## Environment variables

Core backend variables:

| Variable | Required | Description |
| -------- | -------- | ----------- |
| `PORT` | No | HTTP port; defaults to `3001` |
| `DAO_MANAGER_PRIVATE_KEY` | Yes | Signer private key used for contract writes |
| `POLYGON_RPC_URL_DEV` | Yes | RPC used for `environment=dev` |
| `POLYGON_RPC_URL_STG` | No | RPC used for `environment=stg` |
| `POLYGON_RPC_URL_PRODUCTION` | Yes | RPC used for `environment=production` |
| `SUPABASE_URL` | Yes | Supabase project URL |
| `SUPABASE_ANON_KEY` | Yes | Fallback key for reads |
| `SUPABASE_SERVICE_ROLE_KEY` | No | Preferred server-side key |
| `PINATA_JWT` | Yes | Pinata API JWT |
| `PINATA_GATEWAY_URL` | Yes | Base gateway URL for public IPFS assets |
| `PINATA_SBT_GROUP_ID_DEV` / `_STG` / `_PROD` | Yes | SBT image groups |
| `PINATA_NFT_GROUP_ID_DEV` / `_STG` / `_PROD` | Yes | NFT image groups |
| `PINATA_JSON_GROUP_ID_DEV` / `_STG` / `_PROD` | Yes | Metadata JSON groups |
| `ISSUANCE_SCHEDULER_ENABLED` | No | Set `false` to disable the worker |
| `ISSUANCE_SCHEDULER_INTERVAL_MS` | No | Poll interval for scheduled issuances |

See [.env.example](./.env.example) for the full template.

## Runtime notes

- `create-token` uploads the image, uploads metadata JSON, writes the token on-chain, then stores the token in Supabase.
- `batch-mint` writes directly on-chain and does not upload to IPFS.
- The scheduler starts automatically when the server boots.
- Voting power is stored as wei; the frontend converts user ETH input before submission.

## Signer permissions

The backend signer must have appropriate rights on the target contract:

| Action | Requirement |
| ------ | ----------- |
| Create token | Default admin role or equivalent DAO manager permission |
| Batch mint | Minter role or equivalent DAO manager permission |
| Set token URI | Default admin role or equivalent DAO manager permission |

## Common issues

| Problem | Likely cause |
| ------- | ------------ |
| `NOT_DAO_MANAGER` | The signer wallet is missing the required role |
| `DAO_NOT_FOUND` | No matching DAO exists in Supabase for the selected `daoId` and environment |
| `FAILED_TO_UPLOAD_IMAGE` | Invalid Pinata JWT or image group ID |
| `FAILED_TO_SAVE_TOKEN` | On-chain write succeeded but Supabase insert failed |

## Related docs

- [API.md](../API.md)
- [TECHNICAL_DESIGN.md](../TECHNICAL_DESIGN.md)
