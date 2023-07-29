import { ApolloClient, createHttpLink, InMemoryCache, split } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { createClient } from 'graphql-ws'
import Cookies from 'js-cookie'

const httpLink = createHttpLink({
  uri: 'https://api.cygan.lol/graphql',
})

const wsLink = new GraphQLWsLink(
  createClient({
    url: 'wws://api.cygan.lol/subscriptions',
    connectionParams: () => {
      return {
        headers: {
          authorization: `Basic ${Cookies.get('authToken')}`,
        },
      }
    },
  })
)

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Basic ${Cookies.get('authToken')}`,
    },
  }
})
// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)

    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  },
  wsLink,
  authLink.concat(httpLink)
)

export const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
})
