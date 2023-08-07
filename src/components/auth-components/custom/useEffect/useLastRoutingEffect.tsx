import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { routes } from '@/routing/router'

export const useLastRoutingEffect = () => {
  const { asPath } = useRouter()

  useEffect(() => {
    if (asPath !== routes.unprotected) {
      asPath !== '/users/[userId]'
        ? localStorage.setItem('lastRouting', asPath)
        : localStorage.setItem('lastRouting', routes.users)
    }
  }, [asPath])
}
