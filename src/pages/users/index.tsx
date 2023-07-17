import Head from 'next/head'

import { NextPageWithLayout } from '../_app'

import { getGlobalLayout } from '@/components/layout'
import { UsersList } from '@/modules/users-modules/users-list'

const UsersPage: NextPageWithLayout = () => {
  return (
    <main className="w-full">
      <Head>
        <title>Users list</title>
      </Head>
      <UsersList />
    </main>
  )
}

UsersPage.getLayout = getGlobalLayout
export default UsersPage
