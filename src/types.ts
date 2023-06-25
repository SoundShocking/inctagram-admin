export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never
}
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  DateTime: { input: any; output: any }
}

/** Reasons for banning a user */
export enum BanReasonInputType {
  AdvertisingPlacement = 'Advertising_placement',
  AnotherReason = 'Another_reason',
  BadBehavior = 'Bad_behavior',
}

export type Mutation = {
  __typename?: 'Mutation'
  deleteUser: Scalars['Boolean']['output']
  updateUserStatus: Scalars['Boolean']['output']
}

export type MutationDeleteUserArgs = {
  userId: Scalars['Float']['input']
}

export type MutationUpdateUserStatusArgs = {
  banReason?: InputMaybe<BanReasonInputType>
  isBanned: Scalars['Boolean']['input']
  userId: Scalars['Int']['input']
}

export type PostForSuperAdminViewModel = {
  __typename?: 'PostForSuperAdminViewModel'
  createdAt?: Maybe<Scalars['DateTime']['output']>
  id?: Maybe<Scalars['Int']['output']>
  images: Array<PostImageForSuperAdminViewModel>
  ownerId?: Maybe<Scalars['Int']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type PostImageForSuperAdminViewModel = {
  __typename?: 'PostImageForSuperAdminViewModel'
  createdAt?: Maybe<Scalars['DateTime']['output']>
  fileSize?: Maybe<Scalars['Int']['output']>
  postId?: Maybe<Scalars['Int']['output']>
  status?: Maybe<Scalars['String']['output']>
  updatedAt?: Maybe<Scalars['DateTime']['output']>
  url?: Maybe<Scalars['String']['output']>
}

export type Query = {
  __typename?: 'Query'
  users: UsersWithPaginationViewModel
}

export type QueryUsersArgs = {
  pageNumber?: InputMaybe<Scalars['Int']['input']>
  pageSize?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
  sortBy?: InputMaybe<SortByForUsers>
  sortDirection?: InputMaybe<SortDirectionType>
  status?: InputMaybe<UserStatusInputType>
}

/** Sort By [id, userName, createdAt] */
export enum SortByForUsers {
  CreatedAt = 'createdAt',
  Id = 'id',
  UserName = 'userName',
}

/** Sort Direction [asc, desc] */
export enum SortDirectionType {
  Asc = 'Asc',
  Desc = 'Desc',
}

export type UserForSuperAdminViewModel = {
  __typename?: 'UserForSuperAdminViewModel'
  createdAt: Scalars['DateTime']['output']
  imagesCount: Scalars['Float']['output']
  posts: Array<PostForSuperAdminViewModel>
  postsCount: Scalars['Float']['output']
  profileLink?: Maybe<Scalars['String']['output']>
  status: UserStatusType
  userId: Scalars['Int']['output']
  userName: Scalars['String']['output']
}

/** User Status [all, active, banned] */
export enum UserStatusInputType {
  Active = 'active',
  All = 'all',
  Banned = 'banned',
}

/** User Status PENDING - user registered but not activated; ACTIVE - user registered and activated; BANNED - user banned by admin; DELETED - user deleted by admin */
export enum UserStatusType {
  Active = 'ACTIVE',
  Banned = 'BANNED',
  Deleted = 'DELETED',
  Pending = 'PENDING',
}

export type UsersWithPaginationViewModel = {
  __typename?: 'UsersWithPaginationViewModel'
  items: Array<UserForSuperAdminViewModel>
  page: Scalars['Int']['output']
  pageSize: Scalars['Int']['output']
  pagesCount: Scalars['Int']['output']
  totalCount: Scalars['Int']['output']
}

export class IconPropsType {}
