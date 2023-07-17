import React, { useEffect, useRef, useState } from 'react'

import { Chart } from '@/ui/chart/Chart'

export const NewUsersChart = () => {
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
  const data1 = [33, 53, 85, 41, 44, 65]
  const data2 = [33, 25, 35, 51, 54, 76]

  return (
    <div>
      New Users
      <div className={'w-[500px]'}>
        <Chart
          labels={labels}
          data={data1}
          comparisonData={data2}
        />
      </div>
    </div>
  )
}
