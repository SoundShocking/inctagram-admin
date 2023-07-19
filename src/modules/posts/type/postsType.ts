export type StatusType = 'PENDING' | 'ACTIVE' | 'BANNED' | 'DELETED'

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
