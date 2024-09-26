import { createClient } from 'viem'
import { http, createConfig } from '@wagmi/core'
import { polygonAmoy, mainnet } from '@wagmi/core/chains'

export const config = createConfig({
  chains: [polygonAmoy, mainnet],
  client({ chain }) {
    return createClient({ chain, transport: http() })
  },
})
