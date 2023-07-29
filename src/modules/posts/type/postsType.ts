export type StatusType = 'PENDING' | 'ACTIVE' | 'BANNED' | 'DELETED'

export type SubscriptionData = {
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

export type PostsListType = {
  page: number
  pageSize: number
  pagesCount: number
  totalCount: number
  items: PostsItemsType[]
}

export type PostsType =
  | {
      postsList: PostsListType
    }
  | undefined

export type TableActionsDropDownType = {
  post: Pick<PostsItemsType, 'userName' | 'status' | 'postId' | 'postStatus' | 'userId'>
}

//Status Selected
export enum PostStatusForPostsListInputType {
  PUBLISHED = 'PUBLISHED',
  BANNED = 'BANNED',
}

export type StatusSelectedType = {
  status: PostStatusForPostsListInputType
  setStatus: (status: PostStatusForPostsListInputType) => void
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
  postId: number
  userName: string
}

export type UnBanPostModalType = {
  isUnbanUserOpen: boolean
  setIsUnbanUserOpen: (isUnbanUserOpen: boolean) => void
  userName: string
  postId: number
}
