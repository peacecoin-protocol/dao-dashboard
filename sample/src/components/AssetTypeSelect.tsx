import type { AssetType } from '../types/api'

interface AssetTypeSelectProps {
  value: AssetType
  onChange: (assetType: AssetType) => void
  id?: string
}

export function AssetTypeSelect({
  value,
  onChange,
  id = 'asset-type',
}: AssetTypeSelectProps) {
  return (
    <label className="field">
      <span>Asset type</span>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value as AssetType)}
      >
        <option value="sbt">SBT (Soulbound Token)</option>
        <option value="nft">NFT</option>
      </select>
    </label>
  )
}
