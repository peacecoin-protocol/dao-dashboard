import { PinataSDK, type UpdateGroupFilesResponse } from 'pinata';
import { config } from '../config/index.js';
import type { AssetType, Environment, SbtMetadata } from '../types/index.js';

let pinataClient: PinataSDK | null = null;

/** Matches dao-dashboard `Env.PINATA_GATEWAY_URL` base (no `/ipfs` suffix). */
export function getPinataGatewayBase(): string {
  return config.pinataGatewayUrl.replace(/\/ipfs\/?$/, '').replace(/\/$/, '');
}

export function getPinataClient(): PinataSDK {
  if (!pinataClient) {
    pinataClient = new PinataSDK({
      pinataJwt: config.pinataJwt(),
      pinataGateway: getPinataGatewayBase(),
    });
  }
  return pinataClient;
}

/** Alias matching dao-dashboard export name. */
export const pinata = {
  get client() {
    return getPinataClient();
  },
};

export function getSbtGroupId(environment: Environment): string {
  return config.pinataGroupId('sbt', environment);
}

export function getNftGroupId(environment: Environment): string {
  return config.pinataGroupId('nft', environment);
}

export function getJsonGroupId(environment: Environment): string {
  return config.pinataGroupId('json', environment);
}

export function getDaoGroupId(environment: Environment): string {
  return config.pinataGroupId('dao', environment);
}

export function getImageGroupId(environment: Environment, assetType: AssetType): string {
  return assetType === 'sbt' ? getSbtGroupId(environment) : getNftGroupId(environment);
}

/** Same URL format as dao-dashboard: `{gateway}/ipfs/{cid}`. */
export function buildIpfsUrl(cid: string): string {
  return `${getPinataGatewayBase()}/ipfs/${cid}`;
}

export function buildMetadata(
  name: string,
  description: string,
  votingPower: string,
  imageUrl: string
): SbtMetadata {
  return {
    name,
    description,
    attributes: [{ trait_type: 'votingPower', value: votingPower }],
    image: imageUrl,
  };
}

export async function createFile(image: string, fileName: string): Promise<File> {
  const response = await fetch(image);
  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${response.statusText}`);
  }
  const blob = await response.blob();
  const file = new File([blob], fileName, {
    type: 'image/png',
  });
  return file;
}

export function bufferToFile(buffer: Buffer, fileName: string, mimeType: string): File {
  return new File([new Uint8Array(buffer)], fileName, { type: mimeType });
}

/** Metadata JSON uploaded as a File — same pattern as dao-dashboard SBT admin page. */
export function createMetadataFile(metadata: SbtMetadata, imageCid: string): File {
  return new File([JSON.stringify(metadata)], `${imageCid}.json`, {
    type: 'application/json',
  });
}

export async function addFilesToGroup(
  groupId: string,
  files: string[]
): Promise<UpdateGroupFilesResponse[]> {
  return getPinataClient().groups.public.addFiles({ groupId, files });
}

export async function addFilesToGroupPublic(file: File, groupId: string) {
  const upload = await getPinataClient().upload.public.file(file).group(groupId);
  return upload;
}

export async function getFilesFromGroup(groupId: string) {
  const files = await getPinataClient().files.public.list().then((result) => {
    return result.files.filter((file) => file.group_id === groupId);
  });
  return files;
}

export async function revokeFile(fileId: string[]) {
  const response = await getPinataClient().files.public.delete(fileId);
  return response;
}
