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
          callback: function (label) {
            return `${this.getLabelForValue(label)}`
          },
        },
      },
      x1: {
        display: true, // Show the second x-axis
        position: 'bottom', // Position it at the top
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
  //
  // options = {
  //   scales: {
  //     x: {
  //       ticks: {
  //         callback: function(label) {
  //           return `\$${this.getLabelForValue(label)}`
  //         }
  //       }
  //     },
  //     secondXAxis: {
  //       axis: 'x',
  //       labels: ['V2', 'syntax', 'in', 'v3'],
  //       grid: {
  //         drawOnChartArea: false
  //       }
  //     }
  //   }
  // }

  return (
    <div>
      <Bar data={chartData} options={options} />
    </div>
  )

  // const data = {
  //   labels: ['Label1', 'Label2', 'Label3', 'Label4', 'Label5'],
  //   datasets: [
  //     {
  //       label: 'Data for X-axis',
  //       data: [10, 20, 30, 40, 50],
  //       backgroundColor: 'rgba(75,192,192,0.4)',
  //     },
  //   ],
  // }
  //
  // // Sample data for the second x-axis
  // const secondXAxisData = {
  //   labels: ['SecondLabel1', 'SecondLabel2', 'SecondLabel3', 'SecondLabel4', 'SecondLabel5'],
  //   datasets: [
  //     {
  //       label: 'Data for Second X-axis',
  //       data: [5, 10, 15, 20, 25],
  //       backgroundColor: 'rgba(255, 99, 132, 0.4)',
  //     },
  //   ],
  // }
  //
  // // Define the options for the chart
  // const options = {
  //   scales: {
  //     x: {
  //       display: true, // Show the main x-axis
  //       position: 'bottom', // Position it at the bottom (default)
  //     },
  //     x1: {
  //       display: true, // Show the second x-axis
  //       position: 'bottom', // Position it at the top
  //     },
  //   },
  // }
  //
  // return (
  //   <div>
  //     <Bar
  //       data={{
  //         labels: data.labels,
  //         datasets: [
  //           {
  //             label: data.datasets[0].label,
  //             data: data.datasets[0].data,
  //             backgroundColor: data.datasets[0].backgroundColor,
  //             yAxisID: 'y',
  //           },
  //           {
  //             label: secondXAxisData.datasets[0].label,
  //             data: secondXAxisData.datasets[0].data,
  //             backgroundColor: secondXAxisData.datasets[0].backgroundColor,
  //             yAxisID: 'y1',
  //           },
  //         ],
  //       }}
  //       options={options}
  //     />
  //   </div>
  // )
}
