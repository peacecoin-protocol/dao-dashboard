import { Network } from 'alchemy-sdk'
import { polygon, sepolia, hoodi } from 'wagmi/chains'
import { localhost } from '~/lib/config'

export const pceAddress = {
  [sepolia.id]: '0x951E69b565924c0b846Ed0E779f190c53d29F62e',
  [localhost.id]: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  [polygon.id]: '0x0000000000000000000000000000000000000000',
  [hoodi.id]: '0x1F9FcC5f8DF936b8E3c9617565FfAd7fF6222b14',
} as Record<number, `0x${string}`>

export const pceCommunity = {
  [sepolia.id]: '0xB39AE559A9D4D58a8FAaDf401c7F0398f879C6e7',
  [localhost.id]: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
  [polygon.id]: '0x0000000000000000000000000000000000000000',
  [hoodi.id]: '0xBa9E16D096262023c50A3cCCC4f08af4b321fB21',
} as Record<number, `0x${string}`>

export const PCE_SBT_ADDRESS = {
  [sepolia.id]: '0x9c1873CbD054b05AaCa0A17239bc6B43483bCCb6',
  [localhost.id]: '0x3d3a47670cebC45B405268BE07371F97AB408f81',
  [polygon.id]: '0x0000000000000000000000000000000000000000',
  [hoodi.id]: '0xBa9E16D096262023c50A3cCCC4f08af4b321fB21',
} as Record<number, `0x${string}`>

export const WPCE_ADDRESS = {
  [sepolia.id]: '0xaf826b76EA6F65efbdd1D976e367eF770FBdD77D',
  [localhost.id]: '0x4c5859f0F772848b2D91F1D83E2Fe57935348029',
  [polygon.id]: '0x0000000000000000000000000000000000000000',
  [hoodi.id]: '0xFf6eF3e8CA9dEfb0A6E42d10fBAA3261981B93D1',
} as Record<number, `0x${string}`>

export const timelockAddress = {
  [sepolia.id]: '0x3F8f4983f78596b9E02062f9f420309cAc006A8F',
  [localhost.id]: '0x0E801D84Fa97b50751Dbf25036d067dCf18858bF',
  [polygon.id]: '0x0000000000000000000000000000000000000000',
  [hoodi.id]: '0x0F4E3eEEA64268926454aF8C38D62938637fd18e',
} as Record<number, `0x${string}`>

export const governorAddress = {
  [sepolia.id]: '0xD8DD80201565C0890dA1d1Ade1A70203A9C869dA',
  [localhost.id]: '0x8f86403A4DE0BB5791fa46B8e795C547942fE4Cf',
  [polygon.id]: '0x0000000000000000000000000000000000000000',
  [hoodi.id]: '0x4a1EBA4B4895b6562B8d67510FF07c95F90049d8',
} as Record<number, `0x${string}`>

export const bountyAddress = {
  [sepolia.id]: '0xDf9DC02754FF6acd4a17e7283C4fe35D3Fa84A88',
  [localhost.id]: '0x9d4454B023096f34B160D6B654540c56A1F81688',
  [polygon.id]: '0x0000000000000000000000000000000000000000',
  [hoodi.id]: '0xEb0978C48aced59209242d677A404bBB2126413c',
} as Record<number, `0x${string}`>

export const NFTAddress = {
  [sepolia.id]: '0x5EF418C929730d6727c6b9B33db84530857fcC5E',
  [localhost.id]: '0x0ce968ba1ff3035bd54679a5bc7ad6b21cca4c25',
  [polygon.id]: '0x0000000000000000000000000000000000000000',
  [hoodi.id]: '0xe004A0f37B2Be66e7225119F7EFF2d49C7F93629',
} as Record<number, `0x${string}`>

export const daoStudioAddress = {
  [sepolia.id]: '0x55843405c1fb4f2d872Ca80084056452f5304173',
  [localhost.id]: '0x809d550fca64d94Bd9F66E60752A544199cfAC3D',
  [polygon.id]: '0x0000000000000000000000000000000000000000',
  [hoodi.id]: '0x0000000000000000000000000000000000000000',
} as Record<number, `0x${string}`>

export const campaignAddress = {
  [sepolia.id]: '0x5E8c92dc989C620C24bD798574B43729d059E143',
  [localhost.id]: '0x1fA02b2d6A771842690194Cf62D91bdd92BfE28d',
  [polygon.id]: '0x0000000000000000000000000000000000000000',
  [hoodi.id]: '0x3DBbaA7F04ca653Db70E6627B724Fc34f735d580',
} as Record<number, `0x${string}`>

export const stakingAddress = {
  [sepolia.id]: '0x53E94ca5b9FAecEFE3D9aab15CC65ECa60893937',
  [localhost.id]: '0x3Aa5ebB10DC797CAC828524e59A333d0A371443c',
  [polygon.id]: '0x0000000000000000000000000000000000000000',
  [hoodi.id]: '0xafe9F87C70cA6b033Dab2E5a17b7C90Cd2c55C45',
} as Record<number, `0x${string}`>

export const SUBGRAPH_URL = {
  [sepolia.id]:
    'https://api.studio.thegraph.com/query/81073/dao-studio-peace-coin-org/version/latest',
  [localhost.id]: 'http://localhost:8000/subgraphs/name/dao_dashboard',
  [polygon.id]:
    'https://api.studio.thegraph.com/query/81073/dao_dashboard/version/latest',
  [hoodi.id]:
    'https://api.studio.thegraph.com/query/81073/dao_dashboard/version/latest',
} as Record<number, string>

export const SBT_SUBGRAPH_URL = {
  [sepolia.id]:
    'https://api.goldsky.com/api/public/project_cmh9yq5lf9mwv01xhb96l1gbh/subgraphs/Peacecoin-SBT/1.0.0/gn',
  [localhost.id]: 'http://localhost:8000/subgraphs/name/sbt',
  [polygon.id]:
    'https://api.goldsky.com/api/public/project_cmh9yq5lf9mwv01xhb96l1gbh/subgraphs/Peacecoin-SBT/1.0.0/gn',
  [hoodi.id]:
    'https://api.goldsky.com/api/public/project_cmh9yq5lf9mwv01xhb96l1gbh/subgraphs/Peacecoin-SBT/1.0.0/gn',
} as Record<number, string>

export const NFT_SUBGRAPH_URL = {
  [sepolia.id]:
    'https://api.goldsky.com/api/public/project_cmh9yq5lf9mwv01xhb96l1gbh/subgraphs/Peacecoin-NFT/1.0.0/gn',
  [localhost.id]: 'http://localhost:8000/subgraphs/name/nft',
  [polygon.id]:
    'https://api.goldsky.com/api/public/project_cmh9yq5lf9mwv01xhb96l1gbh/subgraphs/Peacecoin-NFT/1.0.0/gn',
  [hoodi.id]:
    'https://api.goldsky.com/api/public/project_cmh9yq5lf9mwv01xhb96l1gbh/subgraphs/Peacecoin-NFT/1.0.0/gn',
} as Record<number, string>

export const DAO_STUDIO_SUBGRAPH_URL = {
  [sepolia.id]:
    'https://api.goldsky.com/api/public/project_cmh9yq5lf9mwv01xhb96l1gbh/subgraphs/Peacecoin-DaoStudio/1.0.0/gn',
  [localhost.id]: 'http://localhost:8000/subgraphs/name/dao_studio',
  [polygon.id]:
    'https://api.goldsky.com/api/public/project_cmh9yq5lf9mwv01xhb96l1gbh/subgraphs/Peacecoin-DaoStudio/1.0.0/gn',
  [hoodi.id]:
    'https://api.goldsky.com/api/public/project_cmh9yq5lf9mwv01xhb96l1gbh/subgraphs/Peacecoin-DaoStudio/1.0.0/gn',
} as Record<number, string>

export const CAMPAIGNS_SUBGRAPH_URL = {
  [sepolia.id]:
    'https://api.goldsky.com/api/public/project_cmhau3g2q32y301wj6eog3f0i/subgraphs/Peacecoin-Campaigns/1.0.0/gn',
  [localhost.id]: 'http://localhost:8000/subgraphs/name/campaigns',
  [polygon.id]:
    'https://api.goldsky.com/api/public/project_cmhau3g2q32y301wj6eog3f0i/subgraphs/Peacecoin-Campaigns/1.0.0/gn',
  [hoodi.id]:
    'https://api.goldsky.com/api/public/project_cmhau3g2q32y301wj6eog3f0i/subgraphs/Peacecoin-Campaigns/1.0.0/gn',
} as Record<number, string>

export const OWNER_ADDRESSES = [
  '0x0641A3E6BCBa53336d773cE94A6f8BB3033bb813',
  '0x59178bAc7A9BBfa287F39887EAA2826666f14A2a',
]

export const createdAt = {
  [sepolia.id]: '1714857600',
  [localhost.id]: '1714857600',
  [polygon.id]: '1714857600',
  [hoodi.id]: '1714857600',
} as Record<number, string>

export const ALCHEMY_CONFIG = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_SEPOLIA,
}

export const defaultChainId = sepolia.id

export const STATUS = [
  'Draft',
  'Last Call',
  'Final',
  'Stagnant',
  'Withdrawn',
  'Rejected',
  'Living',
]

export const CATEGORY = [
  'Core',
  'Application Interface',
  'Token & Community Design',
  'Process',
  'Meta',
  'Impact Indicators / Evaluation Design',
  'Informational',
]

export const EMPTY_NFT_IMAGE = '/images/empty-nft.svg'
export const sbtTableHeaders = [
  'Type',
  'Image',
  'Title',
  'Description',
  'Token ID',
  'Balance',
  'Voting Power',
  'Created At',
]

export const campaignTableHeaders = [
  'ID',
  'Image',
  'Title',
  'Description',
  'Type',
  'Claimed Amount/Total Amount',
  'Claim Amount',
  'Token Type',
  'Token Id',
  'Start Time',
  'End Time',
  'Status',
]

export const GAS_LIMIT = 1000000
