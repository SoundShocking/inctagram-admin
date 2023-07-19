import { gql } from '@apollo/client'

export const BAN_UN_BAN_POST = gql`
  mutation updatePostStatus(
    $postId: Int!
    $isBanned: Boolean!
    $banReason: BanReasonForPostInputType
  ) {
    updatePostStatus(postId: $postId, isBanned: $isBanned, banReason: $banReason)
  }
`
