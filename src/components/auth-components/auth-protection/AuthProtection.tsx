import React, { FC, memo, PropsWithChildren, useContext } from 'react'

import { handleAuthRedirectEffect } from '@/components/auth-components'
import { AuthContext } from '@/store/store'
import { AuthContextType } from '@/store/storeTypes/storeTypes'
import { Preloader } from '@/ui'

const AuthProtection: FC<PropsWithChildren> = memo(({ children }) => {
  const { auth, loading } = useContext<AuthContextType>(AuthContext)

  handleAuthRedirectEffect({ auth })

  return (
    <>
      {loading ? <Preloader /> : ''}
      {children}
    </>
  )
})

export default AuthProtection
