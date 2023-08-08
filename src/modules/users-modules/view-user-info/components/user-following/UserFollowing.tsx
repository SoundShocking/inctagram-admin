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
import { GET_USER_FOLLOWING } from '@/modules/users-modules/view-user-info/components/user-payments/queries/viewUserFollowingQueries'
import {
  FollowingForSuperAdminViewModel,
  FollowingWithPaginationViewModel,
  SortByForUsers,
} from '@/types'
import { TablePagination } from 'components/Tables/table-pagination'

export type UserFollowingType = {
  user: {
    followingUser: FollowingWithPaginationViewModel
  }
}
export const UserFollowing = () => {
  const router = useRouter()
  const { userId } = router.query
  const [myPaymentsData, setMyPaymentsData] = useState<FollowingForSuperAdminViewModel[]>([])
  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState('10')
  const [sorting, setSorting] = useState<SortingState>([])

  const { data, loading, error } = useQuery<UserFollowingType>(GET_USER_FOLLOWING, {
    variables: {
      userId: Number(userId),
      pageNumber: pageIndex + 1,
      pageSize: +pageSize,
      ...TableSortingCol<SortByForUsers>(sorting),
    },
    onError: error => console.error('error', error),
    fetchPolicy: 'cache-and-network',
  })
  const pageCount: number | undefined = data?.user.followingUser.pagesCount

  console.log(data)
  useEffect(() => {
    data ? setMyPaymentsData(data.user.followingUser.items) : null
  }, [data])

  // setUserPaymentsDataEffect(data, loading, setMyPaymentsData)
  const columns: ColumnDef<FollowingForSuperAdminViewModel>[] = [
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
      accessorKey: 'subscriptionDate',
      enableSorting: true,
    },
  ]

  const tableProps: Table<FollowingForSuperAdminViewModel> = useReactTable({
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
      <UserPaymentsTable<FollowingForSuperAdminViewModel> tableProps={tableProps} />
      {data?.user.followingUser.pagesCount ? (
        <TablePagination
          pagesCount={data.user.followingUser.pagesCount}
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
      ) : null}
    </div>
  )
}
