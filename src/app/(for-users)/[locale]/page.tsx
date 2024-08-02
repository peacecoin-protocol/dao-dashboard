'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '~/components/ui/button'
import { Link } from '~/i18n/link'
import { PagePropsWithLocale } from '~/i18n/types'

import { getDict } from '../../../i18n/get-dict'

export default function ForUsersIndexPage({
  params: { locale, ...params },
}: PagePropsWithLocale<{}>) {
  const [dict, setDict] = useState<any>(null)

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

  return (
    <>
      <div className="py-4 flex flex-col items-center">
        <div className="links flex flex-row gap-10 items-center justify-center">
          <Button className="w-40" variant="outline" asChild>
            <Link locale={locale} href="/proposals">
              {dict ? dict.common.navigation.vote : ''}
            </Link>
          </Button>
          <Button className="w-40" variant="outline" asChild>
            <Link locale={locale} href="/token">
              {dict ? dict.common.navigation.token : ''}
            </Link>
          </Button>
          <Button className="w-40" variant="outline" asChild>
            <Link locale={locale} href="/bounty">
              {dict ? dict.common.navigation.bounty : ''}
            </Link>
          </Button>
          <Button className="w-40" variant="outline" asChild>
            <Link locale={locale} href="/pip">
              {dict ? dict.common.navigation.pips : ''}
            </Link>
          </Button>
        </div>
      </div>
    </>
  )
}
