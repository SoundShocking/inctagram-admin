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
export interface UserType {
  paymentsUser: PaymentsUser
}
export interface UserPaymentsType {
  user: UserType
}
