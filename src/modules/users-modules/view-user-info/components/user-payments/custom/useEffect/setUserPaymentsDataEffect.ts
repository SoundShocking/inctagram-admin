import { useEffect } from 'react'

import { ItemsPaymentsType, PaymentsUser } from '@/modules/users-modules/view-user-info'

export const setUserPaymentsDataEffect = (
  paymentsUser: PaymentsUser | undefined,
  isLoading: boolean,
  setMyPaymentsData: (data: ItemsPaymentsType[]) => any
) => {
  return useEffect(() => {
    isLoading ? setMyPaymentsData(Array(30).fill({})) : paymentsUser
    paymentsUser ? setMyPaymentsData(paymentsUser.items) : setMyPaymentsData(Array(10).fill({}))
  }, [isLoading, paymentsUser])
}
