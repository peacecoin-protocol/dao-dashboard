export type Environment = 'dev' | 'stg' | 'production';

export type AssetType = 'sbt' | 'nft';

export type PinataGroupKind = 'sbt' | 'nft' | 'json' | 'dao';

export type ApiStatus =
  | 'SUCCESS'
  | 'VALIDATION_ERROR'
  | 'NOT_DAO_MANAGER'
  | 'SUCCESSFUL_MINT'
  | 'FAILED_TO_MINT'
  | 'SUCCESSFUL_CREATE_TOKEN'
  | 'FAILED_TO_CREATE_TOKEN'
  | 'FAILED_TO_SAVE_TOKEN'
  | 'SUCCESSFUL_LIST_TOKENS'
  | 'FAILED_TO_LIST_TOKENS'
  | 'SUCCESSFUL_LIST_CONTRACTS'
  | 'FAILED_TO_LIST_CONTRACTS'
  | 'SUCCESSFUL_LIST_COMMUNITY_TOKENS'
  | 'FAILED_TO_LIST_COMMUNITY_TOKENS'
  | 'SUCCESSFUL_METADATA_UPLOAD'
  | 'FAILED_TO_UPLOAD_IMAGE'
  | 'FAILED_TO_UPLOAD_METADATA'
  | 'SUCCESSFUL_SET_TOKEN_URI'
  | 'FAILED_TO_SET_TOKEN_URI'
  | 'DAO_NOT_FOUND'
  | 'SBT_CONTRACT_NOT_FOUND'
  | 'FAILED_TO_FETCH_BALANCE'
  | 'SUCCESSFUL_SCHEDULE_ISSUANCE'
  | 'FAILED_TO_SCHEDULE_ISSUANCE'
  | 'SUCCESSFUL_LIST_SCHEDULED_ISSUANCES'
  | 'FAILED_TO_LIST_SCHEDULED_ISSUANCES'
  | 'SUCCESSFUL_CANCEL_SCHEDULED_ISSUANCE'
  | 'FAILED_TO_CANCEL_SCHEDULED_ISSUANCE'
  | 'SCHEDULED_ISSUANCE_NOT_FOUND'
  | 'SCHEDULED_ISSUANCE_NOT_CANCELLABLE';

export interface ApiResponse<T = unknown> {
  success: boolean;
  status: ApiStatus;
  message: string;
  data?: T;
  error?: string;
}

export interface DaoRecord {
  daoId: string;
  daoName: string;
  sbtAddress: string | null;
  tokenAddress: string;
  nftAddress: string | null;
  environment: Environment;
}

export interface TokenRecord {
  id: number;
  daoId: string;
  tokenId: string;
  name: string;
  description: string | null;
  image: string | null;
  votingPower: string | null;
  isRevoked: boolean | null;
  isSBT: boolean;
  environment: Environment;
}

export interface SbtMetadata {
  name: string;
  description: string;
  attributes: Array<{ trait_type: string; value: string }>;
  image: string;
}

export interface BatchMintTokenInput {
  id: string;
  amount: string;
}

export interface BatchMintTokenResult {
  id: string;
  amount: string;
  name?: string;
}

export interface BatchMintResult {
  environment: Environment;
  sbtAddress: string;
  to: string;
  tokens: BatchMintTokenResult[];
  mintTransactionHash: string;
  mintBlockNumber: number;
}

export interface CreateTokenResult {
  environment: Environment;
  assetType: AssetType;
  daoId: string;
  daoName: string;
  sbtAddress: string;
  tokenId: string;
  name: string;
  description: string;
  votingPower: string;
  imageCid: string;
  metadataCid: string;
  tokenUri: string;
  createTransactionHash: string;
  createBlockNumber: number;
  dbTokenId: number;
}

export interface CommunityTokenOption {
  daoId: string;
  daoName: string;
  communityTokenAddress: string;
  sbtAddress: string | null;
  nftAddress: string | null;
  sbtTokenCount: number;
  nftTokenCount: number;
  environment: Environment;
}

export interface ContractOption {
  daoId: string;
  daoName: string;
  contractAddress: string;
  communityTokenAddress: string;
  nftAddress: string | null;
  environment: Environment;
}

export interface MintableTokenItem {
  dbId: number;
  tokenId: string;
  name: string;
  description: string | null;
  image: string | null;
  votingPower: string | null;
  isRevoked: boolean;
}

export type ScheduledIssuanceStatus =
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'cancelled';

export interface ScheduledIssuanceRecord {
  id: number;
  createdAt: string;
  environment: Environment;
  sbtAddress: string;
  to: string;
  tokens: BatchMintTokenInput[];
  executeAt: string;
  status: ScheduledIssuanceStatus;
  attempts: number;
  lastError: string | null;
  mintTransactionHash: string | null;
  mintBlockNumber: number | null;
  processedAt: string | null;
}

export interface WalletBalanceItem {
  dbId: number;
  tokenId: string;
  name: string;
  description: string | null;
  image: string | null;
  votingPower: string | null;
  isRevoked: boolean;
  isSBT: boolean;
  balance: string;
  owned: boolean;
}
