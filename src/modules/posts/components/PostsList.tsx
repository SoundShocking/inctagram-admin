import React, { ChangeEvent, useState } from 'react'

import { useQuery } from '@apollo/client'
import { useInView } from 'react-intersection-observer'

import { useInViewScrollHandlerEffect } from '@/common'
import { GET_POSTS_LIST, getStatusColor, Post, PostsListType } from '@/modules/posts'
import { PostsItemsType, PostsType } from '@/modules/posts/type/postsType'
import { GlobalInput, Spinner } from '@/ui'

export const PostsList = () => {
  const [search, setSearch] = useState<string>('')
  const [posts, setPosts] = useState<PostsListType | undefined>()
  const [showMoreIds, setShowMoreIds] = useState<number[]>([])
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false)
  const [pageNumber, setPageNumber] = useState<number>(1)

  const { data, error, loading, fetchMore } = useQuery<PostsType>(GET_POSTS_LIST, {
    variables: {
      search: search,
      pageSize: 8,
    },
    onCompleted: (data: PostsType) => {
      setPosts(data?.postsList)
    },
  })

  const handleScroll = () => {
    if (!isLoadingMore && inView && posts && posts.items.length < posts.totalCount) {
      console.log('1')
      setIsLoadingMore(true)
      setPageNumber(prevNumber => prevNumber + 1)
      fetchMore({
        variables: { pageNumber: pageNumber },
        updateQuery: (prev: PostsType, { fetchMoreResult }: { fetchMoreResult?: PostsType }) => {
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
        },
      })
    }
  }

  const { ref, inView } = useInView({
    threshold: 0.1,
  })

  useInViewScrollHandlerEffect({ inView, isLoadingMore, handleScroll, loading })
  const handleCallBackShowMore = (postId: number) => {
    if (showMoreIds.includes(postId)) {
      setShowMoreIds(showMoreIds.filter(item => item !== postId))
    } else {
      setShowMoreIds([...showMoreIds, postId])
    }
  }

  const handleCallBackSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget.value

    setSearch(target)
  }
  const text =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incdipiscing elit, sed do eiusmod tempor inipiscing elit, sed do eiusmod tempor incdipiscing elit, sed do eiusmod tempor incd.mpor incd.mpor incd.mpo..'

  if (error && !loading) {
    return <div>Error! {error.message}</div>
  }
  console.log(isLoadingMore)

  return (
    <div className="w-full pt-[60px] pl-[24px] pr-[60px] flex flex-col">
      <div className="pb-[36px] w-full">
        <GlobalInput
          className="w-[972px] pb-[36px] h-[36px]"
          type={'text'}
          placeholder={'Search'}
          value={search}
          callBack={handleCallBackSearch}
        />
      </div>
      <div className="grid grid-cols-4 lg:grid-cols-3 gap-3">
        {posts !== undefined ? (
          posts.items.map((post: PostsItemsType, index: number) => (
            <Post
              post={post}
              key={index}
              showMore={showMoreIds.includes(post.postId)}
              setShowMoreId={handleCallBackShowMore}
              getStatusColor={getStatusColor}
              text={text}
            />
          ))
        ) : (
          <span>Not found</span>
        )}
      </div>
      <div className="flex justify-center pt-4" ref={ref}>
        {isLoadingMore && <Spinner />}
      </div>
    </div>
  )
}
