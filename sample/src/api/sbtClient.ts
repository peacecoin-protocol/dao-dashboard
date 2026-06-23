import type {
  ApiResponse,
  AssetType,
  BatchMintData,
  BatchMintRequest,
  ContractListData,
  CreateSbtData,
  CreateSbtRequest,
  Environment,
  ScheduledIssuanceItem,
  ScheduledIssuanceListData,
  ScheduledIssuanceStatus,
  ScheduleIssuanceRequest,
  TokenListData,
  WalletBalancesData,
} from '../types/api';

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '';

async function parseResponse<T>(res: Response): Promise<ApiResponse<T>> {
  const body = (await res.json()) as ApiResponse<T>;
  return body;
}

async function getSbtApi<T>(path: string, params?: Record<string, string>): Promise<ApiResponse<T>> {
  const query = params ? `?${new URLSearchParams(params)}` : '';
  const res = await fetch(`${API_BASE}/api/sbt/${path}${query}`);
  return parseResponse<T>(res);
}

export async function listContracts(params: {
  environment: Environment;
  assetType: AssetType;
}): Promise<ApiResponse<ContractListData>> {
  return getSbtApi<ContractListData>('contracts', {
    environment: params.environment,
    assetType: params.assetType,
  });
}

export async function createSbt(
  request: CreateSbtRequest
): Promise<ApiResponse<CreateSbtData>> {
  const form = new FormData();
  form.append('environment', request.environment);
  form.append('assetType', request.assetType);
  form.append('daoId', request.daoId);
  form.append('name', request.name);
  form.append('description', request.description);
  form.append('votingPower', request.votingPower);
  form.append('image', request.image);

  const res = await fetch(`${API_BASE}/api/sbt/create-token`, {
    method: 'POST',
    body: form,
  });
  return parseResponse<CreateSbtData>(res);
}

export async function listTokens(params: {
  environment: Environment;
  assetType: AssetType;
  daoId: string;
}): Promise<ApiResponse<TokenListData>> {
  return getSbtApi<TokenListData>('tokens', {
    environment: params.environment,
    assetType: params.assetType,
    daoId: params.daoId,
  });
}

export async function batchMint(
  request: BatchMintRequest
): Promise<ApiResponse<BatchMintData>> {
  const res = await fetch(`${API_BASE}/api/sbt/batch-mint`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });
  return parseResponse<BatchMintData>(res);
}

export async function scheduleIssuance(
  request: ScheduleIssuanceRequest
): Promise<ApiResponse<ScheduledIssuanceItem>> {
  const res = await fetch(`${API_BASE}/api/sbt/scheduled-issuances`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });
  return parseResponse<ScheduledIssuanceItem>(res);
}

export async function listScheduledIssuances(params: {
  environment: Environment;
  status?: ScheduledIssuanceStatus;
}): Promise<ApiResponse<ScheduledIssuanceListData>> {
  const query: Record<string, string> = { environment: params.environment };
  if (params.status) {
    query.status = params.status;
  }
  return getSbtApi<ScheduledIssuanceListData>('scheduled-issuances', query);
}

export async function cancelScheduledIssuance(
  id: number
): Promise<ApiResponse<ScheduledIssuanceItem>> {
  const res = await fetch(`${API_BASE}/api/sbt/scheduled-issuances/${id}/cancel`, {
    method: 'POST',
  });
  return parseResponse<ScheduledIssuanceItem>(res);
}

export async function getWalletBalances(params: {
  walletAddress: string;
  environment: Environment;
  assetType: AssetType;
  daoId: string;
}): Promise<ApiResponse<WalletBalancesData>> {
  return getSbtApi<WalletBalancesData>('wallet-balances', {
    walletAddress: params.walletAddress,
    environment: params.environment,
    assetType: params.assetType,
    daoId: params.daoId,
  });
}
