import { gql } from '@apollo/client'

export const GET_USER_IMAGES = gql`
  query getUserImages(
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
      imagesUser {
        page
        pageSize
        pagesCount
        totalCount
        items {
          url
          createdAt
        }
      }
    }
  }
`
