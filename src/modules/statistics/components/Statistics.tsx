import React from 'react'

import { NewUsersChart } from '@/modules/statistics/components/new-users/chart/NewUsersChart'
import { PaidAccountsChart } from '@/modules/statistics/components/paid-accounts/PaidAccountsChart'
import { UploadedPhotosChart } from '@/modules/statistics/components/uploaded-photos/UploadedPhotosChart'

export const Statistics = () => {
  return (
    <div>
      <NewUsersChart />
      <PaidAccountsChart />
      <UploadedPhotosChart />
    </div>
  )
}
