import React, { FC } from 'react'

import Image from 'next/image'

export const UserPhoto: FC<any> = ({ item }) => {
  return (
    <div className="aspect-square relative">
      <Image
        src={item.url}
        width={234}
        height={228}
        alt=""
        className="w-full h-full object-cover cursor-pointer"
      />
    </div>
  )
}
