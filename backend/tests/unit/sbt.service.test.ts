import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../../src/services/blockchain.service.js', () => ({
  blockchainService: {
    hasPermissionForBatchMint: vi.fn(),
    hasPermissionForCreateToken: vi.fn(),
    hasPermissionForSetTokenUri: vi.fn(),
    batchMint: vi.fn(),
    createToken: vi.fn(),
    getSignerAddress: vi.fn(),
    setTokenURI: vi.fn(),
    balanceOf: vi.fn(),
  },
}))

vi.mock('../../src/lib/pinataAPI.js', () => ({
  addFilesToGroupPublic: vi.fn(),
  bufferToFile: vi.fn(
    (buffer, name, type) => new File([buffer], name, { type })
  ),
  createMetadataFile: vi.fn(
    (metadata, imageCid) =>
      new File([JSON.stringify(metadata)], `${imageCid}.json`, {
        type: 'application/json',
      })
  ),
  buildIpfsUrl: vi.fn(
    (cid: string) => `https://ipfs-dao-studio.mypinata.cloud/ipfs/${cid}`
  ),
  buildMetadata: vi.fn((name, description, votingPower, imageUrl) => ({
    name,
    description,
    attributes: [{ trait_type: 'votingPower', value: votingPower }],
    image: imageUrl,
  })),
  getImageGroupId: vi.fn((environment: string, assetType: string) =>
    assetType === 'nft' ? 'nft-group-id' : 'sbt-group-id'
  ),
  getJsonGroupId: vi.fn(() => 'json-group-id'),
}))

vi.mock('../../src/services/supabase.service.js', () => ({
  supabaseService: {
    findDaoById: vi.fn(),
    listContractOptions: vi.fn(),
    findActiveTokens: vi.fn(),
    listCommunityTokensWithCreations: vi.fn(),
    insertToken: vi.fn(),
    insertScheduledIssuance: vi.fn(),
    findDueScheduledIssuances: vi.fn(),
    claimScheduledIssuance: vi.fn(),
    markScheduledIssuanceCompleted: vi.fn(),
    markScheduledIssuanceFailed: vi.fn(),
    findScheduledIssuanceById: vi.fn(),
    cancelScheduledIssuance: vi.fn(),
  },
}))

import { SbtService } from '../../src/services/sbt.service.js'
import { blockchainService } from '../../src/services/blockchain.service.js'
import { addFilesToGroupPublic } from '../../src/lib/pinataAPI.js'
import { supabaseService } from '../../src/services/supabase.service.js'

describe('SbtService', () => {
  let service: SbtService
  const signerPrivateKey =
    '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'

  const communityTokenAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'
  const dao = {
    daoId: 'dao-1',
    daoName: 'Test DAO',
    sbtAddress: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    tokenAddress: communityTokenAddress,
    nftAddress: null,
    environment: 'dev' as const,
  }

  beforeEach(() => {
    service = new SbtService()
    vi.clearAllMocks()
  })

  describe('batchMint', () => {
    const params = {
      signerPrivateKey,
      environment: 'dev' as const,
      sbtAddress: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
      to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
      tokens: [
        { id: '1', amount: '1' },
        { id: '2', amount: '1' },
      ],
    }

    it('returns NOT_DAO_MANAGER when signer lacks role', async () => {
      vi.mocked(blockchainService.hasPermissionForBatchMint).mockResolvedValue(
        false
      )
      const result = await service.batchMint(params)
      expect(result).toEqual({ ok: false, reason: 'NOT_DAO_MANAGER' })
    })

    it('batch mints selected tokens', async () => {
      vi.mocked(blockchainService.hasPermissionForBatchMint).mockResolvedValue(
        true
      )
      vi.mocked(blockchainService.batchMint).mockResolvedValue({
        transactionHash: '0xabc',
        blockNumber: 12345,
      })

      const result = await service.batchMint(params)
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.result.tokens).toHaveLength(2)
        expect(result.result.mintTransactionHash).toBe('0xabc')
      }
      expect(blockchainService.batchMint).toHaveBeenCalledOnce()
    })

    it('returns FAILED_TO_MINT on chain error', async () => {
      vi.mocked(blockchainService.hasPermissionForBatchMint).mockResolvedValue(
        true
      )
      vi.mocked(blockchainService.batchMint).mockRejectedValue(
        new Error('revert')
      )

      const result = await service.batchMint({
        ...params,
        tokens: [params.tokens[0]],
      })
      expect(result).toMatchObject({
        ok: false,
        reason: 'FAILED_TO_MINT',
        error: 'revert',
      })
    })
  })

  describe('scheduleIssuance', () => {
    const params = {
      signerPrivateKey,
      environment: 'dev' as const,
      sbtAddress: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
      to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
      tokens: [{ id: '1', amount: '1' }],
      executeAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    }

    it('stores the signer and the scheduled issuance', async () => {
      vi.mocked(blockchainService.hasPermissionForBatchMint).mockResolvedValue(
        true
      )
      vi.mocked(supabaseService.insertScheduledIssuance).mockResolvedValue({
        id: 1,
        createdAt: new Date().toISOString(),
        environment: 'dev',
        sbtAddress: params.sbtAddress,
        to: params.to,
        tokens: params.tokens,
        executeAt: params.executeAt,
        status: 'pending',
        attempts: 0,
        lastError: null,
        mintTransactionHash: null,
        mintBlockNumber: null,
        processedAt: null,
      })

      const result = await service.scheduleIssuance(params)

      expect(result.ok).toBe(true)
      expect(supabaseService.insertScheduledIssuance).toHaveBeenCalledWith({
        environment: params.environment,
        sbtAddress: params.sbtAddress,
        to: params.to,
        tokens: params.tokens,
        executeAt: params.executeAt,
        signerPrivateKey: params.signerPrivateKey,
      })
    })

    it('returns NOT_DAO_MANAGER when signer cannot mint', async () => {
      vi.mocked(blockchainService.hasPermissionForBatchMint).mockResolvedValue(
        false
      )

      const result = await service.scheduleIssuance(params)
      expect(result).toEqual({ ok: false, reason: 'NOT_DAO_MANAGER' })
    })
  })

  describe('processDueIssuances', () => {
    it('uses the stored signer and executes due issuances', async () => {
      vi.mocked(supabaseService.findDueScheduledIssuances).mockResolvedValue([
        {
          id: 1,
          createdAt: new Date().toISOString(),
          environment: 'dev',
          sbtAddress: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
          to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
          tokens: [{ id: '1', amount: '1' }],
          executeAt: new Date().toISOString(),
          status: 'pending',
          attempts: 0,
          lastError: null,
          mintTransactionHash: null,
          mintBlockNumber: null,
          processedAt: null,
          signerPrivateKey,
        },
      ])
      vi.mocked(supabaseService.claimScheduledIssuance).mockResolvedValue({
        id: 1,
        createdAt: new Date().toISOString(),
        environment: 'dev',
        sbtAddress: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
        to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
        tokens: [{ id: '1', amount: '1' }],
        executeAt: new Date().toISOString(),
        status: 'processing',
        attempts: 0,
        lastError: null,
        mintTransactionHash: null,
        mintBlockNumber: null,
        processedAt: null,
        signerPrivateKey,
      })
      vi.mocked(blockchainService.hasPermissionForBatchMint).mockResolvedValue(
        true
      )
      vi.mocked(blockchainService.batchMint).mockResolvedValue({
        transactionHash: '0xmint',
        blockNumber: 99,
      })

      const result = await service.processDueIssuances()

      expect(result).toEqual({ processed: 1, failed: 0 })
      expect(
        supabaseService.markScheduledIssuanceCompleted
      ).toHaveBeenCalledWith(1, {
        mintTransactionHash: '0xmint',
        mintBlockNumber: 99,
      })
    })

    it('marks the issuance failed when the stored signer is invalid', async () => {
      vi.mocked(supabaseService.findDueScheduledIssuances).mockResolvedValue([
        {
          id: 1,
          createdAt: new Date().toISOString(),
          environment: 'dev',
          sbtAddress: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
          to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
          tokens: [{ id: '1', amount: '1' }],
          executeAt: new Date().toISOString(),
          status: 'pending',
          attempts: 0,
          lastError: null,
          mintTransactionHash: null,
          mintBlockNumber: null,
          processedAt: null,
          signerPrivateKey: 'not-a-private-key',
        },
      ])
      vi.mocked(supabaseService.claimScheduledIssuance).mockResolvedValue({
        id: 1,
        createdAt: new Date().toISOString(),
        environment: 'dev',
        sbtAddress: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
        to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
        tokens: [{ id: '1', amount: '1' }],
        executeAt: new Date().toISOString(),
        status: 'processing',
        attempts: 0,
        lastError: null,
        mintTransactionHash: null,
        mintBlockNumber: null,
        processedAt: null,
        signerPrivateKey: 'not-a-private-key',
      })

      const result = await service.processDueIssuances()

      expect(result).toEqual({ processed: 0, failed: 1 })
      expect(supabaseService.markScheduledIssuanceFailed).toHaveBeenCalledWith(
        1,
        0,
        'Stored signer private key is invalid.'
      )
      expect(blockchainService.batchMint).not.toHaveBeenCalled()
    })
  })

  describe('listContracts', () => {
    it('returns contract options from Supabase', async () => {
      vi.mocked(supabaseService.listContractOptions).mockResolvedValue([
        {
          daoId: dao.daoId,
          daoName: dao.daoName,
          contractAddress: dao.sbtAddress!,
          communityTokenAddress: dao.tokenAddress,
          nftAddress: null,
          environment: 'dev',
        },
      ])

      const result = await service.listContracts({
        environment: 'dev',
        assetType: 'sbt',
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.result.items).toHaveLength(1)
      }
    })
  })

  describe('createSbt', () => {
    const params = {
      signerPrivateKey,
      environment: 'dev' as const,
      assetType: 'sbt' as const,
      daoId: dao.daoId,
      name: 'Badge 1',
      description: 'Desc 1',
      votingPower: '100',
      imageBuffer: Buffer.from('img'),
      imageFilename: 'test.png',
      imageMimeType: 'image/png',
    }

    it('uploads metadata, creates token on-chain, and saves to Supabase', async () => {
      vi.mocked(supabaseService.findDaoById).mockResolvedValue(dao)
      vi.mocked(
        blockchainService.hasPermissionForCreateToken
      ).mockResolvedValue(true)
      vi.mocked(addFilesToGroupPublic)
        .mockResolvedValueOnce({ cid: 'image1' } as Awaited<
          ReturnType<typeof addFilesToGroupPublic>
        >)
        .mockResolvedValueOnce({ cid: 'meta1' } as Awaited<
          ReturnType<typeof addFilesToGroupPublic>
        >)
      vi.mocked(blockchainService.createToken).mockResolvedValue({
        transactionHash: '0xcreate',
        blockNumber: 10,
        tokenId: '5',
      })
      vi.mocked(blockchainService.getSignerAddress).mockResolvedValue(
        '0x70997970C51812dc3A010C7d01b50e0d17dc79C8'
      )
      vi.mocked(supabaseService.insertToken).mockResolvedValue({
        id: 99,
        daoId: dao.daoId,
        tokenId: '5',
        name: params.name,
        description: params.description,
        image: 'image1',
        votingPower: params.votingPower,
        isRevoked: false,
        isSBT: true,
        environment: 'dev',
      })

      const result = await service.createSbt(params)
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.result.tokenId).toBe('5')
        expect(result.result.dbTokenId).toBe(99)
      }
    })

    it('returns DAO_NOT_FOUND when DAO missing', async () => {
      vi.mocked(supabaseService.findDaoById).mockResolvedValue(null)
      const result = await service.createSbt(params)
      expect(result).toEqual({ ok: false, reason: 'DAO_NOT_FOUND' })
    })
  })

  describe('listTokens', () => {
    it('returns active tokens for DAO', async () => {
      vi.mocked(supabaseService.findDaoById).mockResolvedValue(dao)
      vi.mocked(supabaseService.findActiveTokens).mockResolvedValue([
        {
          id: 1,
          daoId: dao.daoId,
          tokenId: '1',
          name: 'Badge 1',
          description: 'Desc',
          image: 'img',
          votingPower: '100',
          isRevoked: false,
          isSBT: true,
          environment: 'dev',
        },
      ])

      const result = await service.listTokens({
        daoId: dao.daoId,
        environment: 'dev',
        assetType: 'sbt',
      })

      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.result.items).toHaveLength(1)
        expect(result.result.dao.sbtAddress).toBe(dao.sbtAddress)
      }
    })
  })

  describe('uploadMetadata', () => {
    const params = {
      environment: 'dev' as const,
      assetType: 'sbt' as const,
      name: 'STG',
      description: 'STG',
      votingPower: '1000000000000000000000',
      imageBuffer: Buffer.from('img'),
      imageFilename: 'test.png',
      imageMimeType: 'image/png',
    }

    it('uploads image then metadata and returns tokenUri', async () => {
      vi.mocked(addFilesToGroupPublic)
        .mockResolvedValueOnce({ cid: 'imageCid' } as Awaited<
          ReturnType<typeof addFilesToGroupPublic>
        >)
        .mockResolvedValueOnce({ cid: 'metadataCid' } as Awaited<
          ReturnType<typeof addFilesToGroupPublic>
        >)

      const result = await service.uploadMetadata(params)
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.result.imageCid).toBe('imageCid')
        expect(result.result.metadataCid).toBe('metadataCid')
        expect(result.result.tokenUri).toContain('metadataCid')
      }
    })
  })

  describe('setTokenUri', () => {
    const params = {
      signerPrivateKey,
      environment: 'production' as const,
      sbtAddress: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
      id: '1',
      tokenUri: 'https://ipfs-dao-studio.mypinata.cloud/ipfs/bafy',
      votingPower: '100',
    }

    it('returns NOT_DAO_MANAGER when signer lacks role', async () => {
      vi.mocked(
        blockchainService.hasPermissionForSetTokenUri
      ).mockResolvedValue(false)
      const result = await service.setTokenUri(params)
      expect(result).toEqual({ ok: false, reason: 'NOT_DAO_MANAGER' })
    })
  })

  describe('listCommunityTokens', () => {
    it('returns community tokens with creation counts', async () => {
      vi.mocked(
        supabaseService.listCommunityTokensWithCreations
      ).mockResolvedValue([
        {
          daoId: dao.daoId,
          daoName: dao.daoName,
          communityTokenAddress: dao.tokenAddress,
          sbtAddress: dao.sbtAddress,
          nftAddress: dao.nftAddress,
          sbtTokenCount: 2,
          nftTokenCount: 1,
          environment: 'dev',
        },
      ])

      const result = await service.listCommunityTokens({ environment: 'dev' })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.result.items).toHaveLength(1)
        expect(result.result.items[0].sbtTokenCount).toBe(2)
      }
    })
  })

  describe('getWalletBalances', () => {
    const params = {
      walletAddress: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
      environment: 'production' as const,
      assetType: 'sbt' as const,
      daoId: dao.daoId,
    }

    it('returns only owned balances for the selected contract type', async () => {
      vi.mocked(supabaseService.findDaoById).mockResolvedValue({
        ...dao,
        environment: 'production',
      })
      vi.mocked(supabaseService.findActiveTokens).mockResolvedValue([
        {
          id: 1,
          daoId: dao.daoId,
          tokenId: '1',
          name: 'Badge 1',
          description: 'Desc',
          image: 'ipfs://img',
          votingPower: '100',
          isRevoked: false,
          isSBT: true,
          environment: 'production',
        },
        {
          id: 2,
          daoId: dao.daoId,
          tokenId: '2',
          name: 'Badge 2',
          description: null,
          image: null,
          votingPower: '50',
          isRevoked: false,
          isSBT: true,
          environment: 'production',
        },
      ])
      vi.mocked(blockchainService.balanceOf)
        .mockResolvedValueOnce('1')
        .mockResolvedValueOnce('0')

      const result = await service.getWalletBalances(params)
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.result.assetType).toBe('sbt')
        expect(result.result.items).toHaveLength(1)
        expect(result.result.items[0].tokenId).toBe('1')
        expect(result.result.items[0].isSBT).toBe(true)
      }
    })
  })
})
