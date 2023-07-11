import { gql } from '@apollo/client'

export const GET_USER_INFO = gql`
  query getUserInfo(
    $userId: Int!
    $pageNumber: Int
    $pageSize: Int
    $sortBy: SortByForUser = createdAt
    $sortDirection: SortDirectionType = Desc
  ) {
    user(
      userId: $userId
      pageNumber: $pageNumber
      pageSize: $pageSize
      sortBy: $sortBy
      sortDirection: $sortDirection
    ) {
      userId
      userName
      profileLink
      createdAt
      images {
        page
        pageSize
        pagesCount
        totalCount
        items {
          url
          createdAt
        }
      }
      payments {
        page
        pageSize
        pagesCount
        totalCount
        items {
          dataOfPayment
          endDateOfSubscription
          price
          type
          paymentType
        }
      }
    }
  }
`
