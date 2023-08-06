import '@/styles/globals.css'
import { ReactElement, ReactNode } from 'react'

import { ApolloProvider } from '@apollo/client'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import { apolloClient } from '@/apollo-client'
import { useLoader } from '@/common'
import AuthProtection from '@/components/auth-components/auth-protection/AuthProtection'
import { AuthProvider } from '@/store/store'
import '../styles/nprogress.css'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? (page => page)

  useLoader()

  return (
    <AuthProvider>
      <ApolloProvider client={apolloClient}>
        <AuthProtection> {getLayout(<Component {...pageProps} />)}</AuthProtection>
        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </ApolloProvider>
    </AuthProvider>
  )
}
