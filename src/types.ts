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
  Timestamp: { input: any; output: any }
}

/** Reasons for banning a post */
export enum BanReasonForPostInputType {
  ControversialTopics = 'CONTROVERSIAL_TOPICS',
  CopyrightInfringement = 'COPYRIGHT_INFRINGEMENT',
  DiscriminationAndHate = 'DISCRIMINATION_AND_HATE',
  IllegalActivities = 'ILLEGAL_ACTIVITIES',
  InappropriateBehavior = 'INAPPROPRIATE_BEHAVIOR',
  PrivacyViolation = 'PRIVACY_VIOLATION',
  SexualContent = 'SEXUAL_CONTENT',
  ShockingOrDisturbingContent = 'SHOCKING_OR_DISTURBING_CONTENT',
  SpamAndScams = 'SPAM_AND_SCAMS',
  ViolenceAndCruelty = 'VIOLENCE_AND_CRUELTY',
}

/** Reasons for banning a user */
export enum BanReasonInputType {
  AdvertisingPlacement = 'Advertising_placement',
  AnotherReason = 'Another_reason',
  BadBehavior = 'Bad_behavior',
}

export type ImageForSuperAdminViewModel = {
  __typename?: 'ImageForSuperAdminViewModel'
  createdAt: Scalars['DateTime']['output']
  fileSize: Scalars['Int']['output']
  ownerId: Scalars['Int']['output']
  updatedAt: Scalars['DateTime']['output']
  url: Scalars['String']['output']
}

export type ImagesWithPaginationViewModel = {
  __typename?: 'ImagesWithPaginationViewModel'
  items: Array<ImageForSuperAdminViewModel>
  page: Scalars['Int']['output']
  pageSize: Scalars['Int']['output']
  pagesCount: Scalars['Int']['output']
  totalCount: Scalars['Int']['output']
}

export type Mutation = {
  __typename?: 'Mutation'
  deleteUser: Scalars['Boolean']['output']
  updatePostStatus: Scalars['Boolean']['output']
  updateUserStatus: Scalars['Boolean']['output']
}

export type MutationDeleteUserArgs = {
  userId: Scalars['Float']['input']
}

export type MutationUpdatePostStatusArgs = {
  banReason?: InputMaybe<BanReasonForPostInputType>
  details?: InputMaybe<Scalars['String']['input']>
  isBanned: Scalars['Boolean']['input']
  postId: Scalars['Int']['input']
}

export type MutationUpdateUserStatusArgs = {
  banReason?: InputMaybe<BanReasonInputType>
  details?: InputMaybe<Scalars['String']['input']>
  isBanned: Scalars['Boolean']['input']
  userId: Scalars['Int']['input']
}

/** Payment Method [STRIPE, PAYPAL] */
export enum PaymentMethod {
  Paypal = 'PAYPAL',
  Stripe = 'STRIPE',
}

export type PaymentsListViewModel = {
  __typename?: 'PaymentsListViewModel'
  amount: Scalars['Float']['output']
  createdAt: Scalars['DateTime']['output']
  paymentType: PaymentMethod
  status: StatusSubscriptionType
  typeSubscription: Scalars['String']['output']
  urlAvatar?: Maybe<Scalars['String']['output']>
  userId: Scalars['Float']['output']
  userName: Scalars['String']['output']
}

export type PaymentsListWithPaginationViewModel = {
  __typename?: 'PaymentsListWithPaginationViewModel'
  items: Array<PaymentsListViewModel>
  page: Scalars['Int']['output']
  pageSize: Scalars['Int']['output']
  pagesCount: Scalars['Int']['output']
  totalCount: Scalars['Int']['output']
}

export type PaymentsWithPaginationViewModel = {
  __typename?: 'PaymentsWithPaginationViewModel'
  items: Array<SubscriptionForSuperAdminViewModel>
  page: Scalars['Int']['output']
  pageSize: Scalars['Int']['output']
  pagesCount: Scalars['Int']['output']
  totalCount: Scalars['Int']['output']
}

export type PostDeletedViewModel = {
  __typename?: 'PostDeletedViewModel'
  postId: Scalars['Float']['output']
  userId: Scalars['Float']['output']
}

export type PostForSuperAdminViewModel = {
  __typename?: 'PostForSuperAdminViewModel'
  createdAt: Scalars['DateTime']['output']
  id: Scalars['Int']['output']
  images: Array<PostImageForSuperAdminViewModel>
  ownerId: Scalars['Int']['output']
  updatedAt: Scalars['DateTime']['output']
}

export type PostImageForSuperAdminViewModel = {
  __typename?: 'PostImageForSuperAdminViewModel'
  createdAt: Scalars['DateTime']['output']
  fileSize: Scalars['Int']['output']
  postId: Scalars['Int']['output']
  status: Scalars['String']['output']
  updatedAt: Scalars['DateTime']['output']
  url: Scalars['String']['output']
}

/** Post Status [published, banned] */
export enum PostStatusForPostsListInputType {
  Banned = 'BANNED',
  Published = 'PUBLISHED',
}

export type PostsListViewModel = {
  __typename?: 'PostsListViewModel'
  createdAt: Scalars['DateTime']['output']
  description?: Maybe<Scalars['String']['output']>
  postId: Scalars['Float']['output']
  postStatus: PostStatusForPostsListInputType
  status: UserStatusType
  urlAvatar?: Maybe<Scalars['String']['output']>
  urlsPostsImages?: Maybe<Array<Scalars['String']['output']>>
  userId: Scalars['Float']['output']
  userName: Scalars['String']['output']
}

export type PostsListWithPaginationViewModel = {
  __typename?: 'PostsListWithPaginationViewModel'
  items: Array<PostsListViewModel>
  page: Scalars['Int']['output']
  pageSize: Scalars['Int']['output']
  pagesCount: Scalars['Int']['output']
  totalCount: Scalars['Int']['output']
}

export type Query = {
  __typename?: 'Query'
  paymentsList: PaymentsListWithPaginationViewModel
  postsList: PostsListWithPaginationViewModel
  statisticsPaidAccounts: StatisticsForGraphicsAdminViewModel
  statisticsUsers: StatisticsForGraphicsAdminViewModel
  user: UserForSuperAdminViewModel
  users: UsersWithPaginationViewModel
}

export type QueryPaymentsListArgs = {
  pageNumber?: InputMaybe<Scalars['Int']['input']>
  pageSize?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
  sortBy?: InputMaybe<SortByForPaymentsListInputType>
  sortDirection?: InputMaybe<SortDirectionType>
}

export type QueryPostsListArgs = {
  pageNumber?: InputMaybe<Scalars['Int']['input']>
  pageSize?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
  sortBy?: InputMaybe<SortByForPostsListInputType>
  sortDirection?: InputMaybe<SortDirectionType>
  status?: InputMaybe<PostStatusForPostsListInputType>
}

export type QueryStatisticsPaidAccountsArgs = {
  comparisonEndDate?: InputMaybe<Scalars['Timestamp']['input']>
  comparisonStartDate?: InputMaybe<Scalars['Timestamp']['input']>
  endDate: Scalars['Timestamp']['input']
  startDate: Scalars['Timestamp']['input']
}

export type QueryStatisticsUsersArgs = {
  comparisonEndDate?: InputMaybe<Scalars['Timestamp']['input']>
  comparisonStartDate?: InputMaybe<Scalars['Timestamp']['input']>
  endDate: Scalars['Timestamp']['input']
  startDate: Scalars['Timestamp']['input']
}

export type QueryUserArgs = {
  pageNumber?: InputMaybe<Scalars['Int']['input']>
  pageSize?: InputMaybe<Scalars['Int']['input']>
  sortBy?: InputMaybe<SortByForUser>
  sortDirection?: InputMaybe<SortDirectionType>
  userId: Scalars['Int']['input']
}

export type QueryUsersArgs = {
  pageNumber?: InputMaybe<Scalars['Int']['input']>
  pageSize?: InputMaybe<Scalars['Int']['input']>
  search?: InputMaybe<Scalars['String']['input']>
  sortBy?: InputMaybe<SortByForUsers>
  sortDirection?: InputMaybe<SortDirectionType>
  status?: InputMaybe<UserStatusInputType>
}

/** Sort By [id, createdAt, price,  paymentType] */
export enum SortByForPaymentsListInputType {
  CreatedAt = 'createdAt',
  Id = 'id',
  PaymentType = 'paymentType',
  Price = 'price',
}

/** Sort By [id, createdAt] */
export enum SortByForPostsListInputType {
  CreatedAt = 'createdAt',
  Id = 'id',
}

/** Sort By [id, createdAt] */
export enum SortByForUser {
  CreatedAt = 'createdAt',
  Id = 'id',
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

export type StatisticsData = {
  __typename?: 'StatisticsData'
  metrics: StatisticsMetrics
  metricsComparison?: Maybe<StatisticsMetrics>
}

export type StatisticsForGraphicsAdminViewModel = {
  __typename?: 'StatisticsForGraphicsAdminViewModel'
  data?: Maybe<StatisticsData>
  query?: Maybe<StatisticsQuery>
}

export type StatisticsMetrics = {
  __typename?: 'StatisticsMetrics'
  countUsers?: Maybe<Array<Scalars['Float']['output']>>
  maxCountUsers: Scalars['Float']['output']
  maxRoundUsers: Scalars['Float']['output']
  sumUsers: Scalars['Float']['output']
  time_intervals: Array<Scalars['DateTime']['output']>
  total_rows: Scalars['Float']['output']
}

export type StatisticsQuery = {
  __typename?: 'StatisticsQuery'
  comparisonEndDate?: Maybe<Scalars['DateTime']['output']>
  comparisonStartDate?: Maybe<Scalars['DateTime']['output']>
  dateEnd: Scalars['DateTime']['output']
  dateStart: Scalars['DateTime']['output']
}

/** StatusSubscriptionType [PENDING, ACTIVE, FINISHED, DELETED] */
export enum StatusSubscriptionType {
  Active = 'ACTIVE',
  Deleted = 'DELETED',
  Finished = 'FINISHED',
  Pending = 'PENDING',
}

export type Subscription = {
  __typename?: 'Subscription'
  createdPost: PostsListViewModel
  createdSubscription: PaymentsListViewModel
  postDeleted: PostDeletedViewModel
}

export type SubscriptionForSuperAdminViewModel = {
  __typename?: 'SubscriptionForSuperAdminViewModel'
  dataOfPayment: Scalars['DateTime']['output']
  endDateOfSubscription: Scalars['DateTime']['output']
  ownerId: Scalars['Float']['output']
  paymentType: PaymentMethod
  price: Scalars['Float']['output']
  type: SubscriptionType
}

/** Subscription Type [MONTHLY, SEMI_ANNUALLY, YEARLY] */
export enum SubscriptionType {
  Monthly = 'MONTHLY',
  SemiAnnually = 'SEMI_ANNUALLY',
  Yearly = 'YEARLY',
}

export type UserForSuperAdminViewModel = {
  __typename?: 'UserForSuperAdminViewModel'
  createdAt: Scalars['DateTime']['output']
  fullName: Scalars['String']['output']
  imagesCount: Scalars['Float']['output']
  imagesUser: ImagesWithPaginationViewModel
  paymentsUser: PaymentsWithPaginationViewModel
  posts: Array<PostForSuperAdminViewModel>
  postsCount: Scalars['Float']['output']
  profileLink?: Maybe<Scalars['String']['output']>
  status: UserStatusType
  userId: Scalars['Int']['output']
  userName: Scalars['String']['output']
}

/** User Status [all, active, banned, pending] */
export enum UserStatusInputType {
  Active = 'active',
  All = 'all',
  Banned = 'banned',
  Pending = 'pending',
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
