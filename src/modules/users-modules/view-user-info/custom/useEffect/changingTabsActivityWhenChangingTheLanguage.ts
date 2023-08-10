import { useEffect } from 'react'

import { NextRouter } from 'next/router'

import { LocaleType, useTranslation } from '@/components'

export const callWhenUrlChangesEffect = ({
  router,
  setActiveTab,
  defaultTabs,
}: {
  router: NextRouter
  setActiveTab: (value: string | string[]) => void
  defaultTabs: string
  activeTab: any
}) => {
  useEffect(() => {
    // The function that will be called when the URL changes
    const handleUrlChange = () => {}
    const queryParams = router.query.activeTab
    const newActiveTab = queryParams || defaultTabs

    setActiveTab(newActiveTab)
    router.events.on('routeChangeComplete', handleUrlChange)

    // Unsubscribe from route change events when the component is unmounted
    return () => {
      router.events.off('routeChangeComplete', handleUrlChange)
    }
  }, [router.locale])
}
