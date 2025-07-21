'use client'
import './globals.css'

import '@rainbow-me/rainbowkit/styles.css'
import { Providers } from './providers'
import { Toaster as SonnerToaster } from 'sonner'

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
        <SonnerToaster position="bottom-right" duration={2000} />
      </body>
    </html>
  )
}

export default RootLayout
