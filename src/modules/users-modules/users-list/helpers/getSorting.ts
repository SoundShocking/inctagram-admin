import { SortingState } from '@tanstack/react-table'

import { SortByForUsers, SortDirectionType } from '@/types'

export const getSorting = (sorting: SortingState) => {
  if (sorting?.[0]) {
    return {
      sortBy: sorting[0].id as SortByForUsers,
      sortDirection: sorting[0].desc ? SortDirectionType.Desc : SortDirectionType.Asc,
    }
  }

  return {}
}
