import { PinataSDK, UpdateGroupFilesResponse } from 'pinata'
import { Env } from '~/env'

export const SBT_GROUP_ID = '809d7dd1-4439-4d9b-86df-e229f203c5f2'
export const NFT_GROUP_ID = 'e0cb6bac-4881-4330-8e90-890ab82662b4'
export const DAO_GROUP_ID = '0ff0fbd6-9171-4ed3-9816-da30e9a58891'
export const JSON_GROUP_ID = 'bb530602-5a43-43fa-8a4c-98833d15ef9b'

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
