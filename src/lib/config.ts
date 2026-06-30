import './suppress-lit-dev-mode'

import { http, createConfig } from '@wagmi/core'
import { polygon } from 'wagmi/chains'
import { Env } from '~/env'
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
  chains: [polygon],
  connectors: [
    injected(),
    walletConnect({ projectId: Env.NEXT_PUBLIC_WC_PROJECT_ID }),
  ],
  transports: {
    [polygon.id]: http(Env.NEXT_PUBLIC_POLYGON_RPC_URL),
  },
  multiInjectedProviderDiscovery: true,
  syncConnectedChain: true,
})
