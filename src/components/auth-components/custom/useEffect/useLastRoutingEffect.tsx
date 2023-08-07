import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { routes } from '@/routing/router'

export const useLastRoutingEffect = () => {
  const { asPath } = useRouter()

  console.log(asPath)
  useEffect(() => {
    if (asPath !== routes.unprotected && undefined) {
      localStorage.removeItem('lastRouting')
      localStorage.setItem('lastRouting', asPath)
    }
  }, [asPath])
}
