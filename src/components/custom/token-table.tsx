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
  const tokenLabels = dict?.token ?? {}
  const hasTokens =
    Array.isArray(communityTokenInfo) && communityTokenInfo.length > 0

  return (
    <div className="border rounded-xl">
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{tokenLabels.name ?? ''}</TableHead>
              <TableHead>{tokenLabels.symbol ?? ''}</TableHead>
              <TableHead>{tokenLabels.tokenAddress ?? ''}</TableHead>
              <TableHead>{tokenLabels.balance ?? 'Balance'}</TableHead>
              <TableHead className="max-xl:hidden"></TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {communityTokenInfo &&
              communityTokenInfo.map((tokenInfo, index) => (
                <TableRow key={index}>
                  <TableCell>{tokenInfo.name}</TableCell>
                  <TableCell>{tokenInfo.symbol}</TableCell>
                  <TableCell>{tokenInfo.address}</TableCell>
                  <TableCell>
                    {tokenInfo.balance
                      ? formatString(formatEther(tokenInfo.balance))
                      : 0}
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
                      selectedToken={tokenInfo}
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
                        handleTransfer(tokenInfo.address as `0x${string}`)
                      }
                      symbol={tokenInfo.symbol}
                      maxAmount={
                        tokenInfo.balance
                          ? Number(formatEther(BigInt(tokenInfo.balance)))
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
                {tokenLabels.totalToken ?? ''}
              </TableCell>
              <TableCell>{tokens && tokens.length}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      <div className="flex flex-col gap-4 p-4 md:hidden">
        {hasTokens ? (
          communityTokenInfo.map((tokenInfo, index) => (
            <div
              key={`mobile-token-${index}`}
              className="rounded-lg border p-4 shadow-sm space-y-4"
            >
              <div className="space-y-3 text-sm">
                <div className="flex items-start justify-between gap-4">
                  <span className="text-muted-foreground">
                    {tokenLabels.name ?? ''}
                  </span>
                  <span className="font-medium text-right">
                    {tokenInfo.name}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <span className="text-muted-foreground">
                    {tokenLabels.symbol ?? ''}
                  </span>
                  <span className="font-medium text-right">
                    {tokenInfo.symbol}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <span className="text-muted-foreground">
                    {tokenLabels.tokenAddress ?? ''}
                  </span>
                  <span className="font-medium text-right break-all">
                    {tokenInfo.address}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <span className="text-muted-foreground">
                    {tokenLabels.balance ?? 'Balance'}
                  </span>
                  <span className="font-semibold text-right">
                    {tokenInfo.balance
                      ? formatString(formatEther(tokenInfo.balance))
                      : 0}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
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
                  selectedToken={tokenInfo}
                  pceBalance={balance}
                  exchangeRates={exchangeRates}
                />

                <TransferInput
                  className="w-full"
                  setTransferAmount={setTransferAmount}
                  setTransferAddress={setTransferAddress}
                  handleTransfer={() =>
                    handleTransfer(tokenInfo.address as `0x${string}`)
                  }
                  symbol={tokenInfo.symbol}
                  maxAmount={
                    tokenInfo.balance
                      ? Number(formatEther(BigInt(tokenInfo.balance)))
                      : 0
                  }
                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">
            {tokenLabels.noTokens ?? 'No tokens available.'}
          </p>
        )}

        <div className="rounded-lg border p-4 text-sm font-medium">
          <div className="flex items-center justify-between">
            <span>{tokenLabels.totalToken ?? ''}</span>
            <span>{tokens ? tokens.length : 0}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
