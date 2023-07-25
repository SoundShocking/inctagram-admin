import React from 'react'

import { flexRender, Table } from '@tanstack/react-table'

import { ItemsUserPaymentsType } from '@/modules/users-modules/view-user-info'

export const UserPaymentsTable = ({ tableProps }: { tableProps: Table<ItemsUserPaymentsType> }) => {
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
                      <div>{flexRender(cell.column.columnDef.cell, cell.getContext())}</div>
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
