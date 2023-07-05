import { nanoid } from 'nanoid'

export const view_user_info_tabs = [
  { id: nanoid(), label: 'Upload Photos', content: 'Upload photos' },
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
