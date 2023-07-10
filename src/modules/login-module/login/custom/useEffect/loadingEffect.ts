import { useEffect } from 'react'

import { AuthContextType } from '@/store/storeTypes/storeTypes'

export const loadingEffect = ({
  loading,
  setLoading,
}: Pick<AuthContextType, 'loading' | 'setLoading'>) => {
  useEffect(() => {
    setLoading(loading)
  }, [loading])
}
