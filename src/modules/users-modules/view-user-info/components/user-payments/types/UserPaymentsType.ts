export type ItemsUserPaymentsType = {
  dataOfPayment: Date
  endDateOfSubscription: Date
  price: number
  type: string
  paymentType: string
}

export interface PaymentsUser {
  page: number
  pageSize: number
  pagesCount: number
  totalCount: number
  items: ItemsUserPaymentsType[]
}
export interface UsersPaymentType {
  paymentsUser: PaymentsUser
}
export interface UserPaymentsType {
  users: UsersPaymentType
}
