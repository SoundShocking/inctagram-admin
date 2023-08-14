import { clsx } from 'clsx'
import { formatDistance, parseISO } from 'date-fns'
import lgRotate from 'lightgallery/plugins/rotate'
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgZoom from 'lightgallery/plugins/zoom'
import LightGallery from 'lightgallery/react'
import Link from 'next/link'

import { LocaleType, NotFoundComponent } from '@/components'
import { PostListViewModel } from '@/types'
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
  t,
  locale,
}: {
  locale: string | undefined
  t: LocaleType
  post: PostListViewModel
  showMore: boolean
  setShowMoreId: (postId: number) => void
}) => {
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
            <LightGallery
              selector=".swiper-slide"
              plugins={[lgThumbnail, lgRotate, lgZoom]}
              download={false}
            >
              <SliderImagesPost postImages={post.urlsPostsImages} />
            </LightGallery>
          ) : (
            <NotFoundComponent message={'No images'} />
          )}
          <div className="flex mt-3 gap-3 items-center">
            <div className="flex grow items-center gap-3 overflow-hidden">
              <div className="w-9 h-9 shrink-0">
                <Placeholder
                  className={`cursor-default object-cover !w-9 !h-9 rounded-full ${className.border}`}
                  src={post.urlAvatar || ''}
                  alt={'User image post'}
                  height={36}
                  width={36}
                />
              </div>

              <Link href={`/users/${post.userId}`} className="overflow-hidden">
                <div className="font-semibold truncate leading-6 text-base hover:text-accent-500 transition-colors outline-none">
                  {post.userName}
                </div>
              </Link>
            </div>

            <PostsActionsDropDown post={post} />
          </div>

          <div className="mt-3 text-light-900 leading-none text-xs">
            {formatDistance(parseISO(post.createdAt), new Date(), {
              addSuffix: true,
              locale: localeTime,
            })}
          </div>

          <div className="mt-2 text-sm text-light-100 break-words max-w-full leading-6 font-normal">
            {/* eslint-disable-next-line no-nested-ternary */}
            {post.description ? (
              showMore ? (
                post.description
              ) : (
                <span>{post.description.substring(0, 83)}</span>
              )
            ) : (
              <span>{t.translation.postsList.post.description}</span>
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
          </div>
        </div>
      </div>
    </>
  )
}
