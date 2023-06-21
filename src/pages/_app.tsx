import '@/styles/globals.css'
import { ReactElement, ReactNode } from 'react'

import { ApolloProvider } from '@apollo/client'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'

import { apolloClient } from '@/apollo-client'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => page)

  return (
    <ApolloProvider client={apolloClient}>{getLayout(<Component {...pageProps} />)}</ApolloProvider>
  )
}
