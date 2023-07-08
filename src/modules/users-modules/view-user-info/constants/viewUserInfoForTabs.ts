import { nanoid } from 'nanoid'

import { UserPhotos } from '@/modules/users-modules/view-user-info/components/user-photos/UserPhotos'

export const view_user_info_tabs = [
  { id: nanoid(), label: 'Upload Photos', content: UserPhotos },
  {
    id: nanoid(),
    label: 'Payments',
    content: 'Payments',
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
