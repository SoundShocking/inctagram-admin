import { useEffect } from 'react'

import Cookies from 'js-cookie'

import { AuthContextType } from '@/store/storeTypes/storeTypes'

type AuthContextPick = Pick<AuthContextType, 'login' | 'logout'>

export const LoginEffect = ({ data, login, logout }: AuthContextPick & { data: any }) => {
  const accessToken: string | null = Cookies.get('authToken') || null

  useEffect(() => {
    data && accessToken ? login(true) : logout()
  }, [data])
}
