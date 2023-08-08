import { gql } from '@apollo/client'

export const GET_USER_FOLLOWING = gql`
  query userList(
    $userId: Int!
    $pageNumber: Int
    $pageSize: Int
    $sortBy: SortByForUser
    $sortDirection: SortDirectionType
  ) {
    user(
      userId: $userId
      pageNumber: $pageNumber
      pageSize: $pageSize
      sortBy: $sortBy
      sortDirection: $sortDirection
    ) {
      followingUser {
        page
        pageSize
        pagesCount
        totalCount
        columnHeaders {
          en
          uk
          be
          ru
          wookie
        }
        items {
          userId
          userName
          fullName
          subscriptionDate
        }
      }
    }
  }
`
