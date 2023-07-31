import React, { FC } from 'react'

import { useTranslation } from 'react-i18next'

import { Select, SelectItem } from '@/ui/Select/Select'
import { PostStatusForPostsLisType, StatusSelectedType } from 'modules/posts'

export const StatusSelected: FC<StatusSelectedType> = ({ status, setStatus }) => {
  const { t } = useTranslation()

  return (
    <div className="flex justify-between justify-items-end flex-row-reverse pb-3 w-full h-full gap-8">
      <div className="max-w-[30%]">
        <Select<PostStatusForPostsLisType> fullWidth={true} value={status} setValue={setStatus}>
          <SelectItem value={PostStatusForPostsLisType.PUBLISHED}>
            {t('postsList.publishedPosts')}
          </SelectItem>
          <SelectItem value={PostStatusForPostsLisType.BANNED}>
            {t('postsList.bannedPosts')}
          </SelectItem>
        </Select>
      </div>
    </div>
  )
}
