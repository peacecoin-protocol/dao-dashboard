'use client'

import { useEffect, useState } from 'react'
import Sidebar from '~/components/sidebar'
import AppBar from '~/components/common/app-bar'
import useIsCollapsed from '~/hooks/use-is-collapsed'
import { Locale } from '~/i18n/types'

interface ForUsersLayoutProps {
  children: React.ReactNode
  params: { locale: Locale }
}

export default function ForUsersLayout({
  children,
  params,
}: ForUsersLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useIsCollapsed()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        locale={params.locale}
      />
      <div className="flex-1 flex flex-col">
        <AppBar locale={params.locale} />
        <main
          className={`flex-1 transition-[margin-left] duration-300 bg-background p-4 md:p-6 ${isCollapsed ? 'md:ml-14' : 'md:ml-64'}`}
        >
          {children}
        </main>
      </div>
    </div>
  )
}
