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
import { ActionInfo } from '~/i18n/types'
import { Button } from '~/components/ui/button'
import Image from 'next/image'
import { EMPTY_NFT_IMAGE } from '~/app/constants/constants'
import { shortenAddress } from '../utils'
import { Env } from '~/env'
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
  const handleRevoke = (token: SBTInfo) => {
    onRevoke?.(token)
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
                    src={
                      `${Env.PINATA_GATEWAY_URL}/ipfs/${sbt.image}?pinataGatewayToken=${Env.PINATA_GATEWAY_TOKEN}` ||
                      EMPTY_NFT_IMAGE
                    }
                    alt={sbt.name || ''}
                    width={128}
                    height={128}
                  />
                </TableCell>
                <TableCell className="text-center">{sbt.name}</TableCell>
                <TableCell className="text-center">{sbt.description}</TableCell>
                <TableCell className="text-center">{sbt.tokenId}</TableCell>
                <TableCell className="text-center">
                  {sbt.balance ? sbt.balance : '0'}
                </TableCell>
                <TableCell className="text-center">{sbt.votingPower}</TableCell>
                <TableCell className="text-center">
                  {shortenAddress(sbt.daoId)}
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
