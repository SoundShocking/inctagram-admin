import React from 'react'

import { flexRender, Table } from '@tanstack/react-table'
import { clsx } from 'clsx'

import { TableSortIcon } from '@/components/tables/table-sort-icon'

export const UserPaymentsTable = <T extends {}>({ tableProps }: { tableProps: Table<T> }) => {
  return (
    <div className="w-full">
      <table className="w-full">
        <thead
          className={
            'h-12 bg-dark-500 w-full border-2 border-dark-500 border-r-2 text-light-100 font-semibold text-sm'
          }
        >
          {tableProps.getHeaderGroups().map((headerGroup, key) => (
            <tr key={key}>
              {headerGroup.headers.map(header => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <div
                      className={clsx('flex items-center justify-center select-none', {
                        'cursor-pointer': header.column.getCanSort(),
                      })}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}

                      <TableSortIcon
                        isCanSort={header.column.getCanSort()}
                        isSorted={header.column.getIsSorted()}
                      />
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="w-full">
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
                      <div>{flexRender(cell.column.columnDef.cell, cell.getContext())} </div>
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
