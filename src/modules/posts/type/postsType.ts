export type PostsItemsType = {
  createdAt: string
  userId: number
  userName: string
  postId: number
  status: string
  description: string
  urlAvatar: string
  urlsPostsImages: string[]
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
