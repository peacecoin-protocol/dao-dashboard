import 'server-only'

import { PinataSDK, type FileListItem } from 'pinata'
import { ServerEnv } from '~/env.server'

const pinata = new PinataSDK({
  pinataJwt: ServerEnv.PINATA_JWT,
  pinataGateway: ServerEnv.PINATA_GATEWAY_URL,
})

export const uploadFileToGroup = (file: File, groupId: string) =>
  pinata.upload.public.file(file).group(groupId)

export const listFilesFromGroup = (groupId: string): Promise<FileListItem[]> =>
  pinata.files.public.list().group(groupId).all()

export const deleteFiles = (fileIds: string[]) =>
  pinata.files.public.delete(fileIds)
