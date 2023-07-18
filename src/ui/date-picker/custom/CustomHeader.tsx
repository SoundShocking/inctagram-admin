import { format } from 'date-fns'
import { ReactDatePickerCustomHeaderProps } from 'react-datepicker'

import s from './customHeader.module.scss'

import { capitalizeFirstLetter } from '@/common'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@/ui'

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
  decreaseMonth,
  increaseMonth,
  ...rest
}: ReactDatePickerCustomHeaderProps) => {
  const classNames = {
    header: s.header,
    buttonBox: s.buttonBox,
    button: s.button,
    selectBlock: s.selectBlock,
    select: s.selectStyle,
  }

  const headerText = capitalizeFirstLetter(format(date, 'LLLL Y'))

  return (
    <div className={classNames.header} {...rest}>
      <div>{headerText}</div>
      <div className={classNames.buttonBox}>
        <button type="button" className={classNames.button} onClick={decreaseMonth}>
          <KeyboardArrowLeft />
        </button>
        <button type="button" className={classNames.button} onClick={increaseMonth}>
          <KeyboardArrowRight />
        </button>
      </div>
    </div>
  )
}
