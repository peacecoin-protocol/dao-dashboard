import 'server-only'

import { ServerEnv } from '~/env.server'

const MORALIS_BASE_URL = 'https://deep-index.moralis.io/api/v2.2'

type MoralisParamValue = string | number | boolean | null | undefined

const toSearchParams = (params: Record<string, MoralisParamValue>) => {
  const searchParams = new URLSearchParams()

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.set(key, String(value))
    }
  }

  return searchParams
}

export const fetchMoralisJson = async (
  path: string,
  params: Record<string, MoralisParamValue>
): Promise<Response> => {
  const url = new URL(`${MORALIS_BASE_URL}${path}`)
  url.search = toSearchParams(params).toString()

  return fetch(url.toString(), {
    headers: {
      accept: 'application/json',
      'X-API-Key': ServerEnv.MORALIS_API_KEY,
    },
    cache: 'no-store',
  })
}
