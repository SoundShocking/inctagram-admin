import React, { useState } from 'react'

import { useQuery } from '@apollo/client'

import { useTranslation } from '@/components'
import { ChartSettings } from '@/modules/statistics/components/chart-settings/ChartSettings'
import { dateConverter } from '@/modules/statistics/utils/dateConverter'
import { getDateDaysAgo } from '@/modules/statistics/utils/getDateDaysAgo'
import { GET_UPLOADED_PHOTOS_STATISTICS } from '@/queries/statistics-uploaded-photos'
import { Chart } from '@/ui/chart/Chart'

export const UploadedPhotosChart = () => {
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
  const [maxComparedPeriod, setMaxComparedPeriod] = useState<number>(31)

  const { loading, fetchMore } = useQuery(GET_UPLOADED_PHOTOS_STATISTICS, {
    variables: {
      startDate: startDate?.toDateString(),
      endDate: endDate?.toDateString(),
      comparisonStartDate: compareStartDate,
      comparisonEndDate: compareEndDate,
    },
    onCompleted: async (data: any) => {
      const formedDate = await dateConverter(
        data?.statisticsUploadedImages.data.metrics.time_intervals
      )

      setData(data?.statisticsUploadedImages.data.metrics.countImages)
      //@ts-ignore
      setLabels(formedDate)
      let comparedDate: number[] = []

      let seconedLabelsDate: number[] = []

      if (data?.statisticsUploadedImages.data.metricsComparison?.countImages) {
        comparedDate = data?.statisticsUploadedImages.data.metricsComparison?.countImages
        seconedLabelsDate = await dateConverter(
          data?.statisticsUploadedImages.data.metricsComparison?.time_intervals
        )
      }
      setCompareData(comparedDate)
      //@ts-ignore
      setCompareLabels(seconedLabelsDate)
    },
  })

  return (
    <div>
      <h2 className={'text-[20px]'}>{t.translation.statistics.photos.uploadedPhotos}</h2>
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
        maxComparedPeriod={maxComparedPeriod}
        setMaxComparedPeriod={setMaxComparedPeriod}
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
