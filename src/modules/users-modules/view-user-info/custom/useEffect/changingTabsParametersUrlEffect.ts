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

  debugger
  useEffect(() => {
    console.log(userId)
    if (userId) {
      router.replace(`/users/${userId}`, {
        query: { activeTab: activeTab, comment: 'ActiveTab' },
      })
    }
  }, [activeTab])
}
