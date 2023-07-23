import React, { ChangeEvent, useState } from 'react'

import { useQuery } from '@apollo/client'
import { useInView } from 'react-intersection-observer'

import { ErrorComponent, NotFoundComponent } from '@/components'
import { GlobalInput, Spinner } from '@/ui'
import {
  GET_POSTS_LIST,
  getStatusColor,
  handleSearchDebounceEffect,
  infinityScrollForPostsEffect,
  Post,
  PostsItemsType,
  PostsListType,
  PostStatusForPostsListInputType,
  PostsType,
  SkeletonPost,
  StatusSelected,
  updateCachePostsList,
} from 'modules/posts'

export const PostsList = () => {
  const [timerId, setTimerId] = useState<NodeJS.Timeout | undefined>(undefined)
  const [search, setSearch] = useState<string>('')
  const [debounce, setDebounce] = useState<string>('')
  const [status, setStatus] = useState<PostStatusForPostsListInputType>(
    PostStatusForPostsListInputType.PUBLISHED
  )
  const [postsData, setPostsData] = useState<PostsListType | undefined>()
  const [showMoreIds, setShowMoreIds] = useState<number[]>([])
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false)
  const [pageNumber, setPageNumber] = useState<number>(1)
  // const { postStatusBannedDeleted } = useContext(AuthContext)
  const { loading, error, fetchMore, refetch } = useQuery<PostsType>(GET_POSTS_LIST, {
    variables: {
      search: debounce,
      pageSize: 8,
      status: status,
    },
    onCompleted: (data: PostsType) => {
      setPostsData(data?.postsList)
    },
    onError: error => console.error('error', error),
  })

  const handleScroll = () => {
    if (
      !isLoadingMore &&
      inView &&
      postsData &&
      postsData.items.length + 1 < postsData.totalCount
    ) {
      setIsLoadingMore(true)
      setPageNumber(prevNumber => prevNumber + 1)
      fetchMore({
        variables: { pageNumber: pageNumber },
        updateQuery: (prev, { fetchMoreResult }) =>
          updateCachePostsList(prev, { fetchMoreResult }, setIsLoadingMore),
      })
    }
  }

  const { ref, inView } = useInView({
    threshold: 0.1,
  })

  const handleCallBackShowMore = (postId: number) => {
    if (showMoreIds.includes(postId)) {
      setShowMoreIds(showMoreIds.filter(item => item !== postId))
    } else {
      setShowMoreIds([...showMoreIds, postId])
    }
  }

  const handleCallBackSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const target: string = e.currentTarget.value

    setSearch(target)
  }

  infinityScrollForPostsEffect({ inView, isLoadingMore, handleScroll, loading })
  handleSearchDebounceEffect({ loading, timerId, setTimerId, setDebounce, search })

  if (error && !loading) {
    return <ErrorComponent error={error} />
  }

  return (
    <div className="w-full pt-16 pl-6 pr-16 flex flex-col">
      <div>
        <StatusSelected refetch={refetch} status={status} setStatus={setStatus} />
      </div>
      <div className="pb-9 w-full">
        <GlobalInput
          className="w-[972px] pb-9 h-9"
          type={'text'}
          placeholder={'Search'}
          value={search}
          callBack={handleCallBackSearch}
        />
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-2  lg:grid-cols-3  gap-3">
        {loading ? (
          SkeletonPost(32)
        ) : (
          <>
            {postsData !== undefined ? (
              postsData.items.map((post: PostsItemsType, index: number) => (
                <Post
                  post={post}
                  key={index}
                  showMore={showMoreIds.includes(post.postId)}
                  setShowMoreId={handleCallBackShowMore}
                  getStatusColor={getStatusColor}
                />
              ))
            ) : (
              <NotFoundComponent />
            )}
          </>
        )}
      </div>
      <div className="flex pt-3 pb-3 justify-center" ref={ref}>
        {isLoadingMore && <Spinner />}
      </div>
    </div>
  )
}
