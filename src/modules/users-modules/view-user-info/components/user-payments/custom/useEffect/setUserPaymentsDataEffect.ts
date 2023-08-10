import { useEffect } from 'react'

export const setUserSkeletonDataEffect = <T extends { items?: U[] }, U>(
  dataUser: T | undefined,
  isLoading: boolean,
  setDataUser: (data: U[]) => any
) => {
  return useEffect(() => {
    if (isLoading) {
      setDataUser(Array(10).fill({}))
    } else if (!isLoading && dataUser && dataUser.items && dataUser.items.length > 0) {
      setDataUser(dataUser.items)
    } else {
      setDataUser(Array(1).fill({ price: 'No Data' }))
    }
  }, [isLoading, dataUser])
}
