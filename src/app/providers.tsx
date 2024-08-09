'use client'

import { Env } from '~/env'

import * as React from 'react'
import {
  // RainbowKitProvider,
  getDefaultWallets,
  getDefaultConfig,
} from '@rainbow-me/rainbowkit'
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets'
import { mainnet, polygon, bscTestnet, polygonAmoy } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'

import { RouterProvider } from 'react-router-dom'
import router from './router'

const { wallets } = getDefaultWallets()

const config = getDefaultConfig({
  appName: 'RainbowKit demo',
  projectId: Env.NEXT_PUBLIC_WC_PROJECT_ID,
  wallets: [
    ...wallets,
    {
      groupName: 'Other',
      wallets: [argentWallet, trustWallet, ledgerWallet],
    },
  ],
  chains: [
    mainnet,
    polygon,
    ...(Env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true'
      ? [bscTestnet, polygonAmoy]
      : []),
  ],
  ssr: true,
})

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </WagmiProvider>
    </>
  )
}
