import { formatDistance, parseISO } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'

import { IconStatus, PostsActionsDropDown } from '@/modules/posts'
import { PostsItemsType } from '@/modules/posts/type/postsType'
import { Avatar } from '@/ui'

export const Post = ({
  post,
  showMore,
  setShowMoreId,
  getStatusColor,
}: {
  post: PostsItemsType
  showMore: boolean
  getStatusColor: (status: string) => string
  setShowMoreId: (postId: number) => void
}) => {
  return (
    <>
      <div className="max-w-[234px] flex flex-col h-auto">
        <div className="w-full">
          <Image
            className="bg-dark-300"
            width={234}
            height={240}
            src={post.urlsPostsImages ? post.urlsPostsImages[0] : ''}
            alt={'Post image'}
          />
          <div className="flex flex-wrap pt-[6px] gap-1 justify-between">
            <div className="flex w-full h-full flex-wrap gap-3 align-middle">
              <Avatar
                className="cursor-default"
                src={post.urlAvatar ? post.urlAvatar : null}
                alt={'user avatar'}
                height={36}
                width={36}
              />
              <Link href={`/users/` + post.userId}>
                <span className="font-semibold leading-6 text-base">{post.userName}</span>
              </Link>
            </div>
            <div className="flex flex-row  w-full justify-between">
              <span className="flex align-middle gap-1">
                <IconStatus styleColor={getStatusColor(post.status)} />
              </span>
              <PostsActionsDropDown post={post} />
            </div>
          </div>
          <span className="pt-3 font-normal text-light-100 leading-4 text-xs">
            {formatDistance(parseISO(post.createdAt), new Date(), {
              addSuffix: true,
            })}
          </span>
          <p className="text-sm text-light-100 leading-6 font-normal">
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
              {showMore ? ' Show hide' : 'Show more'}
            </button>
          </p>
        </div>
      </div>
    </>
  )
}
