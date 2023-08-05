import { Dispatch, FC, SetStateAction, useId } from 'react'

import * as SwitchPrimitive from '@radix-ui/react-switch'

interface Props {
  text: string
  checked: boolean
  setChecked: Dispatch<SetStateAction<boolean>>
}

export const Switch: FC<Props> = ({ text, checked, setChecked }) => {
  const id = useId()

  return (
    <div className="inline-flex items-center">
      <label
        className="text-white text-sm leading-none pr-4 select-none whitespace-nowrap cursor-pointer"
        htmlFor={id}
      >
        {text}
      </label>
      <SwitchPrimitive.Root
        className="w-[42px] h-[25px] rounded-full relative bg-white outline-none"
        id={id}
        checked={checked}
        onCheckedChange={setChecked}
      >
        <SwitchPrimitive.Thumb className="block w-[21px] h-[21px] bg-accent-500 rounded-full transition-transform duration-100 translate-x-0.5 data-[state=checked]:translate-x-[19px]" />
      </SwitchPrimitive.Root>
    </div>
  )
}
