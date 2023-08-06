import React, { useState } from 'react'

import { useQuery } from '@apollo/client'

import { useTranslation } from '@/components'
// eslint-disable-next-line import/namespace
import { ChartSettings } from '@/modules/statistics/components/chart-settings/ChartSettings'
import { dateConverter } from '@/modules/statistics/utils/dateConverter'
import { getDateDaysAgo } from '@/modules/statistics/utils/getDateDaysAgo'
import { GET_PAID_ACCOUNTS_STATISTICS } from '@/queries/statistics-paid-accounts'
import { Chart } from '@/ui/chart/Chart'

export const PaidAccountsChart = () => {
  const { t } = useTranslation()

  const [data, setData] = useState<number[]>([])
  const [compareData, setCompareData] = useState<number[]>([])
  const [labels, setLabels] = useState<string[]>([])
  const [compareLabels, setCompareLabels] = useState<string[]>([])

  const [startDate, setStartDate] = useState<Date | null>(getDateDaysAgo(30))
  const [endDate, setEndDate] = useState<Date | null>(new Date())
  const [errorMessage, setErrorMessage] = useState<string>('')

  const [compareStartDate, setCompareStartDate] = useState<Date | null>(null)
  const [compareEndDate, setCompareEndDate] = useState<Date | null>(null)
  const [compareErrorMessage, setCompareErrorMessage] = useState<string>('')

  const { error, loading, fetchMore } = useQuery(GET_PAID_ACCOUNTS_STATISTICS, {
    variables: {
      startDate: startDate?.toISOString(),
      endDate: endDate?.toISOString(),
      comparisonStartDate: compareStartDate,
      comparisonEndDate: compareEndDate,
    },
    onCompleted: async (data: any) => {
      console.log('data', data.statisticsPaidAccounts.data)
      const formedDate = await dateConverter(
        data?.statisticsPaidAccounts.data.metrics.time_intervals
      )

      setData(data?.statisticsPaidAccounts.data.metrics.countUsers)
      //@ts-ignore
      setLabels(formedDate)
      let comparedDate: number[] = []

      let seconedLabelsDate: number[] = []

      if (data?.statisticsPaidAccounts.data.metricsComparison?.countUsers) {
        comparedDate = data?.statisticsPaidAccounts.data.metricsComparison?.countUsers
        seconedLabelsDate = await dateConverter(
          data?.statisticsPaidAccounts.data.metricsComparison?.time_intervals
        )
      }
      setCompareData(comparedDate)
      //@ts-ignore
      setCompareLabels(seconedLabelsDate)
    },
  })

  return (
    <div className={'p-3'}>
      <h2 className={'text-[20px]'}>{t.translation.statistics.users.paidAccounts}</h2>
      <ChartSettings
        errorMessage={errorMessage}
        endDate={endDate}
        setEndDate={setEndDate}
        setStartDate={setStartDate}
        startDate={startDate}
        compareErrorMessage={compareErrorMessage}
        compareEndDate={compareEndDate}
        compareStartDate={compareStartDate}
        setCompareEndDate={setCompareEndDate}
        setCompareStartDate={setCompareStartDate}
        setErrorMessage={setErrorMessage}
        setCompareErrorMessage={setCompareErrorMessage}
      />
      <div className={'w-[900px]'}>
        <Chart
          labels={labels}
          data={data}
          comparisonData={compareData}
          secondLabels={compareLabels}
        />
      </div>
    </div>
  )
}
