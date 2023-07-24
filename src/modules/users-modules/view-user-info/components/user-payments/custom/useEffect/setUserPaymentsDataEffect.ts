import { useEffect } from 'react'

import { ItemsUserPaymentsType, PaymentsUser } from '@/modules/users-modules/view-user-info'

export const setUserPaymentsDataEffect = (
  paymentsUser: PaymentsUser | undefined,
  isLoading: boolean,
  setMyPaymentsData: (data: ItemsUserPaymentsType[]) => any
) => {
  return useEffect(() => {
    isLoading ? setMyPaymentsData(Array(10).fill({})) : paymentsUser
    !isLoading && paymentsUser && paymentsUser?.items.length > 0
      ? setMyPaymentsData(paymentsUser.items)
      : setMyPaymentsData(Array(1).fill({ price: 'No Payments' }))
  }, [isLoading, paymentsUser])
}
