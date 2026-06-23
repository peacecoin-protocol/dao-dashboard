import { listContracts } from '../api/sbtClient';
import { useAsyncDaoSelect } from '../hooks/useAsyncDaoSelect';
import type { AssetType, ContractOption, Environment } from '../types/api';

interface ContractSelectProps {
  environment: Environment;
  assetType: AssetType;
  value: string;
  onChange: (option: ContractOption | null) => void;
}

export function ContractSelect({ environment, assetType, value, onChange }: ContractSelectProps) {
  const { items: contracts, loading, loadError } = useAsyncDaoSelect(
    () => listContracts({ environment, assetType }),
    [environment, assetType],
    'Failed to load contracts.'
  );

  function handleSelect(nextDaoId: string) {
    onChange(contracts.find((item) => item.daoId === nextDaoId) ?? null);
  }

  const label = assetType === 'nft' ? 'NFT contract' : 'SBT contract';

  return (
    <label className="field field-span-2">
      <span>{label}</span>
      <select
        value={value}
        onChange={(e) => handleSelect(e.target.value)}
        required
        disabled={loading || contracts.length === 0}
      >
        <option value="">
          {loading
            ? 'Loading contracts…'
            : contracts.length === 0
              ? `No ${assetType.toUpperCase()} contracts found`
              : `Select a ${assetType.toUpperCase()} contract…`}
        </option>
        {contracts.map((contract) => (
          <option key={contract.daoId} value={contract.daoId}>
            {contract.daoName} — {contract.contractAddress}
          </option>
        ))}
      </select>
      {loadError && <span className="field-hint error">{loadError}</span>}
      {!loading && !loadError && contracts.length === 0 && (
        <span className="field-hint empty">
          No {assetType === 'nft' ? 'NFT' : 'SBT'} contracts available for this environment.
        </span>
      )}
      {!loading && contracts.length > 0 && (
        <span className="field-hint">{contracts.length} contract{contracts.length === 1 ? '' : 's'} available</span>
      )}
    </label>
  );
}
