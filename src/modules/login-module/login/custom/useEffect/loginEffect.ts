import { useEffect } from 'react'

import { AuthContextType } from '@/store/storeTypes/storeTypes'

type AuthContextPick = Pick<AuthContextType, 'login' | 'logout'>

export const LoginEffect = ({ data, login, logout }: AuthContextPick & { data?: any }) => {
  useEffect(() => {
    data ? login(true) : logout()
  }, [data])
}
