// ./apollo-client.js

import { ApolloClient, InMemoryCache } from '@apollo/client'

const createApolloClient = () => {
  return new ApolloClient({
    uri: 'https://api.studio.thegraph.com/query/81073/pce_bounty/v0.0.1',
    cache: new InMemoryCache(),
  })
}

export default createApolloClient
