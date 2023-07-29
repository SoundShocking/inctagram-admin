import { useEffect } from 'react'

import { PostStatusForPostsListInputType } from '@/modules/posts'

export const useStatusPostRefetchEffect = ({
  status,
  refetch,
}: {
  status: PostStatusForPostsListInputType
  refetch: () => void
}) => {
  useEffect(() => {
    refetch()
  }, [status])
}
