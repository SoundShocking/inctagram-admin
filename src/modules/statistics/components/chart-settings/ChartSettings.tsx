import React from 'react'

import { useTranslation } from '@/components'
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
  maxComparedPeriod: number
  setMaxComparedPeriod: (dateRange: number) => void
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
  maxComparedPeriod,
  setMaxComparedPeriod,
}: PropsType) => {
  const { t } = useTranslation()

  const setStartDateHandler = (date: Date | null) => {
    setErrorMessage('')
    setStartDate(date)
  }

  const setEndDateHandler = (date: Date | null) => {
    if (startDate && date && !isPeriodWithinMaxDays(startDate, date, MAX_DAYS - 1)) {
      setErrorMessage(`${t.translation.statistics.error} ${MAX_DAYS}`)
    } else {
      setEndDate(date)
      if (startDate && date) {
        const maxDays = getDifferenceInDays(startDate, date) + 1

        setMaxComparedPeriod(maxDays)
      }
    }
  }

  const setCompareStartDateHandler = (date: Date | null) => {
    setCompareErrorMessage('')
    setCompareStartDate(date)
  }
  const setCompareEndDateHandler = (date: Date | null) => {
    if (
      compareStartDate &&
      date &&
      getDifferenceInDays(compareStartDate, date) + 1 !== maxComparedPeriod
    ) {
      setCompareErrorMessage(`${t.translation.statistics.comparedError} ${maxComparedPeriod}`)
    } else {
      setCompareErrorMessage('')
      setCompareEndDate(date)
    }
  }

  const clearComparedPeriod = () => {
    setCompareStartDate(null)
    setCompareEndDate(null)
  }

  return (
    <div>
      <div className={'flex justify-end'}>
        <div className={'m-3'}>
          <div className={'text-light-900 text-sm'}>{t.translation.statistics.dateRange}</div>
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
        <div className={'m-3'}>
          <div className={'text-light-900 text-sm'}>{t.translation.statistics.comparedPeriod}</div>

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
        <button onClick={clearComparedPeriod}>X</button>
      </div>
    </div>
  )
}
