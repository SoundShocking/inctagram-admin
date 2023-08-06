import { useEffect } from 'react'

import { PostsListType, PostsType } from '@/modules/posts'

interface FetchMoreVariables {
  cursor: number
}

interface FetchMoreOptions {
  variables: FetchMoreVariables
  updateQuery: (prev: any, options: { fetchMoreResult: FetchMoreResult }) => any
}

interface FetchMoreResult {
  postsList: {
    items: PostsType[]
    prevCursor: number
    nextCursor: number
  }
}

export const infinityScrollForPostsEffect = ({
  inView,
  loading,
  isLoadingMore,
  fetchMore,
  postsData,
  setIsLoadingMore,
}: {
  postsData: PostsListType | undefined
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
        postsData &&
        postsData.items.length + 1 < postsData.totalCount
      ) {
        setIsLoadingMore(true)
        const cursor = postsData.nextCursor

        fetchMore({
          variables: { cursor: cursor },
          updateQuery: (
            prev: PostsType,
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
