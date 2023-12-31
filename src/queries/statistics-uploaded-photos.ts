import { gql } from '@apollo/client'

export const GET_UPLOADED_PHOTOS_STATISTICS = gql`
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
