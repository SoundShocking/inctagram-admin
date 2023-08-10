import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'

import * as Types from '../types'
const defaultOptions = {} as const

export type UploadedImagesStatisticsQueryVariables = Types.Exact<{
  startDate: Types.Scalars['Timestamp']['input']
  endDate: Types.Scalars['Timestamp']['input']
  comparisonStartDate?: Types.InputMaybe<Types.Scalars['Timestamp']['input']>
  comparisonEndDate?: Types.InputMaybe<Types.Scalars['Timestamp']['input']>
}>

export type UploadedImagesStatisticsQuery = {
  __typename?: 'Query'
  statisticsUploadedImages: {
    __typename?: 'StatisticsForGraphicsByImagesAdminViewModel'
    query?: {
      __typename?: 'StatisticsQuery'
      dateStart: any
      dateEnd: any
      comparisonStartDate?: any | null
      comparisonEndDate?: any | null
    } | null
    data?: {
      __typename?: 'StatisticsDataByImages'
      metrics: {
        __typename?: 'StatisticsMetricsImages'
        countImages?: Array<number> | null
        total_rows: number
        time_intervals: Array<any>
        maxCountImages: number
        maxRoundImages: number
        sumImages: number
      }
      metricsComparison?: {
        __typename?: 'StatisticsMetricsImages'
        countImages?: Array<number> | null
        total_rows: number
        time_intervals: Array<any>
        maxCountImages: number
        maxRoundImages: number
        sumImages: number
      } | null
    } | null
  }
}

export const UploadedImagesStatisticsDocument = gql`
  query uploadedImagesStatistics(
    $startDate: Timestamp!
    $endDate: Timestamp!
    $comparisonStartDate: Timestamp
    $comparisonEndDate: Timestamp
  ) {
    statisticsUploadedImages(
      startDate: $startDate
      endDate: $endDate
      comparisonStartDate: $comparisonStartDate
      comparisonEndDate: $comparisonEndDate
    ) {
      query {
        dateStart
        dateEnd
        comparisonStartDate
        comparisonEndDate
      }
      data {
        metrics {
          countImages
          total_rows
          time_intervals
          maxCountImages
          maxRoundImages
          sumImages
        }
        metricsComparison {
          countImages
          total_rows
          time_intervals
          maxCountImages
          maxRoundImages
          sumImages
        }
      }
    }
  }
`

/**
 * __useUploadedImagesStatisticsQuery__
 *
 * To run a query within a React component, call `useUploadedImagesStatisticsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUploadedImagesStatisticsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUploadedImagesStatisticsQuery({
 *   variables: {
 *      startDate: // value for 'startDate'
 *      endDate: // value for 'endDate'
 *      comparisonStartDate: // value for 'comparisonStartDate'
 *      comparisonEndDate: // value for 'comparisonEndDate'
 *   },
 * });
 */
export function useUploadedImagesStatisticsQuery(
  baseOptions: Apollo.QueryHookOptions<
    UploadedImagesStatisticsQuery,
    UploadedImagesStatisticsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useQuery<UploadedImagesStatisticsQuery, UploadedImagesStatisticsQueryVariables>(
    UploadedImagesStatisticsDocument,
    options
  )
}
export function useUploadedImagesStatisticsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    UploadedImagesStatisticsQuery,
    UploadedImagesStatisticsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useLazyQuery<UploadedImagesStatisticsQuery, UploadedImagesStatisticsQueryVariables>(
    UploadedImagesStatisticsDocument,
    options
  )
}
export type UploadedImagesStatisticsQueryHookResult = ReturnType<
  typeof useUploadedImagesStatisticsQuery
>
export type UploadedImagesStatisticsLazyQueryHookResult = ReturnType<
  typeof useUploadedImagesStatisticsLazyQuery
>
export type UploadedImagesStatisticsQueryResult = Apollo.QueryResult<
  UploadedImagesStatisticsQuery,
  UploadedImagesStatisticsQueryVariables
>
