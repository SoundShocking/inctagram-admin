import { ItemsImagesType } from '@/modules/users-modules/view-user-info'
import { Placeholder } from '@/ui'

export const UserPhoto = ({ item }: { item: ItemsImagesType }) => {
  return (
    <div className="cursor-default max-w-[234px] max-h-[228px] flex gap-3 aspect-square relative">
      <Placeholder
        alt="User photo"
        src={item.url}
        width={234}
        height={228}
        className="w-full cursor-default h-full object-cover"
      />
    </div>
  )
}
