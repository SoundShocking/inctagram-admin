import React from 'react'

import Image, { StaticImageData } from 'next/image'

type PropsType = {
  onOptionClick: () => void
  text?: string
  imgSrc?: string | StaticImageData
}

export const CustomOption = ({ onOptionClick, text = '', imgSrc = '' }: PropsType) => {
  return (
    <div
      className="py-1.5 px-3 text-white text-sm cursor-pointer flex items-center justify-between whitespace-nowrap"
      onClick={onOptionClick}
    >
      {imgSrc ? <Image src={imgSrc} alt={'flag'} className="mr-2 bg w-5 h-5" /> : null}
      {text}
    </div>
  )
}
