import { useEffect } from 'react'

import { AuthContextType } from '@/store/storeTypes/storeTypes'

type AuthContextPick = Pick<AuthContextType, 'login' | 'logout'>

export const LoginEffect = ({ data, login, logout }: AuthContextPick & { data?: any }) => {
  useEffect(() => {
    const accessToken: string | null = localStorage?.getItem('authorization') || null

    data && accessToken ? login(true) : logout()
  }, [data])
}
