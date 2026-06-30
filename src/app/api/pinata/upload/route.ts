import { NextResponse } from 'next/server'
import { uploadFileToGroup } from '~/lib/pinata.server'

export async function POST(request: Request) {
  const formData = await request.formData()
  const groupId = formData.get('groupId')
  const file = formData.get('file')

  if (typeof groupId !== 'string' || !groupId) {
    return NextResponse.json({ error: 'Missing groupId' }, { status: 400 })
  }

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'Missing file' }, { status: 400 })
  }

  try {
    const upload = await uploadFileToGroup(file, groupId)
    return NextResponse.json({ cid: upload.cid })
  } catch (error) {
    console.error('Pinata upload failed:', error)
    return NextResponse.json(
      { error: 'Failed to upload file to Pinata' },
      { status: 500 }
    )
  }
}
