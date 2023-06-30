import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { TabsTitle } from '@/components/users'
import { view_user_info_tabs } from '@/modules/users-modules/view-user-info'

export const ViewUserInformationInATab = () => {
  const [activeTab, setActiveTab] = useState('Upload Photos')
  const router = useRouter()

  useEffect(() => {
    if (router.query.userName) {
      router.push(`/users-list/${router.query.userName}?activeTab=${activeTab}`, undefined, {
        shallow: true,
      })
    }
  }, [activeTab])

  useEffect(() => {
    // Функция, которая будет вызываться при изменении URL
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

  const onChangeTab = (tabLabel: string | undefined) => {
    setActiveTab(tabLabel ?? '')
  }

  const tabsLayout = view_user_info_tabs?.map(tab => {
    return <div key={tab.id}>{activeTab === tab.label && tab.content}</div>
  })

  return (
    <div className="relative w-full">
      <TabsTitle tabs={view_user_info_tabs} setActiveTab={onChangeTab} activeTab={activeTab} />
      {tabsLayout}
    </div>
  )
}
