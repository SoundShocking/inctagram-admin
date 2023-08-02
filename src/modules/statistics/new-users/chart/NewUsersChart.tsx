import React, { useState } from 'react'

import { useQuery } from '@apollo/client'

import { GET_NEW_USERS_STATISTICS } from '@/queries/statistics-users'
import { Chart } from '@/ui/chart/Chart'
import { CustomOption } from '@/ui/custom-selector/custom-option/CustomOption'
import { CustomSelector } from '@/ui/custom-selector/CustomSelector'
import { DateCalendar } from '@/ui/date-picker/DatePicker'

function formatDate(year, month, day) {
  const monthStr = String(month + 1).padStart(2, '0')
  const dayStr = String(day).padStart(2, '0')

  return `${year}-${monthStr}-${dayStr}T00:00:00.000Z`
}

// function getComparisonDates(startDateStr: Date, endDateStr: Date, selector: string) {
//   debugger
//   // Step 1: Parse startDate and endDate to extract day, month, and year
//   const startDateObj = new Date(startDateStr)
//   const endDateObj = new Date(endDateStr)
//
//   // const startDate = new Date(startDateStr)
//   // const endDate = new Date(endDateStr)
//
//   // Calculate the difference between end date and start date in milliseconds
//   const differenceInMs = endDateObj - startDateObj
//
//   // Convert the difference to days
//   const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24)
//
//
//   const comparisonStartDate = startDateObj.getDate()
//
//   const timestamp = startDateObj.setDate(startDateObj.getDate() + differenceInDays);
//
//   const dateObj = new Date(timestamp);
//   const endDate = dateObj.toDateString() + " " + dateObj.toLocaleTimeString() + " " + dateObj.toTimeString().match(/\((.+)\)/)[1];
//
//   // Step 2: Parse selector to extract month and year
//   const [month, year] = selector.split(' ')
//   const comparisonStartMonth: number = new Date(Date.parse(`${month} 1, ${year}`)).getMonth()
//
//
//   const comparisonStartDateFormatted = formatDate(year, startMonthNumber, startDay)
//   const comparisonEndDateFormatted = endDate.toISOString()
//   // const comparisonEndDateFormatted = `${year}-${endMonthNumber}-${endDay}T00:00:00.000Z`
//
//   return { comparisonStartDateFormatted, comparisonEndDateFormatted }
// }

function getLastDayOfMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

function getDifferenceInDays(endDate, startDate) {
  // Calculate the difference between end date and start date in milliseconds
  const differenceInMs = endDate - startDate

  // Convert the difference to days
  const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24)

  return differenceInDays
}
function createComparePeriod(year: number) {
  const comparePeriod = []

  for (let month = 0; month < 12; month++) {
    const startDate = formatDate(year, month, 1)
    const lastDay = getLastDayOfMonth(year, month)
    const endDate = formatDate(year, month, lastDay)
    const text = new Date(year, month).toLocaleString('en-US', { month: 'long', year: 'numeric' })

    comparePeriod.push({ text, startDate, endDate })
  }

  return comparePeriod
}

// const comparePeriod2022 = createComparePeriod(2022)
const comparePeriod2023 = createComparePeriod(2023)

const comparePeriod = comparePeriod2023

function isPeriodWithinMaxDays(startDateStr: string, endDateStr: string, max: number) {
  // Convert date strings to Date objects
  const startDate = new Date(startDateStr)
  const endDate = new Date(endDateStr)
  const differenceInDays = getDifferenceInDays(endDate, startDate)

  // Check if the period is not more than 31 days
  return differenceInDays <= max
}

export const NewUsersChart = () => {
  const [data, setData] = useState<number[]>([])
  const [compareData, setCompareData] = useState<number[]>([])
  const [labels, setLabels] = useState<string[]>([])

  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const [compareStartDate, setCompareStartDate] = useState<Date | null>(new Date())
  const [compareEndDate, setCompareEndDate] = useState<Date | null>(new Date())
  const [compareErrorMessage, setCompareErrorMessage] = useState<string>('')

  const [maxComparedPeriod, setMaxComparedPeriod] = useState(0)

  const setStartDateHandler = (date: Date | null) => {
    setErrorMessage('')
    setStartDate(date)
  }

  const setEndDateHandler = (date: Date | null) => {
    setEndDate(date)

    if (!isPeriodWithinMaxDays(startDate, date, 31)) {
      setErrorMessage('Max date is 31 days')
    } else {
      setMaxComparedPeriod()
    }
  }

  const setCompareStartDateHandler = (date: Date | null) => {
    setCompareErrorMessage('')
    setCompareStartDate(date)
  }

  const setCompareEndDateHandler = (date: Date | null) => {
    setCompareEndDate(date)

    if (!isPeriodWithinMaxDays(compareStartDate, date, maxComparedPeriod)) {
      setCompareErrorMessage(`Max date is ${maxComparedPeriod} days`)
    }
  }
  const dateConverter = async (date: Date[]) => {
    return date.map((item: any) => {
      const formatedDate = new Date(item)

      return formatedDate.getDate()
    })
  }
  const { error, loading, fetchMore } = useQuery(GET_NEW_USERS_STATISTICS, {
    variables: {
      startDate: startDate?.toISOString(),
      endDate: endDate?.toISOString(),
      comparisonStartDate: compareStartDate,
      comparisonEndDate: compareEndDate,
    },
    onCompleted: async (data: any) => {
      console.log('data', data.statisticsUsers.data)
      const formedDate = await dateConverter(data?.statisticsUsers.data.metrics.time_intervals)

      setData(data?.statisticsUsers.data.metrics.countUsers)
      setLabels(formedDate)
      let comparedDate = [0, 0, 0, 0, 0, 0, 0]

      if (data?.statisticsUsers.data.metricsComparison?.countUsers) {
        comparedDate = data?.statisticsUsers.data.metricsComparison?.countUsers
      }
      setCompareData(comparedDate)
    },
  })

  // const onComparedMonthClick = (text: string, comparedStartDate: Date, comparedEndDate: Date) => {
  //
  //   // const startDateStr = startDate?.toISOString();
  //   // const endDateStr = endDate?.toISOString();
  //   //
  //   const { comparisonStartDateFormatted, comparisonEndDateFormatted } = getComparisonDates(
  //     startDate!,
  //     endDate!,
  //     text
  //   )
  //
  //   setCompareStartDate(comparisonStartDateFormatted)
  //   setCompareEndDate(comparisonEndDateFormatted)
  //   setIsOpen(false)
  // }

  return (
    <div>
      <h2>New Users</h2>
      <div className={'flex justify-end'}>
        <div className={'m-3'}>
          <div className={'text-light-900 text-sm'}>Date range period </div>
          <DateCalendar
            errorMessage={errorMessage}
            isRange={true}
            maxDate={new Date()}
            endDate={endDate}
            setEndDate={setEndDateHandler}
            setStartDate={setStartDateHandler}
            startDate={startDate}
          />
        </div>
        {startDate && (
          <div className={'m-3'}>
            <div className={'text-light-900 text-sm'}>Compared period</div>

            <DateCalendar
              errorMessage={compareErrorMessage}
              isRange={true}
              maxDate={new Date()}
              endDate={compareEndDate}
              setEndDate={setCompareEndDateHandler}
              setStartDate={setCompareStartDateHandler}
              startDate={compareStartDate}
            />

            {/*<CustomSelector isOpen={isOpen} setIsOpen={setIsOpen}>*/}
            {/*  {comparePeriod.map(({ text, startDate, endDate }) => {*/}
            {/*    return (*/}
            {/*      <CustomOption*/}
            {/*        onOptionClick={() => onComparedMonthClick(text, startDate, endDate)}*/}
            {/*        text={text}*/}
            {/*        key={text}*/}
            {/*      />*/}
            {/*    )*/}
            {/*  })}*/}
            {/*</CustomSelector>*/}
          </div>
        )}
      </div>
      <div className={'w-[900px]'}>
        <Chart labels={labels} data={data} comparisonData={compareData} />
      </div>
    </div>
  )
}
