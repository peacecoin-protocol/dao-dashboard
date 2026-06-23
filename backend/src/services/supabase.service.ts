import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ethers } from 'ethers';
import { config } from '../config/index.js';
import type {
  AssetType,
  BatchMintTokenInput,
  CommunityTokenOption,
  ContractOption,
  DaoRecord,
  Environment,
  ScheduledIssuanceRecord,
  ScheduledIssuanceStatus,
  TokenRecord,
} from '../types/index.js';

const DAO_SELECT_COLUMNS = 'daoId, daoName, sbtAddress, tokenAddress, nftAddress, environment';
const TOKEN_SELECT_COLUMNS =
  'id, daoId, tokenId, name, description, image, votingPower, isRevoked, isSBT, environment';
const SCHEDULED_ISSUANCE_SELECT_COLUMNS =
  'id, createdAt, environment, sbtAddress, to, tokens, executeAt, status, attempts, lastError, mintTransactionHash, mintBlockNumber, processedAt';

function dbEnvironmentValues(environment: Environment): string[] {
  switch (environment) {
    case 'production':
      return ['production', 'prod'];
    case 'stg':
      return ['stg', 'staging'];
    default:
      return ['dev', 'development'];
  }
}

export class SupabaseService {
  private client: SupabaseClient | null = null;

  getClient(): SupabaseClient {
    if (!this.client) {
      this.client = createClient(
        config.supabaseUrl(),
        config.supabaseServiceRoleKey()
      );
    }
    return this.client;
  }

  async findDaoById(daoId: string, environment: Environment): Promise<DaoRecord | null> {
    const { data, error } = await this.getClient()
      .from('DAO')
      .select(DAO_SELECT_COLUMNS)
      .eq('daoId', daoId)
      .in('environment', dbEnvironmentValues(environment))
      .maybeSingle();

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

    return (data as DaoRecord | null) ?? null;
  }

  async listContractOptions(
    environment: Environment,
    assetType: AssetType
  ): Promise<ContractOption[]> {
    const { data, error } = await this.getClient()
      .from('DAO')
      .select(DAO_SELECT_COLUMNS)
      .in('environment', dbEnvironmentValues(environment));

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

    const options: ContractOption[] = [];

    for (const row of data ?? []) {
      const rawAddress = assetType === 'nft' ? row.nftAddress : row.sbtAddress;
      if (!rawAddress || !ethers.isAddress(rawAddress)) {
        continue;
      }

      options.push({
        daoId: row.daoId,
        daoName: row.daoName,
        contractAddress: ethers.getAddress(rawAddress),
        communityTokenAddress: row.tokenAddress,
        nftAddress: row.nftAddress,
        environment: row.environment,
      });
    }

    return options.sort((a, b) => a.daoName.localeCompare(b.daoName));
  }

  private normalizeTokenRow(row: TokenRecord): TokenRecord {
    return {
      ...row,
      tokenId: String(row.tokenId),
    };
  }

  async listCommunityTokensWithCreations(
    environment: Environment
  ): Promise<CommunityTokenOption[]> {
    const { data: tokenRows, error: tokenError } = await this.getClient()
      .from('Token')
      .select('daoId, isSBT')
      .in('environment', dbEnvironmentValues(environment))
      .not('tokenId', 'is', null)
      .or('isRevoked.is.null,isRevoked.eq.false');

    if (tokenError) {
      throw new Error(`Database error: ${tokenError.message}`);
    }

    const countsByDao = new Map<string, { sbt: number; nft: number }>();
    for (const row of tokenRows ?? []) {
      const current = countsByDao.get(row.daoId) ?? { sbt: 0, nft: 0 };
      if (row.isSBT) {
        current.sbt += 1;
      } else {
        current.nft += 1;
      }
      countsByDao.set(row.daoId, current);
    }

    if (countsByDao.size === 0) {
      return [];
    }

    const { data: daos, error: daoError } = await this.getClient()
      .from('DAO')
      .select(DAO_SELECT_COLUMNS)
      .in('daoId', [...countsByDao.keys()])
      .in('environment', dbEnvironmentValues(environment));

    if (daoError) {
      throw new Error(`Database error: ${daoError.message}`);
    }

    const options: CommunityTokenOption[] = [];

    for (const row of daos ?? []) {
      const counts = countsByDao.get(row.daoId);
      if (!counts || !row.tokenAddress || !ethers.isAddress(row.tokenAddress)) {
        continue;
      }

      options.push({
        daoId: row.daoId,
        daoName: row.daoName,
        communityTokenAddress: ethers.getAddress(row.tokenAddress),
        sbtAddress: row.sbtAddress && ethers.isAddress(row.sbtAddress) ? ethers.getAddress(row.sbtAddress) : null,
        nftAddress: row.nftAddress && ethers.isAddress(row.nftAddress) ? ethers.getAddress(row.nftAddress) : null,
        sbtTokenCount: counts.sbt,
        nftTokenCount: counts.nft,
        environment: row.environment,
      });
    }

    return options.sort((a, b) => a.daoName.localeCompare(b.daoName));
  }

  async findActiveTokens(
    daoId: string,
    environment: Environment,
    isSbt?: boolean
  ): Promise<TokenRecord[]> {
    let query = this.getClient()
      .from('Token')
      .select(TOKEN_SELECT_COLUMNS)
      .eq('daoId', daoId)
      .in('environment', dbEnvironmentValues(environment))
      .not('tokenId', 'is', null)
      .or('isRevoked.is.null,isRevoked.eq.false');

    if (isSbt !== undefined) {
      query = query.eq('isSBT', isSbt);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

    return (data ?? []).map((row) => this.normalizeTokenRow(row as TokenRecord));
  }

  async insertToken(params: {
    daoId: string;
    tokenId: string;
    name: string;
    description: string;
    image: string;
    votingPower: string;
    isSBT: boolean;
    environment: Environment;
    address: string;
    creator: string;
  }): Promise<TokenRecord> {
    const { data, error } = await this.getClient()
      .from('Token')
      .insert({
        daoId: params.daoId,
        tokenId: Number(params.tokenId),
        name: params.name,
        description: params.description,
        image: params.image,
        votingPower: params.votingPower,
        isSBT: params.isSBT,
        isRevoked: false,
        environment: params.environment,
        address: ethers.getAddress(params.address),
        creator: ethers.getAddress(params.creator),
      })
      .select(TOKEN_SELECT_COLUMNS)
      .single();

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

    return this.normalizeTokenRow(data as TokenRecord);
  }

  async insertScheduledIssuance(params: {
    environment: Environment;
    sbtAddress: string;
    to: string;
    tokens: BatchMintTokenInput[];
    executeAt: string;
  }): Promise<ScheduledIssuanceRecord> {
    const { data, error } = await this.getClient()
      .from('ScheduledIssuance')
      .insert({
        environment: params.environment,
        sbtAddress: ethers.getAddress(params.sbtAddress),
        to: ethers.getAddress(params.to),
        tokens: params.tokens,
        executeAt: params.executeAt,
        status: 'pending',
      })
      .select(SCHEDULED_ISSUANCE_SELECT_COLUMNS)
      .single();

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

    return data as ScheduledIssuanceRecord;
  }

  async listScheduledIssuances(
    environment: Environment,
    status?: ScheduledIssuanceStatus
  ): Promise<ScheduledIssuanceRecord[]> {
    let query = this.getClient()
      .from('ScheduledIssuance')
      .select(SCHEDULED_ISSUANCE_SELECT_COLUMNS)
      .eq('environment', environment)
      .order('executeAt', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

    return (data ?? []) as ScheduledIssuanceRecord[];
  }

  async findScheduledIssuanceById(id: number): Promise<ScheduledIssuanceRecord | null> {
    const { data, error } = await this.getClient()
      .from('ScheduledIssuance')
      .select(SCHEDULED_ISSUANCE_SELECT_COLUMNS)
      .eq('id', id)
      .maybeSingle();

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

    return (data as ScheduledIssuanceRecord | null) ?? null;
  }

  async findDueScheduledIssuances(limit = 10): Promise<ScheduledIssuanceRecord[]> {
    const { data, error } = await this.getClient()
      .from('ScheduledIssuance')
      .select(SCHEDULED_ISSUANCE_SELECT_COLUMNS)
      .eq('status', 'pending')
      .lte('executeAt', new Date().toISOString())
      .order('executeAt', { ascending: true })
      .limit(limit);

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

    return (data ?? []) as ScheduledIssuanceRecord[];
  }

  /**
   * Atomically move a pending issuance to `processing`. Returns null when the
   * row was already claimed (or cancelled) by another worker tick.
   */
  async claimScheduledIssuance(id: number): Promise<ScheduledIssuanceRecord | null> {
    const { data, error } = await this.getClient()
      .from('ScheduledIssuance')
      .update({ status: 'processing' })
      .eq('id', id)
      .eq('status', 'pending')
      .select(SCHEDULED_ISSUANCE_SELECT_COLUMNS)
      .maybeSingle();

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

    return (data as ScheduledIssuanceRecord | null) ?? null;
  }

  async markScheduledIssuanceCompleted(
    id: number,
    result: { mintTransactionHash: string; mintBlockNumber: number }
  ): Promise<void> {
    const { error } = await this.getClient()
      .from('ScheduledIssuance')
      .update({
        status: 'completed',
        mintTransactionHash: result.mintTransactionHash,
        mintBlockNumber: result.mintBlockNumber,
        processedAt: new Date().toISOString(),
        lastError: null,
      })
      .eq('id', id);

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }
  }

  async markScheduledIssuanceFailed(
    id: number,
    currentAttempts: number,
    lastError: string
  ): Promise<void> {
    const { error } = await this.getClient()
      .from('ScheduledIssuance')
      .update({
        status: 'failed',
        attempts: currentAttempts + 1,
        lastError,
        processedAt: new Date().toISOString(),
      })
      .eq('id', id);

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }
  }

  /** Cancel a pending issuance. Returns null when it is not pending anymore. */
  async cancelScheduledIssuance(id: number): Promise<ScheduledIssuanceRecord | null> {
    const { data, error } = await this.getClient()
      .from('ScheduledIssuance')
      .update({ status: 'cancelled' })
      .eq('id', id)
      .eq('status', 'pending')
      .select(SCHEDULED_ISSUANCE_SELECT_COLUMNS)
      .maybeSingle();

    if (error) {
      throw new Error(`Database error: ${error.message}`);
    }

    return (data as ScheduledIssuanceRecord | null) ?? null;
  }
}

export const supabaseService = new SupabaseService();
