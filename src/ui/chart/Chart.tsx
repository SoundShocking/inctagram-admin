import React from 'react'

import { CategoryScale, Chart as ChartJS, Legend, Tooltip, BarElement, LinearScale } from 'chart.js'
import { Bar, Line } from 'react-chartjs-2'
import { useTranslation } from 'react-i18next'

ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale)

type DataChartType = {
  labels: string[]
  datasets: DatasetsType[]
}

type DatasetsType = {
  label: string | undefined
  data: number[]
  backgroundColor: string
  borderColor: string
  borderWidth: number
}

type PropsType = {
  labels: string[]
  secondLabels?: string[]
  legend?: string
  data: number[]
  comparisonData?: number[]
  legendComparisonData?: string
  borderColorComparisonData?: string
  borderWidthComparisonData?: number
  backgroundColorComparisonData?: string
  borderColor?: string
  borderWidth?: number
  backgroundColor?: string
}

const defaultBorderColor = 'rgb(53, 162, 235)'
const defaultBackgroundColor = 'rgba(53, 162, 235, 0.5)'
const defaultComparisonBorderColor = 'rgba(75,192,192,1)'
const defaultComparisonBackgroundColor = 'rgba(75,192,192,0.7)'

export const Chart = ({
  labels = [],
  secondLabels = [],
  data = [],
  legend,
  borderColor = defaultBorderColor,
  backgroundColor = defaultBackgroundColor,
  borderWidth = 0,
  legendComparisonData,
  comparisonData = [],
  borderWidthComparisonData = 0,
  borderColorComparisonData = defaultComparisonBorderColor,
  backgroundColorComparisonData = defaultComparisonBackgroundColor,
}: PropsType) => {
  const { t } = useTranslation()

  legend = legend || t('statistics.dateRange')
  legendComparisonData = legendComparisonData || t('statistics.comparedPeriod')

  const firstData = {
    labels: labels,
    datasets: [
      {
        label: legend,
        data: data,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: borderWidth,
      },
    ],
  }

  const secondData = {
    labels: secondLabels,
    datasets: [
      {
        label: legendComparisonData,
        data: comparisonData,
        borderColor: borderColorComparisonData,
        backgroundColor: backgroundColorComparisonData,
        borderWidth: borderWidthComparisonData,
      },
    ],
  }

  const options = {
    scales: {
      x: {
        display: true, // Show the main x-axis
        position: 'bottom', // Position it at the bottom (default)
        ticks: {
          //@ts-ignore
          callback: function (label) {
            //@ts-ignore
            return `${this.getLabelForValue(label)}`
          },
        },
      },
      x1: {
        display: true,
        position: 'bottom',
        axis: 'x',
        labels: secondLabels,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  }

  const chartData: DataChartType = {
    labels: firstData.labels,
    datasets: [
      {
        label: firstData.datasets[0].label,
        data: firstData.datasets[0].data,
        backgroundColor: firstData.datasets[0].backgroundColor,
        borderColor: firstData.datasets[0].borderColor,
        borderWidth: firstData.datasets[0].borderWidth,
      },
      {
        label: secondData.datasets[0].label,
        data: secondData.datasets[0].data,
        backgroundColor: secondData.datasets[0].backgroundColor,
        borderColor: secondData.datasets[0].borderColor,
        borderWidth: secondData.datasets[0].borderWidth,
      },
    ],
  }

  return (
    <div>
      <Bar
        data={chartData}
        //@ts-ignore
        options={options}
      />
    </div>
  )
}
