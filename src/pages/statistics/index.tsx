import { getGlobalLayout } from '@/components/layout'
import { Statistics } from '@/modules/statistics'

const StatisticsPage = () => {
  return (
    <div>
      <Statistics />
    </div>
  )
}

StatisticsPage.getLayout = getGlobalLayout

export default StatisticsPage
