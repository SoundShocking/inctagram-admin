import { SortingState } from '@tanstack/react-table'

import { SortByForPaymentsListInputType, SortDirectionType } from '@/types'

export const getPaymentsSorting = (sorting: SortingState) => {
  if (sorting?.[0]) {
    return {
      sortBy: sorting[0].id as SortByForPaymentsListInputType,
      sortDirection: sorting[0].desc ? SortDirectionType.Desc : SortDirectionType.Asc,
    }
  }

  return {}
}
