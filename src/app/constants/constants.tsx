import { sepolia } from 'wagmi/chains'
import { localhost } from '~/app/providers'

export const pceAddress = {
  [sepolia.id]: '0x8a72e4C32A9f8AaCA6890EFFFd629e2a5FFD53c3',
  [localhost.id]: '0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e',
} as Record<number, `0x${string}`>

export const pceCommunity = {
  [sepolia.id]: '0x830a929801e03639f1287855f0c08b18fdb884dc',
  [localhost.id]: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
} as Record<number, `0x${string}`>

export const pceGovToken = {
  [sepolia.id]: '0x19E030BD225a373A8769c3402b533C3CD8cc4c3d',
  [localhost.id]: '0x0000000000000000000000000000000000000000',
} as Record<number, `0x${string}`>

export const timelockAddress = {
  [sepolia.id]: '0x44884b82BC9Fd8b93802f6F85BA103f54fe9D3e9',
  [localhost.id]: '0x09635F643e140090A9A8Dcd712eD6285858ceBef',
} as Record<number, `0x${string}`>

export const governorAddress = {
  [sepolia.id]: '0x6C22f8E1aD460500e06c67Ac5079b0f01e7220F3',
  [localhost.id]: '0xa513E6E4b8f2a923D98304ec87F64353C4D5C853',
} as Record<number, `0x${string}`>

export const bountyAddress = {
  [sepolia.id]: '0xB1c86049493ab2DE6F70816760202849fC24AF28',
  [localhost.id]: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
} as Record<number, `0x${string}`>

export const factoryAddress = {
  [sepolia.id]: '0xF63175ecD1E6Fc464Fa449dF646749CE3cf567b4',
  [localhost.id]: '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9',
} as Record<number, `0x${string}`>

export const daoStudioAddress = {
  [sepolia.id]: '0xFf6eF3e8CA9dEfb0A6E42d10fBAA3261981B93D1',
  [localhost.id]: '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707',
} as Record<number, `0x${string}`>

export const SUBGRAPH_URL = {
  [sepolia.id]:
    'https://api.studio.thegraph.com/query/81073/dao_dashboard/version/latest',
  [localhost.id]: 'http://localhost:8000/subgraphs/name/dao_dashboard',
} as Record<number, string>
