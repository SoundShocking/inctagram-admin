import { gql } from '@apollo/client'

export const BAN_UNBAN_POST = gql`
  mutation updatePostStatus(
    $postId: Int!
    $isBanned: Boolean!
    $banReason: BanReasonForPostInputType
  ) {
    updatePostStatus(postId: $postId, isBanned: $isBanned, banReason: $banReason)
  }
`
