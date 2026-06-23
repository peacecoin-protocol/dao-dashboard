# PeaceCoin SBT Frontend

React + Vite client for the PeaceCoin SBT backend.

This app provides the operator UI for:

- Creating SBTs and NFTs
- Batch minting existing tokens
- Scheduling future issuances
- Checking wallet balances for a selected contract

The backend API lives in `../backend`.

## Stack

- React 19
- TypeScript
- Vite
- Vitest
- Testing Library

## UI sections

Tabs in the app:

- `Create SBT`
- `Batch Mint`
- `Scheduled`
- `Get Balance`

Main components live under `src/components/`:

- `CreateSbtForm`
- `BatchMintForm`
- `ScheduledIssuancesPanel`
- `WalletBalancesForm`

## Prerequisites

- Node.js 18+; 20+ recommended
- npm
- The backend API running locally or at a reachable URL

For local development, the frontend expects the backend at `http://localhost:3001`.

## Setup

Install dependencies:

```bash
npm install
```

Create the env file:

```bash
cp .env.example .env
```

Update `.env` if needed. The defaults work for local development in most cases.

## Scripts

- `npm run dev` starts the Vite dev server on `http://localhost:5173`
- `npm run build` creates the production bundle in `dist/`
- `npm run preview` serves the built app locally
- `npm run test` runs the Vitest suite
- `npm run test:watch` runs tests in watch mode

## Environment variables

| Variable | Required | Description |
| -------- | -------- | ----------- |
| `VITE_API_BASE_URL` | No | Backend base URL; leave empty to rely on the Vite proxy in dev |
| `VITE_PINATA_GATEWAY_URL` | No | Gateway used to display token images |
| `VITE_WALLET_ADDRESS_PLACEHOLDER` | No | Default wallet prefilled in forms |
| `VITE_SUPABASE_URL` | No | Reserved for client-side Supabase usage |
| `VITE_SUPABASE_ANON_KEY` | No | Reserved for client-side Supabase usage |

See [.env.example](./.env.example) for the current values.

## Backend integration

During development, Vite proxies `/api` requests to `http://localhost:3001`, so a local backend usually works without changing `VITE_API_BASE_URL`.

If you run the app against a remote backend, set `VITE_API_BASE_URL` explicitly.

The UI depends on these backend flows:

- `Create SBT` calls contract lookup and token creation endpoints
- `Batch Mint` loads available contracts and mintable tokens before submitting a mint
- `Scheduled` lists, creates, and cancels scheduled issuances
- `Get Balance` loads contract metadata and wallet balances

Scheduled issuance also requires the backend scheduler and Supabase table setup from `../backend/sql/scheduled_issuance.sql`.

## Testing

```bash
npm test
```

## Related docs

- [Backend README](../backend/README.md)
- [API.md](../API.md)
- [TECHNICAL_DESIGN.md](../TECHNICAL_DESIGN.md)
