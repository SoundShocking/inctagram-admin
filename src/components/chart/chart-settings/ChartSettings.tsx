import React, { useState } from 'react'

import { getDifferenceInDays } from '@/modules/statistics/utils/getDifferenceInDays'
import { isPeriodWithinMaxDays } from '@/modules/statistics/utils/isPeriodWithinMaxDays'
import { DateCalendar } from '@/ui'

type PropsType = {
  errorMessage: string
  endDate: Date | null
  setEndDate: (date: Date | null) => void
  setStartDate: (date: Date | null) => void
  startDate: Date | null
  compareErrorMessage: string
  compareEndDate: Date | null
  compareStartDate: Date | null
  setCompareEndDate: (date: Date | null) => void
  setCompareStartDate: (date: Date | null) => void
  setErrorMessage: (message: string) => void
  setCompareErrorMessage: (message: string) => void
}

const MAX_DAYS = 31

export const ChartSettings = ({
  errorMessage,
  compareErrorMessage,
  compareStartDate,
  compareEndDate,
  startDate,
  setStartDate,
  setEndDate,
  endDate,
  setCompareErrorMessage,
  setCompareStartDate,
  setErrorMessage,
  setCompareEndDate,
}: PropsType) => {
  const [maxComparedPeriod, setMaxComparedPeriod] = useState(0)

  const setStartDateHandler = (date: Date | null) => {
    setErrorMessage('')
    setStartDate(date)
  }

  const setEndDateHandler = (date: Date | null) => {
    if (startDate && date && !isPeriodWithinMaxDays(startDate, date, MAX_DAYS - 1)) {
      setErrorMessage(`Max date is ${MAX_DAYS} days`)
    } else {
      setEndDate(date)
      if (startDate && date) {
        const maxDays = getDifferenceInDays(startDate, date)

        setMaxComparedPeriod(maxDays)
      }
    }
  }

  const setCompareStartDateHandler = (date: Date | null) => {
    setCompareErrorMessage('')
    setCompareStartDate(date)
  }
  const setCompareEndDateHandler = (date: Date | null) => {
    setCompareEndDate(date)

    if (
      compareStartDate &&
      date &&
      !isPeriodWithinMaxDays(compareStartDate, date, maxComparedPeriod)
    ) {
      setCompareErrorMessage(`Max date is ${maxComparedPeriod} days`)
    }
  }

  return (
    <div>
      <div className={'flex justify-end'}>
        <div className={'m-3'}>
          <div className={'text-light-900 text-sm'}>Date range </div>
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
          </div>
        )}
      </div>
    </div>
  )
}
