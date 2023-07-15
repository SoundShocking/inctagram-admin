import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { routes } from '@/routing/router.js'

export const useLastRouting = () => {
  const { asPath, events, route } = useRouter()

  console.log(asPath !== routes.unprotected)
  useEffect(() => {
    const handleRouteChange = () => {
      if (asPath !== routes.unprotected) {
        localStorage.setItem('lastRouting', asPath)
      }
    }

    events.on('routeChangeComplete', handleRouteChange)

    // Восстанавливаем последний роутинг после компонента размонтирован
    return () => {
      events.off('routeChangeComplete', handleRouteChange)
    }
  }, [asPath, route])
}
