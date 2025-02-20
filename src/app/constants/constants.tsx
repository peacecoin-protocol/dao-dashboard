import { sepolia } from 'wagmi/chains'
import { localhost } from '~/app/providers'

export const pceAddress = {
  [sepolia.id]: '0x8d4d8C9192C7df57840129D71c18ED49dda7Fe33',
  [localhost.id]: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
} as Record<number, `0x${string}`>

export const pceCommunity = {
  [sepolia.id]: '0xDA734994aE7b6bd2Ab8486f2c14E00fb7dE3f225',
  [localhost.id]: '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9',
} as Record<number, `0x${string}`>

export const pceGovToken = {
  [sepolia.id]: '0x19E030BD225a373A8769c3402b533C3CD8cc4c3d',
  [localhost.id]: '0x0000000000000000000000000000000000000000',
} as Record<number, `0x${string}`>

export const timelockAddress = {
  [sepolia.id]: '0x44884b82BC9Fd8b93802f6F85BA103f54fe9D3e9',
  [localhost.id]: '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9',
} as Record<number, `0x${string}`>

export const governorAddress = {
  [sepolia.id]: '0x6C22f8E1aD460500e06c67Ac5079b0f01e7220F3',
  [localhost.id]: '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707',
} as Record<number, `0x${string}`>

export const bountyAddress = {
  [sepolia.id]: '0xB1c86049493ab2DE6F70816760202849fC24AF28',
  [localhost.id]: '0x0165878A594ca255338adfa4d48449f69242Eb8F',
} as Record<number, `0x${string}`>

export const factoryAddress = {
  [sepolia.id]: '0xF63175ecD1E6Fc464Fa449dF646749CE3cf567b4',
  [localhost.id]: '0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6',
} as Record<number, `0x${string}`>

export const daoStudioAddress = {
  [sepolia.id]: '0xFf6eF3e8CA9dEfb0A6E42d10fBAA3261981B93D1',
  [localhost.id]: '0x8A791620dd6260079BF849Dc5567aDC3F2FdC318',
} as Record<number, `0x${string}`>

export const SUBGRAPH_URL = {
  [sepolia.id]:
    'https://api.studio.thegraph.com/query/81073/dao_dashboard/version/latest',
  [localhost.id]: 'http://localhost:8000/subgraphs/name/dao_dashboard',
} as Record<number, string>
