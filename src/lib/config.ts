import { createClient } from 'viem'
import { http, createConfig } from '@wagmi/core'
import { localhost } from 'wagmi/chains'

export const config = createConfig({
  chains: [localhost],
  client({ chain }) {
    return createClient({ chain, transport: http() })
  },
})
