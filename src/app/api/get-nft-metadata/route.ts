import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import axios from 'axios'

// GET handler
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const metadata = searchParams.get('metadata')

  if (!metadata) {
    return NextResponse.json(
      { error: 'No metadata parameter provided' },
      { status: 400 }
    )
  }

  try {
    const res = await axios.get(metadata)
    return NextResponse.json(res.data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch metadata' },
      { status: 500 }
    )
  }
}

// POST handler
export async function POST(request: NextRequest) {
  const body = await request.json()

  return NextResponse.json({
    message: 'Data received!',
    data: body,
  })
}
