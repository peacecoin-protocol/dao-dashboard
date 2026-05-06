import { PinataSDK, UpdateGroupFilesResponse } from 'pinata'
import { Env } from '~/env'

export const SBT_GROUP_ID = Env.PINATA_SBT_GROUP_ID
export const NFT_GROUP_ID = Env.PINATA_NFT_GROUP_ID
export const DAO_GROUP_ID = Env.PINATA_DAO_GROUP_ID
export const JSON_GROUP_ID = Env.PINATA_JSON_GROUP_ID

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
  } catch (error) { }
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
