import { useMemo, useState, type FormEvent, type MouseEvent } from 'react'
import { batchMint, listTokens, scheduleIssuance } from '../api/sbtClient'
import type {
  ApiResponse,
  BatchMintData,
  MintableTokenItem,
  ScheduledIssuanceItem,
} from '../types/api'
import { defaultWalletAddress } from '../config/environment'
import { useContractSelection } from '../hooks/useContractSelection'
import { resolveTokenImageUrl, sortMintableTokens } from '../utils/tokenDisplay'
import { AssetTypeSelect } from './AssetTypeSelect'
import { ContractSelect } from './ContractSelect'
import { EnvironmentSelect } from './EnvironmentSelect'
import { ResultPanel } from './ResultPanel'
import { WalletAddressField } from './WalletAddressField'

interface SelectedToken {
  dbId: number
  tokenId: string
  amount: string
}

type MintMode = 'now' | 'schedule'

function minScheduleValue(): string {
  const date = new Date(Date.now() + 5 * 60 * 1000)
  date.setSeconds(0, 0)
  const offset = date.getTimezoneOffset()
  const local = new Date(date.getTime() - offset * 60 * 1000)
  return local.toISOString().slice(0, 16)
}

export function BatchMintForm({
  signerPrivateKey,
}: {
  signerPrivateKey: string
}) {
  const [to, setTo] = useState(defaultWalletAddress)
  const [availableTokens, setAvailableTokens] = useState<MintableTokenItem[]>(
    []
  )
  const [tokensLoaded, setTokensLoaded] = useState(false)
  const [selected, setSelected] = useState<Record<number, SelectedToken>>({})
  const [loadingTokens, setLoadingTokens] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ApiResponse<
    BatchMintData | ScheduledIssuanceItem
  > | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [mintMode, setMintMode] = useState<MintMode>('now')
  const [executeAt, setExecuteAt] = useState('')

  const sortedTokens = useMemo(
    () => sortMintableTokens(availableTokens),
    [availableTokens]
  )
  const selectedList = useMemo(() => Object.values(selected), [selected])

  function resetTokenSelection() {
    setAvailableTokens([])
    setTokensLoaded(false)
    setSelected({})
  }
  const {
    environment,
    assetType,
    selectedContract,
    handleEnvironmentChange,
    handleAssetTypeChange,
    handleContractChange,
  } = useContractSelection({
    onSelectionChange: resetTokenSelection,
  })

  async function loadTokens(contract = selectedContract) {
    if (!contract) {
      setError('Select a contract first.')
      return
    }

    setLoadingTokens(true)
    setError(null)
    resetTokenSelection()

    try {
      const response = await listTokens({
        environment,
        assetType,
        daoId: contract.daoId,
      })

      if (response.success && response.data) {
        setAvailableTokens(response.data.items)
        setTokensLoaded(true)
        return
      }

      setError(response.message || 'Failed to load tokens.')
    } finally {
      setLoadingTokens(false)
    }
  }

  async function handleLoadTokens(e: FormEvent) {
    e.preventDefault()
    await loadTokens()
  }

  function setTokenSelected(token: MintableTokenItem, checked: boolean) {
    setSelected((prev) => {
      const next = { ...prev }
      if (checked) {
        next[token.dbId] = {
          dbId: token.dbId,
          tokenId: token.tokenId,
          amount: prev[token.dbId]?.amount ?? '1',
        }
      } else {
        delete next[token.dbId]
      }
      return next
    })
  }

  function updateAmount(dbId: number, tokenId: string, amount: string) {
    setSelected((prev) => ({
      ...prev,
      [dbId]: { dbId, tokenId, amount },
    }))
  }

  function selectAll() {
    setSelected(
      Object.fromEntries(
        sortedTokens.map((token) => [
          token.dbId,
          {
            dbId: token.dbId,
            tokenId: token.tokenId,
            amount: selected[token.dbId]?.amount ?? '1',
          },
        ])
      )
    )
  }

  function clearSelection() {
    setSelected({})
  }

  function handleRowClick(token: MintableTokenItem) {
    setTokenSelected(token, !selected[token.dbId])
  }

  function stopRowToggle(event: MouseEvent) {
    event.stopPropagation()
  }

  async function handleMint(e: FormEvent) {
    e.preventDefault()

    if (!selectedContract) {
      setError('Select a contract first.')
      return
    }

    if (selectedList.length === 0) {
      setError('Select at least one token to mint.')
      return
    }

    if (!signerPrivateKey.trim()) {
      setError('A signer private key is required for mint requests.')
      return
    }

    let executeAtIso: string | null = null
    if (mintMode === 'schedule') {
      if (!executeAt) {
        setError('Pick a date and time for the scheduled mint.')
        return
      }

      const executeDate = new Date(executeAt)
      if (
        Number.isNaN(executeDate.getTime()) ||
        executeDate.getTime() <= Date.now()
      ) {
        setError('Scheduled time must be in the future.')
        return
      }

      executeAtIso = executeDate.toISOString()
    }

    setLoading(true)
    setError(null)
    setResult(null)

    const request = {
      signerPrivateKey,
      environment,
      sbtAddress: selectedContract.contractAddress,
      to,
      tokens: selectedList.map((entry) => ({
        id: entry.tokenId,
        amount: entry.amount.trim(),
      })),
    }

    try {
      const response = executeAtIso
        ? await scheduleIssuance({ ...request, executeAt: executeAtIso })
        : await batchMint(request)
      setResult(response)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="card batch-mint-card">
      <div className="card-intro">
        <h2>Batch Mint</h2>
        <p className="muted">
          Select tokens already created in Supabase and mint them to a receiver
          wallet.
        </p>
        <p className="muted">
          Scheduled mints store the signer key in Supabase so the backend
          scheduler can execute the transaction later.
        </p>
      </div>

      <form onSubmit={handleLoadTokens} className="batch-mint-form">
        <section className="form-section">
          <h3 className="form-section-title">DAO lookup</h3>
          <div className="form-section-grid">
            <EnvironmentSelect
              value={environment}
              onChange={handleEnvironmentChange}
            />
            <AssetTypeSelect
              value={assetType}
              onChange={handleAssetTypeChange}
            />
            <ContractSelect
              environment={environment}
              assetType={assetType}
              value={selectedContract?.daoId ?? ''}
              onChange={handleContractChange}
            />
          </div>
          <button
            type="submit"
            className="btn-secondary"
            disabled={loadingTokens || !selectedContract}
          >
            {loadingTokens ? 'Loading tokens…' : 'Load tokens'}
          </button>
        </section>
      </form>

      {tokensLoaded && availableTokens.length === 0 && selectedContract && (
        <p className="empty-list-message">
          No {assetType === 'nft' ? 'NFT' : 'SBT'} tokens available to mint for
          this contract. Create tokens on the Create SBT tab first.
        </p>
      )}

      {availableTokens.length > 0 && selectedContract && (
        <form onSubmit={handleMint} className="batch-mint-form">
          <section className="form-section">
            <h3 className="form-section-title">Mint settings</h3>
            <div className="form-section-grid">
              <label className="field field-span-2">
                <span>Contract address</span>
                <input value={selectedContract.contractAddress} readOnly />
              </label>
              <WalletAddressField
                className="field field-span-2"
                label="Receiver wallet"
                value={to}
                onChange={setTo}
              />
            </div>
          </section>

          <section className="form-section">
            <h3 className="form-section-title">When to mint</h3>
            <div
              className="mint-mode-toggle"
              role="radiogroup"
              aria-label="When to mint"
            >
              <label
                className={`mint-mode-option${mintMode === 'now' ? ' is-active' : ''}`}
              >
                <input
                  type="radio"
                  name="mint-mode"
                  checked={mintMode === 'now'}
                  onChange={() => setMintMode('now')}
                />
                <span>Mint now</span>
              </label>
              <label
                className={`mint-mode-option${mintMode === 'schedule' ? ' is-active' : ''}`}
              >
                <input
                  type="radio"
                  name="mint-mode"
                  checked={mintMode === 'schedule'}
                  onChange={() => setMintMode('schedule')}
                />
                <span>Schedule</span>
              </label>
            </div>

            {mintMode === 'schedule' && (
              <div className="form-section-grid">
                <label className="field field-span-2">
                  <span>Execute at (your local time)</span>
                  <input
                    type="datetime-local"
                    value={executeAt}
                    min={minScheduleValue()}
                    onChange={(e) => setExecuteAt(e.target.value)}
                    required
                  />
                </label>
                <p className="muted field-span-2">
                  The backend stores the signer with the scheduled job and
                  checks for due issuances about once a minute.
                </p>
              </div>
            )}
          </section>

          <section className="form-section">
            <h3 className="form-section-title">Select tokens</h3>
            <div className="token-picker-toolbar">
              <span className="token-picker-count">
                {selectedList.length} of {sortedTokens.length} selected
              </span>
              <button
                type="button"
                className="btn-secondary"
                onClick={selectAll}
              >
                Select all
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={clearSelection}
                disabled={selectedList.length === 0}
              >
                Clear
              </button>
            </div>

            <div className="token-picker-list">
              {sortedTokens.map((token) => {
                const imageUrl = resolveTokenImageUrl(token.image)
                const isSelected = Boolean(selected[token.dbId])
                return (
                  <div
                    key={token.dbId}
                    className={`token-picker-row${isSelected ? ' is-selected' : ''}`}
                    onClick={() => handleRowClick(token)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        handleRowClick(token)
                      }
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={(e) =>
                        setTokenSelected(token, e.target.checked)
                      }
                      onClick={stopRowToggle}
                      aria-label={`Select ${token.name}`}
                    />
                    <div
                      className={`token-picker-thumb${imageUrl ? '' : ' placeholder'}`}
                    >
                      {imageUrl ? <img src={imageUrl} alt="" /> : 'No image'}
                    </div>
                    <div className="token-picker-meta">
                      <strong>{token.name}</strong>
                      <span className="muted">ID {token.tokenId}</span>
                    </div>
                    <div
                      className="token-picker-amount"
                      onClick={stopRowToggle}
                    >
                      <span>Amount</span>
                      <input
                        type="text"
                        inputMode="numeric"
                        disabled={!isSelected}
                        value={selected[token.dbId]?.amount ?? '1'}
                        onChange={(e) =>
                          updateAmount(
                            token.dbId,
                            token.tokenId,
                            e.target.value
                          )
                        }
                        aria-label={`Amount for ${token.name}`}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          <button
            type="submit"
            className="btn-primary"
            disabled={loading || selectedList.length === 0}
          >
            {loading
              ? mintMode === 'schedule'
                ? 'Scheduling…'
                : 'Minting…'
              : `${mintMode === 'schedule' ? 'Schedule' : 'Mint'} ${selectedList.length} token${selectedList.length === 1 ? '' : 's'}`}
          </button>
        </form>
      )}

      <ResultPanel
        title="Result"
        data={result}
        error={error}
        loading={loading}
      />
    </section>
  )
}
