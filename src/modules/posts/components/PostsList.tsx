import React, { ChangeEvent, useContext, useState } from 'react'

import { useQuery } from '@apollo/client'
import { useInView } from 'react-intersection-observer'

import { ErrorComponent } from '@/common'
import {
  changeStatusBanDelRefetchEffect,
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
} from '@/modules/posts'
import { AuthContext } from '@/store/store'
import { GlobalInput, Spinner } from '@/ui'

export const PostsList = () => {
  const [timerId, setTimerId] = useState<NodeJS.Timeout | undefined>(undefined)
  const [search, setSearch] = useState<string>('')
  const [debounce, setDebounce] = useState<string>('')
  const [status, setStatus] = useState<PostStatusForPostsListInputType>(
    PostStatusForPostsListInputType.PUBLISHED
  )
  const [posts, setPosts] = useState<PostsListType | undefined>()
  const [showMoreIds, setShowMoreIds] = useState<number[]>([])
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const { postStatusBannedDeleted } = useContext(AuthContext)
  const { loading, error, fetchMore, refetch } = useQuery<PostsType>(GET_POSTS_LIST, {
    variables: {
      search: debounce,
      pageSize: 8,
      status: status,
    },
    onCompleted: (data: PostsType) => {
      setPosts(data?.postsList)
    },
    onError: error => console.error('error', error),
  })

  const handleScroll = () => {
    if (!isLoadingMore && inView && posts && posts.items.length < posts.totalCount) {
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
  changeStatusBanDelRefetchEffect({ refetch, postStatusBannedDeleted })
  handleSearchDebounceEffect({ loading, timerId, setTimerId, setDebounce, search })

  if (error && !loading) {
    return <ErrorComponent error={error} />
  }

  return (
    <div className="w-full pt-[60px] pl-[24px] pr-[60px] flex flex-col">
      <div>
        <StatusSelected status={status} setStatus={setStatus} />
      </div>
      <div className="pb-[36px] w-full">
        <GlobalInput
          className="w-[972px] pb-[36px] h-[36px]"
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
            {posts !== undefined ? (
              posts.items.map((post: PostsItemsType, index: number) => (
                <Post
                  post={post}
                  key={index}
                  showMore={showMoreIds.includes(post.postId)}
                  setShowMoreId={handleCallBackShowMore}
                  getStatusColor={getStatusColor}
                />
              ))
            ) : (
              <span className="text-base leading-6 font-normal ">Not Found</span>
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
