import { gql } from '@apollo/client'

export const GET_ALL_USERS = gql`
  query GetAllUsers($pageSize: Int!, $pageNumber: Int!) {
    users(pageSize: $pageSize, pageNumber: $pageNumber) {
      totalCount
      pagesCount
      items {
        userId
        userName
        createdAt
      }
    }
  }
`
