import React from 'react'

import NextLink from 'next/link'

import { i18nIgnorePrefixList } from './ignore-prefix-list'

export const Link = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<typeof NextLink> & { locale: 'en' | 'ja' }
>(({ locale, href, ...props }, ref) => {
  const hrefStr = String(href)
  const localizedHref = i18nIgnorePrefixList.some(
    (p) => hrefStr === p || hrefStr.startsWith(p + '/')
  )
    ? hrefStr
    : `/${locale}${hrefStr}`
  return <NextLink ref={ref} href={localizedHref} {...props} />
})

Link.displayName = 'Link'
