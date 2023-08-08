import { Dispatch, FC, SetStateAction } from 'react'

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'
import ReactPaginate from 'react-paginate'

import { ItemsPerPageSelector } from '@/components/items-per-page-selector'

interface Props {
  pagesCount: number
  pageIndex: number
  setPageIndex: Dispatch<SetStateAction<number>>
  pageSize: string
  setPageSize: Dispatch<SetStateAction<string>>
}

export const TablePagination: FC<Props> = ({
  pagesCount,
  pageIndex,
  setPageIndex,
  setPageSize,
  pageSize,
}) => {
  const onPageChange = ({ selected }: { selected: number }) => {
    setPageIndex(selected)
  }

  return (
    <div className="my-9 flex items-center gap-6">
      <ReactPaginate
        pageCount={pagesCount}
        pageRangeDisplayed={2}
        forcePage={pageIndex}
        containerClassName="flex gap-3"
        pageClassName="text-white"
        pageLinkClassName="flex items-center justify-center h-6 px-1 min-w-[24px] rounded-sm text-sm select-none"
        activeLinkClassName="bg-white text-black"
        previousLinkClassName="h-6 w-6 flex items-center justify-center text-white"
        nextLinkClassName="h-6 w-6 flex items-center justify-center text-white"
        disabledLinkClassName="opacity-20 cursor-not-allowed"
        previousLabel={<FaChevronLeft size={14} />}
        nextLabel={<FaChevronRight size={14} />}
        onPageChange={onPageChange}
      />

      <ItemsPerPageSelector pageSize={pageSize} setPageSize={setPageSize} />
    </div>
  )
}
