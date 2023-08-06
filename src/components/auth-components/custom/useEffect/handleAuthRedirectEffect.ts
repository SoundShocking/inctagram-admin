import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { unProtectedPaths } from '@/components/auth-components'
import { routes } from '@/routing/router'
import { AuthContextType } from '@/store/storeTypes/storeTypes'

type handleAuthRedirectEffectType = Pick<AuthContextType, 'auth'>

export const handleAuthRedirectEffect = ({ auth }: handleAuthRedirectEffectType) => {
  const { pathname, replace, route } = useRouter()

  useEffect(() => {
    const lastRouting: string | null = localStorage.getItem('lastRouting') || null

    if (auth && unProtectedPaths.includes(pathname)) {
      replace(lastRouting ? lastRouting : routes.protected, undefined, {
        shallow: true,
      })
    }
    if (!auth && !unProtectedPaths.includes(pathname)) {
      replace(routes.unprotected, undefined, { shallow: true })
    }
  }, [auth, route])
}
