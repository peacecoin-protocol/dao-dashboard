'use client'

import { Link, useLocation } from 'react-router-dom'

import { Button } from '~/components/custom/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { Locale } from '~/i18n/types'

export function UserNav({ locale }: { locale: Locale }) {
  const location = useLocation()
  const fullPath = `${window.location.origin}${location.pathname}`

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          className="relative rounded-full bg-gray94 uppercase p-4"
          onClick={() => {}}
        >
          {{
            cn: '中文',
            en: 'English',
            es: 'Español',
            fr: 'Français',
            ja: '日本語',
            pt: 'Português',
          }[locale] || locale}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-24" align="end" forceMount>
        <DropdownMenuItem>
          <Link
            className="w-full"
            to={fullPath.replace(`/${locale}`, '/cn')}
            reloadDocument={true}
          >
            中文
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            className="w-full"
            to={fullPath.replace(`/${locale}`, '/en')}
            reloadDocument={true}
          >
            English
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            className="w-full"
            to={fullPath.replace(`/${locale}`, '/es')}
            reloadDocument={true}
          >
            Español
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            className="w-full"
            to={fullPath.replace(`/${locale}`, '/fr')}
            reloadDocument={true}
          >
            Français
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            className="w-full"
            to={fullPath.replace(`/${locale}`, '/ja')}
            reloadDocument={true}
          >
            日本語
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            className="w-full"
            to={fullPath.replace(`/${locale}`, '/pt')}
            reloadDocument={true}
          >
            Português
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
