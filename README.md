# PEACECOIN Workspace

This repository now contains three related projects:

1. `dao-dashboard` at the repository root
2. `backend` for SBT/NFT management APIs
3. `sample` as the demo frontend for the backend

The root `package.json` is centered on the `dao-dashboard` project first, and also provides commands to run the backend and demo from the same workspace.

## Projects

### 1. DAO Dashboard

Main application for the PEACECOIN DAO experience.

- Framework: Next.js
- Path: `./`
- Default dev port: `3010`
- Default root command: `npm run dev`

### 2. Backend

TypeScript + Express API for SBT/NFT creation, minting, metadata upload, scheduled issuance, and wallet balance lookup.

- Framework: Express + TypeScript
- Path: `./backend`
- Default port: `3001`

### 3. Sample Demo

React + Vite demo client for testing and operating the backend flows.

- Framework: React + Vite
- Path: `./sample`
- Default dev port: `5173`

## Repository Structure

```txt
.
├── backend/       # SBT/NFT API service
├── sample/        # Demo frontend for backend flows
├── src/           # DAO dashboard source
├── public/        # DAO dashboard static assets
├── package.json   # Root scripts for dashboard and workspace helpers
└── README.md
```

## Requirements

- Node.js `v22.4.1` recommended for the root dashboard workspace
- npm

## Installation

Install dependencies for each project separately.

### Root dashboard

```bash
npm install
```

### Backend

```bash
cd backend
npm install
cd ..
```

### Sample demo

```bash
cd sample
npm install
cd ..
```

## Environment Setup

### Root dashboard

Create and update the root `.env` file with the values required by the dashboard.

### Backend

```bash
cp backend/.env.example backend/.env
```

Update `backend/.env` with RPC, Supabase, encryption, and Pinata values.

To enable scheduled mints, also set `SCHEDULED_SIGNER_ENCRYPTION_KEY`. The
backend uses this server-side secret to encrypt signer keys before storing
scheduled issuance jobs in Supabase.

### Sample demo

```bash
cp sample/.env.example sample/.env
```

Update `sample/.env` if you need to override the default backend URL or gateway values.

## Root Commands

The root `package.json` now supports all three projects.

### Development

Run the DAO dashboard only:

```bash
npm run dev
```

Equivalent explicit dashboard command:

```bash
npm run dev:dashboard
```

Run the backend only:

```bash
npm run dev:backend
```

Run the sample demo only:

```bash
npm run dev:sample
```

Alias for the sample demo:

```bash
npm run dev:demo
```

Run backend + sample together:

```bash
npm run dev:stack
```

Run dashboard + backend + sample together:

```bash
npm run dev:all
```

## Build Commands

Build the DAO dashboard:

```bash
npm run build
```

Explicit dashboard build:

```bash
npm run build:dashboard
```

Build the backend:

```bash
npm run build:backend
```

Build the sample demo:

```bash
npm run build:sample
```

Alias for the sample demo build:

```bash
npm run build:demo
```

Build backend + sample together:

```bash
npm run build:stack
```

## Test and Quality Commands

Type-check the dashboard:

```bash
npm run tsc
```

Lint the dashboard:

```bash
npm run lint
```

Check formatting:

```bash
npm run format
```

Fix dashboard lint and formatting issues:

```bash
npm run fix
```

Run backend tests:

```bash
npm run test:backend
```

Run sample tests:

```bash
npm run test:sample
```

Alias for sample tests:

```bash
npm run test:demo
```

Run backend + sample tests together:

```bash
npm run test:stack
```

## Recommended Workflows

### If your first priority is the DAO dashboard

Use:

```bash
npm run dev
```

Then open:

- Dashboard: `http://localhost:3010`

### If you want the backend and demo together

Use:

```bash
npm run dev:stack
```

Then open:

- Backend API: `http://localhost:3001`
- Sample demo: `http://localhost:5173`

### If you want everything running at once

Use:

```bash
npm run dev:all
```

Then open:

- Dashboard: `http://localhost:3010`
- Backend API: `http://localhost:3001`
- Sample demo: `http://localhost:5173`

## Project-Specific Documentation

For more detailed setup and runtime notes:

- [Backend README](./backend/README.md)
- [Sample README](./sample/README.md)

## Notes

- The root scripts do not replace the individual project package files; they orchestrate them.
- `npm run dev` remains dedicated to the DAO dashboard.
- `concurrently` is used at the root to run multiple projects in parallel.
