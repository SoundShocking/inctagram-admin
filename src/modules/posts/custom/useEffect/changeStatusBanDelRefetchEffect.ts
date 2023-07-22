import { useEffect } from 'react'

import { PostStatusForPostsListInputType } from '@/modules/posts'

export const changeStatusBanDelRefetchEffect = ({
  postStatusBannedDeleted,
  refetch,
}: {
  postStatusBannedDeleted: boolean
  refetch: () => void
}) => {
  useEffect(() => {
    refetch()
  }, [postStatusBannedDeleted])
}
