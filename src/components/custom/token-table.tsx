'use client'

import { formatEther, ZeroAddress } from 'ethers'
import { ExchangeInput } from '~/components/custom/exchange-input'
import { TransferInput } from '~/components/custom/transfer-input'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import { formatString } from '~/components/utils'
import { TOKEN } from '~/i18n/types'

interface TokenTableProps {
  communityTokenInfo: TOKEN[]
  tokens: any[]
  dict: any
  colSpan: boolean
  balance: bigint
  exchangeRates: Record<string, bigint>
  swapAmount: string
  transferAmount: string
  transferAddress: string
  setSwapAmount: (amount: string) => void
  setTransferAmount: (amount: string) => void
  setTransferAddress: (address: string) => void
  handleSwap: (fromToken: TOKEN, toToken: TOKEN) => void
  handleSwapFromLocalToken: (token: string) => void
  handleSwapToLocalToken: (tokenAddress: string) => void
  handleTransfer: (token: `0x${string}`) => void
}

export function TokenTable({
  communityTokenInfo,
  tokens,
  dict,
  colSpan,
  balance,
  exchangeRates,
  swapAmount,
  transferAmount,
  transferAddress,
  setSwapAmount,
  setTransferAmount,
  setTransferAddress,
  handleSwap,
  handleSwapFromLocalToken,
  handleSwapToLocalToken,
  handleTransfer,
}: TokenTableProps) {
  const token = dict?.token ?? {}

  return (
    <div className="border rounded-xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{dict?.token?.name ?? ''}</TableHead>
            <TableHead>{dict?.token?.symbol ?? ''}</TableHead>
            <TableHead>{token.tokenAddress ?? ''}</TableHead>
            <TableHead>{token.balance ?? 'Balance'}</TableHead>
            <TableHead className="max-xl:hidden"></TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {communityTokenInfo &&
            communityTokenInfo.map((token, index) => (
              <TableRow key={index}>
                <TableCell>{token.name}</TableCell>
                <TableCell>{token.symbol}</TableCell>
                <TableCell>{token.address}</TableCell>
                <TableCell>
                  {token.balance ? formatString(formatEther(token.balance)) : 0}
                </TableCell>

                <TableCell className="flex flex-col xl:flex-row font-medium gap-2">
                  <ExchangeInput
                    className="w-full"
                    setSwapAmount={setSwapAmount}
                    handleSwap={(fromToken, toToken) => {
                      if (fromToken.address === ZeroAddress) {
                        handleSwapToLocalToken(toToken.address)
                      } else {
                        if (toToken.address === ZeroAddress) {
                          handleSwapFromLocalToken(fromToken.address)
                        } else {
                          handleSwap(fromToken, toToken)
                        }
                      }
                    }}
                    tokenLists={communityTokenInfo}
                    selectedToken={token}
                    pceBalance={balance}
                    exchangeRates={exchangeRates}
                  />
                </TableCell>
                <TableCell className="max-xl:hidden">
                  <TransferInput
                    className="w-full"
                    setTransferAmount={setTransferAmount}
                    setTransferAddress={setTransferAddress}
                    handleTransfer={() =>
                      handleTransfer(token.address as `0x${string}`)
                    }
                    symbol={token.symbol}
                    maxAmount={
                      token.balance
                        ? Number(formatEther(BigInt(token.balance)))
                        : 0
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={colSpan ? 6 : 5}>
              {token.totalToken ?? ''}
            </TableCell>
            <TableCell>{tokens && tokens.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}
