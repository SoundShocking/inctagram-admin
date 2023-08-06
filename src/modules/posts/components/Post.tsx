import { clsx } from 'clsx'
import { formatDistance, parseISO } from 'date-fns'
import Link from 'next/link'

import { NotFoundComponent, useTranslation } from '@/components'
import { PostsListViewModel } from '@/types'
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
  post: PostsListViewModel
  showMore: boolean
  setShowMoreId: (postId: number) => void
}) => {
  const { t, locale } = useTranslation()
  const localeTime: Locale | undefined = localTimeDisplayLanguageInThePost[locale || 'en']

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
          {post.urlsPostsImages ? (
            <SliderImagesPost postImages={post.urlsPostsImages} />
          ) : (
            <NotFoundComponent message={'No images'} />
          )}
          <div className="flex flex-wrap pt-1.5 gap-1 align-middle content-center justify-between">
            <div className="flex w-full items-center flex-wrap h-full justify-between gap-3 align-middle">
              <div className="flex gap-2 items-center flex-wrap">
                <div className="w-9 h-9">
                  <Placeholder
                    className={`cursor-default object-cover rounded-full ${className.border}`}
                    src={post.urlAvatar || ''}
                    alt={'User image post'}
                    height={36}
                    width={36}
                  />
                </div>
                <Link href={`/users/` + post.userId}>
                  <div className="font-semibold w-24 overflow-hidden text-ellipsis whitespace-nowrap leading-6 text-base hover:text-accent-500 transition-colors outline-none">
                    {post.userName}
                  </div>
                </Link>
              </div>
              <PostsActionsDropDown post={post} />
            </div>
          </div>
          <span className="pt-6 font-normal text-light-100 leading-4 text-xs">
            {formatDistance(parseISO(post.createdAt), new Date(), {
              addSuffix: true,
              locale: localeTime,
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
            {post.description && post.description?.length > 83 && (
              <button
                className="text-accent-700 pl-1 underline"
                onClick={() => setShowMoreId(post.postId)}
              >
                {showMore
                  ? t.translation.postsList.post.showHide
                  : t.translation.postsList.post.showMore}
              </button>
            )}
          </p>
        </div>
      </div>
    </>
  )
}
