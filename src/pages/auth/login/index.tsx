import React, { memo } from 'react'

import Head from 'next/head'

import { getLayoutWithHeader } from '@/components/layout'
import { Login } from '@/modules/login-module/login'
import { NextPageWithLayout } from '@/pages/_app'

interface ILogin {}

const LoginPage: NextPageWithLayout<ILogin> = memo(({}) => {
  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>
      {/* eslint-disable-next-line react/jsx-no-undef */}
      <Login />
    </div>
  )
})

LoginPage.getLayout = getLayoutWithHeader
export default LoginPage
