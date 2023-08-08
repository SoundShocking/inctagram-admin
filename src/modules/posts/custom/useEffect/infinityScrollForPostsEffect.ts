import { useEffect } from 'react'

import { PostsListType } from '@/modules/posts'
import { PostListViewModel } from '@/types'

interface FetchMoreVariables {
  cursor: number
}

interface FetchMoreOptions {
  variables: FetchMoreVariables
  updateQuery: (prev: any, options: { fetchMoreResult: FetchMoreResult }) => any
}

interface FetchMoreResult {
  postsList: {
    items: PostListViewModel[]
    prevCursor: number
    nextCursor: number
  }
}

export const infinityScrollForPostsEffect = ({
  inView,
  loading,
  isLoadingMore,
  fetchMore,
  data,
  setIsLoadingMore,
}: {
  data: PostsListType | undefined
  inView: boolean
  loading: boolean
  isLoadingMore: boolean
  setIsLoadingMore: (isLoadingMore: boolean) => void
  fetchMore(options: FetchMoreOptions): Promise<any>
}) => {
  useEffect(() => {
    if (inView && !loading && !isLoadingMore) {
      if (
        !isLoadingMore &&
        inView &&
        data &&
        data.postsList.items?.length + 1 < data.postsList.totalCount
      ) {
        setIsLoadingMore(true)
        const cursor = data.postsList.nextCursor

        fetchMore({
          variables: { cursor: cursor },
          updateQuery: (
            prev: PostsListType,
            { fetchMoreResult }: { fetchMoreResult?: FetchMoreResult }
          ) => {
            setIsLoadingMore(false)
            if (!fetchMoreResult) return prev
            if (prev?.postsList?.items) {
              const fetchPostsList = fetchMoreResult.postsList

              return {
                ...prev,
                postsList: {
                  ...prev.postsList,
                  nextCursor: fetchPostsList.nextCursor,
                  prevCursor: fetchPostsList.prevCursor,
                  items: [...prev.postsList.items, ...fetchMoreResult.postsList.items],
                },
              }
            }

            return prev
          },
        })
      }
    }
  }, [inView])
}
