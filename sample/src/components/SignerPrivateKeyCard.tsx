import { useState } from 'react'

export function SignerPrivateKeyCard({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) {
  const [showValue, setShowValue] = useState(false)

  return (
    <section className="card">
      <div className="card-intro">
        <h2>Transaction Signer</h2>
        <p className="muted">
          Enter the signer private key used for token creation and minting. It
          is sent to the backend per request.
        </p>
        <p className="muted">
          Immediate transactions use it once. Scheduled mints save it with the
          job in Supabase so the backend can execute the transaction later.
        </p>
      </div>

      <div className="form-section">
        <label className="field">
          <span>Signer private key</span>
          <input
            type={showValue ? 'text' : 'password'}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="0x..."
            autoComplete="off"
            spellCheck={false}
          />
          <span className="field-hint">
            Do not store production private keys in source code, localStorage,
            or client env files.
          </span>
        </label>

        <div className="button-row">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => setShowValue((current) => !current)}
          >
            {showValue ? 'Hide key' : 'Show key'}
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => onChange('')}
            disabled={!value}
          >
            Clear key
          </button>
        </div>
      </div>
    </section>
  )
}
