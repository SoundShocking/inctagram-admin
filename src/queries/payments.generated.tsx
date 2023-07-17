import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'

import * as Types from '../types'
const defaultOptions = {} as const

export type GetAllPaymentsQueryVariables = Types.Exact<{
  pageSize: Types.Scalars['Int']['input']
  pageNumber: Types.Scalars['Int']['input']
  sortBy?: Types.InputMaybe<Types.SortByForPaymentsListInputType>
  sortDirection?: Types.InputMaybe<Types.SortDirectionType>
  search?: Types.InputMaybe<Types.Scalars['String']['input']>
}>

export type GetAllPaymentsQuery = {
  __typename?: 'Query'
  paymentsList: {
    __typename?: 'PaymentsListWithPaginationViewModel'
    totalCount: number
    pagesCount: number
    items: Array<{
      __typename?: 'PaymentsListViewModel'
      urlAvatar?: string | null
      userName?: string | null
      createdAt?: any | null
      amount?: number | null
      typeSubscription?: Types.SubscriptionType | null
      paymentMethod?: Types.PaymentMethod | null
    }>
  }
}

export const GetAllPaymentsDocument = gql`
  query GetAllPayments(
    $pageSize: Int!
    $pageNumber: Int!
    $sortBy: SortByForPaymentsListInputType
    $sortDirection: SortDirectionType
    $search: String
  ) {
    paymentsList(
      pageSize: $pageSize
      pageNumber: $pageNumber
      sortBy: $sortBy
      sortDirection: $sortDirection
      search: $search
    ) {
      totalCount
      pagesCount
      items {
        urlAvatar
        userName
        createdAt
        amount
        typeSubscription
        paymentMethod
      }
    }
  }
`

/**
 * __useGetAllPaymentsQuery__
 *
 * To run a query within a React component, call `useGetAllPaymentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllPaymentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllPaymentsQuery({
 *   variables: {
 *      pageSize: // value for 'pageSize'
 *      pageNumber: // value for 'pageNumber'
 *      sortBy: // value for 'sortBy'
 *      sortDirection: // value for 'sortDirection'
 *      search: // value for 'search'
 *   },
 * });
 */
export function useGetAllPaymentsQuery(
  baseOptions: Apollo.QueryHookOptions<GetAllPaymentsQuery, GetAllPaymentsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useQuery<GetAllPaymentsQuery, GetAllPaymentsQueryVariables>(
    GetAllPaymentsDocument,
    options
  )
}
export function useGetAllPaymentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetAllPaymentsQuery, GetAllPaymentsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useLazyQuery<GetAllPaymentsQuery, GetAllPaymentsQueryVariables>(
    GetAllPaymentsDocument,
    options
  )
}
export type GetAllPaymentsQueryHookResult = ReturnType<typeof useGetAllPaymentsQuery>
export type GetAllPaymentsLazyQueryHookResult = ReturnType<typeof useGetAllPaymentsLazyQuery>
export type GetAllPaymentsQueryResult = Apollo.QueryResult<
  GetAllPaymentsQuery,
  GetAllPaymentsQueryVariables
>