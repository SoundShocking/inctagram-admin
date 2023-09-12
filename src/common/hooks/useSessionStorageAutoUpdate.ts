import { useEffect } from 'react'

export const useSessionStorageAutoUpdate = (setAutoUpdate: (autoUpdate: boolean) => void) => {
  useEffect(() => {
    const value = sessionStorage.getItem('autoUpdatePosts')

    if (value) {
      const booleanValue = JSON.parse(value)

      setAutoUpdate(booleanValue)
    }
  }, [])
}
