import { ApolloClient, InMemoryCache } from '@apollo/client'

export const apolloClient = new ApolloClient({
  uri: 'https://chips.jubo.com.ua/graphql',
  cache: new InMemoryCache(),
  headers: {
    authorization: 'Basic YWRtaW5AYWRtaW4ubWU6YWRtaW4=',
  },
  // uri: 'https://flyby-router-demo.herokuapp.com/',
})
