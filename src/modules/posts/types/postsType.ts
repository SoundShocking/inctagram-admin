import { Dispatch, SetStateAction } from 'react'

export type StatusType = 'PENDING' | 'ACTIVE' | 'BANNED' | 'DELETED'

export type SubscriptionDataPost = {
  createdPost: PostsItemsType
}

export type PostsItemsType = {
  createdAt: string
  userId: number
  userName: string
  postId: number
  status: StatusType
  description: string
  urlAvatar: string
  urlsPostsImages: string[]
  postStatus: 'PUBLISHED' | 'BANNED'
}

export type TableActionsDropDownType = {
  post: Pick<PostsItemsType, 'userName' | 'status' | 'postId' | 'postStatus' | 'userId'>
  setPostIdForLG: (id: number) => void
  openLG: () => void
}

export interface deletePostDataInterface {
  postDeleted: Pick<PostsItemsType, 'postId' | 'userId'>
}

//Status Selected
export enum PostStatusForPostsLisType {
  PUBLISHED = 'PUBLISHED',
  BANNED = 'BANNED',
}

export type StatusSelectedType = {
  status: PostStatusForPostsLisType
  setStatus: Dispatch<SetStateAction<PostStatusForPostsLisType>>
}

//ban unban post
export type BanReasonForPostInputType =
  | 'SEXUAL_CONTENT'
  | 'VIOLENCE_AND_CRUELTY'
  | 'DISCRIMINATION_AND_HATE'
  | 'SPAM_AND_SCAMS'
  | 'COPYRIGHT_INFRINGEMENT'
  | 'INAPPROPRIATE_BEHAVIOR'
  | 'PRIVACY_VIOLATION'
  | 'ILLEGAL_ACTIVITIES'
  | 'SHOCKING_OR_DISTURBING_CONTENT'
  | 'CONTROVERSIAL_TOPICS'

export type ReasonType = {
  text: string
  value: BanReasonForPostInputType
}

export type BanPostModalType = {
  isBanUserOpen: boolean
  setIsBanUserOpen: (isBanUserOpen: boolean) => void
} & Pick<PostsItemsType, 'userName' | 'postId'>

export type UnBanPostModalType = {
  isUnbanUserOpen: boolean
  setIsUnbanUserOpen: (isUnbanUserOpen: boolean) => void
} & Pick<PostsItemsType, 'userName' | 'postId'>
