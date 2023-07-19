import { ChangeEvent, FC } from 'react'

import { useTranslation } from 'react-i18next'

export enum PostStatusForPostsListInputType {
  PUBLISHED = 'PUBLISHED',
  BANNED = 'BANNED',
}

interface Props {
  status: PostStatusForPostsListInputType
  setStatus: (status: PostStatusForPostsListInputType) => void
}

export const StatusSelected: FC<Props> = ({ status, setStatus }) => {
  const { t } = useTranslation()
  const callBackOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value as PostStatusForPostsListInputType)
  }

  return (
    <div className="flex justify-between flex-row-reverse pb-3 w-full h-full gap-8">
      <select
        className="bg-dark-500 align-bottom text-light-100 text-sm font-normal"
        value={status}
        onChange={e => callBackOnChange(e)}
      >
        <option value={PostStatusForPostsListInputType.PUBLISHED}>
          {t('postsList.publishedPosts')}
        </option>
        <option value={PostStatusForPostsListInputType.BANNED}>{t('postsList.bannedPosts')}</option>
      </select>
    </div>
  )
}