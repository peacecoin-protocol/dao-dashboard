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
import { fetchMetadata, timestampToDate } from '../utils'
import { ActionInfo, Metadata } from '~/i18n/types'
import { Button } from '~/components/ui/button'
import { Env } from '~/env'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { EMPTY_NFT_IMAGE } from '~/app/constants/constants'

export interface SBTInfo {
  tokenId: string
  tokenURI: string
  creator: string
  daoId: string
  balance: string
  votingPower: string
  createdAt: string
  isRevoked: boolean
  isSBT: boolean
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

  const [metadata, setMetadata] = useState<Metadata[]>([])

  useEffect(() => {
    const loadMetadata = async () => {
      const metadata: Metadata[] = []

      for (const sbt of sbtInfo) {
        try {
          const _metadata: Metadata = await fetchMetadata(
            `${Env.PINATA_GATEWAY_URL}/ipfs/${sbt.tokenURI}?pinataGatewayToken=${Env.PINATA_GATEWAY_TOKEN}`
          )

          metadata.push({
            tokenId: sbt.tokenId,
            image: `${Env.PINATA_GATEWAY_URL}/ipfs/${_metadata.image}?pinataGatewayToken=${Env.PINATA_GATEWAY_TOKEN}`,
            name: _metadata.name,
            description: _metadata.description,
          })
        } catch (error) {
          metadata.push({
            tokenId: sbt.tokenId,
            image: EMPTY_NFT_IMAGE,
            name: '',
            description: '',
          })
        }
      }
      setMetadata(metadata)
    }
    loadMetadata()
  }, [sbtInfo])

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
            metadata &&
            metadata.length > 0 &&
            sbtInfo.map((sbt, index) => (
              <TableRow key={index}>
                <TableCell className="text-center">
                  {sbt.isSBT ? 'SBT' : 'NFT'}
                </TableCell>

                <TableCell className="text-center items-center flex justify-center">
                  <Image
                    src={metadata[index]?.image || '/images/empty-nft.svg'}
                    alt={metadata[index]?.name || ''}
                    width={128}
                    height={128}
                  />
                </TableCell>
                <TableCell className="text-center">
                  {metadata[index]?.name}
                </TableCell>
                <TableCell className="text-center">
                  {metadata[index]?.description}
                </TableCell>
                <TableCell className="text-center">{sbt.tokenId}</TableCell>
                <TableCell className="text-center">{sbt.balance}</TableCell>
                <TableCell className="text-center">{sbt.votingPower}</TableCell>
                <TableCell className="text-center">
                  {timestampToDate(Number(sbt.createdAt))}
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
