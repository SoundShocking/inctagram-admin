import React, { useEffect, useState } from 'react'

import { useQuery } from '@apollo/client'
import {
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  ColumnDef,
  Table,
  SortingState,
} from '@tanstack/react-table'
import { useRouter } from 'next/router'

import { dateChangesFormat } from '@/common'
import { ErrorMessage, TableSortingCol } from '@/components'
import { SkeletonUserPayments, UserPaymentsTable } from '@/modules/users-modules/view-user-info'
import { GET_USER_FOLLOWS } from '@/modules/users-modules/view-user-info/components/user-payments/queries/viewUserFollowersQueries'
import {
  SortByForUsers,
  UserFollowsForSuperAdminViewModel,
  UserFollowsWithPaginationViewModel,
} from '@/types'
import { TablePagination } from 'components/Tables/table-pagination'

export type UserFollowingType = {
  user: {
    followersUser: UserFollowsWithPaginationViewModel
  }
}
export const UserFollowers = () => {
  const router = useRouter()
  const { userId } = router.query
  const [myPaymentsData, setMyPaymentsData] = useState<UserFollowsForSuperAdminViewModel[]>([])
  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState('10')
  const [sorting, setSorting] = useState<SortingState>([])

  const { data, loading, error } = useQuery<UserFollowingType>(GET_USER_FOLLOWS, {
    variables: {
      userId: Number(userId),
      pageNumber: pageIndex + 1,
      pageSize: +pageSize,
      ...TableSortingCol<SortByForUsers>(sorting),
    },
    onError: error => console.error('error', error),
    fetchPolicy: 'cache-and-network',
  })
  const pageCount: number | undefined = data?.user.followersUser.pagesCount

  console.log(data)
  useEffect(() => {
    data ? setMyPaymentsData(data.user.followersUser.items) : null
  }, [data])

  // setUserPaymentsDataEffect(data, loading, setMyPaymentsData)
  const columns: ColumnDef<UserFollowsForSuperAdminViewModel>[] = [
    {
      header: 'User ID',
      cell: (params: any) => (loading ? <SkeletonUserPayments /> : params.getValue()),
      accessorKey: 'userId',
      enableSorting: false,
    },
    {
      header: 'Full Name',
      cell: (params: any) => (loading ? <SkeletonUserPayments /> : params.getValue()),
      accessorKey: 'fullName',
      enableSorting: false,
    },
    {
      header: 'User Name',
      cell: (params: any) => (loading ? <SkeletonUserPayments /> : params.getValue()),
      accessorKey: 'userName',
      enableSorting: true,
    },
    {
      header: 'Subscription Date',
      cell: (params: any) =>
        loading ? <SkeletonUserPayments /> : dateChangesFormat(params.getValue()),
      accessorKey: 'createdAt',
      enableSorting: true,
    },
  ]

  const tableProps: Table<UserFollowsForSuperAdminViewModel> = useReactTable({
    data: myPaymentsData,
    columns: columns,
    pageCount: pageCount,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    manualSorting: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <div className="mt-9 text-accent-500 p-2 block w-full ">
      <ErrorMessage errorMessage={error?.message} />
      <UserPaymentsTable<UserFollowsForSuperAdminViewModel> tableProps={tableProps} />
      {data?.user.followersUser.pagesCount ? (
        <TablePagination
          pagesCount={data.user.followersUser.pagesCount}
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
      ) : null}
    </div>
  )
}
