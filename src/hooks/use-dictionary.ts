import { useEffect, useState } from 'react'
import { getDict } from '~/i18n/get-dict'
import { type Dictionary, type Locale } from '~/i18n/types'

export function useDictionary(locale: Locale) {
  const [dict, setDict] = useState<Dictionary | null>(null)

  useEffect(() => {
    let cancelled = false

    const fetchDict = async () => {
      try {
        const fetchedDict = await getDict(locale)
        if (!cancelled) {
          setDict(fetchedDict)
        }
      } catch (error) {
        console.error('Error fetching dictionary:', error)
      }
    }

    fetchDict()

    return () => {
      cancelled = true
    }
  }, [locale])

  return dict
}
