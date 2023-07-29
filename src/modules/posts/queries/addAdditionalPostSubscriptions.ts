import { gql } from '@apollo/client'

export const SUBSCRIPTIONS_ADD_POST_ADDITIONAL = gql`
  subscription addAdditionalPost {
    createdPost {
      createdAt
      userId
      userName
      postId
      status
      description
      urlAvatar
      urlsPostsImages
      postStatus
    }
  }
`
