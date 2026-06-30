import { NextResponse } from 'next/server'
import { deleteFiles, listFilesFromGroup } from '~/lib/pinata.server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const groupId = searchParams.get('groupId')

  if (!groupId) {
    return NextResponse.json({ error: 'Missing groupId' }, { status: 400 })
  }

  try {
    const files = await listFilesFromGroup(groupId)
    return NextResponse.json(files)
  } catch (error) {
    console.error('Pinata file listing failed:', error)
    return NextResponse.json(
      { error: 'Failed to fetch files from Pinata' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  const { fileIds } = (await request.json()) as { fileIds?: string[] }

  if (!Array.isArray(fileIds) || fileIds.length === 0) {
    return NextResponse.json({ error: 'Missing fileIds' }, { status: 400 })
  }

  try {
    const result = await deleteFiles(fileIds)
    return NextResponse.json(result)
  } catch (error) {
    console.error('Pinata file deletion failed:', error)
    return NextResponse.json(
      { error: 'Failed to delete files from Pinata' },
      { status: 500 }
    )
  }
}
