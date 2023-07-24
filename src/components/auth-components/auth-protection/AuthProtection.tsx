import React, { FC, memo, PropsWithChildren, useContext } from 'react'

import { handleAuthRedirectEffect, useLastRoutingEffect } from '@/components/auth-components'
import { accessTokenVerificationEffect } from '@/components/auth-components/custom/useEffect/accessTokenVerificationEffect'
import { AuthContext } from '@/store/store'
import { AuthContextType } from '@/store/storeTypes/storeTypes'
import { Preloader } from '@/ui'

const AuthProtection: FC<PropsWithChildren> = memo(({ children }) => {
  const { auth, loading, logout } = useContext<AuthContextType>(AuthContext)

  accessTokenVerificationEffect({ logout })
  handleAuthRedirectEffect({ auth })
  useLastRoutingEffect()

  return (
    <>
      {loading ? <Preloader /> : ''}
      {children}
    </>
  )
})

export default AuthProtection
