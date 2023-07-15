import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { AuthContextType } from '@/store/storeTypes/storeTypes'

type handleAuthRedirectEffectType = Pick<AuthContextType, 'logout'>

export const accessTokenVerificationEffect = ({ logout }: handleAuthRedirectEffectType) => {
  const { route } = useRouter()

  useEffect(() => {
    const accessToken: string | null = localStorage?.getItem('authorization') || null

    accessToken ? accessToken : logout()
  }, [route])
}
