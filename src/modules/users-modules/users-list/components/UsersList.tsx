import { useEffect, useState } from 'react'

import { SortingState } from '@tanstack/react-table'
import { useDebounce } from 'usehooks-ts'

import { TablePagination } from '@/components/table-pagination'
import { UsersTable } from '@/modules/users-modules/users-list/components/UsersTable'
import { UsersTableToolbar } from '@/modules/users-modules/users-list/components/UsersTableToolbar'
import { getUsersSorting } from '@/modules/users-modules/users-list/helpers/getUsersSorting'
import { useGetAllUsersQuery } from '@/queries/users.generated'
import { UserStatusInputType } from '@/types'

export const UsersList = () => {
  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [sorting, setSorting] = useState<SortingState>([])

  const [status, setStatus] = useState<UserStatusInputType>(UserStatusInputType.All)
  const [searchInput, setSearchInput] = useState('')
  const search = useDebounce(searchInput, 500)

  useEffect(() => {
    setPageIndex(0)
  }, [search, pageSize])

  const { loading, error, data } = useGetAllUsersQuery({
    variables: {
      pageSize,
      pageNumber: pageIndex + 1,
      status,
      search,
      ...getUsersSorting(sorting),
    },
    fetchPolicy: 'cache-and-network',
  })

  if (loading) return <p>Loading...</p>

  if (error) return <p>Error : {error.message}</p>

  if (data?.users) {
    return (
      <>
        <UsersTableToolbar
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          status={status}
          setStatus={setStatus}
        />
        <UsersTable
          users={data.users.items}
          pagesCount={data.users.pagesCount}
          sorting={sorting}
          setSorting={setSorting}
        />

        <TablePagination
          pagesCount={data.users.pagesCount}
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
      </>
    )
  }
}
