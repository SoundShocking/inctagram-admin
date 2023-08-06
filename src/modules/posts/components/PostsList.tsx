import React, { ChangeEvent, useState } from 'react'

import { useQuery } from '@apollo/client'
import { useInView } from 'react-intersection-observer'

import { ErrorMessage, NotFoundComponent } from '@/components'
import { deletePostSubscriptionsEffect } from '@/modules/posts/custom/useEffect/deletePostSubscriptionsEffect'
import { GlobalInput, Spinner } from '@/ui'
import {
  addNewPostSubscriptionsEffect,
  GET_POSTS_LIST,
  handleSearchDebounceEffect,
  infinityScrollForPostsEffect,
  Post,
  PostsItemsType,
  PostsListType,
  PostStatusForPostsLisType,
  PostsType,
  SkeletonPost,
  StatusSelected,
} from 'modules/posts'

export const PostsList = () => {
  const [timerId, setTimerId] = useState<NodeJS.Timeout | undefined>(undefined)
  const [search, setSearch] = useState<string>('')
  const [debounce, setDebounce] = useState<string>('')
  const [status, setStatus] = useState<PostStatusForPostsLisType>(
    PostStatusForPostsLisType.PUBLISHED
  )
  const [postsData, setPostsData] = useState<PostsListType | undefined>()
  const [showMoreIds, setShowMoreIds] = useState<number[]>([])
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false)
  const { ref, inView } = useInView({
    threshold: 0.1,
  })

  const { loading, error, fetchMore, subscribeToMore } = useQuery<PostsType>(GET_POSTS_LIST, {
    variables: {
      search: debounce,
      status: status,
    },
    fetchPolicy: 'cache-and-network',
    onCompleted: (data: PostsType) => {
      setPostsData(data?.postsList)
    },
    onError: error => console.error('error', error),
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

  deletePostSubscriptionsEffect(subscribeToMore)
  addNewPostSubscriptionsEffect(subscribeToMore)
  infinityScrollForPostsEffect({
    inView,
    isLoadingMore,
    loading,
    fetchMore,
    setIsLoadingMore,
    postsData,
  })
  handleSearchDebounceEffect({ loading, timerId, setTimerId, setDebounce, search })

  return (
    <div className="w-full pt-16 pl-6 pr-16 sm:pr-4 md:pr-4 flex flex-col">
      <ErrorMessage errorMessage={error?.message} />
      <div>
        <StatusSelected status={status} setStatus={setStatus} />
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
      <div className="grid sm:grid-cols-2 md:grid-cols-3 grid-cols-4  gap-3">
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
                />
              ))
            ) : (
              <NotFoundComponent message={'Not found'} />
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
