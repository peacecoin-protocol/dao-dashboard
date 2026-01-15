'use client'

import { useEffect, useState } from 'react'
import { PagePropsWithLocale, Dictionary } from '~/i18n/types'
import { getDict } from '~/i18n/get-dict'
import { PageHeaderSection } from '~/components/custom/page-header-section'

export default function ForManagementPage({
  params: { locale, ...params },
}: PagePropsWithLocale<{}>) {
  const [dict, setDict] = useState<Dictionary | null>(null)

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

  const managementDict = dict?.management ?? {}

  return (
    <div className="w-full mx-auto flex flex-row w-full items-center justify-center content-center">
      <div className="flex flex-col w-full items-center justify-center">
        <PageHeaderSection title={managementDict.title ?? 'Management'} />
      </div>
    </div>
  )
}
