import { describe, it, expect, vi, beforeEach } from 'vitest';
import { batchMint, createSbt, getWalletBalances, listContracts, listTokens } from './sbtClient';

describe('sbtClient', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('listContracts builds query string', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      json: async () => ({ success: true, status: 'SUCCESSFUL_LIST_CONTRACTS', data: { items: [] } }),
    } as Response);

    await listContracts({ environment: 'dev', assetType: 'sbt' });

    expect(fetch).toHaveBeenCalledWith(expect.stringMatching(/\/api\/sbt\/contracts\?.*assetType=sbt/));
  });

  it('createSbt sends multipart form data', async () => {
    const mockResponse = {
      success: true,
      status: 'SUCCESSFUL_CREATE_TOKEN',
      message: 'ok',
      data: { tokenId: '5' },
    };
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      json: async () => mockResponse,
    } as Response);

    const file = new File(['img'], 'test.png', { type: 'image/png' });
    const result = await createSbt({
      environment: 'dev',
      assetType: 'sbt',
      daoId: 'dao-1',
      name: 'Badge',
      description: 'Desc',
      votingPower: '100',
      image: file,
    });

    expect(result.success).toBe(true);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/sbt/create-token'),
      expect.objectContaining({ method: 'POST', body: expect.any(FormData) })
    );
  });

  it('listTokens builds query string', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      json: async () => ({ success: true, status: 'SUCCESSFUL_LIST_TOKENS', data: { items: [] } }),
    } as Response);

    await listTokens({
      daoId: 'dao-1',
      environment: 'dev',
      assetType: 'sbt',
    });

    expect(fetch).toHaveBeenCalledWith(expect.stringMatching(/\/api\/sbt\/tokens\?.*daoId=dao-1/));
  });

  it('batchMint sends JSON body', async () => {
    const mockResponse = {
      success: true,
      status: 'SUCCESSFUL_MINT',
      message: 'ok',
      data: { mintTransactionHash: '0x1' },
    };
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      json: async () => mockResponse,
    } as Response);

    const result = await batchMint({
      environment: 'dev',
      sbtAddress: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
      to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
      tokens: [{ id: '1', amount: '1' }],
    });

    expect(result.success).toBe(true);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/sbt/batch-mint'),
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
    );
  });

  it('getWalletBalances builds query string', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      json: async () => ({ success: true, status: 'SUCCESS', data: { items: [] } }),
    } as Response);

    await getWalletBalances({
      walletAddress: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
      environment: 'production',
      assetType: 'sbt',
      daoId: 'dao-1',
    });

    expect(fetch).toHaveBeenCalledWith(
      expect.stringMatching(/wallet-balances\?.*environment=production.*assetType=sbt.*daoId=dao-1/)
    );
  });
});
