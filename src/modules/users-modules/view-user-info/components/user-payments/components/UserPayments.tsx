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
import { ErrorComponent } from '@/components'
import { TablePagination } from '@/components/table-pagination'
import {
  GET_USER_PAYMENTS,
  ItemsUserPaymentsType,
  PaymentsUser,
  setUserPaymentsDataEffect,
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
  const [pageSize, setPageSize] = useState(10)

  const { loading, error } = useQuery<UserPaymentsType>(GET_USER_PAYMENTS, {
    variables: {
      userId: Number(userId),
      pageNumber: pageIndex + 1,
      pageSize: pageSize,
    },
    onCompleted: (data: UserPaymentsType) => setPaymentsData(data.user.paymentsUser),
    onError: error => console.error('error', error),
    fetchPolicy: 'cache-and-network',
  })
  const pageCount: number | undefined = paymentsData?.pagesCount

  setUserPaymentsDataEffect(paymentsData, loading, setMyPaymentsData)

  const columns: ColumnDef<ItemsUserPaymentsType>[] = [
    {
      header: 'Date of Payment',
      cell: (params: any) =>
        loading ? <SkeletonUserPayments /> : dateChangesFormat(params.getValue()),
      accessorKey: 'dataOfPayment',
    },
    {
      header: 'End date of subscription',
      cell: (params: any) =>
        loading ? <SkeletonUserPayments /> : dateChangesFormat(params.getValue()),
      accessorKey: 'endDateOfSubscription',
    },
    {
      header: 'Price',
      cell: (params: any) => (loading ? <SkeletonUserPayments /> : '$' + params.getValue()),
      accessorKey: 'price',
    },
    {
      header: 'Subscription Type',
      cell: (params: any) =>
        loading ? <SkeletonUserPayments /> : capitalizeFirstLetter(params.getValue()),
      accessorKey: 'type',
    },
    {
      header: 'Payment Type',
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

  if (error && !loading) {
    return <ErrorComponent error={error} />
  }

  return (
    <div className=" text-accent-500 p-2 block w-full ">
      <UserPaymentsTable tableProps={tableProps} />
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
