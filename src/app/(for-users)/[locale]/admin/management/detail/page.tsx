'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '~/utils/supabase/client'
import { PagePropsWithLocale } from '~/i18n/types'
import { PageHeaderSection } from '~/components/custom/page-header-section'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'

type MemberRow = {
  id: string
  userAddr: string
  created_at: string
}

export default function ManagementDetailPage({
  params: { locale },
}: PagePropsWithLocale<{}>) {
  const supabase = createClient()
  const searchParams = useSearchParams()
  const daoId = searchParams.get('daoId') ?? ''

  const [members, setMembers] = useState<MemberRow[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchMembers = async () => {
      if (!daoId) {
        setMembers([])
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      const { data } = await supabase
        .from('Members')
        .select('id, userAddr, created_at')
        .eq('daoId', daoId)
        .order('created_at', { ascending: true })

      setMembers((data as MemberRow[]) || [])
      setIsLoading(false)
    }

    fetchMembers()
  }, [daoId, supabase])

  return (
    <div className="w-full mx-auto flex flex-col items-center justify-center">
      <div className="flex flex-col w-full items-center justify-center gap-4">
        <PageHeaderSection title="Management Detail" />
        <div className="rounded-xl flex border mt-4 flex-col w-full gap-4 p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold">No</TableHead>
                <TableHead className="font-bold">address</TableHead>
                <TableHead className="font-bold">send_counts</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : members.length > 0 ? (
                members.map((member, index) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-bold">{index + 1}</TableCell>
                    <TableCell className="font-bold">
                      {member.userAddr}
                    </TableCell>
                    <TableCell className="font-bold">0</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">
                    No members found
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
