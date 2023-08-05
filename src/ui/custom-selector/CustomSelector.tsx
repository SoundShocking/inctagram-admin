import React, { Dispatch, FC, PropsWithChildren, SetStateAction } from 'react'

import { StaticImageData } from 'next/image'

import { CustomOption } from '@/ui/custom-selector/custom-option/CustomOption'

interface Props {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  chosenImage?: string | StaticImageData
  chosenText?: string
}

export const CustomSelector: FC<PropsWithChildren<Props>> = ({
  children,
  chosenText = '',
  chosenImage = '',
  isOpen,
  setIsOpen,
}) => {
  return (
    <div className="relative">
      <button
        className=" pr-2 bg w-full border-dark-100 border h-8 text-[16px] flex items-center justify-center text-white"
        onClick={() => setIsOpen(prev => !prev)}
      >
        <>
          <CustomOption
            onOptionClick={() => setIsOpen(true)}
            imgSrc={chosenImage}
            text={chosenText}
          />
          {isOpen ? ' ᐱ' : ' ᐯ'}
        </>
      </button>

      {isOpen && (
        <div className="absolute z-10 min-w-[180px] top-full right-0 bg-dark-500 border-dark-100 border py-1.5">
          {children}
        </div>
      )}
    </div>
  )
}
