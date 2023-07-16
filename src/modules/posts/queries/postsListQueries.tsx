import { gql } from '@apollo/client'

export const GET_POSTS_LIST = gql`
  query getUserList(
    $search: String
    $pageNumber: Int
    $pageSize: Int
    $sortBy: SortByForPaymentsListInputType
    $sortDirection: SortDirectionType
  ) {
    postsList(
      search: $search
      pageNumber: $pageNumber
      pageSize: $pageSize
      sortBy: $sortBy
      sortDirection: $sortDirection
    ) {
      page
      pageSize
      pagesCount
      totalCount
      items {
        createdAt
        userId
        userName
        status
        description
        urlAvatar
        urlsPostsImages
      }
    }
  }
`
