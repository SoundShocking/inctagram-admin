import React, { useMemo, useState } from 'react'

import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useInView } from 'react-intersection-observer'

import { ErrorComponent } from '@/components'
import {
  GET_USER_IMAGES,
  ImagesUserType,
  ItemsImagesType,
  updateCachePhotos,
  usedToDrawArraysOfSkeletons,
  useInViewScrollHandlerEffect,
  UserImagesType,
  UserPhoto,
} from '@/modules/users-modules/view-user-info'
import { Spinner } from '@/ui'

export const UserPhotos = () => {
  const router = useRouter()
  const [photosData, setPhotosData] = useState<ImagesUserType | undefined>()
  const { userId } = router.query
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const { loading, error, fetchMore } = useQuery<UserImagesType>(GET_USER_IMAGES, {
    variables: {
      userId: Number(userId),
      pageSize: 16,
    },
    fetchPolicy: 'cache-and-network',
    onCompleted: (data: UserImagesType) => setPhotosData(data.user.imagesUser),
    onError: error => console.error('error', error),
  })

  const { ref, inView } = useInView({
    threshold: 1,
  })
  const memoizedItems: ItemsImagesType[] | undefined = useMemo(
    () => photosData && photosData.items,
    [photosData]
  )
  const handleScroll = () => {
    if (
      !isLoadingMore &&
      inView &&
      photosData &&
      photosData?.items.length < photosData.totalCount
    ) {
      setIsLoadingMore(true)
      setPageNumber(prevNumber => prevNumber + 1)
      fetchMore({
        variables: { pageNumber: pageNumber },
        updateQuery: (prev: UserImagesType, { fetchMoreResult }) =>
          updateCachePhotos(prev, { fetchMoreResult }, setIsLoadingMore),
      })
    }
  }

  useInViewScrollHandlerEffect({ inView, isLoadingMore, loading, handleScroll })

  if (error && !loading) {
    return <ErrorComponent error={error} />
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
      <div className="flex pt-3 pb-3 align-middle justify-center" ref={ref}>
        {isLoadingMore && !loading && <Spinner />}
      </div>
    </div>
  )
}
