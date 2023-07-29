import { useEffect } from 'react'

import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

import { AuthContextType } from '@/store/storeTypes/storeTypes'

type handleAuthRedirectEffectType = Pick<AuthContextType, 'logout'>

export const accessTokenVerificationEffect = ({ logout }: handleAuthRedirectEffectType) => {
  const { route } = useRouter()

  useEffect(() => {
    const accessToken: string | null = Cookies.get('authToken') || null

    accessToken ? accessToken : logout()
  }, [route])
}
