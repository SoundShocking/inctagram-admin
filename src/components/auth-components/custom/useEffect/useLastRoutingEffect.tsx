import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { routes } from '@/routing/router.js'

export const useLastRoutingEffect = () => {
  const { asPath, events, route } = useRouter()

  console.log(asPath)
  useEffect(() => {
    const handleRouteChange = () => {
      if (asPath !== routes.unprotected) {
        localStorage.setItem('lastRouting', asPath)
      }
    }

    events.on('routeChangeComplete', handleRouteChange)

    return () => {
      events.off('routeChangeComplete', handleRouteChange)
    }
  }, [asPath, route])
}
