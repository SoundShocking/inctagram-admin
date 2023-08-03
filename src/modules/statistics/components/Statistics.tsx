import React from 'react'

import { NewUsersChart } from '@/modules/statistics/components/new-users/chart/NewUsersChart'
import { PaidAccountsChart } from '@/modules/statistics/components/paid-accounts/PaidAccountsChart'

export const Statistics = () => {
  return (
    <div>
      <NewUsersChart />
      <PaidAccountsChart />
    </div>
  )
}
