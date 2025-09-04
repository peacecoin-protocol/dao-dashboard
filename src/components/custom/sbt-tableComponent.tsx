'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import Image from 'next/image'
import { timestampToDate } from '../utils'
import { ActionInfo } from '~/i18n/types'
import { Button } from '~/components/custom/button'

export interface SBTInfo {
  tokenId: string
  name: string
  description: string
  votingPower: string
  image: string
  createdAt: string
  isRevoked: boolean
  isSBT: boolean
}

interface SBTTableProps {
  headers: string[]
  sbtInfo: SBTInfo[]
  action?: ActionInfo
  onRevoke?: (index: number) => void
}

export function SBTTableComponent({
  headers,
  sbtInfo,
  action,
  onRevoke,
}: SBTTableProps) {
  const handleRevoke = (index: number) => {
    onRevoke?.(index)
  }
  return (
    <div className="border rounded-xl w-full">
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
                    src={sbt.image}
                    alt={sbt.name}
                    width={128}
                    height={128}
                  />
                </TableCell>
                <TableCell className="text-center">{sbt.name}</TableCell>
                <TableCell className="text-center">{sbt.description}</TableCell>
                <TableCell className="text-center">{sbt.tokenId}</TableCell>
                <TableCell className="text-center">{sbt.votingPower}</TableCell>
                <TableCell className="text-center">
                  {timestampToDate(Number(sbt.createdAt))}
                </TableCell>
                {action && (
                  <TableCell className="text-center">
                    <Button onClick={() => handleRevoke?.(index)}>
                      {sbt.isRevoked ? 'Unrevoke' : 'Revoke'}
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
  )
}
