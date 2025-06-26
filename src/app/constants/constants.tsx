import { Network } from 'alchemy-sdk'
import { polygon, sepolia, hoodi } from 'wagmi/chains'
import { localhost } from '~/lib/config'

export const pceAddress = {
  [sepolia.id]: '0x8253f538d2C5a011ee32098a539903992f61Dce9',
  [localhost.id]: '0xc6e7DF5E7b4f2A278906862b61205850344D4e7d',
  [polygon.id]: '0x0000000000000000000000000000000000000000',
  [hoodi.id]: '0x1F9FcC5f8DF936b8E3c9617565FfAd7fF6222b14',
} as Record<number, `0x${string}`>

export const pceCommunity = {
  [sepolia.id]: '0xDA734994aE7b6bd2Ab8486f2c14E00fb7dE3f225',
  [localhost.id]: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
  [polygon.id]: '0x0000000000000000000000000000000000000000',
  [hoodi.id]: '0xBa9E16D096262023c50A3cCCC4f08af4b321fB21',
} as Record<number, `0x${string}`>

export const PCE_SBT_ADDRESS = {
  [sepolia.id]: '0xd23b6Aa7eaeFd52D061b4f8097e0f451805c770F',
  [localhost.id]: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  [polygon.id]: '0x0000000000000000000000000000000000000000',
  [hoodi.id]: '0xBa9E16D096262023c50A3cCCC4f08af4b321fB21',
} as Record<number, `0x${string}`>

export const sbtAddress = {
  [sepolia.id]: '0xd23b6Aa7eaeFd52D061b4f8097e0f451805c770F',
  [localhost.id]: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  [polygon.id]: '0x0000000000000000000000000000000000000000',
  [hoodi.id]: '0xBa9E16D096262023c50A3cCCC4f08af4b321fB21',
} as Record<number, `0x${string}`>

export const WPCE_ADDRESS = {
  [sepolia.id]: '0x6ecc7DCCf1fb3bEAe1cde6026F55b837aBA9cB90',
  [localhost.id]: '0x4ed7c70F96B99c776995fB64377f0d4aB3B0e1C1',
  [polygon.id]: '0x0000000000000000000000000000000000000000',
  [hoodi.id]: '0xFf6eF3e8CA9dEfb0A6E42d10fBAA3261981B93D1',
} as Record<number, `0x${string}`>

export const timelockAddress = {
  [sepolia.id]: '0x967428b45Bff4053713Fae2d5647B9aA7910F202',
  [localhost.id]: '0xc3e53F4d16Ae77Db1c982e75a937B9f60FE63690',
  [polygon.id]: '0x0000000000000000000000000000000000000000',
  [hoodi.id]: '0x0F4E3eEEA64268926454aF8C38D62938637fd18e',
} as Record<number, `0x${string}`>

export const governorAddress = {
  [sepolia.id]: '0x8BcfbeAc0247ec5d211990933Bc8514be22299a2',
  [localhost.id]: '0xE6E340D132b5f46d1e472DebcD681B2aBc16e57E',
  [polygon.id]: '0x0000000000000000000000000000000000000000',
  [hoodi.id]: '0x4a1EBA4B4895b6562B8d67510FF07c95F90049d8',
} as Record<number, `0x${string}`>

export const bountyAddress = {
  [sepolia.id]: '0xD6eFBB14ae77D4F1e5f0CC6CFdD8AEF9D2379744',
  [localhost.id]: '0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e',
  [polygon.id]: '0x0000000000000000000000000000000000000000',
  [hoodi.id]: '0xEb0978C48aced59209242d677A404bBB2126413c',
} as Record<number, `0x${string}`>

export const factoryAddress = {
  [sepolia.id]: '0xBa124A2764d51D1d806071646d00CB7ea69ec65C',
  [localhost.id]: '0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82',
  [polygon.id]: '0x0000000000000000000000000000000000000000',
  [hoodi.id]: '0xe004A0f37B2Be66e7225119F7EFF2d49C7F93629',
} as Record<number, `0x${string}`>

export const daoStudioAddress = {
  [sepolia.id]: '0x8078D4a34913a2e25d4967BEfC9D5cfe46916306',
  [localhost.id]: '0x9A676e781A523b5d0C0e43731313A708CB607508',
  [polygon.id]: '0x0000000000000000000000000000000000000000',
  [hoodi.id]: '0x0000000000000000000000000000000000000000',
} as Record<number, `0x${string}`>

export const campaignAddress = {
  [sepolia.id]: '0xEd6772aF6B32604c5e8517fe031123F56329B185',
  [localhost.id]: '0x70e0bA845a1A0F2DA3359C97E0285013525FFC49',
  [polygon.id]: '0x0000000000000000000000000000000000000000',
  [hoodi.id]: '0x3DBbaA7F04ca653Db70E6627B724Fc34f735d580',
} as Record<number, `0x${string}`>

export const stakingAddress = {
  [sepolia.id]: '0x829B358FA0B13dB77172BC1Ce600FB2E863d42A1',
  [localhost.id]: '0x3Aa5ebB10DC797CAC828524e59A333d0A371443c',
  [polygon.id]: '0x0000000000000000000000000000000000000000',
  [hoodi.id]: '0xafe9F87C70cA6b033Dab2E5a17b7C90Cd2c55C45',
} as Record<number, `0x${string}`>

export const SUBGRAPH_URL = {
  [sepolia.id]:
    'https://api.studio.thegraph.com/query/81073/pce-dao/version/latest',
  [localhost.id]: 'http://localhost:8000/subgraphs/name/dao_dashboard',
  [polygon.id]:
    'https://api.studio.thegraph.com/query/81073/dao_dashboard/version/latest',
  [hoodi.id]:
    'https://api.studio.thegraph.com/query/81073/dao_dashboard/version/latest',
} as Record<number, string>

export const createdAt = {
  [sepolia.id]: '1714857600',
  [localhost.id]: '1714857600',
  [polygon.id]: '1714857600',
  [hoodi.id]: '1714857600',
} as Record<number, string>

export const WEB = 'https://peacecoin.xyz'

export const LINKEDIN = 'https://www.linkedin.com/company'

export const TWITTER = 'https://twitter.com'

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
