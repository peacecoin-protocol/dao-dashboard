'use client'

import { useEffect, useState } from 'react'
import { PagePropsWithLocale, Dictionary, SupabaseDao } from '~/i18n/types'
import { getDict } from '~/i18n/get-dict'
import { PageHeaderSection } from '~/components/custom/page-header-section'
import { createClient } from '~/utils/supabase/client'
import { useAccount } from 'wagmi'
import { shortenAddress } from '~/components/utils'
import { useRouter } from 'next/navigation'
import { PCE_DAO_ID } from '~/app/constants/constants'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'

export default function ForManagementPage({
  params: { locale, ...params },
}: PagePropsWithLocale<{}>) {
  const supabase = createClient()
  const { address } = useAccount()
  const router = useRouter()
  const [dict, setDict] = useState<Dictionary | null>(null)
  const [daos, setDaos] = useState<SupabaseDao[]>([])
  const [isLoading, setIsLoading] = useState(true)

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

  useEffect(() => {
    const fetchDaos = async () => {
      if (!address) {
        setDaos([])
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      const { data } = await supabase
        .from('DAO')
        .select()
        .eq('creator', address)
        .order('created_at', { ascending: false })

      let sortedDaos = (data as SupabaseDao[]) || []
      sortedDaos = sortedDaos.sort((a, b) => {
        if (a.daoId === PCE_DAO_ID) return -1
        if (b.daoId === PCE_DAO_ID) return 1
        return 0
      })
      setDaos(sortedDaos)
      setIsLoading(false)
    }

    fetchDaos()
  }, [address, supabase])

  const managementDict = dict?.management ?? {}

  return (
    <div className="w-full mx-auto flex flex-col items-center justify-center">
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <PageHeaderSection title={managementDict.title ?? 'Management'} />
        <div className="flex w-full flex-col gap-4 rounded-xl border p-4">
          <div className="hidden w-full md:block">
            <div className="w-full">
              <Table>
                <TableHeader className="sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
                  <TableRow>
                    <TableHead className="font-bold">
                      {managementDict.tableNo ?? 'No'}
                    </TableHead>
                    <TableHead className="font-bold">
                      {managementDict.daoName ?? 'DAO Name'}
                    </TableHead>
                    <TableHead className="font-bold">
                      {managementDict.daoId ?? 'DAO ID'}
                    </TableHead>
                    <TableHead className="font-bold">
                      {managementDict.createdAt ?? 'Created At'}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center">
                        {managementDict.loading ?? 'Loading...'}
                      </TableCell>
                    </TableRow>
                  ) : daos.length > 0 ? (
                    daos.map((dao, index) => (
                      <TableRow
                        key={dao.id}
                        className="cursor-pointer transition-colors hover:bg-muted/60"
                        onClick={() =>
                          router.push(
                            `/${locale}/admin/management/detail?daoId=${dao.daoId}`
                          )
                        }
                      >
                        <TableCell className="py-3">
                          <span className="text-xs text-muted-foreground">
                            #{index + 1}
                          </span>
                        </TableCell>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{dao.daoName}</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs">
                            {shortenAddress(dao.daoId, 12)}
                          </span>
                        </TableCell>
                        <TableCell className="font-medium">
                          {new Date(dao.created_at).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center">
                        {managementDict.noDaos ?? 'No DAOs found'}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="flex w-full max-w-full flex-col gap-3 md:hidden">
            {isLoading ? (
              <div className="rounded-lg border px-4 py-6 text-center text-sm">
                {managementDict.loading ?? 'Loading...'}
              </div>
            ) : daos.length > 0 ? (
              daos.map((dao, index) => (
                <button
                  type="button"
                  key={dao.id}
                  className="flex w-full flex-col gap-3 rounded-lg border p-4 text-left shadow-sm transition hover:border-primary/40"
                  onClick={() =>
                    router.push(
                      `/${locale}/admin/management/detail?daoId=${dao.daoId}`
                    )
                  }
                >
                  <div className="flex min-w-0 items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-2">
                      <span className="text-xs text-muted-foreground shrink-0">
                        #{index + 1}
                      </span>
                      <span className="min-w-0 truncate text-base font-semibold">
                        {dao.daoName}
                      </span>
                    </div>
                    <div className="shrink-0 rounded-full border px-2 py-0.5 text-xs">
                      {managementDict.daoId ?? 'DAO ID'}
                    </div>
                  </div>
                  <div className="w-full text-xs text-muted-foreground break-all">
                    {dao.daoId}
                  </div>
                  <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                    <span>{managementDict.createdAt ?? 'Created At'}</span>
                    <span className="break-words">
                      {new Date(dao.created_at).toLocaleString()}
                    </span>
                  </div>
                </button>
              ))
            ) : (
              <div className="rounded-lg border px-4 py-6 text-center text-sm">
                {managementDict.noDaos ?? 'No DAOs found'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
