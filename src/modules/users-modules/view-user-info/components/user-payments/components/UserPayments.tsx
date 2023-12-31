import React, { useState } from 'react'

import { useQuery } from '@apollo/client'
import {
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  ColumnDef,
  Table,
} from '@tanstack/react-table'
import { useRouter } from 'next/router'

import { capitalizeFirstLetter, dateChangesFormat } from '@/common'
import { ErrorMessage, useTranslation } from '@/components'
import { TablePagination } from '@/components/tables/table-pagination'
import {
  GET_USER_PAYMENTS,
  ItemsUserPaymentsType,
  PaymentsUser,
  setUserSkeletonDataEffect,
  SkeletonUserPayments,
  UserPaymentsTable,
  UserPaymentsType,
} from '@/modules/users-modules/view-user-info'

export const UserPayments = () => {
  const router = useRouter()
  const { userId } = router.query
  const [paymentsData, setPaymentsData] = useState<PaymentsUser>()
  const [myPaymentsData, setMyPaymentsData] = useState<ItemsUserPaymentsType[]>([])
  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState('10')
  const { t } = useTranslation()
  const { loading, error } = useQuery<UserPaymentsType>(GET_USER_PAYMENTS, {
    variables: {
      userId: Number(userId),
      pageNumber: pageIndex + 1,
      pageSize: +pageSize,
    },
    onCompleted: (data: UserPaymentsType) => setPaymentsData(data.user.paymentsUser),
    onError: error => console.error('error', error),
    fetchPolicy: 'cache-and-network',
  })
  const pageCount: number | undefined = paymentsData?.pagesCount

  setUserSkeletonDataEffect<PaymentsUser, ItemsUserPaymentsType>(
    paymentsData,
    loading,
    setMyPaymentsData
  )

  const columns: ColumnDef<ItemsUserPaymentsType>[] = [
    {
      header: t.translation.userInfo.userPaymentsTable.dataOfPayment,
      cell: (params: any) =>
        loading ? <SkeletonUserPayments /> : dateChangesFormat(params.getValue()),
      accessorKey: 'dataOfPayment',
    },
    {
      header: t.translation.userInfo.userPaymentsTable.endDateOfSubscription,
      cell: (params: any) =>
        loading ? <SkeletonUserPayments /> : dateChangesFormat(params.getValue()),
      accessorKey: 'endDateOfSubscription',
    },
    {
      header: t.translation.userInfo.userPaymentsTable.price,
      cell: (params: any) => (loading ? <SkeletonUserPayments /> : params.getValue()),
      accessorKey: 'price',
    },
    {
      header: t.translation.userInfo.userPaymentsTable.subscription,
      cell: (params: any) =>
        loading ? <SkeletonUserPayments /> : capitalizeFirstLetter(params.getValue()),
      accessorKey: 'subscription',
    },
    {
      header: t.translation.userInfo.userPaymentsTable.paymentType,
      cell: (params: any) =>
        loading ? <SkeletonUserPayments /> : capitalizeFirstLetter(params.getValue()),
      accessorKey: 'paymentType',
    },
  ]

  const tableProps: Table<ItemsUserPaymentsType> = useReactTable({
    data: myPaymentsData,
    columns: columns,
    enableSorting: false,
    pageCount: pageCount,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <div className="mt-9 text-accent-500 p-2 block w-full ">
      <ErrorMessage errorMessage={error?.message} />
      <UserPaymentsTable<ItemsUserPaymentsType> tableProps={tableProps} />
      {paymentsData?.pagesCount ? (
        <TablePagination
          pagesCount={paymentsData?.pagesCount}
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
      ) : null}
    </div>
  )
}
