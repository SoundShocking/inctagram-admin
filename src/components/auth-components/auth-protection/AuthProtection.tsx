import React, { FC, memo, PropsWithChildren, useContext, useEffect } from 'react'

import { useRouter } from 'next/router'

import { handleAuthRedirectEffect, useLastRoutingEffect } from '@/components/auth-components'
import { accessTokenVerificationEffect } from '@/components/auth-components/custom/useEffect/accessTokenVerificationEffect'
import { AuthContext } from '@/store/store'
import { AuthContextType } from '@/store/storeTypes/storeTypes'
import { Preloader } from '@/ui'

const AuthProtection: FC<PropsWithChildren> = memo(({ children }) => {
  const { auth, loading, logout } = useContext<AuthContextType>(AuthContext)

  accessTokenVerificationEffect({ logout })
  useLastRoutingEffect()
  handleAuthRedirectEffect({ auth })

  return (
    <>
      {loading ? <Preloader /> : ''}
      {children}
    </>
  )
})

export default AuthProtection
