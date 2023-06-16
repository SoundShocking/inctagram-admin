import { gql } from '@apollo/client'

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    users {
      totalCount
      items {
        userId
        userName
        createdAt
      }
    }
  }
`
