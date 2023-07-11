import { gql } from '@apollo/client'

export const GET_USER_INFO = gql`
  query getUserInfo($search: String) {
    users(search: $search) {
      items {
        userId
        userName
        profileLink
        createdAt
      }
    }
  }
`
