import { useEffect } from 'react'

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
