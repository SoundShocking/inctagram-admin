import { FC } from 'react'

import { SortDirection } from '@tanstack/table-core'
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa6'

interface Props {
  isCanSort: boolean
  isSorted: false | SortDirection
}

export const TableSortIcon: FC<Props> = ({ isCanSort, isSorted }) => {
  if (!isCanSort) return null

  switch (isSorted) {
    case 'asc':
      return <FaSortUp className="ml-2" size={14} />

    case 'desc':
      return <FaSortDown className="ml-2" size={14} />

    default:
      return <FaSort className="ml-2 opacity-40" size={14} />
  }
}
