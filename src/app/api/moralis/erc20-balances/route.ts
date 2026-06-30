import { NextResponse } from 'next/server'
import { fetchMoralisJson } from '~/lib/moralis.server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const address = searchParams.get('address')
  const chain = searchParams.get('chain') ?? 'eth'

  if (!address) {
    return NextResponse.json({ error: 'Missing address' }, { status: 400 })
  }

  try {
    const response = await fetchMoralisJson(`/${address}/erc20`, {
      chain,
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch ERC20 balances' },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Moralis ERC20 balances request failed:', error)
    return NextResponse.json(
      { error: 'Failed to fetch ERC20 balances' },
      { status: 500 }
    )
  }
}
