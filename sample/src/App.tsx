import { useState } from 'react'
import { BatchMintForm } from './components/BatchMintForm'
import { CreateSbtForm } from './components/CreateSbtForm'
import { ScheduledIssuancesPanel } from './components/ScheduledIssuancesPanel'
import { SignerPrivateKeyCard } from './components/SignerPrivateKeyCard'
import { WalletBalancesForm } from './components/WalletBalancesForm'

type Tab = 'create' | 'mint' | 'scheduled' | 'balances'

export default function App() {
  const [tab, setTab] = useState<Tab>('create')
  const [signerPrivateKey, setSignerPrivateKey] = useState('')

  return (
    <div className="app">
      <header>
        <h1>PeaceCoin SBT Manager</h1>
        <p>Manage Soulbound Tokens via the SBT Backend API</p>
      </header>

      <nav className="tabs">
        <button
          className={tab === 'create' ? 'active' : ''}
          onClick={() => setTab('create')}
        >
          Create SBT
        </button>
        <button
          className={tab === 'mint' ? 'active' : ''}
          onClick={() => setTab('mint')}
        >
          Batch Mint
        </button>
        <button
          className={tab === 'scheduled' ? 'active' : ''}
          onClick={() => setTab('scheduled')}
        >
          Scheduled
        </button>
        <button
          className={tab === 'balances' ? 'active' : ''}
          onClick={() => setTab('balances')}
        >
          Get Balance
        </button>
      </nav>

      <main>
        {(tab === 'create' || tab === 'mint') && (
          <SignerPrivateKeyCard
            value={signerPrivateKey}
            onChange={setSignerPrivateKey}
          />
        )}
        {tab === 'create' && (
          <CreateSbtForm signerPrivateKey={signerPrivateKey} />
        )}
        {tab === 'mint' && (
          <BatchMintForm signerPrivateKey={signerPrivateKey} />
        )}
        {tab === 'scheduled' && <ScheduledIssuancesPanel />}
        {tab === 'balances' && <WalletBalancesForm />}
      </main>
    </div>
  )
}
