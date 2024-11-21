// ./apollo-client.js

import { ApolloClient, InMemoryCache } from '@apollo/client'

export const createApolloClient = () => {
  return new ApolloClient({
    uri: 'https://api.studio.thegraph.com/query/81073/pce_bounty/v0.0.3',
    cache: new InMemoryCache(),
  })
}

export const createDaoFactoryClient = () => {
  return new ApolloClient({
    uri: 'https://api.studio.thegraph.com/query/81073/daofactory/version/latest',
    cache: new InMemoryCache(),
  })
}
