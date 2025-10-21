'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '~/lib/utils'
import { Locale } from '~/i18n/types'

interface SidebarLink {
  title: string
  href: string
  icon?: React.ReactNode
}

interface SidebarV2Props {
  links: SidebarLink[]
  locale: Locale
}

export default function SidebarV2({ links, locale }: SidebarV2Props) {
  const pathname = usePathname()

  const isActive = (href: string) => {
    const path = pathname.replace(/^\/[a-z]{2}/, '') || '/'
    return path === href
  }

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-white border-r shadow-sm flex flex-col z-50">
      <div className="flex items-center gap-2 px-6 py-4 border-b">
        <img src="/pce_logo.jpg" alt="PEACECOIN Logo" className="h-10 w-10" />
        <div>
          <span className="font-bold text-lg">Peace Coin</span>
          <span className="block text-xs text-gray-500">DAO Studio</span>
        </div>
      </div>
      <nav className="flex-1 py-4 px-2 space-y-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={`/${locale}${link.href}`}
            className={cn(
              'flex items-center gap-3 px-4 py-2 rounded transition-colors font-medium',
              isActive(link.href)
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-700 hover:bg-gray-100'
            )}
          >
            {link.icon && <span className="h-5 w-5">{link.icon}</span>}
            <span>{link.title}</span>
          </Link>
        ))}
      </nav>
      <div className="px-6 py-4 border-t text-xs text-gray-400">
        {locale.toUpperCase()}
      </div>
    </aside>
  )
}
