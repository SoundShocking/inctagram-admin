import { FC, useEffect, useState } from 'react'

import { SortingState } from '@tanstack/react-table'
import { t } from 'i18next'
import { useDebounce } from 'usehooks-ts'

import { getPaymentsSorting } from '../helpers/getPaymentsSorting'

import { PaymentsTable } from './PaymentsTable'

import { TablePagination } from '@/components/table-pagination'
import { useGetAllPaymentsQuery } from '@/queries/payments.generated'

export const PaymentsList: FC = () => {
  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [sorting, setSorting] = useState<SortingState>([])

  const [searchInput, setSearchInput] = useState('')
  const search = useDebounce(searchInput, 500)

  useEffect(() => {
    setPageIndex(0)
  }, [search, pageSize])

  const { loading, error, data } = useGetAllPaymentsQuery({
    variables: {
      pageSize,
      pageNumber: pageIndex + 1,
      search,
      ...getPaymentsSorting(sorting),
    },
  })

  if (loading) return <p>Loading...</p>

  if (error) return <p>Error : {error.message}</p>

  if (data?.paymentsList) {
    return (
      <div className="pt-16">
        <div className="flex justify-between gap-8">
          <input
            className="w-full h-9 bg-transparent text-light-100 text-sm outline-none border border-dark-100 px-10"
            type="text"
            placeholder={t('userList.search')}
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
          />
        </div>

        <PaymentsTable
          payments={data.paymentsList.items}
          sorting={sorting}
          setSorting={setSorting}
        />

        <TablePagination
          pagesCount={data.paymentsList.pagesCount}
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
      </div>
    )
  }
}
