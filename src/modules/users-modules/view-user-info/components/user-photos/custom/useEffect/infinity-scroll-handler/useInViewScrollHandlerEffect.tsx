import { useEffect } from 'react'

export const useInViewScrollHandlerEffect = ({
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
    if (inView && !loading && isLoadingMore) {
      handleScroll()
    }
  }, [inView])
}
