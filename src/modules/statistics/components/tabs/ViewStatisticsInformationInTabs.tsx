import { useState } from 'react'

import { nanoid } from 'nanoid'
import { useRouter } from 'next/router'

import { useTranslation } from '@/components'
import { TabsTitle } from '@/components/users'
import { UploadedPhotosChart } from '@/modules/statistics/components/uploaded-photos/UploadedPhotosChart'
import { UsersChart } from '@/modules/statistics/components/users-chart/UsersChart'
import {
  callWhenUrlChangesEffect,
  changingTabsParametersUrlEffect,
} from '@/modules/users-modules/view-user-info'

export const ViewStatisticsInformationInTabs = () => {
  const { t } = useTranslation()
  const defaultTabs = t.translation.statistics.users.users
  const [activeTab, setActiveTab] = useState<any>(defaultTabs)

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

  const view_statistics_info_tabs = [
    {
      id: nanoid(),
      label: t.translation.statistics.users.users,
      content: UsersChart,
    },
    {
      id: nanoid(),
      label: t.translation.statistics.photos.photos,
      content: UploadedPhotosChart,
    },
  ]

  const tabsLayout = view_statistics_info_tabs?.map(tab => {
    return <div key={tab.id}>{activeTab === tab.label && <tab.content />}</div>
  })

  return (
    <div className="relative w-full">
      <TabsTitle
        tabs={view_statistics_info_tabs}
        setActiveTab={onChangeTab}
        activeTab={activeTab}
      />
      {tabsLayout}
    </div>
  )
}
