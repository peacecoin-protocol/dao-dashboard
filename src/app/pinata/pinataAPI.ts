import { Env } from '~/env'

export const SBT_GROUP_ID = Env.PINATA_SBT_GROUP_ID
export const NFT_GROUP_ID = Env.PINATA_NFT_GROUP_ID
export const DAO_GROUP_ID = Env.PINATA_DAO_GROUP_ID
export const JSON_GROUP_ID = Env.PINATA_JSON_GROUP_ID

export type PinataFile = {
  cid?: string
  group_id?: string
  id: string
  name: string
}

type PinataUploadResponse = {
  cid: string
}

type ApiErrorResponse = {
  error?: string
}

const getApiErrorMessage = async (response: Response, fallback: string) => {
  try {
    const data = (await response.json()) as ApiErrorResponse
    return data.error ?? fallback
  } catch {
    return fallback
  }
}

const requestPinataApi = async <T>(
  input: RequestInfo | URL,
  init: RequestInit,
  fallbackMessage: string
): Promise<T> => {
  const response = await fetch(input, init)

  if (!response.ok) {
    throw new Error(await getApiErrorMessage(response, fallbackMessage))
  }

  return (await response.json()) as T
}

const dataUrlToFile = (image: string, fileName: string) => {
  const [header, content] = image.split(',', 2)

  if (!header || !content) {
    throw new Error('Invalid image data URL')
  }

  const mimeType = header.match(/data:(.*?);base64/)?.[1] ?? 'image/png'
  const binary = atob(content)
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0))

  return new File([bytes], fileName, { type: mimeType })
}

const createFile = async (image: string, fileName: string) => {
  if (image.startsWith('data:')) {
    return dataUrlToFile(image, fileName)
  }

  const response = await fetch(image)

  if (!response.ok) {
    throw new Error('Failed to load image before upload')
  }

  const blob = await response.blob()

  return new File([blob], fileName, {
    type: blob.type || 'image/png',
  })
}

async function addFilesToGroupPublic(file: File, groupId: string) {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('groupId', groupId)

  return requestPinataApi<PinataUploadResponse>(
    '/api/pinata/upload',
    {
      method: 'POST',
      body: formData,
    },
    'Failed to upload file to Pinata'
  )
}

async function getFilesFromGroup(groupId: string) {
  const searchParams = new URLSearchParams({ groupId })

  return requestPinataApi<PinataFile[]>(
    `/api/pinata/files?${searchParams.toString()}`,
    {
      method: 'GET',
    },
    'Failed to fetch files from Pinata'
  )
}

async function revokeFile(fileIds: string[]): Promise<unknown> {
  return requestPinataApi<unknown>(
    '/api/pinata/files',
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fileIds }),
    },
    'Failed to delete files from Pinata'
  )
}

export { addFilesToGroupPublic, createFile, getFilesFromGroup, revokeFile }
