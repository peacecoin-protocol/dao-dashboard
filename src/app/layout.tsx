'use client'
import './globals.css'

import '@rainbow-me/rainbowkit/styles.css'
import { Providers } from './providers'
import { Toaster } from '~/components/ui/sonner'

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
