import { useEffect, useState } from 'react'
import { IconChevronsLeft, IconMenu2, IconX } from '@tabler/icons-react'
import { Layout } from './custom/layout'
import { Button } from './ui/button'

import Nav from './nav'
import { cn } from '~/lib/utils'
import { Locale } from '~/i18n/types'
import { useSideLinks } from '~/data/sidelinks'
import { getDict } from '~/i18n/get-dict'
import { Dictionary } from '~/i18n/types'

import { useHasDaoManagerRole } from '~/hooks/use-has-role'

import Image from 'next/image'
interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  isCollapsed: boolean
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>
  locale: Locale
}

export default function Sidebar({
  className,
  isCollapsed,
  setIsCollapsed,
  locale,
}: SidebarProps) {
  const [dict, setDict] = useState<Dictionary | null>(null)
  const [navOpened, setNavOpened] = useState(false)

  const localDict = dict?.sidebar ?? {}

  const { hasRole } = useHasDaoManagerRole()

  const sideLinks = useSideLinks(locale, hasRole ?? false)

  useEffect(() => {
    const fetchDict = async () => {
      try {
        const fetchedDict = await getDict(locale)
        setDict(fetchedDict)
      } catch (error) {
        console.error('Error fetching dictionary:', error)
      }
    }
    fetchDict()
  }, [locale])

  /* Make body not scrollable when navBar is opened */
  useEffect(() => {
    if (navOpened) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }, [navOpened])

  return (
    <aside
      className={cn(
        `fixed left-0 right-0 top-0 z-50 w-full border-r-2 border-r-muted transition-[width] md:bottom-0 md:right-auto md:h-svh ${isCollapsed ? 'md:w-14' : 'md:w-64'}`,
        className
      )}
    >
      {/* Overlay in mobile */}
      <div
        onClick={() => setNavOpened(false)}
        className={`absolute inset-0 transition-[opacity] delay-100 duration-700 ${navOpened ? 'h-svh opacity-50' : 'h-0 opacity-0'} w-full bg-black md:hidden`}
      />

      <Layout fixed className={navOpened ? 'h-svh' : ''}>
        {/* Header */}
        <Layout.Header
          sticky
          className="z-50 flex justify-between px-4 py-3 shadow-sm md:px-4 bg-white"
        >
          <div
            className={`h-12 flex items-center ${!isCollapsed ? 'gap-2' : ''}`}
          >
            <Image
              src="/pce_logo.png"
              alt="PEACECOIN Logo"
              width={isCollapsed ? 32 : 36}
              height={isCollapsed ? 32 : 36}
            />

            {!isCollapsed && (
              <div className={`flex flex-col justify-end truncate`}>
                <span className="font-medium">{localDict.pceCoin}</span>
                <span className="text-xs">
                  {localDict.daoStudio ?? 'DAO Studio'}
                </span>
              </div>
            )}
          </div>

          {/* Toggle Button in mobile */}
          <Button
            variant="secondary"
            size="icon"
            className="md:hidden"
            aria-label="Toggle Navigation"
            aria-controls="sidebar-menu"
            aria-expanded={navOpened}
            onClick={() => setNavOpened((prev) => !prev)}
          >
            {navOpened ? <IconX /> : <IconMenu2 />}
          </Button>
        </Layout.Header>

        {/* Navigation links */}
        <Nav
          id="sidebar-menu"
          className={`z-40 h-full flex-1 overflow-auto ${navOpened ? 'max-h-screen' : 'max-h-0 py-0 md:max-h-screen md:py-2'}`}
          closeNav={() => setNavOpened(false)}
          isCollapsed={isCollapsed}
          links={sideLinks}
          locale={locale}
          connectLabel={dict?.navigation?.connect ?? 'Connect'}
          disconnectLabel={dict?.navigation?.disconnect ?? 'Disconnect'}
        />

        {/* Scrollbar width toggle button */}
        <Button
          variant="secondary"
          onClick={() => setIsCollapsed((prev) => !prev)}
          size="icon"
          className="absolute -right-5 top-1/2 z-50 hidden rounded-full md:inline-flex bg-white border-2 border-gray-200"
        >
          <IconChevronsLeft
            stroke={1.5}
            className={`h-6 w-6 ${isCollapsed ? 'rotate-180' : ''}`}
          />
        </Button>
      </Layout>
    </aside>
  )
}
