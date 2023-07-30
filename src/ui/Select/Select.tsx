import React, {
  Dispatch,
  FC,
  forwardRef,
  PropsWithChildren,
  ReactNode,
  SetStateAction,
} from 'react'

import * as SelectPrimitive from '@radix-ui/react-select'
import { SelectItemProps as SelectPrimitiveItemProps } from '@radix-ui/react-select'
import { clsx } from 'clsx'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6'

import styles from './Select.module.scss'

interface SelectProps<T> extends PropsWithChildren {
  value: string
  setValue: Dispatch<SetStateAction<T>>
  fullWidth?: boolean
}

export const Select = <T,>({ value, setValue, fullWidth = false, children }: SelectProps<T>) => {
  const onValueChange = (value: string) => {
    setValue(value as T)
  }

  return (
    <SelectPrimitive.Root value={value} onValueChange={onValueChange}>
      <SelectPrimitive.Trigger className={clsx(styles.SelectTrigger, { '!w-full': fullWidth })}>
        <SelectPrimitive.Value />
        <SelectPrimitive.Icon className={styles.SelectTriggerIcon}>
          <FaChevronDown size={16} />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal className="z-[100]">
        <SelectPrimitive.Content
          position="popper"
          className={clsx([styles.SelectContent, { 'w-full': fullWidth }])}
          hideWhenDetached={true}
          sideOffset={-1}
        >
          <SelectPrimitive.ScrollUpButton className={styles.SelectScrollButton}>
            <FaChevronUp />
          </SelectPrimitive.ScrollUpButton>

          <SelectPrimitive.Viewport>
            <SelectPrimitive.Group>{children}</SelectPrimitive.Group>
          </SelectPrimitive.Viewport>

          <SelectPrimitive.ScrollDownButton className={styles.SelectScrollButton}>
            <FaChevronDown />
          </SelectPrimitive.ScrollDownButton>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  )
}

type SelectItemProps = {
  children: ReactNode
  className?: string
} & SelectPrimitiveItemProps &
  React.RefAttributes<HTMLDivElement>

export const SelectItem: FC<SelectItemProps> = forwardRef(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <SelectPrimitive.Item
        className={clsx(styles.SelectItem, className)}
        {...props}
        ref={forwardedRef}
      >
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      </SelectPrimitive.Item>
    )
  }
)
