import { Network } from 'alchemy-sdk'
import { polygon, sepolia } from 'wagmi/chains'
import { localhost } from '~/lib/config'

export const pceAddress = {
  [sepolia.id]: '0x8d4d8C9192C7df57840129D71c18ED49dda7Fe33',
  [localhost.id]: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
  [polygon.id]: '0x0000000000000000000000000000000000000000',
} as Record<number, `0x${string}`>

export const pceCommunity = {
  [sepolia.id]: '0xDA734994aE7b6bd2Ab8486f2c14E00fb7dE3f225',
  [localhost.id]: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
  [polygon.id]: '0x0000000000000000000000000000000000000000',
} as Record<number, `0x${string}`>

export const pceGovToken = {
  [sepolia.id]: '0x19E030BD225a373A8769c3402b533C3CD8cc4c3d',
  [localhost.id]: '0x0B306BF915C4d645ff596e518fAf3F9669b97016',
  [polygon.id]: '0x0000000000000000000000000000000000000000',
} as Record<number, `0x${string}`>

export const timelockAddress = {
  [sepolia.id]: '0x90B6e6e7eaFcf81e32262af9BbaD1c07cEa172bd',
  [localhost.id]: '0x8A791620dd6260079BF849Dc5567aDC3F2FdC318',
  [polygon.id]: '0x0000000000000000000000000000000000000000',
} as Record<number, `0x${string}`>

export const governorAddress = {
  [sepolia.id]: '0x6d2cecad09D6baD75756741A1AD0a9F81654516d',
  [localhost.id]: '0x610178dA211FEF7D417bC0e6FeD39F05609AD788',
  [polygon.id]: '0x0000000000000000000000000000000000000000',
} as Record<number, `0x${string}`>

export const bountyAddress = {
  [sepolia.id]: '0xB1c86049493ab2DE6F70816760202849fC24AF28',
  [localhost.id]: '0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e',
  [polygon.id]: '0x0000000000000000000000000000000000000000',
} as Record<number, `0x${string}`>

export const factoryAddress = {
  [sepolia.id]: '0xF63175ecD1E6Fc464Fa449dF646749CE3cf567b4',
  [localhost.id]: '0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82',
  [polygon.id]: '0x0000000000000000000000000000000000000000',
} as Record<number, `0x${string}`>

export const daoStudioAddress = {
  [sepolia.id]: '0xFf6eF3e8CA9dEfb0A6E42d10fBAA3261981B93D1',
  [localhost.id]: '0x9A676e781A523b5d0C0e43731313A708CB607508',
  [polygon.id]: '0x0000000000000000000000000000000000000000',
} as Record<number, `0x${string}`>

export const campaignAddress = {
  [sepolia.id]: '0x5AE1cd83161d756ebB4dDea8b8a8824898d8958B',
  [localhost.id]: '0x84eA74d481Ee0A5332c457a4d796187F6Ba67fEB',
  [polygon.id]: '0x0000000000000000000000000000000000000000',
} as Record<number, `0x${string}`>

export const sbtAddress = {
  [sepolia.id]: '0x89839cD8d1D5153Af347573C0E337775163e86eC',
  [localhost.id]: '0x4ed7c70F96B99c776995fB64377f0d4aB3B0e1C1',
  [polygon.id]: '0x0000000000000000000000000000000000000000',
} as Record<number, `0x${string}`>

export const SUBGRAPH_URL = {
  [sepolia.id]:
    'https://api.studio.thegraph.com/query/81073/dao_dashboard/version/latest',
  [localhost.id]: 'http://localhost:8000/subgraphs/name/dao_dashboard',
  [polygon.id]:
    'https://api.studio.thegraph.com/query/81073/dao_dashboard/version/latest',
} as Record<number, string>

export const createdAt = {
  [sepolia.id]: '1714857600',
  [localhost.id]: '1714857600',
  [polygon.id]: '1714857600',
} as Record<number, string>

export const WEB = 'https://peacecoin.xyz'

export const LINKEDIN = 'https://www.linkedin.com/company'

export const TWITTER = 'https://twitter.com'

export const ALCHEMY_CONFIG = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_SEPOLIA,
}
