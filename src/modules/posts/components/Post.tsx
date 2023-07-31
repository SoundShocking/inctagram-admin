import { clsx } from 'clsx'
import { formatDistance, parseISO } from 'date-fns'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'

import { PostsItemsType } from '@/modules/posts/types/postsType'
import { Placeholder } from '@/ui'
import {
  localTimeDisplayLanguageInThePost,
  PostsActionsDropDown,
  SliderImagesPost,
} from 'modules/posts'

export const Post = ({
  post,
  showMore,
  setShowMoreId,
}: {
  post: PostsItemsType
  showMore: boolean
  setShowMoreId: (postId: number) => void
}) => {
  const { t, i18n } = useTranslation()
  const locale: Locale | undefined = localTimeDisplayLanguageInThePost[i18n.language]
  const className = {
    border: clsx(
      post.status === 'ACTIVE' ? 'border-2 border-emerald-700' : '',
      post.status === 'PENDING' ? 'border-2 border-amber-700' : '',
      post.status === 'BANNED' ? 'border-2 border-danger-700' : ''
    ),
  }

  return (
    <>
      <div className="max-w-56 flex flex-col h-auto">
        <div className="w-full h-full ">
          <SliderImagesPost postImages={post.urlsPostsImages} />
          <div className="flex flex-wrap pt-1.5 gap-1 align-middle content-center justify-between">
            <div className="flex w-full items-center flex-wrap h-full justify-around gap-3 align-middle">
              <Placeholder
                className={`cursor-default rounded-full ${className.border}`}
                src={post.urlAvatar}
                alt={'User image post'}
                height={36}
                width={36}
              />
              <Link href={`/users/` + post.userId}>
                <div className="font-semibold w-24 overflow-hidden text-ellipsis whitespace-nowrap leading-6 text-base hover:text-accent-500 transition-colors outline-none">
                  {post.userName}
                </div>
              </Link>
              <PostsActionsDropDown post={post} />
            </div>
          </div>
          <span className="pt-3 font-normal text-light-100 leading-4 text-xs">
            {formatDistance(parseISO(post.createdAt), new Date(), {
              addSuffix: true,
              locale: locale,
            })}
          </span>
          <p className="text-sm text-light-100 break-words max-w-full leading-6 font-normal">
            {/* eslint-disable-next-line no-nested-ternary */}
            {post.description ? (
              showMore ? (
                post.description
              ) : (
                <span>{post.description.substring(0, 83)}</span>
              )
            ) : (
              <span className="text-base font-normal leading-6">No description </span>
            )}
            <button className="text-accent-700 pl-1" onClick={() => setShowMoreId(post.postId)}>
              {showMore ? t('postsList.post.showHide') : t('postsList.post.showMore')}
            </button>
          </p>
        </div>
      </div>
    </>
  )
}
