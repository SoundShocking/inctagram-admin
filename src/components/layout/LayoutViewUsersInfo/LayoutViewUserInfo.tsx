import { PropsWithChildren, ReactElement } from 'react'

import { NextPage } from 'next'

import { LayoutWithHeader } from '@/components/layout/LayoutWithHeader/LayoutWithHeader'

export const LayoutViewUserInfo: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <LayoutWithHeader>
      <div className="flex">{children}</div>
    </LayoutWithHeader>
  )
}

export const GetLayoutViewUserInfo = (page: ReactElement) => {
  return <LayoutViewUserInfo>{page}</LayoutViewUserInfo>
}
