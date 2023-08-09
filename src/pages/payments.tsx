import Head from 'next/head'

import { useTranslation } from '@/components'
import { getGlobalLayout } from '@/components/layout'
import { PaymentsList } from '@/modules/payments-module/payments-list'
import { NextPageWithLayout } from '@/pages/_app'

const PaymentsPage: NextPageWithLayout = () => {
  const { t } = useTranslation()

  return (
    <>
      <Head>
        <title>{t.translation.navigation.payments}</title>
      </Head>

      <PaymentsList />
    </>
  )
}

PaymentsPage.getLayout = getGlobalLayout
export default PaymentsPage
