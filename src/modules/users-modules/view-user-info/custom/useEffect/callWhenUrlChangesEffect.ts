import { useEffect } from 'react'
import { NextRouter } from 'next/router'

export const callWhenUrlChangesEffect = ({
  router,
  setActiveTab,
}: {
  router: NextRouter
  setActiveTab: (value: string) => void
}) => {
  useEffect(() => {
    // The function that will be called when the URL changes
    const handleUrlChange = () => {
      const queryParams = new URLSearchParams(window.location.search)
      const newActiveTab = queryParams.get('activeTab') || 'Upload Photos'

      setActiveTab(newActiveTab)
    }

    // Subscribe to route change events
    router.events.on('routeChangeComplete', handleUrlChange)

    // Unsubscribe from route change events when the component is unmounted
    return () => {
      router.events.off('routeChangeComplete', handleUrlChange)
    }
  }, [])
}
