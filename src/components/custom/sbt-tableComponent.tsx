'use client'

import { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import { ActionInfo } from '~/i18n/types'
import { Button } from '~/components/ui/button'
import Image from 'next/image'
import { EMPTY_NFT_IMAGE } from '~/app/constants/constants'
import { shortenAddress } from '../utils'
import { Env } from '~/env'
import { createClient } from '~/utils/supabase/client'
export interface SBTInfo {
  tokenId: string
  creator: string
  daoId: string
  balance: string
  votingPower: string
  isRevoked: boolean
  isSBT: boolean
  description: string
  name: string
  image: string
  created_at: string
  updated_at: string
}

interface SBTTableProps {
  headers: string[]
  sbtInfo: SBTInfo[]
  action?: ActionInfo
  onRevoke?: (token: SBTInfo) => void
}

export function SBTTableComponent({
  headers,
  sbtInfo,
  action,
  onRevoke,
}: SBTTableProps) {
  const [daoNames, setDaoNames] = useState<Record<string, string>>({})
  const supabase = createClient()

  useEffect(() => {
    const fetchDaoNames = async () => {
      if (!sbtInfo || sbtInfo.length === 0) return

      // Get unique DAO IDs
      const uniqueDaoIds = [...new Set(sbtInfo.map((sbt) => sbt.daoId))]

      // Fetch DAO names for all unique DAO IDs
      try {
        const { data, error } = await supabase
          .from('DAO')
          .select('daoId, daoName')
          .in('daoId', uniqueDaoIds)

        if (error) {
          console.error('Error fetching DAO names:', error)
          return
        }

        // Create a map of daoId -> daoName
        const daoNameMap: Record<string, string> = {}
        if (data) {
          data.forEach((dao) => {
            daoNameMap[dao.daoId] = dao.daoName
          })
        }
        setDaoNames(daoNameMap)
      } catch (error) {
        console.error('Error fetching DAO names:', error)
      }
    }

    fetchDaoNames()
  }, [sbtInfo, supabase])

  const handleRevoke = (token: SBTInfo) => {
    onRevoke?.(token)
  }

  const getImageSrc = (image?: string) => {
    if (!image) return EMPTY_NFT_IMAGE
    return `${Env.PINATA_GATEWAY_URL}/ipfs/${image}?pinataGatewayToken=${Env.PINATA_GATEWAY_TOKEN}`
  }

  const getDaoDisplay = (daoId: string) => {
    const daoName = daoNames[daoId]
    if (daoName) {
      return `${daoName} (${shortenAddress(daoId)})`
    }
    return shortenAddress(daoId)
  }
  return (
    <div className="w-full space-y-6">
      <div className="hidden border rounded-xl w-full lg:block">
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((header, index) => (
                <TableHead key={index} className="text-center">
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sbtInfo &&
              sbtInfo.map((sbt, index) => (
                <TableRow key={index}>
                  <TableCell className="text-center">
                    {sbt.isSBT ? 'SBT' : 'NFT'}
                  </TableCell>

                  <TableCell className="text-center items-center flex justify-center">
                    <Image
                      src={getImageSrc(sbt.image)}
                      alt={sbt.name || ''}
                      width={128}
                      height={128}
                    />
                  </TableCell>
                  <TableCell className="text-center">{sbt.name}</TableCell>
                  <TableCell className="text-center">
                    {sbt.description}
                  </TableCell>
                  <TableCell className="text-center">{sbt.tokenId}</TableCell>
                  <TableCell className="text-center">
                    {sbt.balance ? sbt.balance : '0'}
                  </TableCell>
                  <TableCell className="text-center">
                    {sbt.votingPower}
                  </TableCell>
                  <TableCell className="text-center">
                    {getDaoDisplay(sbt.daoId)}
                  </TableCell>
                  <TableCell className="text-center">
                    {sbt.created_at
                      ? new Date(sbt.created_at).toLocaleString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : '-'}
                  </TableCell>
                  {action && (
                    <TableCell className="text-center">
                      <Button onClick={() => handleRevoke(sbt)}>
                        {sbt.isRevoked
                          ? action.title.unrevoke
                          : action.title.revoke}
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell
                colSpan={headers.length}
                className="text-center font-medium"
              >
                Total: {(sbtInfo && sbtInfo.length) ?? '0'}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      <div className="space-y-4 lg:hidden">
        {sbtInfo && sbtInfo.length > 0 ? (
          sbtInfo.map((sbt, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/70 p-4 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <Image
                    src={getImageSrc(sbt.image)}
                    alt={sbt.name || ''}
                    width={96}
                    height={96}
                    className="h-24 w-24 object-cover"
                    sizes="(max-width: 768px) 96px, 128px"
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-300">
                    {sbt.isSBT ? 'SBT' : 'NFT'}
                  </span>
                  <p className="text-base font-semibold text-gray-900 dark:text-white">
                    {sbt.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                    {sbt.description}
                  </p>
                </div>
              </div>

              <dl className="mt-4 grid grid-cols-2 gap-3 text-sm text-gray-600 dark:text-gray-300">
                <div>
                  <dt className="font-semibold text-gray-800 dark:text-white">
                    Token ID
                  </dt>
                  <dd>{sbt.tokenId}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-800 dark:text-white">
                    Balance
                  </dt>
                  <dd>{sbt.balance ?? '0'}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-800 dark:text-white">
                    Voting Power
                  </dt>
                  <dd>{sbt.votingPower}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-800 dark:text-white">
                    DAO
                  </dt>
                  <dd>{getDaoDisplay(sbt.daoId)}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-800 dark:text-white">
                    Created At
                  </dt>
                  <dd>
                    {sbt.created_at
                      ? new Date(sbt.created_at).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: '2-digit',
                        })
                      : '-'}
                  </dd>
                </div>
              </dl>

              {action && (
                <Button
                  onClick={() => handleRevoke(sbt)}
                  className="mt-4 w-full"
                >
                  {sbt.isRevoked ? action.title.unrevoke : action.title.revoke}
                </Button>
              )}
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/40 p-4 text-center text-sm text-gray-600 dark:text-gray-300">
            No tokens available
          </div>
        )}
      </div>
    </div>
  )
}
