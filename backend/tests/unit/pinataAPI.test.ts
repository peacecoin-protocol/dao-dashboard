import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockUploadGroup = vi.fn();
const mockFilesList = vi.fn();
const mockFilesDelete = vi.fn();
const mockGroupsAddFiles = vi.fn();

vi.mock('pinata', () => ({
  PinataSDK: vi.fn().mockImplementation(() => ({
    upload: {
      public: {
        file: vi.fn(() => ({
          group: mockUploadGroup,
        })),
      },
    },
    files: {
      public: {
        list: mockFilesList,
        delete: mockFilesDelete,
      },
    },
    groups: {
      public: {
        addFiles: mockGroupsAddFiles,
      },
    },
  })),
}));

import {
  addFilesToGroupPublic,
  buildIpfsUrl,
  buildMetadata,
  createMetadataFile,
  getImageGroupId,
  getJsonGroupId,
  getFilesFromGroup,
} from '../../src/lib/pinataAPI.js';

describe('pinataAPI', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUploadGroup.mockResolvedValue({ cid: 'bafkImageCid' });
    mockFilesList.mockResolvedValue({
      files: [
        { id: '1', group_id: 'group-a', cid: 'cid-a' },
        { id: '2', group_id: 'group-b', cid: 'cid-b' },
      ],
    });
  });

  it('buildIpfsUrl matches dao-dashboard gateway format', () => {
    expect(buildIpfsUrl('bafyTestCid')).toBe(
      'https://ipfs-dao-studio.mypinata.cloud/ipfs/bafyTestCid'
    );
  });

  it('getImageGroupId returns SBT group for dev', () => {
    expect(getImageGroupId('dev', 'sbt')).toBe('ec1ac640-dd34-4da3-b7f9-9ca9826dcb50');
  });

  it('getImageGroupId returns NFT group for production', () => {
    expect(getImageGroupId('production', 'nft')).toBe('6b5c304d-6bbb-4366-b5c4-27fe361a92d3');
  });

  it('getJsonGroupId returns JSON group for dev', () => {
    expect(getJsonGroupId('dev')).toBe('e9cea556-1e9d-4d16-a247-feb8d32e7de5');
  });

  it('buildMetadata creates correct JSON structure', () => {
    expect(
      buildMetadata(
        'STG',
        'STG description',
        '1000000000000000000000',
        'https://ipfs-dao-studio.mypinata.cloud/ipfs/imageCid'
      )
    ).toEqual({
      name: 'STG',
      description: 'STG description',
      attributes: [{ trait_type: 'votingPower', value: '1000000000000000000000' }],
      image: 'https://ipfs-dao-studio.mypinata.cloud/ipfs/imageCid',
    });
  });

  it('createMetadataFile names file after image cid like dao-dashboard', async () => {
    const metadata = buildMetadata('A', 'B', '100', 'https://example.com/ipfs/cid');
    const file = createMetadataFile(metadata, 'imageCid');
    expect(file.name).toBe('imageCid.json');
    expect(file.type).toBe('application/json');
    expect(JSON.parse(await file.text())).toEqual(metadata);
  });

  it('addFilesToGroupPublic uploads via file().group() like dao-dashboard', async () => {
    const file = new File(['fake'], 'test.png', { type: 'image/png' });
    const result = await addFilesToGroupPublic(file, 'group-id');
    expect(result.cid).toBe('bafkImageCid');
    expect(mockUploadGroup).toHaveBeenCalledWith('group-id');
  });

  it('getFilesFromGroup filters by group id', async () => {
    const files = await getFilesFromGroup('group-a');
    expect(files).toHaveLength(1);
    expect(files[0].cid).toBe('cid-a');
  });
});