import React from 'react'

import { flexRender, Table } from '@tanstack/react-table'

import { ItemsPaymentsType } from '@/modules/users-modules/view-user-info'

export const UserPaymentsTable = ({
  tableProps,
  loading,
}: {
  tableProps: Table<ItemsPaymentsType>
  loading: boolean
}) => {
  return (
    <div className={`max-w-[972px]`}>
      <table>
        <thead
          className={
            'h-12 bg-dark-500 border-2 border-dark-500 border-r-2 text-light-100 font-semibold text-sm'
          }
        >
          {tableProps.getHeaderGroups().map((headerGroup, key) => (
            <tr key={key}>
              {headerGroup.headers.map(header => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className: header.column.getCanSort() ? 'cursor-pointer select-none' : '',
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: ' 🔼',
                        desc: ' 🔽',
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {tableProps.getRowModel().rows.map(row => {
            return (
              <tr
                className={'border-[1px] border-dark-500 text-light-100 font-normal text-sm'}
                key={row.id}
              >
                {row.getVisibleCells().map(cell => {
                  return (
                    <td
                      className={'pb-3 pt-3 text-center'}
                      key={cell.id}
                      style={{ width: cell.column.getSize() }}
                    >
                      <div>{flexRender(cell.column.columnDef.cell, cell.getContext())}</div>
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="h-2" />
      <div className="pt-2 flex items-center gap-2 text-light-100 font-normal text-sm">
        <button
          className="border rounded p-1"
          onClick={() => tableProps.setPageIndex(0)}
          disabled={!tableProps.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => tableProps.previousPage()}
          disabled={!tableProps.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => tableProps.nextPage()}
          disabled={!tableProps.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => tableProps.setPageIndex(tableProps.getPageCount() - 1)}
          disabled={!tableProps.getCanNextPage()}
        >
          {'>>'}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {tableProps.getState().pagination.pageIndex + 1} of {tableProps.getPageCount()}
          </strong>
        </span>
        <select
          className={'bg-dark-500 text-light-100 text-sm font-normal'}
          value={tableProps.getState().pagination.pageSize}
          onChange={e => {
            tableProps.setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        {loading ? 'Loading...' : null}
      </div>
      <div>{tableProps.getRowModel().rows.length} Rows</div>
    </div>
  )
}
