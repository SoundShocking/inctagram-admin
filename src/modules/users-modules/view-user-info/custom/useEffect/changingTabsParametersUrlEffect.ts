import { useEffect } from 'react'

import { useRouter } from 'next/router'

export const changingTabsParametersUrlEffect = ({
  userId,
  activeTab,
}: {
  userId: string | string[] | undefined
  activeTab: string
}) => {
  const router = useRouter()

  useEffect(() => {
    if (userId) {
      router.replace(`/users-list/${userId}`, {
        query: { activeTab: activeTab, comment: 'ActiveTab' },
      })
    }
  }, [activeTab])
}
