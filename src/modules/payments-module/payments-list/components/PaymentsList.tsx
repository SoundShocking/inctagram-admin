import { FC, useEffect, useState } from 'react'

import { PaginationState, SortingState } from '@tanstack/react-table'
import { t } from 'i18next'
import { useDebounce } from 'usehooks-ts'

import { PaymentsTable } from '@/modules/payments-module/payments-list/components/PaymentsTable'
import { getPaymentsSorting } from '@/modules/payments-module/payments-list/getPaymentsSorting'
import { useGetAllPaymentsQuery } from '@/queries/payments.generated'
import { UserStatusInputType } from '@/types'

export const PaymentsList: FC = () => {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [sorting, setSorting] = useState<SortingState>([])

  const [searchInput, setSearchInput] = useState('')
  const search = useDebounce(searchInput, 500)

  useEffect(() => {
    setPagination(prev => ({ ...prev, pageIndex: 0 }))
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
          pagesCount={data.paymentsList.pagesCount}
          pageIndex={pageIndex}
          pageSize={pageSize}
          setPagination={setPagination}
          sorting={sorting}
          setSorting={setSorting}
        />
      </div>
    )
  }
}
