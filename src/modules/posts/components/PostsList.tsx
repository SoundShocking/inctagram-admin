import React, { ChangeEvent, useState } from 'react'

import { useQuery } from '@apollo/client'
import { useInView } from 'react-intersection-observer'

import { ErrorMessage, NotFoundComponent, useTranslation } from '@/components'
import { deletePostSubscriptionsEffect } from '@/modules/posts/custom/useEffect/deletePostSubscriptionsEffect'
import { PostListViewModel, Query } from '@/types'
import { GlobalInput, Spinner } from '@/ui'
import { Switch } from '@/ui/switch'
import {
  addNewPostSubscriptionsEffect,
  GET_POSTS_LIST,
  handleSearchDebounceEffect,
  infinityScrollForPostsEffect,
  Post,
  PostStatusForPostsLisType,
  SkeletonPost,
  StatusSelected,
} from 'modules/posts'
export type PostsListType = Pick<Query, 'postsList'>
export const PostsList = () => {
  const [timerId, setTimerId] = useState<NodeJS.Timeout | undefined>(undefined)
  const [search, setSearch] = useState<string>('')
  const [debounce, setDebounce] = useState<string>('')
  const [status, setStatus] = useState<PostStatusForPostsLisType>(
    PostStatusForPostsLisType.PUBLISHED
  )
  const [showMoreIds, setShowMoreIds] = useState<number[]>([])
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false)
  const { ref, inView } = useInView({
    threshold: 0.1,
  })
  const { t, locale } = useTranslation()
  const [autoUpdate, setAutoUpdate] = useState(true)
  const { data, loading, error, fetchMore, subscribeToMore } = useQuery<PostsListType>(
    GET_POSTS_LIST,
    {
      variables: {
        search: debounce,
        status: status,
      },
      fetchPolicy: 'cache-and-network',
      onError: error => console.error('error', error),
    }
  )
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
  addNewPostSubscriptionsEffect(autoUpdate, subscribeToMore)
  infinityScrollForPostsEffect({
    inView,
    isLoadingMore,
    loading,
    fetchMore,
    setIsLoadingMore,
    data,
  })
  handleSearchDebounceEffect({ loading, timerId, setTimerId, setDebounce, search })

  return (
    <div className="w-full relative sm:pr-4 md:pr-4 flex flex-col">
      <ErrorMessage errorMessage={error?.message} />
      <div className="absolute right-0 top-[-40px]"></div>
      <div className="flex justify-between gap-8 pb-9">
        <input
          className="w-full h-9 bg-transparent text-light-100 text-sm outline-none border border-dark-100 px-10"
          type="text"
          placeholder={t.translation.userList.search}
          value={search}
          onChange={handleCallBackSearch}
        />
        <StatusSelected status={status} setStatus={setStatus} />
        <Switch
          text={t.translation.postsList.selectedBox}
          checked={autoUpdate}
          setChecked={setAutoUpdate}
        />
      </div>
      <div className="flex justify-between gap-8"></div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 grid-cols-4 gap-x-3 gap-y-8">
        {loading ? (
          SkeletonPost(32)
        ) : (
          <>
            {data !== undefined ? (
              data.postsList.items?.map((post: PostListViewModel, index: number) => (
                <Post
                  locale={locale}
                  t={t}
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
