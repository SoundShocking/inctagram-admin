import React from 'react'

import { CategoryScale, Chart as ChartJS, Legend, Tooltip, BarElement, LinearScale } from 'chart.js'
import { Bar, Line } from 'react-chartjs-2'

ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale)

type DataChartType = {
  labels: string[]
  datasets: DatasetsType[]
}

type DatasetsType = {
  label: string
  data: number[]
  backgroundColor: string
  borderColor: string
  borderWidth: number
}

type PropsType = {
  labels: string[]
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
  data = [],
  legend = 'Chosen Period',
  borderColor = defaultBorderColor,
  backgroundColor = defaultBackgroundColor,
  borderWidth = 0,
  legendComparisonData = 'Compared Period',
  comparisonData = [],
  borderWidthComparisonData = 0,
  borderColorComparisonData = defaultComparisonBorderColor,
  backgroundColorComparisonData = defaultComparisonBackgroundColor,
}: PropsType) => {
  const chartData: DataChartType = {
    labels: labels,
    datasets: [
      {
        label: legend,
        data: data,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: borderWidth,
      },
      {
        label: legendComparisonData,
        data: comparisonData,
        borderColor: borderColorComparisonData,
        backgroundColor: backgroundColorComparisonData,
        borderWidth: borderWidthComparisonData,
      },
    ],
  }

  return (
    <div>
      <Bar data={chartData} />
    </div>
  )
}
