import { useEffect } from 'react'

import { NextRouter } from 'next/router'

export const callWhenUrlChangesEffect = ({
  router,
  setActiveTab,
  defaultTabs,
}: {
  router: NextRouter
  setActiveTab: (value: string) => void
  defaultTabs: string
  activeTab: any
}) => {
  useEffect(() => {
    // The function that will be called when the URL changes

    const handleUrlChange = () => {
      const queryParams = new URLSearchParams(window.location.search)
      const newActiveTab = queryParams.get('activeTab') || defaultTabs

      setActiveTab(newActiveTab)
    }

    router.events.on('routeChangeComplete', handleUrlChange)

    // Unsubscribe from route change events when the component is unmounted
    return () => {
      router.events.off('routeChangeComplete', handleUrlChange)
    }
  }, [defaultTabs])
}
