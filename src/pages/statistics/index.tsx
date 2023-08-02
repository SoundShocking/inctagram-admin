import { getGlobalLayout } from '@/components/layout'
import { NewUsersChart } from '@/modules/statistics/new-users/chart/NewUsersChart'

const Statistics = () => {
  return (
    <div>
      {'Statistics'}
      <NewUsersChart />
    </div>
  )
}

Statistics.getLayout = getGlobalLayout

export default Statistics
