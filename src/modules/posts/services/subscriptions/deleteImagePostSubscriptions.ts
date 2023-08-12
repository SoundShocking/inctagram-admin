import { gql } from '@apollo/client'

export const SUBSCRIPTIONS_DELETE_IMAGE_POST = gql`
  subscription deleteImagePostSubscriptions {
    imagePostDeleted {
      userId
      postId
      urlAvatar
      userName
      createdAt
      description
      status
      postStatus
      urlsPostsImages
      banReasonText
    }
  }
`
