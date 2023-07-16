import Image from 'next/image'
import Link from 'next/link'

import { PostsItemsType } from '@/modules/posts'
import { Avatar } from '@/ui'

export const Posts = ({
  post,
  showMore,
  setShowMoreId,
  text,
}: {
  post: PostsItemsType
  showMore: boolean
  setShowMoreId: (id: number) => void
  text: string
}) => {
  // "createdAt": "2023-07-15T12:36:17.684Z",
  //     "userId": 39,
  //     "userName": "beeBrick",
  //     "status": "ACTIVE",
  //     "description": "new post for test",
  //     "urlAvatar": null,

  return (
    <>
      <div className="max-w-[234px] flex flex-col h-auto">
        <div className="w-full">
          <Image
            className="bg-dark-300"
            width={234}
            height={240}
            src={post.urlsPostsImages ? post.urlsPostsImages[0] : ''}
            alt={'Posts image'}
          />
          <div className="flex pt-[6px] justify-between">
            <div className="flex gap-3">
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
            <span>Status: {post.status}</span>
          </div>
          <span className="pt-3 font-normal text-light-900 leading-4 text-xs">
            Created: {post.createdAt}
          </span>
          <p className="text-sm text-light-100 leading-6 font-normal">
            {showMore ? text : `${text.substring(0, 83)}`}
            <button className="text-accent-700" onClick={() => setShowMoreId(post.userId)}>
              {showMore ? 'Show hide' : 'Show more'}
            </button>
          </p>
        </div>
      </div>
    </>
  )
}
