import { http, createConfig } from '@wagmi/core'
import { polygon, sepolia } from 'wagmi/chains'
import { Env } from '~/env'
import { PinataSDK } from 'pinata'
import { defineChain } from 'viem'
import { injected, walletConnect } from 'wagmi/connectors'

export const localhost = defineChain({
  id: 31337,
  name: 'Localhost',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: { http: ['http://127.0.0.1:8545'] },
  },
})

export const config = createConfig({
  chains: [sepolia, localhost, polygon],
  connectors: [
    injected(),
    walletConnect({ projectId: Env.NEXT_PUBLIC_WC_PROJECT_ID }),
  ],
  transports: {
    [sepolia.id]: http(Env.NEXT_PUBLIC_SEPOLIA_RPC_URL),
    [localhost.id]: http(Env.NEXT_PUBLIC_LOCALHOST_RPC_URL),
    [polygon.id]: http(Env.NEXT_PUBLIC_POLYGON_RPC_URL),
  },
  multiInjectedProviderDiscovery: true,
  syncConnectedChain: true,
})

export const pinata = new PinataSDK({
  pinataJwt: Env.PINATA_JWT,
  pinataGateway: Env.PINATA_GATEWAY_URL,
})
