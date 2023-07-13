import React, { FC } from 'react'

import Image from 'next/image'

type PropsType = {
  src?: any
  alt: string
  height?: number
  width?: number
  className?: string
}

export const UserPhoto: FC<any> = ({ item }: any) => {
  return (
    <div className="aspect-square relative">
      <Image
        loader={() => item.url}
        src={item.url}
        width={234}
        height={228}
        alt=""
        className="w-full h-full object-cover cursor-pointer"
      />
    </div>
  )
}
