export type ItemsImagesType = {
  url: string
}

export interface ImagesUserType {
  totalCount: number
  items: ItemsImagesType[]
}
export interface UserPhotosType {
  imagesUser: ImagesUserType
}
export interface UserImagesType {
  user: UserPhotosType
}
