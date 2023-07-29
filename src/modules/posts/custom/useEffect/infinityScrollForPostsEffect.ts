import { useEffect } from 'react'

import { PostsListType, PostsType } from '@/modules/posts'

interface FetchMoreVariables {
  pageNumber: number
}

interface FetchMoreOptions {
  variables: FetchMoreVariables
  updateQuery: (prev: any, options: { fetchMoreResult: FetchMoreResult }) => any
}

interface FetchMoreResult {
  postsList: {
    items: PostsType[]
  }
}

export const infinityScrollForPostsEffect = ({
  inView,
  loading,
  isLoadingMore,
  fetchMore,
  postsData,
  setIsLoadingMore,
  pageNumber,
  setPageNumber,
}: {
  postsData: PostsListType | undefined
  inView: boolean
  loading: boolean
  isLoadingMore: boolean
  setIsLoadingMore: (isLoadingMore: boolean) => void
  fetchMore(options: FetchMoreOptions): Promise<any>
  pageNumber: number
  setPageNumber: (page: number) => void
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
        const newPageNumber = pageNumber + 1

        setPageNumber(newPageNumber)
        fetchMore({
          variables: { pageNumber: newPageNumber },
          updateQuery: (
            prev: PostsType,
            { fetchMoreResult }: { fetchMoreResult?: FetchMoreResult }
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
          },
        })
      }
    }
  }, [inView])
}
