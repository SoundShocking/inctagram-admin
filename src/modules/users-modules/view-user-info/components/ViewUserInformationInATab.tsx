import { useState } from 'react'

import { TabsTitle } from '@/components/users'
import { view_user_info_tabs } from '@/modules/users-modules/view-user-info'

export const ViewUserInformationInATab = () => {
  const [activeTab, setActiveTab] = useState('Upload Photos')

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
