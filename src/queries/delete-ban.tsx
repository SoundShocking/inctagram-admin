import { gql } from '@apollo/client'

export const DELETE_USER = gql`
  mutation deleteUser($userId: Float!) {
    deleteUser(userId: $userId)
  }
`

export const UPDATE_USER_STATUS = gql`
  mutation updateUserStatus(
    $userId: Int!
    $banReason: BanReasonInputType
    $isBanned: Boolean!
    $details: String
  ) {
    updateUserStatus(userId: $userId, banReason: $banReason, isBanned: $isBanned, details: $details)
  }
`
