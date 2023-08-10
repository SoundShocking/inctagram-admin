import { SortingState } from '@tanstack/react-table'

import { SortDirectionType } from '@/types'

export const TableSortingCol = <T>(sorting: SortingState) => {
  if (sorting?.[0]) {
    return {
      sortBy: sorting[0].id as T,
      sortDirection: sorting[0].desc ? SortDirectionType.Desc : SortDirectionType.Asc,
    }
  }

  return {}
}
