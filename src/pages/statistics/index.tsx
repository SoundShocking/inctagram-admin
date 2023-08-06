import Head from 'next/head'

import { getGlobalLayout } from '@/components/layout'
import { Statistics } from '@/modules/statistics'

const StatisticsPage = () => {
  return (
    <>
      <Head>
        <title>Statistics</title>
      </Head>

      <Statistics />
    </>
  )
}

StatisticsPage.getLayout = getGlobalLayout

export default StatisticsPage
