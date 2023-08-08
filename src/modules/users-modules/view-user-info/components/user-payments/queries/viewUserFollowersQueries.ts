import { gql } from '@apollo/client'

export const GET_USER_FOLLOWS = gql`
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
      followersUser {
        page
        pageSize
        pagesCount
        totalCount
        items {
          userId
          userName
          fullName
          createdAt
        }
      }
    }
  }
`
