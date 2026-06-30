type MoralisChain = 'eth' | 'sepolia'

export type MoralisOwner = {
  owner_address?: string
  ownerAddress?: string
}

export type MoralisTokenOwnersResponse = {
  cursor?: string | null
  result?: MoralisOwner[]
}

export type MoralisErc20Balance = {
  balance: string
  decimals: number
  logo: string | null
  name: string
  symbol: string
  token_address: string
}

type ApiErrorResponse = {
  error?: string
}

const fetchMoralisApi = async <T>(
  path: string,
  params: Record<string, string>
): Promise<T> => {
  const searchParams = new URLSearchParams(params)
  const response = await fetch(`${path}?${searchParams.toString()}`)

  if (!response.ok) {
    let errorMessage = 'Failed to fetch Moralis data'

    try {
      const data = (await response.json()) as ApiErrorResponse
      errorMessage = data.error ?? errorMessage
    } catch {}

    throw new Error(errorMessage)
  }

  return (await response.json()) as T
}

export const fetchTokenOwnersPage = async ({
  chain,
  cursor,
  tokenAddress,
}: {
  chain: MoralisChain
  cursor?: string | null
  tokenAddress: string
}) => {
  return fetchMoralisApi<MoralisTokenOwnersResponse>(
    '/api/moralis/token-owners',
    {
      chain,
      ...(cursor ? { cursor } : {}),
      tokenAddress,
    }
  )
}

export const fetchErc20Balances = ({
  address,
  chain,
}: {
  address: string
  chain: MoralisChain
}) =>
  fetchMoralisApi<MoralisErc20Balance[]>('/api/moralis/erc20-balances', {
    address,
    chain,
  })
