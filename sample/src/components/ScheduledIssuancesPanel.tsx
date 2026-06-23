import { useCallback, useEffect, useState } from 'react';
import { cancelScheduledIssuance, listScheduledIssuances } from '../api/sbtClient';
import type {
  Environment,
  ScheduledIssuanceItem,
  ScheduledIssuanceStatus,
} from '../types/api';
import { EnvironmentSelect } from './EnvironmentSelect';

const STATUS_FILTERS: Array<{ value: ScheduledIssuanceStatus | 'all'; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'processing', label: 'Processing' },
  { value: 'completed', label: 'Completed' },
  { value: 'failed', label: 'Failed' },
  { value: 'cancelled', label: 'Cancelled' },
];

function formatDateTime(iso: string | null): string {
  if (!iso) return '—';
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? iso : date.toLocaleString();
}

function shortenAddress(address: string): string {
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

function CopyTxButton({ txHash }: { txHash: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(txHash);
    } catch {
      // Clipboard API unavailable (non-HTTPS context) — fall back to a hidden textarea.
      const textarea = document.createElement('textarea');
      textarea.value = txHash;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <button
      type="button"
      className={`copy-tx-button${copied ? ' is-copied' : ''}`}
      onClick={() => void handleCopy()}
      title={txHash}
      aria-label={`Copy transaction hash ${txHash}`}
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

export function ScheduledIssuancesPanel() {
  const [environment, setEnvironment] = useState<Environment>('dev');
  const [statusFilter, setStatusFilter] = useState<ScheduledIssuanceStatus | 'all'>('all');
  const [items, setItems] = useState<ScheduledIssuanceItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [cancellingId, setCancellingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await listScheduledIssuances({
        environment,
        status: statusFilter === 'all' ? undefined : statusFilter,
      });
      if (response.success && response.data) {
        setItems(response.data.items);
      } else {
        setItems([]);
        setError(response.message || 'Failed to load scheduled issuances.');
      }
    } catch {
      setItems([]);
      setError('Failed to reach the backend.');
    } finally {
      setLoading(false);
    }
  }, [environment, statusFilter]);

  useEffect(() => {
    void load();
  }, [load]);

  async function handleCancel(id: number) {
    setCancellingId(id);
    setError(null);
    try {
      const response = await cancelScheduledIssuance(id);
      if (!response.success) {
        setError(response.message || 'Failed to cancel issuance.');
      }
      await load();
    } finally {
      setCancellingId(null);
    }
  }

  return (
    <section className="card">
      <div className="card-intro">
        <h2>Scheduled Issuances</h2>
        <p className="muted">
          Batch mints queued for a future time. The backend executes due issuances about once a
          minute. Pending entries can be cancelled.
        </p>
      </div>

      <div className="form-section">
        <div className="form-section-grid">
          <EnvironmentSelect value={environment} onChange={setEnvironment} />
          <label className="field">
            <span>Status</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as ScheduledIssuanceStatus | 'all')}
            >
              {STATUS_FILTERS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button type="button" className="btn-secondary" onClick={() => void load()} disabled={loading}>
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>

      {error && (
        <div className="result-alert result-alert--error" role="alert">
          <p className="result-alert-title">{error}</p>
        </div>
      )}

      {!loading && items.length === 0 && !error && (
        <p className="empty-list-message">
          No scheduled issuances for this environment. Use the Batch Mint tab with the
          “Schedule” option to create one.
        </p>
      )}

      {items.length > 0 && (
        <div className="scheduled-list">
          {items.map((item) => (
            <article key={item.id} className="scheduled-row">
              <div className="scheduled-row-main">
                <span className={`issuance-status issuance-status--${item.status}`}>
                  {item.status}
                </span>
                <div className="scheduled-row-meta">
                  <strong>
                    {item.tokens.length} token{item.tokens.length === 1 ? '' : 's'} →{' '}
                    {shortenAddress(item.to)}
                  </strong>
                  <span className="muted">
                    Contract {shortenAddress(item.sbtAddress)} · Execute at{' '}
                    {formatDateTime(item.executeAt)}
                  </span>
                  <span className="muted">
                    IDs: {item.tokens.map((t) => `${t.id}×${t.amount}`).join(', ')}
                  </span>
                  {item.status === 'completed' && item.mintTransactionHash && (
                    <span className="muted scheduled-row-tx">
                      Tx {shortenAddress(item.mintTransactionHash)}
                      <CopyTxButton txHash={item.mintTransactionHash} />
                    </span>
                  )}
                  {item.status === 'failed' && item.lastError && (
                    <span className="scheduled-row-error">{item.lastError}</span>
                  )}
                </div>
              </div>
              {item.status === 'pending' && (
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => void handleCancel(item.id)}
                  disabled={cancellingId === item.id}
                >
                  {cancellingId === item.id ? 'Cancelling…' : 'Cancel'}
                </button>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
