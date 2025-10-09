'use client'

import NextLink from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '~/components/custom/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { Locale } from '~/i18n/types'

export function UserNav({ locale }: { locale: Locale }) {
  const pathname = usePathname()

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
          <NextLink
            className="w-full"
            href={pathname.replace(`/${locale}`, '/cn')}
          >
            中文
          </NextLink>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <NextLink
            className="w-full"
            href={pathname.replace(`/${locale}`, '/en')}
          >
            English
          </NextLink>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <NextLink
            className="w-full"
            href={pathname.replace(`/${locale}`, '/es')}
          >
            Español
          </NextLink>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <NextLink
            className="w-full"
            href={pathname.replace(`/${locale}`, '/fr')}
          >
            Français
          </NextLink>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <NextLink
            className="w-full"
            href={pathname.replace(`/${locale}`, '/ja')}
          >
            日本語
          </NextLink>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <NextLink
            className="w-full"
            href={pathname.replace(`/${locale}`, '/pt')}
          >
            Português
          </NextLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}