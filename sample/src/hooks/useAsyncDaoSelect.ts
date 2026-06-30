import { useEffect, useState } from 'react'
import type { ApiResponse } from '../types/api'

export function useAsyncDaoSelect<T>(
  fetchItems: () => Promise<ApiResponse<{ items: T[] }>>,
  deps: unknown[],
  fallbackError: string
) {
  const [items, setItems] = useState<T[]>([])
  const [loading, setLoading] = useState(false)
  const [loadError, setLoadError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setItems([])
      setLoadError(null)

      try {
        const response = await fetchItems()
        if (cancelled) {
          return
        }

        if (response.success && response.data) {
          setItems(response.data.items)
          return
        }

        setItems([])
        setLoadError(response.message || fallbackError)
      } catch {
        if (cancelled) {
          return
        }
        setItems([])
        setLoadError(fallbackError)
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    void load()

    return () => {
      cancelled = true
    }
  }, deps)

  return { items, loading, loadError }
}
