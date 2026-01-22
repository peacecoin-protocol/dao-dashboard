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
      <div className="flex flex-col w-full items-center justify-center gap-4">
        <PageHeaderSection title={managementDict.title ?? 'Management'} />
        <div className="rounded-xl flex border mt-4 flex-col w-full gap-4 p-4">
          <Table>
            <TableHeader>
              <TableRow>
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
                  <TableCell colSpan={3} className="text-center">
                    {managementDict.loading ?? 'Loading...'}
                  </TableCell>
                </TableRow>
              ) : daos.length > 0 ? (
                daos.map((dao) => (
                  <TableRow
                    key={dao.id}
                    className="cursor-pointer"
                    onClick={() =>
                      router.push(
                        `/${locale}/admin/management/detail?daoId=${dao.daoId}`
                      )
                    }
                  >
                    <TableCell className="font-bold">{dao.daoName}</TableCell>
                    <TableCell className="font-bold">
                      {shortenAddress(dao.daoId, 12)}
                    </TableCell>
                    <TableCell className="font-bold">
                      {new Date(dao.created_at).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">
                    {managementDict.noDaos ?? 'No DAOs found'}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
