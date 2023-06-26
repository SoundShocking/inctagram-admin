import { FC } from 'react'

import { UserStatusInputType } from '@/types'

interface Props {
  searchInput: string
  setSearchInput: (value: string) => void
  status: UserStatusInputType
  setStatus: (status: UserStatusInputType) => void
}

export const UsersTableToolbar: FC<Props> = ({
  searchInput,
  setSearchInput,
  status,
  setStatus,
}) => {
  return (
    <div className="flex justify-between gap-8">
      <input
        className="w-full h-9 bg-transparent text-light-100 text-sm outline-none border border-dark-100 px-10"
        type="text"
        placeholder="Search"
        value={searchInput}
        onChange={e => setSearchInput(e.target.value)}
      />

      <select
        className="bg-dark-500 text-light-100 text-sm font-normal"
        value={status}
        onChange={e => setStatus(e.target.value as UserStatusInputType)}
      >
        <option value={UserStatusInputType.All}>Not Selected</option>
        <option value={UserStatusInputType.Banned}>Blocked</option>
        <option value={UserStatusInputType.Active}>Active</option>
      </select>
    </div>
  )
}
