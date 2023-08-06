import Head from 'next/head'

import { NextPageWithLayout } from '../_app'

import { getGlobalLayout } from '@/components/layout'
import { UsersList } from '@/modules/users-modules/users-list'

const UsersPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Users</title>
      </Head>

      <UsersList />
    </>
  )
}

UsersPage.getLayout = getGlobalLayout
export default UsersPage
