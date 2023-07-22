import React from 'react'

import { UserImagesType } from '@/modules/users-modules/view-user-info'

export const updateCachePhotos = (
  prev: UserImagesType,
  { fetchMoreResult }: { fetchMoreResult?: UserImagesType },
  setIsLoadingMore: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setIsLoadingMore(false)
  if (!fetchMoreResult) return prev

  if (prev) {
    return {
      user: {
        ...prev.user,
        imagesUser: {
          ...prev.user.imagesUser,
          items: [...prev.user.imagesUser.items, ...fetchMoreResult.user.imagesUser.items],
        },
      },
    }
  }

  return prev
}
