import { polygon } from 'wagmi/chains'

type Address = `0x${string}`
type DeploymentEnv = 'dev' | 'stg' | 'prod'
type DeploymentConfig = {
  pceAddress: Address
  pceCommunity: Address
  daoStudioAddress: Address
  timelockAddress: Address
  governorAddress: Address
  campaignAddress: Address
  WPCE_ADDRESS: Address
  bountyAddress: Address
  stakingAddress: Address
  MultipleVotingAddress: Address
  SUBGRAPH_URL: string
  createdAt: string
}

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000' as Address

const resolveDeploymentEnv = (): DeploymentEnv => {
  const value =
    process.env.NEXT_PUBLIC_APP_ENV ?? 'dev'

  switch (value.toLowerCase()) {
    case 'dev':
      return 'dev'
    case 'stg':
      return 'stg'
    default:
      return 'prod'
  }
}

export const defaultChainId = polygon.id

const stgDeployment = {
  pceAddress: '0xA4807a8C34353A5EA51aF073175950Cb6248dA7E',
  pceCommunity: ZERO_ADDRESS,
  daoStudioAddress: '0x1A94F2393590Ae64c3B5465bD18947A3aDFdacc4',
  timelockAddress: '0x5F12E3CBF5124627317EC69f04aa89312C4EaE0B',
  governorAddress: '0x93bC97C053b1Dcb89b43dAC447c9dbd425feBc90',
  campaignAddress: '0xcf9e1b664781A078F7250A7303c830a329a809A6',
  WPCE_ADDRESS: ZERO_ADDRESS,
  bountyAddress: ZERO_ADDRESS,
  stakingAddress: ZERO_ADDRESS,
  MultipleVotingAddress: ZERO_ADDRESS,
  SUBGRAPH_URL:
    'https://api.studio.thegraph.com/query/81073/dao_dashboard/version/latest',
  createdAt: '1714857600',
} satisfies DeploymentConfig

const devDeployment = {
  pceAddress: '0x62Ef93EAa5bB3E47E0e855C323ef156c8E3D8913',
  pceCommunity: ZERO_ADDRESS,
  daoStudioAddress: '0x1A94F2393590Ae64c3B5465bD18947A3aDFdacc4',
  timelockAddress: '0x5F12E3CBF5124627317EC69f04aa89312C4EaE0B',
  governorAddress: '0x93bC97C053b1Dcb89b43dAC447c9dbd425feBc90',
  campaignAddress: '0xcf9e1b664781A078F7250A7303c830a329a809A6',
  WPCE_ADDRESS: ZERO_ADDRESS,
  bountyAddress: ZERO_ADDRESS,
  stakingAddress: ZERO_ADDRESS,
  MultipleVotingAddress: ZERO_ADDRESS,
  SUBGRAPH_URL:
    'https://api.studio.thegraph.com/query/81073/dao_dashboard/version/latest',
  createdAt: '1714857600',
} satisfies DeploymentConfig

export const polygonDeployments = {
  dev: { ...devDeployment },
  stg: { ...stgDeployment },
  prod: { ...stgDeployment },
} satisfies Record<DeploymentEnv, DeploymentConfig>

export const appDeploymentEnv = resolveDeploymentEnv()
const deployment = polygonDeployments[appDeploymentEnv]

export const pceAddress: Record<number, Address> = {
  [defaultChainId]: deployment.pceAddress,
}

export const pceCommunity: Record<number, Address> = {
  [defaultChainId]: deployment.pceCommunity,
}

export const daoStudioAddress: Record<number, Address> = {
  [defaultChainId]: deployment.daoStudioAddress,
}

export const timelockAddress: Record<number, Address> = {
  [defaultChainId]: deployment.timelockAddress,
}

export const governorAddress: Record<number, Address> = {
  [defaultChainId]: deployment.governorAddress,
}

export const campaignAddress: Record<number, Address> = {
  [defaultChainId]: deployment.campaignAddress,
}

export const WPCE_ADDRESS: Record<number, Address> = {
  [defaultChainId]: deployment.WPCE_ADDRESS,
}

export const bountyAddress: Record<number, Address> = {
  [defaultChainId]: deployment.bountyAddress,
}

export const stakingAddress: Record<number, Address> = {
  [defaultChainId]: deployment.stakingAddress,
}

export const MultipleVotingAddress: Record<number, Address> = {
  [defaultChainId]: deployment.MultipleVotingAddress,
}

export const PCE_DAO_ID =
  '0x6341c772c3e6500085764a9316cb328acd2f1aae43136cd521f00ac4d6872a90'

export const SUBGRAPH_URL: Record<number, string> = {
  [defaultChainId]: deployment.SUBGRAPH_URL,
}

export const createdAt: Record<number, string> = {
  [defaultChainId]: deployment.createdAt,
}

export const STATUS = [
  'Draft',
  'Last Call',
  'Final',
  'Stagnant',
  'Withdrawn',
  'Rejected',
  'Living',
]

export const CATEGORY = [
  'Core',
  'Application Interface',
  'Token & Community Design',
  'Process',
  'Meta',
  'Impact Indicators / Evaluation Design',
  'Informational',
]

export const EMPTY_NFT_IMAGE = '/images/empty-nft.svg'

export const campaignTableHeaders = [
  'ID',
  'Image',
  'Title',
  'Description',
  'Type',
  'Claimed Amount/Total Amount',
  'Claim Amount',
  'Token Type',
  'Token Id',
  'Dao Name',
  'Start Time',
  'End Time',
  'Status',
  'Whitelist',
]

export const GAS_LIMIT = 1000000

export const ERROR_MESSAGES = {
  reverted: 'Transaction reverted',
}
