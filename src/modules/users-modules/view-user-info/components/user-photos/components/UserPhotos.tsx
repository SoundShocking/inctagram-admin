import React, { useMemo, useState } from 'react'

import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useInView } from 'react-intersection-observer'

import { useInViewScrollHandlerEffect } from '@/common'
import {
  GET_USER_IMAGES,
  ItemsImagesType,
  usedToDrawArraysOfSkeletons,
  UserImagesType,
  UserPhoto,
} from '@/modules/users-modules/view-user-info'

export const UserPhotos = () => {
  const router = useRouter()
  const { userId } = router.query
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const { loading, error, data, fetchMore } = useQuery(GET_USER_IMAGES, {
    variables: {
      userId: Number(userId),
      pageSize: 16,
    },
  })
  const images = data?.user.imagesUser

  const { ref, inView } = useInView({
    threshold: 0.1,
  })
  const memoizedItems: ItemsImagesType[] | undefined = useMemo(
    () => images && images.items,
    [images]
  )

  const handleScroll = () => {
    if (inView && images && images?.items.length < images.totalCount) {
      setIsLoadingMore(true)
      setPageNumber(prevNumber => prevNumber + 1)
      fetchMore({
        variables: { pageNumber: pageNumber },
        updateQuery: (prev: UserImagesType, { fetchMoreResult }) => {
          setIsLoadingMore(false)
          if (!fetchMoreResult) return prev
          if (prev.user) {
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
        },
      })
    }
  }

  useInViewScrollHandlerEffect({ inView, isLoadingMore, loading, handleScroll })

  if (error && !loading) {
    return <div>Error! {error.message}</div>
  }

  return (
    <div className="mt-14">
      <div className="grid grid-cols-4 gap-3 md:grid-cols-3 sm:grid-cols-2">
        {loading ? (
          usedToDrawArraysOfSkeletons(32)
        ) : (
          <>
            {memoizedItems && memoizedItems.length > 0 ? (
              memoizedItems.map((item: ItemsImagesType, index: number) => (
                <UserPhoto key={index} item={item} />
              ))
            ) : (
              <div>No photos available</div>
            )}
          </>
        )}
      </div>
      <div ref={ref}>
        {isLoadingMore && (
          <div className="pt-4">
            <div className={'grid grid-cols-4 gap-3'}>{usedToDrawArraysOfSkeletons(12)}</div>
          </div>
        )}
      </div>
    </div>
  )
}
