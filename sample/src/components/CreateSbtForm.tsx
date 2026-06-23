import { useState, type FormEvent } from 'react';
import { createSbt } from '../api/sbtClient';
import type { ApiResponse, AssetType, ContractOption, CreateSbtData, Environment } from '../types/api';
import { parseEtherToWei } from '../utils/tokenDisplay';
import { AssetTypeSelect } from './AssetTypeSelect';
import { ContractSelect } from './ContractSelect';
import { EnvironmentSelect } from './EnvironmentSelect';
import { ImageUploadField } from './ImageUploadField';
import { ResultPanel } from './ResultPanel';

export function CreateSbtForm() {
  const [environment, setEnvironment] = useState<Environment>('dev');
  const [assetType, setAssetType] = useState<AssetType>('sbt');
  const [selectedContract, setSelectedContract] = useState<ContractOption | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [votingPower, setVotingPower] = useState('10000');
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ApiResponse<CreateSbtData> | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleEnvironmentChange(next: Environment) {
    setEnvironment(next);
    setSelectedContract(null);
  }

  function handleAssetTypeChange(next: AssetType) {
    setAssetType(next);
    setSelectedContract(null);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!selectedContract) {
      setError('Select a contract first.');
      return;
    }

    if (!image) {
      setError('An image is required.');
      return;
    }

    const votingPowerWei = parseEtherToWei(votingPower);
    if (!votingPowerWei) {
      setError('Voting power must be a non-negative number in ETH (up to 18 decimal places).');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    const response = await createSbt({
      environment,
      assetType,
      daoId: selectedContract.daoId,
      name: name.trim(),
      description: description.trim(),
      votingPower: votingPowerWei,
      image,
    });

    setLoading(false);
    setResult(response);
  }

  return (
    <section className="card">
      <div className="card-intro">
        <h2>Create SBT / NFT</h2>
        <p className="muted">
          Upload image and metadata to IPFS, create the token on-chain, and save it to Supabase for
          batch minting later.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="batch-mint-form">
        <section className="form-section">
          <h3 className="form-section-title">DAO & contract</h3>
          <div className="form-section-grid">
            <EnvironmentSelect value={environment} onChange={handleEnvironmentChange} />
            <AssetTypeSelect value={assetType} onChange={handleAssetTypeChange} />
            <ContractSelect
              environment={environment}
              assetType={assetType}
              value={selectedContract?.daoId ?? ''}
              onChange={setSelectedContract}
            />
          </div>
        </section>

        <section className="form-section">
          <h3 className="form-section-title">Token metadata</h3>
          <div className="token-row-body create-sbt-body">
            <ImageUploadField id="create-sbt-image" value={image} onChange={setImage} />
            <div className="token-fields">
              <label className="field">
                <span>Name</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Token display name"
                  required
                />
              </label>
              <label className="field">
                <span>Description</span>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Short description for metadata"
                  rows={3}
                  required
                />
              </label>
              <label className="field">
                <span>Voting power (ETH)</span>
                <input
                  value={votingPower}
                  onChange={(e) => setVotingPower(e.target.value)}
                  placeholder="e.g. 10000"
                  inputMode="decimal"
                  required
                />
                <span className="field-hint">Converted to wei in IPFS metadata and on-chain storage.</span>
              </label>
            </div>
          </div>
        </section>

        <button type="submit" className="btn-primary" disabled={loading || !selectedContract}>
          {loading ? 'Uploading and creating token…' : 'Create token'}
        </button>
      </form>

      <ResultPanel title="Result" data={result} error={error} loading={loading} />
    </section>
  );
}
