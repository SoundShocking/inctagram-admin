import Head from 'next/head'

import { NextPageWithLayout } from '../_app'

import { useTranslation } from '@/components'
import { getGlobalLayout } from '@/components/layout'
import { UsersList } from '@/modules/users-modules/users-list'

const UsersPage: NextPageWithLayout = () => {
  const { t } = useTranslation()

  return (
    <>
      <Head>
        <title>{t.translation.navigation.users}</title>
      </Head>

      <UsersList />
    </>
  )
}

UsersPage.getLayout = getGlobalLayout
export default UsersPage
