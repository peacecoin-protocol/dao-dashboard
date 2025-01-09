// ./apollo-client.js

import { ApolloClient, InMemoryCache } from '@apollo/client'

export const createApolloClient = () => {
  return new ApolloClient({
    uri: 'http://localhost:8000/subgraphs/name/PCEDaoSubgraph/version/latest',
    cache: new InMemoryCache(),
  })
}

export const createDaoFactoryClient = () => {
  return new ApolloClient({
    uri: 'http://localhost:8000/subgraphs/name/PCEDaoSubgraph/',
    cache: new InMemoryCache(),
  })
}
