import { useState } from 'react'
import type { AssetType, ContractOption, Environment } from '../types/api'

interface UseContractSelectionOptions {
  onSelectionChange?: () => void
}

export function useContractSelection(
  options: UseContractSelectionOptions = {}
) {
  const { onSelectionChange } = options
  const [environment, setEnvironment] = useState<Environment>('dev')
  const [assetType, setAssetType] = useState<AssetType>('sbt')
  const [selectedContract, setSelectedContract] =
    useState<ContractOption | null>(null)

  function handleEnvironmentChange(next: Environment) {
    setEnvironment(next)
    setSelectedContract(null)
    onSelectionChange?.()
  }

  function handleAssetTypeChange(next: AssetType) {
    setAssetType(next)
    setSelectedContract(null)
    onSelectionChange?.()
  }

  function handleContractChange(contract: ContractOption | null) {
    setSelectedContract(contract)
    onSelectionChange?.()
  }

  return {
    environment,
    assetType,
    selectedContract,
    handleEnvironmentChange,
    handleAssetTypeChange,
    handleContractChange,
  }
}
