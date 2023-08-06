import Head from 'next/head'

import { getGlobalLayout } from '@/components/layout'
import { PaymentsList } from '@/modules/payments-module/payments-list'
import { NextPageWithLayout } from '@/pages/_app'

const PaymentsPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Payments</title>
      </Head>

      <PaymentsList />
    </>
  )
}

PaymentsPage.getLayout = getGlobalLayout
export default PaymentsPage
