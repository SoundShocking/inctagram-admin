import { FC } from 'react'

// eslint-disable-next-line import/no-named-as-default
import clsx from 'clsx'

interface ITabComponentType {
  label: string | undefined
  activeTab?: string | null | string[]
  setActiveTab?: (activeTab: string | undefined) => void
}

export const TabComponent: FC<ITabComponentType> = ({ label, activeTab, setActiveTab }) => {
  return (
    <div className="flex justify-center align-middle text-sm font-semibold leading-6">
      <div
        className={clsx(
          'py-[6px] px-[24px]',
          activeTab === label &&
            'tabsSelected flex justify-center align-middle hover:border-b-2 hover:border-b-accent-500  active:bg-[#0c131f]',
          activeTab !== label &&
            'tabsUnselected flex justify-center align-middle hover:text-accent-500 '
        )}
        onClick={() => setActiveTab?.(label)}
      >
        {label}
      </div>
    </div>
  )
}
