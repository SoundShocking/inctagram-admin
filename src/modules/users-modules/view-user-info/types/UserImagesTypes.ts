export type ItemsImagesType = {
  url: string
}

export interface ImagesType {
  totalCount: number
  items: ItemsImagesType[]
}
export interface UserType {
  images: ImagesType
}
export interface UserImagesType {
  user: UserType
}
