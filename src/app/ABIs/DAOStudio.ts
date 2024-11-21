export const DAO_STUDIO_ABI = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    name: 'createDAO',
    inputs: [
      { name: 'daoName', type: 'string', internalType: 'string' },
      {
        name: 'socialConfig',
        type: 'tuple',
        internalType: 'struct DAOFactory.SocialConfig',
        components: [
          { name: 'description', type: 'string', internalType: 'string' },
          { name: 'website', type: 'string', internalType: 'string' },
          { name: 'linkedin', type: 'string', internalType: 'string' },
          { name: 'twitter', type: 'string', internalType: 'string' },
          { name: 'telegram', type: 'string', internalType: 'string' },
        ],
      },
      { name: 'governanceToken', type: 'address', internalType: 'address' },
      { name: 'votingDelay', type: 'uint256', internalType: 'uint256' },
      { name: 'votingPeriod', type: 'uint256', internalType: 'uint256' },
      { name: 'proposalThreshold', type: 'uint256', internalType: 'uint256' },
      { name: 'quorumPercentage', type: 'uint256', internalType: 'uint256' },
      { name: 'timelockDelay', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bytes32', internalType: 'bytes32' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'daoNames',
    inputs: [{ name: '', type: 'string', internalType: 'string' }],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'daos',
    inputs: [{ name: '', type: 'bytes32', internalType: 'bytes32' }],
    outputs: [
      { name: 'governor', type: 'address', internalType: 'address' },
      { name: 'timelock', type: 'address', internalType: 'address' },
      { name: 'governanceToken', type: 'address', internalType: 'address' },
      { name: 'votingDelay', type: 'uint256', internalType: 'uint256' },
      { name: 'votingPeriod', type: 'uint256', internalType: 'uint256' },
      { name: 'proposalThreshold', type: 'uint256', internalType: 'uint256' },
      { name: 'quorumPercentage', type: 'uint256', internalType: 'uint256' },
      {
        name: 'socialConfig',
        type: 'tuple',
        internalType: 'struct DAOFactory.SocialConfig',
        components: [
          { name: 'description', type: 'string', internalType: 'string' },
          { name: 'website', type: 'string', internalType: 'string' },
          { name: 'linkedin', type: 'string', internalType: 'string' },
          { name: 'twitter', type: 'string', internalType: 'string' },
          { name: 'telegram', type: 'string', internalType: 'string' },
        ],
      },
      { name: 'exists', type: 'bool', internalType: 'bool' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getDAO',
    inputs: [{ name: 'daoId', type: 'bytes32', internalType: 'bytes32' }],
    outputs: [
      {
        name: '',
        type: 'tuple',
        internalType: 'struct DAOFactory.DAOConfig',
        components: [
          { name: 'governor', type: 'address', internalType: 'address' },
          { name: 'timelock', type: 'address', internalType: 'address' },
          { name: 'governanceToken', type: 'address', internalType: 'address' },
          { name: 'votingDelay', type: 'uint256', internalType: 'uint256' },
          { name: 'votingPeriod', type: 'uint256', internalType: 'uint256' },
          {
            name: 'proposalThreshold',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'quorumPercentage',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'socialConfig',
            type: 'tuple',
            internalType: 'struct DAOFactory.SocialConfig',
            components: [
              { name: 'description', type: 'string', internalType: 'string' },
              { name: 'website', type: 'string', internalType: 'string' },
              { name: 'linkedin', type: 'string', internalType: 'string' },
              { name: 'twitter', type: 'string', internalType: 'string' },
              { name: 'telegram', type: 'string', internalType: 'string' },
            ],
          },
          { name: 'exists', type: 'bool', internalType: 'bool' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'isDaoExists',
    inputs: [{ name: 'daoId', type: 'bytes32', internalType: 'bytes32' }],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'owner',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'renounceOwnership',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'totalDAOs',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'transferOwnership',
    inputs: [{ name: 'newOwner', type: 'address', internalType: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    name: 'DAOCreated',
    inputs: [
      {
        name: 'daoId',
        type: 'bytes32',
        indexed: true,
        internalType: 'bytes32',
      },
      {
        name: 'description',
        type: 'string',
        indexed: false,
        internalType: 'string',
      },
      {
        name: 'website',
        type: 'string',
        indexed: false,
        internalType: 'string',
      },
      {
        name: 'linkedin',
        type: 'string',
        indexed: false,
        internalType: 'string',
      },
      {
        name: 'twitter',
        type: 'string',
        indexed: false,
        internalType: 'string',
      },
      {
        name: 'telegram',
        type: 'string',
        indexed: false,
        internalType: 'string',
      },
      { name: 'name', type: 'string', indexed: false, internalType: 'string' },
      {
        name: 'governor',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'timelock',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'governanceToken',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'OwnershipTransferred',
    inputs: [
      {
        name: 'previousOwner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
      {
        name: 'newOwner',
        type: 'address',
        indexed: true,
        internalType: 'address',
      },
    ],
    anonymous: false,
  },
  {
    type: 'error',
    name: 'OwnableInvalidOwner',
    inputs: [{ name: 'owner', type: 'address', internalType: 'address' }],
  },
  {
    type: 'error',
    name: 'OwnableUnauthorizedAccount',
    inputs: [{ name: 'account', type: 'address', internalType: 'address' }],
  },
]
