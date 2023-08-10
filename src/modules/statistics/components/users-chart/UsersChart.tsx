import React from 'react'

import { NewUsersChart } from '@/modules/statistics/components/users-chart/new-users/NewUsersChart'
import { PaidAccountsChart } from '@/modules/statistics/components/users-chart/paid-accounts/PaidAccountsChart'

export const UsersChart = () => {
  return (
    <div>
      <NewUsersChart />
      <PaidAccountsChart />
    </div>
  )
}
