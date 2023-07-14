import { nanoid } from 'nanoid'

import { UserPayments, UserPhotos } from '@/modules/users-modules/view-user-info'

export const view_user_info_tabs = [
  { id: nanoid(), label: 'Upload Photos', content: UserPhotos },
  {
    id: nanoid(),
    label: 'Payments',
    content: UserPayments,
  },
  {
    id: nanoid(),
    label: 'Followers',
    content: 'Followers',
  },
  {
    id: nanoid(),
    label: 'Following',
    content: 'Following',
  },
]
