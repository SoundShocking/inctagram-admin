import { PropsWithChildren, ReactElement } from 'react'

import { NextPage } from 'next'

import { Container } from '@/components/container'
import { LayoutWithHeader } from '@/components/layout/LayoutWithHeader/LayoutWithHeader'
import { Sidebar } from '@/components/sidebar'

export const GlobalLayout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <LayoutWithHeader>
      <main>
        <Container>
          <div className="grid grid-cols-[200px_1fr] min-h-[calc(100vh-60px)]">
            <Sidebar />

            <div className="pt-16 pl-6">{children}</div>
          </div>
        </Container>
      </main>
    </LayoutWithHeader>
  )
}

export const getGlobalLayout = (page: ReactElement) => {
  return <GlobalLayout>{page}</GlobalLayout>
}
