import Head from 'next/head'

import { useTranslation } from '@/components'
import { getGlobalLayout } from '@/components/layout'
import { Statistics } from '@/modules/statistics'

const StatisticsPage = () => {
  const { t } = useTranslation()

  return (
    <>
      <Head>
        <title>{t.translation.navigation.statistics}</title>
      </Head>

      <Statistics />
    </>
  )
}

StatisticsPage.getLayout = getGlobalLayout

export default StatisticsPage
