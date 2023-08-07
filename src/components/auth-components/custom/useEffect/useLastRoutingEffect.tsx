import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { routes } from '@/routing/router'

export const useLastRoutingEffect = () => {
  const { asPath } = useRouter()

  useEffect(() => {
    if (asPath !== routes.unprotected) {
      console.log('in', asPath)
      localStorage.removeItem('lastRouting')
      localStorage.setItem('lastRouting', asPath)
    }
  }, [asPath])
}
