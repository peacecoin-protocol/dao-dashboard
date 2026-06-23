import { useMemo, useState, type FormEvent } from 'react'
import { getWalletBalances } from '../api/sbtClient'
import { defaultWalletAddress } from '../config/environment'
import type {
  ApiResponse,
  WalletBalanceItem,
  WalletBalancesData,
} from '../types/api'
import { useContractSelection } from '../hooks/useContractSelection'
import {
  formatVotingPowerToEther,
  resolveTokenImageUrl,
  sortItemsByTokenId,
} from '../utils/tokenDisplay'
import { AssetTypeSelect } from './AssetTypeSelect'
import { ContractSelect } from './ContractSelect'
import { EnvironmentSelect } from './EnvironmentSelect'
import { ResultPanel } from './ResultPanel'
import { WalletAddressField } from './WalletAddressField'

function BalanceCardGrid({
  items,
  assetLabel,
}: {
  items: WalletBalanceItem[]
  assetLabel: string
}) {
  if (items.length === 0) {
    return null
  }

  return (
    <section className="balance-section">
      <h3 className="balance-section-title">{assetLabel}</h3>
      <div className="balance-grid">
        {items.map((item) => {
          const imageUrl = resolveTokenImageUrl(item.image)
          return (
            <article key={item.dbId} className="badge owned">
              {imageUrl ? (
                <img
                  className="badge-image"
                  src={imageUrl}
                  alt={item.name}
                  loading="lazy"
                />
              ) : (
                <div
                  className="badge-image badge-image--placeholder"
                  aria-hidden="true"
                />
              )}
              <span className={`asset-type-pill${item.isSBT ? '' : ' nft'}`}>
                {item.isSBT ? 'SBT' : 'NFT'}
              </span>
              <h4>{item.name}</h4>
              <p>Token ID: {item.tokenId}</p>
              <p>Balance: {item.balance}</p>
              <p>Voting Power: {formatVotingPowerToEther(item.votingPower)}</p>
              <span className="status">Owned</span>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export function WalletBalancesForm() {
  const [walletAddress, setWalletAddress] = useState(defaultWalletAddress)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ApiResponse<WalletBalancesData> | null>(
    null
  )
  const [error, setError] = useState<string | null>(null)

  const items = useMemo(() => {
    if (!result?.success || !result.data) {
      return [] as WalletBalanceItem[]
    }
    return sortItemsByTokenId(result.data.items)
  }, [result])

  function resetResults() {
    setResult(null)
    setError(null)
  }
  const {
    environment,
    assetType,
    selectedContract,
    handleEnvironmentChange,
    handleAssetTypeChange,
    handleContractChange,
  } = useContractSelection({
    onSelectionChange: resetResults,
  })

  const assetLabel = assetType === 'nft' ? 'NFT Balances' : 'SBT Balances'

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    if (!selectedContract) {
      setError(`Select an ${assetType.toUpperCase()} contract first.`)
      return
    }

    setLoading(true)
    resetResults()

    try {
      const response = await getWalletBalances({
        walletAddress,
        environment,
        assetType,
        daoId: selectedContract.daoId,
      })
      setResult(response)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="card">
      <h2>Get Balance</h2>
      <p className="muted form-section-subtitle">
        View owned tokens for a wallet on any SBT or NFT contract in this
        environment.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-section-grid wallet-balances-grid">
          <EnvironmentSelect
            value={environment}
            onChange={handleEnvironmentChange}
          />
          <AssetTypeSelect value={assetType} onChange={handleAssetTypeChange} />
          <ContractSelect
            environment={environment}
            assetType={assetType}
            value={selectedContract?.daoId ?? ''}
            onChange={handleContractChange}
          />
        </div>
        <WalletAddressField
          label="Wallet Address"
          value={walletAddress}
          onChange={setWalletAddress}
        />
        <button
          type="submit"
          className="btn-primary"
          disabled={loading || !selectedContract}
        >
          {loading ? 'Fetching…' : 'Get Balances'}
        </button>
      </form>

      {items.length > 0 && (
        <div className="balance-results">
          <BalanceCardGrid items={items} assetLabel={assetLabel} />
        </div>
      )}

      {result?.success && items.length === 0 && (
        <p className="muted empty-balances">
          No owned {assetType === 'nft' ? 'NFTs' : 'SBTs'} found for this wallet
          on the selected contract.
        </p>
      )}

      <ResultPanel
        title="API Response"
        data={result}
        error={error}
        loading={loading}
      />
    </section>
  )
}
