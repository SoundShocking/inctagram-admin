import { gql } from '@apollo/client'

export const GET_POSTS_LIST = gql`
  query getUserList(
    $search: String
    $pageNumber: Int
    $pageSize: Int
    $sortBy: SortByForPostsListInputType
    $sortDirection: SortDirectionType
    $status: PostStatusForPostsListInputType
  ) {
    postsList(
      search: $search
      status: $status
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
        postId
        status
        description
        urlAvatar
        urlsPostsImages
      }
    }
  }
`
