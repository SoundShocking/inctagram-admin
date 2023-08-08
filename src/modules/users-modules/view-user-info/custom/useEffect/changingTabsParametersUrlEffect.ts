import { useEffect } from 'react'

import { useRouter } from 'next/router'

export const changingTabsParametersUrlEffect = ({
  userId,
  activeTab,
}: {
  userId: any
  activeTab: string | string[]
}) => {
  const router = useRouter()

  useEffect(() => {
    if (userId !== undefined) {
      router.replace(
        {
          pathname: `/users/${userId}`,
          query: { activeTab: activeTab },
        },
        undefined,
        { shallow: true }
      )
    }
  }, [activeTab])
}
