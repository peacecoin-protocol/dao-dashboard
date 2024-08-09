'use client'

import { Link } from 'react-router-dom'

import { Button } from '~/components/custom/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { Locale } from '~/i18n/types'

export function UserNav({ locale }: { locale: Locale }) {
  const fullPath = `${window.location.origin}${window.location.pathname}`
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-8 w-6 rounded-full bg-gray94 uppercase"
          onClick={() => {}}
        >
          {locale}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-24" align="end" forceMount>
        <DropdownMenuItem>
          <Link
            to={fullPath.replace(`/${locale}`, '/cn')}
            reloadDocument={true}
          >
            Chinese
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            to={fullPath.replace(`/${locale}`, '/en')}
            reloadDocument={true}
          >
            English
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            to={fullPath.replace(`/${locale}`, '/es')}
            reloadDocument={true}
          >
            Spanish
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            to={fullPath.replace(`/${locale}`, '/fr')}
            reloadDocument={true}
          >
            French
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          {' '}
          <Link
            to={fullPath.replace(`/${locale}`, '/ja')}
            reloadDocument={true}
          >
            Japanese
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          {' '}
          <Link
            to={fullPath.replace(`/${locale}`, '/pt')}
            reloadDocument={true}
          >
            Portuguese
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
