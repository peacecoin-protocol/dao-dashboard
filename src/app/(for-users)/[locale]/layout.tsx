import { Inter } from 'next/font/google'

import { AppBar } from '~/components/common/app-bar'
import { cn } from '~/components/utils'
import { PagePropsWithLocale } from '~/i18n/types'

import './for-users-any-locale.css'

const inter = Inter({ subsets: ['latin'] })

export default function ForUsersAnyLocaleIndexLayout({
  children,
  params: { locale },
}: PagePropsWithLocale<{
  children: React.ReactNode
}>) {
  return (
    <div className={cn('grid h-full grid-rows-layout-shell', inter.className)}>
      <AppBar />
      {/* TODO: Use Shadcn/ui Scroll */}
      <main className="overflow-y-auto">
        <div className="container py-4">{children}</div>
      </main>
    </div>
  )
}
