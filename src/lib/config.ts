import { createClient } from 'viem'
import { http, createConfig } from '@wagmi/core'
import { polygonAmoy } from '@wagmi/core/chains'

export const config = createConfig({
  chains: [polygonAmoy],
  client({ chain }) {
    return createClient({ chain, transport: http() })
  },
})
