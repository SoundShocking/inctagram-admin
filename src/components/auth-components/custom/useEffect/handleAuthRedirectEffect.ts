import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { unProtectedPaths } from '@/components/auth-components'
import { routes } from '@/routing/router.js'
import { AuthContextType } from '@/store/storeTypes/storeTypes'

type handleAuthRedirectEffectType = Pick<AuthContextType, 'auth'>

export const handleAuthRedirectEffect = ({ auth }: handleAuthRedirectEffectType) => {
  const { pathname, replace } = useRouter()

  useEffect(() => {
    if (auth && unProtectedPaths.includes(pathname)) {
      replace(routes.protected, undefined, { shallow: true })
    }
    if (!auth && !unProtectedPaths.includes(pathname)) {
      // @ts-ignore
      replace(routes.unprotected, undefined, { shallow: true })
    }
  }, [auth])
}
