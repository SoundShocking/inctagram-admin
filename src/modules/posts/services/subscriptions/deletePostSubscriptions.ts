import { gql } from '@apollo/client'

export const SUBSCRIPTIONS_DELETE_POST = gql`
  subscription deletePost {
    postDeleted {
      userId
      postId
    }
  }
`
