import { useEffect, useState } from 'react'

export function usePagination<T>(items: T[], pageSize: number) {
  const [page, setPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize))
  const safePage = Math.min(page, totalPages)
  const startIndex = (safePage - 1) * pageSize

  useEffect(() => {
    setPage(1)
  }, [items.length])

  return {
    page: safePage,
    totalPages,
    pageItems: items.slice(startIndex, startIndex + pageSize),
    goToNextPage: () => setPage((p) => Math.min(totalPages, p + 1)),
    goToPrevPage: () => setPage((p) => Math.max(1, p - 1)),
  }
}
