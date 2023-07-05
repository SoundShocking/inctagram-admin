import { useEffect } from 'react'

import { NextRouter } from 'next/router'

export const changingTabsParametersUrlEffect = ({
  userName,
  activeTab,
  router,
}: {
  userName: string | string[] | undefined
  activeTab: string
  router: NextRouter
}) => {
  useEffect(() => {
    if (userName) {
      router.push(`/users-list/${userName}?activeTab=${activeTab}`, undefined, {
        shallow: true,
      })
    }
  }, [activeTab])
}
