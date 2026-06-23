import { describe, it, expect } from 'vitest';
import {
  batchMintSchema,
  createTokenFieldsSchema,
  listContractsQuerySchema,
  listTokensQuerySchema,
  setTokenUriSchema,
  uploadMetadataFieldsSchema,
  walletBalancesQuerySchema,
} from '../../src/utils/validation.js';

describe('batchMintSchema', () => {
  const valid = {
    environment: 'dev' as const,
    sbtAddress: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    to: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
    tokens: [{ id: '1', amount: '1' }],
  };

  it('accepts valid batch mint request', () => {
    const result = batchMintSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it('accepts stg environment', () => {
    const result = batchMintSchema.safeParse({ ...valid, environment: 'stg' });
    expect(result.success).toBe(true);
  });

  it('rejects invalid environment', () => {
    const result = batchMintSchema.safeParse({ ...valid, environment: 'staging' });
    expect(result.success).toBe(false);
  });

  it('rejects invalid address', () => {
    const result = batchMintSchema.safeParse({ ...valid, to: 'not-an-address' });
    expect(result.success).toBe(false);
  });

  it('requires at least one token', () => {
    const result = batchMintSchema.safeParse({ ...valid, tokens: [] });
    expect(result.success).toBe(false);
  });
});

describe('createTokenFieldsSchema', () => {
  it('accepts valid create token fields', () => {
    const result = createTokenFieldsSchema.safeParse({
      environment: 'dev',
      assetType: 'sbt',
      daoId: 'dao-1',
      name: 'Badge',
      description: 'Desc',
      votingPower: '100',
    });
    expect(result.success).toBe(true);
  });
});

describe('listContractsQuerySchema', () => {
  it('accepts valid query params', () => {
    const result = listContractsQuerySchema.safeParse({
      environment: 'dev',
      assetType: 'sbt',
    });
    expect(result.success).toBe(true);
  });
});

describe('listTokensQuerySchema', () => {
  it('accepts valid query params', () => {
    const result = listTokensQuerySchema.safeParse({
      daoId: 'dao-1',
      environment: 'dev',
      assetType: 'sbt',
    });
    expect(result.success).toBe(true);
  });
});

describe('setTokenUriSchema', () => {
  it('accepts valid set token uri request', () => {
    const result = setTokenUriSchema.safeParse({
      environment: 'production',
      sbtAddress: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
      id: '1',
      tokenUri: 'https://ipfs-dao-studio.mypinata.cloud/ipfs/bafyMetadataCid',
      votingPower: '1000000000000000000000',
    });
    expect(result.success).toBe(true);
  });

  it('rejects invalid tokenUri URL', () => {
    const result = setTokenUriSchema.safeParse({
      environment: 'dev',
      sbtAddress: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
      id: '1',
      tokenUri: 'not-a-url',
      votingPower: '100',
    });
    expect(result.success).toBe(false);
  });
});

describe('uploadMetadataFieldsSchema', () => {
  it('accepts valid metadata fields', () => {
    const result = uploadMetadataFieldsSchema.safeParse({
      environment: 'dev',
      assetType: 'sbt',
      name: 'STG',
      description: 'STG',
      votingPower: '1000000000000000000000',
    });
    expect(result.success).toBe(true);
  });

  it('rejects missing assetType', () => {
    const result = uploadMetadataFieldsSchema.safeParse({
      environment: 'dev',
      name: 'STG',
      description: 'STG',
      votingPower: '100',
    });
    expect(result.success).toBe(false);
  });

  it('rejects empty name', () => {
    const result = uploadMetadataFieldsSchema.safeParse({
      environment: 'dev',
      assetType: 'sbt',
      name: '',
      description: 'STG',
      votingPower: '100',
    });
    expect(result.success).toBe(false);
  });
});

describe('walletBalancesQuerySchema', () => {
  it('accepts valid query params', () => {
    const result = walletBalancesQuerySchema.safeParse({
      walletAddress: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
      environment: 'production',
      assetType: 'sbt',
      daoId: 'dao-1',
    });
    expect(result.success).toBe(true);
  });
});
