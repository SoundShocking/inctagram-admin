import { ApolloClient, InMemoryCache } from '@apollo/client'

export const apolloClient = new ApolloClient({
  uri: 'https://api.cygan.lol/graphql',
  cache: new InMemoryCache(),
  headers: {
    authorization: 'Basic YWRtaW5AYWRtaW4ubWU6YWRtaW4=',
  },
})
