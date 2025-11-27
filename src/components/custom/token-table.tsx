'use client'

import { formatEther, ZeroAddress } from 'ethers'
import { ExchangeInput } from '~/components/custom/exchange-input'
import { TokenInfoCell } from '~/components/custom/token-info-cell'
import { TransferInput } from '~/components/custom/transfer-input'
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
      <div className="flex flex-col gap-4 p-4">
        {hasTokens ? (
          communityTokenInfo.map((tokenInfo, index) => (
            <div
              key={`mobile-token-${index}`}
              className="rounded-lg border p-4 shadow-sm gap-4 flex items-center justify-between"
            >
              <div className="flex-1 flex flex-col gap-4">
                <TokenInfoCell
                  label={tokenLabels.name ?? 'Name'}
                  value={tokenInfo.name}
                />
                <TokenInfoCell
                  label={tokenLabels.symbol ?? 'Symbol'}
                  value={tokenInfo.symbol}
                />
                <TokenInfoCell
                  label={tokenLabels.tokenAddress ?? 'Token Address'}
                  value={tokenInfo.address}
                  valueClassName="break-all"
                />
                <TokenInfoCell
                  label={tokenLabels.balance ?? 'Balance'}
                  value={
                    tokenInfo.balance
                      ? formatString(formatEther(tokenInfo.balance))
                      : '0'
                  }
                />
              </div>

              <div className="flex flex-col gap-4 items-center">
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

        <div className="rounded-lg border p-4 text-sm font-bold">
          <div className="flex items-center justify-between">
            <span>{tokenLabels.totalToken ?? ''}</span>
            <span>{tokens ? tokens.length : 0}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
