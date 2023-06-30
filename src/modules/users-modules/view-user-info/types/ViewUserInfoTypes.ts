export type User = {
  userId: number
  userName: string
  profileLink: string
  createdAt: string
}
export interface UserData {
  users: {
    items: User[]
  }
}
