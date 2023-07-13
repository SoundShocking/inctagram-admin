export type ItemsImagesType = {
  url: string
}

export interface ImagesType {
  totalCount: number
  items: ItemsImagesType[]
}
export interface UserType {
  imagesUser: ImagesType
}
export interface UserImagesType {
  user: UserType
}
