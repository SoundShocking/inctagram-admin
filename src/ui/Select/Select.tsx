import React, {
  Dispatch,
  FC,
  forwardRef,
  PropsWithChildren,
  ReactNode,
  SetStateAction,
} from 'react'

import * as Select from '@radix-ui/react-select'
import { SelectItemProps } from '@radix-ui/react-select'
import { clsx } from 'clsx'
import { useTranslation } from 'react-i18next'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6'

import styles from './Select.module.scss'

import { UserStatusInputType } from '@/types'

interface CustomSelectProps extends PropsWithChildren {
  value: string
  setValue: Dispatch<SetStateAction<UserStatusInputType>>
}

export const CustomSelect: FC<CustomSelectProps> = ({ value, setValue, children }) => {
  const { t } = useTranslation()

  const onValueChange = (value: UserStatusInputType) => {
    setValue(value)
  }

  return (
    <Select.Root value={value} onValueChange={onValueChange}>
      <Select.Trigger className={styles.SelectTrigger}>
        <Select.Value />
        <Select.Icon className={styles.SelectTriggerIcon}>
          <FaChevronDown size={16} />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          position="popper"
          className={styles.SelectContent}
          hideWhenDetached={true}
          sideOffset={-1}
        >
          <Select.ScrollUpButton className={styles.SelectScrollButton}>
            <FaChevronUp />
          </Select.ScrollUpButton>

          <Select.Viewport>
            <Select.Group>{children}</Select.Group>
          </Select.Viewport>

          <Select.ScrollDownButton className={styles.SelectScrollButton}>
            <FaChevronDown />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}

type SelectProps = {
  children: ReactNode
  className?: string
} & SelectItemProps &
  React.RefAttributes<HTMLDivElement>

export const SelectItem: FC<SelectProps> = forwardRef(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item className={clsx(styles.SelectItem, className)} {...props} ref={forwardedRef}>
        <Select.ItemText>{children}</Select.ItemText>
      </Select.Item>
    )
  }
)
