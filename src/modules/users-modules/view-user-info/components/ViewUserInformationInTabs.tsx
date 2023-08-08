import { useState } from 'react'

import { nanoid } from 'nanoid'
import { useRouter } from 'next/router'

import { useTranslation } from '@/components'
import { TabsTitle } from '@/components/users'
import {
  callWhenUrlChangesEffect,
  changingTabsParametersUrlEffect,
  UserFollowers,
  UserFollowing,
  UserPayments,
} from '@/modules/users-modules/view-user-info'
import { UserPhotos } from '@/modules/users-modules/view-user-info/components/user-photos/components/UserPhotos'

export const ViewUserInformationInTabs = () => {
  const { t } = useTranslation()
  const defaultTabs = t.translation.userInfo.tabs.uploadPhotos
  const [activeTab, setActiveTab] = useState<any>()

  const router = useRouter()
  const { userId } = router.query

  changingTabsParametersUrlEffect({
    userId,
    activeTab,
  })
  callWhenUrlChangesEffect({
    setActiveTab,
    defaultTabs,
    router,
    activeTab,
  })
  const onChangeTab = (tabLabel: string | undefined) => {
    setActiveTab(tabLabel ?? '')
  }

  const view_user_info_tabs = [
    { id: nanoid(), label: t.translation.userInfo.tabs.uploadPhotos, content: UserPhotos },
    {
      id: nanoid(),
      label: t.translation.userInfo.tabs.payments,
      content: UserPayments,
    },
    {
      id: nanoid(),
      label: t.translation.userInfo.tabs.followers,
      content: UserFollowers,
    },
    {
      id: nanoid(),
      label: t.translation.userInfo.tabs.following,
      content: UserFollowing,
    },
  ]

  const tabsLayout = view_user_info_tabs?.map(tab => {
    return <div key={tab.id}>{activeTab === tab.label && <tab.content />}</div>
  })

  return (
    <div className="relative w-full">
      <TabsTitle tabs={view_user_info_tabs} setActiveTab={onChangeTab} activeTab={activeTab} />
      {tabsLayout}
    </div>
  )
}
