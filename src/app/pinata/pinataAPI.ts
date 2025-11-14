import { PinataSDK, UpdateGroupFilesResponse } from 'pinata'
import { Env } from '~/env'

export const SBT_GROUP_ID = 'ec1ac640-dd34-4da3-b7f9-9ca9826dcb50'
export const NFT_GROUP_ID = '12757d64-9c40-48d1-b2b2-616d0fe9708f'
export const DAO_GROUP_ID = '3f83ddff-6587-4430-b4d9-da5c8ef56985'
export const JSON_GROUP_ID = 'e9cea556-1e9d-4d16-a247-feb8d32e7de5'

export const pinata = new PinataSDK({
  pinataJwt: Env.PINATA_JWT,
  pinataGateway: Env.PINATA_GATEWAY_URL,
})

// FILE
const createFile = async (image: string, fileName: string) => {
  const response = await fetch(image)
  const blob = await response.blob()
  const file = new File([blob], fileName, {
    type: 'image/png',
  })

  return file
}

async function addFilesToGroup(groupId: string, files: string[]) {
  const group: UpdateGroupFilesResponse[] = await pinata.groups.public.addFiles(
    {
      groupId,
      files,
    }
  )
  return group
}

async function addFilesToGroupPublic(file: File, groupId: string) {
  try {
    const upload = await pinata.upload.public.file(file).group(groupId)
    return upload
  } catch (error) {}
}

async function getFilesFromGroup(groupId: string) {
  const files = await pinata.files.public.list().then((files) => {
    return files.files.filter((file) => {
      return file.group_id === groupId
    })
  })

  return files
}

async function revokeFile(fileId: string[]) {
  const response = await pinata.files.public.delete(fileId)
  return response
}

export {
  addFilesToGroup,
  addFilesToGroupPublic,
  createFile,
  getFilesFromGroup,
  revokeFile,
}
