import { useEffect } from 'react'

export const infinityScrollForPostsEffect = ({
  inView,
  loading,
  isLoadingMore,
  handleScroll,
}: {
  inView: boolean
  loading: boolean
  isLoadingMore: boolean
  handleScroll: () => void
}) => {
  useEffect(() => {
    if (inView && !loading && !isLoadingMore) {
      handleScroll()
    }
  }, [inView])
}
