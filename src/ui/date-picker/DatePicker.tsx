import 'react-datepicker/dist/react-datepicker.css'

import { FC } from 'react'

// eslint-disable-next-line import/no-named-as-default
import clsx from 'clsx'
import { getYear } from 'date-fns'
import { range } from 'lodash'
import ReactDatePicker from 'react-datepicker'

import s from '../date-picker/datePicker.module.scss'

import { useTranslation } from '@/components'
import { CustomHeader, CustomInput } from '@/ui'

type CommonProps = {
  placeholder?: string
  startDate: Date | null
  setStartDate: (date: Date | null) => void
  label?: string
  error?: boolean
  errorMessage?: string
  disabled?: boolean
  isRange?: boolean
  maxDate?: Date | null
}
//& ComponentProps<'div'>
type ConditionalProps =
  | {
      endDate: Date | null
      setEndDate: (date: Date | null) => void
    }
  | {
      endDate: never
      setEndDate: never
    }

export type DatePickerProps = CommonProps & ConditionalProps

/**
 *
 * DatePicker - компонент, который может использоваться как для выбора одной даты, так и для выбора диапазона дат.
 * @param {Date} startDate - начальная дата, которая будет отображаться в поле input при рендеринге.
 * @param {function} setStartDate - функция для изменения начальной даты.
 * @param {string} label - имя, отображаемое над полем input в качестве подписи.
 * @param {boolean} error - флаг, указывающий, нужно ли выделить форму красным в случае ошибки.
 * @param {string} errorMessage - сообщение об ошибке, отображаемое под полем input.
 * @param {Date} endDate - конечная дата выбранного диапазона (используется только при выборе диапазона).
 * @param {function} setEndDate - функция для изменения конечной даты выбранного диапазона (используется только при выборе диапазона).
 * @param {boolean} disabled - флаг, указывающий, нужно ли заблокировать форму.
 * @param {maxDate} - максимальная дата ограничивает выбор даты. Сюда передаем дату, после которой блокируем выбор даты.
 * Пример - сегодня 14.04.23 и я не хочу чтобы могли выбрать завтрашний и последующие дни, поэтому я могу сюда передать текущую дату.
 * @constructor
 * {@link https://reactdatepicker.com/#example-custom-input}
 */
// @ts-ignore
export const DateCalendar: FC<DatePickerProps> = ({
  startDate,
  setStartDate,
  placeholder,
  label,
  errorMessage,
  endDate,
  setEndDate,
  isRange,
  disabled,
  maxDate,
  ...rest
}) => {
  const classNames = {
    input: clsx(
      s.blockContainer,
      errorMessage && s.errorBlockContainer,
      disabled && s.disabledText
    ),
    calendar: s.calendar,
    popper: s.popper,
    errorText: clsx(errorMessage && s.errorText),
    day: () => s.day,
  }

  const DatePickerHandler = (dates: [Date | null, Date | null] | Date | null) => {
    if (Array.isArray(dates)) {
      const [start, end] = dates

      setStartDate(start)
      setEndDate(end)
    } else {
      setStartDate(dates)
    }
  }
  const { t } = useTranslation()

  const locale: Locale | string | undefined = {
    localize: {
      day: (n: number): any => t.translation.datePicker.dayNamesShort[n],
      month: (n: number): any => t.translation.datePicker.monthNames[n],
      ordinalNumber: (): any => undefined,
      era: (): any => undefined,
      quarter: (): any => undefined,
      dayPeriod: (): any => undefined,
    },
    formatLong: {
      date: (): string => 'dd/mm/yyyy',
      time: (): string => 'hh:mm:ss',
      dateTime: (): string => 'dd/mm/yyyy hh:mm:ss',
    },
  }
  const years = range(1900, getYear(new Date()) + 1, 1)
  const months = [
    t.translation.datePicker.monthNames[0],
    t.translation.datePicker.monthNames[1],
    t.translation.datePicker.monthNames[2],
    t.translation.datePicker.monthNames[3],
    t.translation.datePicker.monthNames[4],
    t.translation.datePicker.monthNames[5],
    t.translation.datePicker.monthNames[6],
    t.translation.datePicker.monthNames[7],
    t.translation.datePicker.monthNames[8],
    t.translation.datePicker.monthNames[9],
    t.translation.datePicker.monthNames[10],
    t.translation.datePicker.monthNames[11],
  ]

  const numDaysSelected = () => {
    if (startDate && endDate && typeof startDate === 'object' && typeof endDate === 'object') {
      const diffInMilliseconds = Math.abs(endDate.getTime() - startDate.getTime())
      const diffInDays = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24))

      return diffInDays
    }

    return 0
  }

  return (
    <div {...rest}>
      <p className="text-light-100 leading-6 font-normal text-xs">
        {t.translation.datePicker.NumberDayOfSelected} {numDaysSelected()}
      </p>
      <ReactDatePicker
        locale={locale || undefined}
        maxDate={maxDate}
        dateFormat="dd-MM-yyyy"
        startDate={startDate}
        endDate={endDate}
        selected={startDate}
        monthsShown={12}
        preventOpenOnFocus={true}
        selectsRange={isRange}
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          monthDate,
        }) => (
          <CustomHeader
            date={date}
            numDaysSelected={numDaysSelected}
            locale={locale}
            monthDate={monthDate}
            decreaseMonth={decreaseMonth}
            years={years}
            months={months}
            increaseMonth={increaseMonth}
            changeYear={changeYear}
            changeMonth={changeMonth}
          />
        )}
        onChange={(dates: [Date | null, Date | null] | Date | null) => DatePickerHandler(dates)}
        customInput={
          <CustomInput
            isRange={isRange}
            disabledLabelText={disabled}
            label={label}
            errorMessage={errorMessage}
          />
        }
        dayClassName={classNames.day}
        calendarClassName={classNames.calendar}
        className={classNames.input}
        popperClassName={classNames.popper}
        showPopperArrow={false}
        calendarStartDay={1}
        showYearDropdown
        disabled={disabled}
        popperModifiers={[
          {
            name: 'offset',
            options: {
              offset: [0, 30],
            },
          },
        ]}
      />
      {errorMessage && <span className={classNames.errorText}>{errorMessage}</span>}
    </div>
  )
}
