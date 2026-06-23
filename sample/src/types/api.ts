export type Environment = 'dev' | 'stg' | 'production';

export type AssetType = 'sbt' | 'nft';

export interface ApiResponse<T = unknown> {
  success: boolean;
  status: string;
  message: string;
  data?: T;
  error?: string;
}

export interface ContractOption {
  daoId: string;
  daoName: string;
  contractAddress: string;
  communityTokenAddress: string;
  nftAddress: string | null;
  environment: Environment;
}

export interface ContractListData {
  environment: Environment;
  assetType: AssetType;
  items: ContractOption[];
}

export interface BatchMintTokenInput {
  id: string;
  amount: string;
}

export interface BatchMintRequest {
  environment: Environment;
  sbtAddress: string;
  to: string;
  tokens: BatchMintTokenInput[];
}

export interface BatchMintData {
  environment: Environment;
  sbtAddress: string;
  to: string;
  tokens: BatchMintTokenInput[];
  mintTransactionHash: string;
  mintBlockNumber: number;
}

export type ScheduledIssuanceStatus =
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'cancelled';

export interface ScheduledIssuanceItem {
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

export interface ScheduleIssuanceRequest {
  environment: Environment;
  sbtAddress: string;
  to: string;
  tokens: BatchMintTokenInput[];
  executeAt: string;
}

export interface ScheduledIssuanceListData {
  environment: Environment;
  items: ScheduledIssuanceItem[];
}

export interface CreateSbtRequest {
  environment: Environment;
  assetType: AssetType;
  daoId: string;
  name: string;
  description: string;
  votingPower: string;
  image: File;
}

export interface CreateSbtData {
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

export interface MintableTokenItem {
  dbId: number;
  tokenId: string;
  name: string;
  description: string | null;
  image: string | null;
  votingPower: string | null;
  isRevoked: boolean;
}

export interface TokenListData {
  environment: Environment;
  assetType: AssetType;
  dao: {
    daoId: string;
    daoName: string;
    sbtAddress: string;
    tokenAddress: string;
    nftAddress: string | null;
  };
  items: MintableTokenItem[];
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

export interface WalletBalancesData {
  walletAddress: string;
  environment: Environment;
  assetType: AssetType;
  contractAddress: string;
  communityTokenAddress: string;
  dao: {
    daoId: string;
    daoName: string;
    sbtAddress: string | null;
    tokenAddress: string;
    nftAddress: string | null;
  };
  items: WalletBalanceItem[];
}
