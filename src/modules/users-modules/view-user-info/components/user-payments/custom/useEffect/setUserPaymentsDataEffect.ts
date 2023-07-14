import { useEffect } from 'react'

import {
  ItemsPaymentsType,
  PaymentsUser,
} from '@/modules/users-modules/view-user-info/components/user-payments/types/UserPaymentsType'

export const setUserPaymentsDataEffect = (
  paymentsUser: PaymentsUser | undefined,
  isLoading: boolean,
  setMyPaymentsData: (data: ItemsPaymentsType[]) => any
) => {
  return useEffect(() => {
    isLoading ? setMyPaymentsData(Array(30).fill({})) : paymentsUser
    if (paymentsUser) {
      setMyPaymentsData(paymentsUser.items)
    }
  }, [isLoading, paymentsUser])
}
