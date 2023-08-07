import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { routes } from '@/routing/router'

export const useLastRoutingEffect = () => {
  const { asPath } = useRouter()

  console.log('use last routing', asPath)
  useEffect(() => {
    if (asPath !== routes.unprotected && undefined) {
      console.log('in', asPath)
      localStorage.removeItem('lastRouting')
      localStorage.setItem('lastRouting', asPath)
    }
  }, [asPath])
}
