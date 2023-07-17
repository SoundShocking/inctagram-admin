import Image from 'next/image'

import { ItemsImagesType } from '@/modules/users-modules/view-user-info'

export const UserPhoto = ({ item }: { item: ItemsImagesType }) => {
  return (
    <div className="cursor-default aspect-square relative">
      <Image
        loader={({ src, width }) => {
          return src + '?w=' + width
        }}
        src={item.url}
        width={234}
        height={228}
        alt="user photo"
        className="w-full cursor-default h-full object-cover cursor-pointer"
      />
    </div>
  )
}
