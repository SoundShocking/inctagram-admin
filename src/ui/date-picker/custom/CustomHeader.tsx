import { format, getMonth, getYear } from 'date-fns'
import { ReactDatePickerCustomHeaderProps } from 'react-datepicker'

import s from './customHeader.module.scss'

import { KeyboardArrowLeft, KeyboardArrowRight } from '@/ui'

type CustomHeaderType = {
  years: number[]
  months: string[]
  locale: Locale | string | undefined
  numDaysSelected: () => void
}

/**
 * CustomHeader - компонент, используемый для отображения заголовка календаря
 * @param {Date} date - нужен для capitalizeFirstLetter, чтобы месяц был с большой буквы. Также можно передать option с локализацией языка
 * @param {function} decreaseMonth - функция, вызываемая при переключении на предыдущий месяц
 * @param {function} increaseMonth - функция, вызываемая при переключении на следующий месяц
 * @param {function} changeMonth - метод для изменения выбранного месяца в компонентне календаря. Принимает
 * в качестве аргумента номер месяца, который будет выбран  (от 0 до 11, где 0 - январь, 1 - февраль и т. д.)
 * @param {function} changeYear - метод для изменения выбранного года в календаре. Принимает номер года.
 * @param {years} number[] - массив, содержащий список годов, которые отображаются в выпадающем списке выбора года.
 * @param {...any} rest - дополнительные параметры, принимаемые компонентом
 * @constructor
 */
export const CustomHeader = ({
  date,
  numDaysSelected,
  locale,
  monthDate,
  decreaseMonth,
  increaseMonth,
  years,
  months,
  changeMonth,
  changeYear,
}: Pick<
  ReactDatePickerCustomHeaderProps,
  'changeMonth' | 'changeYear' | 'increaseMonth' | 'decreaseMonth' | 'monthDate' | 'date'
> &
  CustomHeaderType) => {
  const classNames = {
    header: s.header,
    buttonBox: s.buttonBox,
    button: s.button,
    selectBlock: s.selectBlock,
    select: s.selectStyle,
  }

  const localDefault = locale ? locale : 'en-US'

  // @ts-ignore
  const monthDateText = format(monthDate, 'MMM yyyy', { locale: localDefault })

  return (
    <div className={classNames.header}>
      <span>{monthDateText}</span>
      <div className={classNames.buttonBox}>
        <button type="button" className={classNames.button} onClick={decreaseMonth}>
          <KeyboardArrowLeft />
        </button>
        <div className={classNames.selectBlock}>
          <select
            className={classNames.select}
            value={getYear(date)}
            onChange={({ target: { value } }) => changeYear(Number(value))}
          >
            {years.map((option, key) => (
              <option key={key} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            className={classNames.select}
            value={months[getMonth(date)]}
            onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
          >
            {months.map((option, key) => (
              <option key={key} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <button type="button" className={classNames.button} onClick={increaseMonth}>
          <KeyboardArrowRight />
        </button>
      </div>
    </div>
  )
}
