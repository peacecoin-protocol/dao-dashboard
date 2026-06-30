/**
 * Integration tests for SBT HTTP routes (sbtService mocked).
 *
 * Implementation flow (route → service → Pinata / Supabase / Polygon):
 * - POST /create-token     → createSbt: upload metadata → createToken on-chain → insert Token row
 * - GET  /contracts        → listContracts: Supabase DAO rows with SBT/NFT addresses
 * - GET  /tokens           → listTokens: active Token rows for a DAO
 * - POST /batch-mint       → batchMint: role check → batchMint on-chain (no IPFS/DB)
 * - POST /upload-metadata  → uploadMetadata: Pinata image + JSON only
 * - GET  /community-tokens → listCommunityTokens: DAOs with token creations (API-only)
 * - GET  /wallet-balances  → getWalletBalances: Token rows + balanceOf per token, owned only
 * - POST /scheduled-issuances           → scheduleIssuance: role check → insert pending row
 * - GET  /scheduled-issuances           → listScheduledIssuances: rows by environment/status
 * - POST /scheduled-issuances/:id/cancel → cancelScheduledIssuance: pending rows only
 *
 * Full step-by-step flows: TECHNICAL_DESIGN.md §20
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import request from 'supertest'
import { createApp } from '../../src/app.js'

vi.mock('../../src/services/sbt.service.js', () => ({
  sbtService: {
    batchMint: vi.fn(),
    createSbt: vi.fn(),
    listContracts: vi.fn(),
    listTokens: vi.fn(),
    uploadMetadata: vi.fn(),
    setTokenUri: vi.fn(),
    getWalletBalances: vi.fn(),
    listCommunityTokens: vi.fn(),
    scheduleIssuance: vi.fn(),
    listScheduledIssuances: vi.fn(),
    cancelScheduledIssuance: vi.fn(),
  },
}))

import { sbtService } from '../../src/services/sbt.service.js'

const app = createApp()
const TEST_PRIVATE_KEY =
  '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'

describe('SBT API routes', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('POST /api/sbt/create-token', () => {
    it('returns success response', async () => {
      vi.mocked(sbtService.createSbt).mockResolvedValue({
        ok: true,
        result: {
          environment: 'dev',
          assetType: 'sbt',
          daoId: 'dao-1',
          daoName: 'Test DAO',
          sbtAddress: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
          tokenId: '5',
          name: 'Badge',
          description: 'Desc',
          votingPower: '100',
          imageCid: 'img1',
          metadataCid: 'meta1',
          tokenUri: 'https://ipfs-dao-studio.mypinata.cloud/ipfs/meta1',
          createTransactionHash: '0xcreate',
          createBlockNumber: 10,
          dbTokenId: 99,
        },
      })

      const res = await request(app)
        .post('/api/sbt/create-token')
        .set('x-signer-private-key', TEST_PRIVATE_KEY)
        .field('environment', 'dev')
        .field('assetType', 'sbt')
        .field('daoId', 'dao-1')
        .field('name', 'Badge')
        .field('description', 'Desc')
        .field('votingPower', '100')
        .attach('image', Buffer.from('fake'), {
          filename: '1.png',
          contentType: 'image/png',
        })

      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
      expect(res.body.status).toBe('SUCCESSFUL_CREATE_TOKEN')
      expect(res.body.data.tokenId).toBe('5')
    })

    it('returns validation error when image missing', async () => {
      const res = await request(app)
        .post('/api/sbt/create-token')
        .set('x-signer-private-key', TEST_PRIVATE_KEY)
        .field('environment', 'dev')
        .field('assetType', 'sbt')
        .field('daoId', 'dao-1')
        .field('name', 'Badge')
        .field('description', 'Desc')
        .field('votingPower', '100')

      expect(res.status).toBe(400)
      expect(res.body.status).toBe('VALIDATION_ERROR')
    })
  })

  describe('GET /api/sbt/contracts', () => {
    it('returns contract list', async () => {
      vi.mocked(sbtService.listContracts).mockResolvedValue({
        ok: true,
        result: {
          environment: 'dev',
          assetType: 'sbt',
          items: [
            {
              daoId: 'dao-1',
              daoName: 'Test DAO',
              contractAddress: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
              communityTokenAddress:
                '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
              nftAddress: null,
              environment: 'dev',
            },
          ],
        },
      })

      const res = await request(app).get('/api/sbt/contracts').query({
        environment: 'dev',
        assetType: 'sbt',
      })

      expect(res.status).toBe(200)
      expect(res.body.status).toBe('SUCCESSFUL_LIST_CONTRACTS')
      expect(res.body.data.items).toHaveLength(1)
    })
  })

  describe('GET /api/sbt/tokens', () => {
    it('returns token list', async () => {
      vi.mocked(sbtService.listTokens).mockResolvedValue({
        ok: true,
        result: {
          environment: 'dev',
          assetType: 'sbt',
          dao: {
            daoId: 'dao-1',
            daoName: 'Test DAO',
            sbtAddress: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
            tokenAddress: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
            nftAddress: null,
          },
          items: [
            {
              dbId: 1,
              tokenId: '1',
              name: 'Badge',
              description: null,
              image: null,
              votingPower: '100',
              isRevoked: false,
            },
          ],
        },
      })

      const res = await request(app).get('/api/sbt/tokens').query({
        daoId: 'dao-1',
        environment: 'dev',
        assetType: 'sbt',
      })

      expect(res.status).toBe(200)
      expect(res.body.status).toBe('SUCCESSFUL_LIST_TOKENS')
      expect(res.body.data.items).toHaveLength(1)
    })
  })

  describe('POST /api/sbt/batch-mint', () => {
    it('returns success response', async () => {
      vi.mocked(sbtService.batchMint).mockResolvedValue({
        ok: true,
        result: {
          environment: 'dev',
          sbtAddress: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
          to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
          tokens: [{ id: '1', amount: '1' }],
          mintTransactionHash: '0xhash',
          mintBlockNumber: 12345678,
        },
      })

      const res = await request(app)
        .post('/api/sbt/batch-mint')
        .set('x-signer-private-key', TEST_PRIVATE_KEY)
        .send({
          environment: 'dev',
          sbtAddress: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
          to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
          tokens: [{ id: '1', amount: '1' }],
        })

      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
      expect(res.body.status).toBe('SUCCESSFUL_MINT')
      expect(res.body.data.mintTransactionHash).toBe('0xhash')
    })

    it('returns NOT_DAO_MANAGER', async () => {
      vi.mocked(sbtService.batchMint).mockResolvedValue({
        ok: false,
        reason: 'NOT_DAO_MANAGER',
      })
      const res = await request(app)
        .post('/api/sbt/batch-mint')
        .set('x-signer-private-key', TEST_PRIVATE_KEY)
        .send({
          environment: 'dev',
          sbtAddress: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
          to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
          tokens: [{ id: '1', amount: '1' }],
        })
      expect(res.status).toBe(403)
      expect(res.body.status).toBe('NOT_DAO_MANAGER')
    })

    it('returns FAILED_TO_MINT', async () => {
      vi.mocked(sbtService.batchMint).mockResolvedValue({
        ok: false,
        reason: 'FAILED_TO_MINT',
        error: 'revert',
      })
      const res = await request(app)
        .post('/api/sbt/batch-mint')
        .set('x-signer-private-key', TEST_PRIVATE_KEY)
        .send({
          environment: 'dev',
          sbtAddress: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
          to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
          tokens: [{ id: '1', amount: '1' }],
        })
      expect(res.status).toBe(500)
      expect(res.body.status).toBe('FAILED_TO_MINT')
    })

    it('requires signer private key header', async () => {
      const res = await request(app)
        .post('/api/sbt/batch-mint')
        .send({
          environment: 'dev',
          sbtAddress: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
          to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
          tokens: [{ id: '1', amount: '1' }],
        })

      expect(res.status).toBe(400)
      expect(res.body.status).toBe('MISSING_SIGNER_PRIVATE_KEY')
    })
  })

  describe('POST /api/sbt/upload-metadata', () => {
    it('returns success response', async () => {
      vi.mocked(sbtService.uploadMetadata).mockResolvedValue({
        ok: true,
        result: {
          environment: 'dev',
          assetType: 'sbt',
          imageGroupId: 'sbt-group-id',
          jsonGroupId: 'json-group-id',
          imageCid: 'imgCid',
          imageUrl: 'https://ipfs-dao-studio.mypinata.cloud/ipfs/imgCid',
          metadataCid: 'metaCid',
          tokenUri: 'https://ipfs-dao-studio.mypinata.cloud/ipfs/metaCid',
          metadata: {
            name: 'STG',
            description: 'STG',
            attributes: [],
            image: '',
          },
        },
      })

      const res = await request(app)
        .post('/api/sbt/upload-metadata')
        .field('environment', 'dev')
        .field('assetType', 'sbt')
        .field('name', 'STG')
        .field('description', 'STG')
        .field('votingPower', '1000000000000000000000')
        .attach('image', Buffer.from('fake'), {
          filename: '1.png',
          contentType: 'image/png',
        })

      expect(res.status).toBe(200)
      expect(res.body.status).toBe('SUCCESSFUL_METADATA_UPLOAD')
    })
  })

  describe('GET /api/sbt/community-tokens', () => {
    it('returns community tokens with creations', async () => {
      vi.mocked(sbtService.listCommunityTokens).mockResolvedValue({
        ok: true,
        result: {
          environment: 'dev',
          items: [
            {
              daoId: 'dao-1',
              daoName: 'Test',
              communityTokenAddress:
                '0x5FbDB2315678afecb367f032d93F642f64180aa3',
              sbtAddress: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
              nftAddress: null,
              sbtTokenCount: 2,
              nftTokenCount: 0,
              environment: 'dev',
            },
          ],
        },
      })

      const res = await request(app).get('/api/sbt/community-tokens').query({
        environment: 'dev',
      })

      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
      expect(res.body.status).toBe('SUCCESSFUL_LIST_COMMUNITY_TOKENS')
    })
  })

  describe('POST /api/sbt/scheduled-issuances', () => {
    const futureIso = new Date(Date.now() + 60 * 60 * 1000).toISOString()
    const issuanceRow = {
      id: 1,
      createdAt: new Date().toISOString(),
      environment: 'dev' as const,
      sbtAddress: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
      to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
      tokens: [{ id: '1', amount: '1' }],
      executeAt: futureIso,
      status: 'pending' as const,
      attempts: 0,
      lastError: null,
      mintTransactionHash: null,
      mintBlockNumber: null,
      processedAt: null,
    }

    it('schedules an issuance', async () => {
      vi.mocked(sbtService.scheduleIssuance).mockResolvedValue({
        ok: true,
        result: issuanceRow,
      })

      const res = await request(app)
        .post('/api/sbt/scheduled-issuances')
        .set('x-signer-private-key', TEST_PRIVATE_KEY)
        .send({
          environment: 'dev',
          sbtAddress: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
          to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
          tokens: [{ id: '1', amount: '1' }],
          executeAt: futureIso,
        })

      expect(res.status).toBe(201)
      expect(res.body.status).toBe('SUCCESSFUL_SCHEDULE_ISSUANCE')
      expect(res.body.data.status).toBe('pending')
      expect(vi.mocked(sbtService.scheduleIssuance)).toHaveBeenCalledWith({
        signerPrivateKey: TEST_PRIVATE_KEY,
        environment: 'dev',
        sbtAddress: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
        to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
        tokens: [{ id: '1', amount: '1' }],
        executeAt: futureIso,
      })
    })

    it('rejects executeAt in the past', async () => {
      const res = await request(app)
        .post('/api/sbt/scheduled-issuances')
        .set('x-signer-private-key', TEST_PRIVATE_KEY)
        .send({
          environment: 'dev',
          sbtAddress: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
          to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
          tokens: [{ id: '1', amount: '1' }],
          executeAt: new Date(Date.now() - 60 * 1000).toISOString(),
        })

      expect(res.status).toBe(400)
      expect(res.body.status).toBe('VALIDATION_ERROR')
    })

    it('returns NOT_DAO_MANAGER when signer cannot mint', async () => {
      vi.mocked(sbtService.scheduleIssuance).mockResolvedValue({
        ok: false,
        reason: 'NOT_DAO_MANAGER',
      })

      const res = await request(app)
        .post('/api/sbt/scheduled-issuances')
        .set('x-signer-private-key', TEST_PRIVATE_KEY)
        .send({
          environment: 'dev',
          sbtAddress: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
          to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
          tokens: [{ id: '1', amount: '1' }],
          executeAt: futureIso,
        })

      expect(res.status).toBe(403)
      expect(res.body.status).toBe('NOT_DAO_MANAGER')
    })

    it('requires signer private key header', async () => {
      const res = await request(app)
        .post('/api/sbt/scheduled-issuances')
        .send({
          environment: 'dev',
          sbtAddress: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
          to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
          tokens: [{ id: '1', amount: '1' }],
          executeAt: futureIso,
        })

      expect(res.status).toBe(400)
      expect(res.body.status).toBe('MISSING_SIGNER_PRIVATE_KEY')
    })
  })

  describe('GET /api/sbt/scheduled-issuances', () => {
    it('returns scheduled issuances', async () => {
      vi.mocked(sbtService.listScheduledIssuances).mockResolvedValue({
        ok: true,
        result: { environment: 'dev', items: [] },
      })

      const res = await request(app)
        .get('/api/sbt/scheduled-issuances')
        .query({ environment: 'dev', status: 'pending' })

      expect(res.status).toBe(200)
      expect(res.body.status).toBe('SUCCESSFUL_LIST_SCHEDULED_ISSUANCES')
    })

    it('rejects unknown status filter', async () => {
      const res = await request(app)
        .get('/api/sbt/scheduled-issuances')
        .query({ environment: 'dev', status: 'bogus' })

      expect(res.status).toBe(400)
      expect(res.body.status).toBe('VALIDATION_ERROR')
    })
  })

  describe('POST /api/sbt/scheduled-issuances/:id/cancel', () => {
    it('cancels a pending issuance', async () => {
      vi.mocked(sbtService.cancelScheduledIssuance).mockResolvedValue({
        ok: true,
        result: {
          id: 7,
          createdAt: new Date().toISOString(),
          environment: 'dev',
          sbtAddress: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
          to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
          tokens: [{ id: '1', amount: '1' }],
          executeAt: new Date().toISOString(),
          status: 'cancelled',
          attempts: 0,
          lastError: null,
          mintTransactionHash: null,
          mintBlockNumber: null,
          processedAt: null,
        },
      })

      const res = await request(app).post(
        '/api/sbt/scheduled-issuances/7/cancel'
      )

      expect(res.status).toBe(200)
      expect(res.body.status).toBe('SUCCESSFUL_CANCEL_SCHEDULED_ISSUANCE')
      expect(
        vi.mocked(sbtService.cancelScheduledIssuance)
      ).toHaveBeenCalledWith({ id: 7 })
    })

    it('returns 404 when issuance does not exist', async () => {
      vi.mocked(sbtService.cancelScheduledIssuance).mockResolvedValue({
        ok: false,
        reason: 'SCHEDULED_ISSUANCE_NOT_FOUND',
      })

      const res = await request(app).post(
        '/api/sbt/scheduled-issuances/999/cancel'
      )

      expect(res.status).toBe(404)
      expect(res.body.status).toBe('SCHEDULED_ISSUANCE_NOT_FOUND')
    })

    it('returns 409 when issuance already ran', async () => {
      vi.mocked(sbtService.cancelScheduledIssuance).mockResolvedValue({
        ok: false,
        reason: 'SCHEDULED_ISSUANCE_NOT_CANCELLABLE',
        status: 'completed',
      })

      const res = await request(app).post(
        '/api/sbt/scheduled-issuances/7/cancel'
      )

      expect(res.status).toBe(409)
      expect(res.body.status).toBe('SCHEDULED_ISSUANCE_NOT_CANCELLABLE')
    })
  })

  describe('GET /api/sbt/wallet-balances', () => {
    it('returns wallet balances', async () => {
      vi.mocked(sbtService.getWalletBalances).mockResolvedValue({
        ok: true,
        result: {
          walletAddress: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
          communityTokenAddress: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
          environment: 'dev',
          assetType: 'sbt',
          contractAddress: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
          dao: {
            daoId: 'dao-1',
            daoName: 'Test',
            sbtAddress: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
            tokenAddress: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
            nftAddress: null,
          },
          items: [],
        },
      })

      const res = await request(app).get('/api/sbt/wallet-balances').query({
        walletAddress: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
        environment: 'dev',
        assetType: 'sbt',
        daoId: 'dao-1',
      })

      expect(res.status).toBe(200)
      expect(res.body.success).toBe(true)
    })
  })
})
