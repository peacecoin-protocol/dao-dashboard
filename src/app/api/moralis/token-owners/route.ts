import { NextResponse } from 'next/server'
import { fetchMoralisJson } from '~/lib/moralis.server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const tokenAddress = searchParams.get('tokenAddress')
  const chain = searchParams.get('chain') ?? 'eth'
  const cursor = searchParams.get('cursor')

  if (!tokenAddress) {
    return NextResponse.json({ error: 'Missing tokenAddress' }, { status: 400 })
  }

  try {
    const response = await fetchMoralisJson(`/erc20/${tokenAddress}/owners`, {
      chain,
      cursor,
      order: 'DESC',
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch token owners' },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Moralis token owners request failed:', error)
    return NextResponse.json(
      { error: 'Failed to fetch token owners' },
      { status: 500 }
    )
  }
}
