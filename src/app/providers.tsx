'use client'

import * as React from 'react'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'

import { config } from '~/lib/config'

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  const [routerEl, setRouterEl] = React.useState<React.ReactNode | null>(null)

  React.useEffect(() => {
    let mounted = true

    // Dynamically import both react-router-dom and our router on the client only.
    Promise.all([import('react-router-dom'), import('./router')])
      .then(([rrd, r]) => {
        if (!mounted) return
        const RouterProvider = rrd.RouterProvider
        setRouterEl(<RouterProvider router={r.default} />)
      })
      .catch((err) => {
        // Keep a console error for visibility during development
        // Do not throw — we want the app to continue rendering other providers
        // (Wagmi, QueryClient, RainbowKit) even if router fails to load.
        // eslint-disable-next-line no-console
        console.error('Failed to load router on client:', err)
      })

    return () => {
      mounted = false
    }
  }, [])

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {routerEl}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
