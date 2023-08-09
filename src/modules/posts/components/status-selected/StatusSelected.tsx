import React, { FC } from 'react'

import { useTranslation } from '@/components'
import { Select, SelectItem } from '@/ui/Select/Select'
import { PostStatusForPostsLisType, StatusSelectedType } from 'modules/posts'

export const StatusSelected: FC<StatusSelectedType> = ({ status, setStatus }) => {
  const { t } = useTranslation()

  return (
    <div className="">
      <div>
        <Select<PostStatusForPostsLisType> fullWidth={true} value={status} setValue={setStatus}>
          <SelectItem value={PostStatusForPostsLisType.PUBLISHED}>
            {t.translation.postsList.publishedPosts}
          </SelectItem>
          <SelectItem value={PostStatusForPostsLisType.BANNED}>
            {t.translation.postsList.bannedPosts}
          </SelectItem>
        </Select>
      </div>
    </div>
  )
}
