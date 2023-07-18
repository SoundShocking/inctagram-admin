import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { routes } from '@/routing/router.js'

export const useLastRoutingEffect = () => {
  const { asPath } = useRouter()
  // const { userId } = query

  useEffect(() => {
    if (asPath !== routes.unprotected) {
      localStorage.removeItem('lastRouting')
      localStorage.setItem('lastRouting', asPath)
    }
  }, [asPath])

  // useEffect(() => {
  //   const handleRouteChange = () => {
  //     if (asPath !== routes.unprotected) {
  //       localStorage.removeItem('lastRouting')
  //       localStorage.setItem('lastRouting', asPath)
  //     }
  //   }
  //
  //   events.on('routeChangeComplete', handleRouteChange)
  //
  //   return () => {
  //     events.off('routeChangeComplete', handleRouteChange)
  //   }
  // }, [asPath, route, userId])
}
