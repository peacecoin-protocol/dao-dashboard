import { NextRequest, NextResponse } from 'next/server'

import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

import { i18nIgnorePrefixList } from './i18n/ignore-prefix-list'
import { Locale } from './i18n/types'

const defaultLocale: Locale = 'en'
const locales: Locale[] = ['en', 'ja', 'cn', 'es', 'fr', 'pt']
const localeMatchers: Array<{ locale: Locale; tag: string }> = [
  { locale: 'en', tag: 'en' },
  { locale: 'ja', tag: 'ja' },
  { locale: 'cn', tag: 'zh-CN' },
  { locale: 'es', tag: 'es' },
  { locale: 'fr', tag: 'fr' },
  { locale: 'pt', tag: 'pt' },
]
const localeByTag = new Map(
  localeMatchers.map(({ locale, tag }) => [tag.toLowerCase(), locale])
)
const isValidLocaleTag = (value: string) => {
  try {
    Intl.getCanonicalLocales(value)
    return true
  } catch {
    return false
  }
}

export const getLocale = (request: NextRequest) => {
  const languages = new Negotiator({
    headers: Object.fromEntries(request.headers),
  })
    .languages()
    .filter(isValidLocaleTag)

  if (languages.length === 0) {
    return defaultLocale
  }

  const matchedLocaleTag = match(
    languages,
    localeMatchers.map(({ tag }) => tag),
    defaultLocale
  )

  return localeByTag.get(matchedLocaleTag.toLowerCase()) ?? defaultLocale
}

const hasPrefix = (pathname: string, prefix: string) =>
  pathname === prefix || pathname.startsWith(prefix + '/')

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const noTranslationPage = i18nIgnorePrefixList.some((p) =>
    hasPrefix(pathname, p)
  )
  if (noTranslationPage) return

  const pathnameHasLocale = locales.some((locale) =>
    hasPrefix(pathname, `/${locale}`)
  )
  if (pathnameHasLocale) return

  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next).*)'],
}
