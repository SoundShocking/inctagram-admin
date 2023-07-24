import React from 'react'

import { PostsType } from 'modules/posts'

export const updateCachePostsList = (
  prev: PostsType,
  { fetchMoreResult }: { fetchMoreResult?: PostsType },
  setIsLoadingMore: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setIsLoadingMore(false)
  if (!fetchMoreResult) return prev
  if (prev?.postsList?.items) {
    return {
      ...prev,
      postsList: {
        ...prev.postsList,
        items: [...prev.postsList.items, ...fetchMoreResult.postsList.items],
      },
    }
  }

  return prev
}
