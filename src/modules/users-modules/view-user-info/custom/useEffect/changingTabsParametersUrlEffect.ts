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
    if (userId !== undefined) {
      router.replace(`/users/${userId}`, { query: activeTab })
    }
  }, [activeTab, router])
}
