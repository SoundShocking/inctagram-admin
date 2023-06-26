import React, { Dispatch, FC, PropsWithChildren, SetStateAction } from 'react'

import { StaticImageData } from 'next/image'

import { ImageOption } from '@/ui/image-selector/image-option/ImageOption'

interface Props {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  chosenImage: string | StaticImageData
  chosenText?: string
}

export const ImageSelector: FC<PropsWithChildren<Props>> = ({
  children,
  chosenText = '',
  chosenImage,
  isOpen,
  setIsOpen,
}) => {
  return (
    <div className="relative">
      <button
        className="  border-dark-100 border w-[140px] h-6 text-[16px] flex items-center justify-center text-white"
        onClick={() => setIsOpen(prev => !prev)}
      >
        <ImageOption onOptionClick={() => setIsOpen(true)} imgSrc={chosenImage} text={chosenText} />
      </button>

      {isOpen && (
        <div className="absolute w-[130px] top-full right-0 bg-dark-500 border-dark-100 border py-1.5">
          {children}
        </div>
      )}
    </div>
  )
}
