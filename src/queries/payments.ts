import { gql } from '@apollo/client'

export const GET_ALL_PAYMENTS = gql`
  query GetAllPayments(
    $pageSize: Int!
    $pageNumber: Int!
    $sortBy: SortByForPaymentsListInputType
    $sortDirection: SortDirectionType
    $search: String
  ) {
    paymentsList(
      pageSize: $pageSize
      pageNumber: $pageNumber
      sortBy: $sortBy
      sortDirection: $sortDirection
      search: $search
    ) {
      totalCount
      pagesCount
      items {
        urlAvatar
        userName
        createdAt
        amount
        typeSubscription
        paymentMethod
      }
    }
  }
`