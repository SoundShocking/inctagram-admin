import { useEffect } from 'react'

export const changingTabsActivityWhenChangingTheLanguage = ({
  setActiveTab,
  defaultTabs,
}: {
  setActiveTab: (value: string) => void
  defaultTabs: string
}) => {
  useEffect(() => {
    setActiveTab(defaultTabs)
  }, [defaultTabs])
}
