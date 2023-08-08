import { gql } from '@apollo/client'

export const GET_USER_INFO = gql`
  query getUserInfo($userId: Int!) {
    user(userId: $userId) {
      userId
      userName
      profileLink
      createdAt
      status
    }
  }
`
