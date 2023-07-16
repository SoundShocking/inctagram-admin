import Image from 'next/image'
import Link from 'next/link'

import { dateChangesFormat } from '@/common'
import { IconStatus, PostsItemsType, PostsActionsDropDown } from '@/modules/posts'
import { Avatar } from '@/ui'

export const Post = ({
  post,
  showMore,
  setShowMoreId,
  getStatusColor,
  text,
}: {
  post: PostsItemsType
  showMore: boolean
  getStatusColor: (status: string) => string
  setShowMoreId: (postId: number) => void
  text: string
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
          <div className="flex flex-wrap pt-[6px] justify-between">
            <div className="flex flex-wrap gap-3 align-middle">
              <Avatar
                src={post.urlAvatar ? post.urlAvatar : null}
                alt={'user avatar'}
                height={36}
                width={36}
              />
              <Link href={`/users/` + post.userId}>
                <span className="font-semibold leading-6 text-base">{post.userName}</span>
              </Link>
            </div>
            <span className="flex align-middle gap-1">
              <IconStatus styleColor={getStatusColor(post.status)} />
            </span>
            <PostsActionsDropDown post={post} />
          </div>
          <span className="pt-3 font-normal text-light-900 leading-4 text-xs">
            Created: {dateChangesFormat(post.createdAt)}
          </span>
          <p className="text-sm text-light-100 leading-6 font-normal">
            {showMore ? text : `${text.substring(0, 83)}`}
            <button className="text-accent-700" onClick={() => setShowMoreId(post.postId)}>
              {showMore ? 'Show hide' : 'Show more'}
            </button>
          </p>
        </div>
      </div>
    </>
  )
}
