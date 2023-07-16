import { ChangeEvent, useState } from 'react'

import { useQuery } from '@apollo/client'

import { GET_POSTS_LIST, Posts } from '@/modules/posts'
import { PostsItemsType, PostsType } from '@/modules/posts/type/postsType'
import userId from '@/pages/users/[userId]'
import { GlobalInput } from '@/ui'

export const PostsList = () => {
  const [search, setSearch] = useState<string>('')
  const [posts, setPosts] = useState<PostsItemsType[]>([])
  const [showMoreIds, setShowMoreIds] = useState<number[]>([])
  const { data } = useQuery<PostsType>(GET_POSTS_LIST, {
    variables: {
      search: search,
      pageSize: 8,
    },
    onCompleted: (data: PostsType) => {
      setPosts(data.postsList.items)
    },
  })

  const handleCallBackShowMore = (id: number) => {
    if (showMoreIds.includes(id)) {
      // Если ID уже есть в массиве, уберите его из массива
      setShowMoreIds(showMoreIds.filter(item => item !== id))
    } else {
      // В противном случае добавьте ID в массив
      setShowMoreIds([...showMoreIds, id])
    }
  }

  const handleCallBackSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget.value

    setSearch(target)
  }
  const text =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incdipiscing elit, sed do eiusmod tempor inipiscing elit, sed do eiusmod tempor incdipiscing elit, sed do eiusmod tempor incd.mpor incd.mpor incd.mpo..'

  return (
    <div className="w-full pt-[60px] pl-[24px] pr-[60px] flex flex-col">
      <div className="pb-[36px] w-full">
        <GlobalInput
          className="w-[972px] pb-[36px] h-[36px]"
          type={'text'}
          placeholder={'Search'}
          value={search}
          callBack={handleCallBackSearch}
        />
      </div>
      <div className="grid sm:grid-cols-2 grid-cols-4 md:grid-cols-3  gap-3">
        {posts !== undefined
          ? posts.map((post: PostsItemsType, index: number) => (
              <Posts
                post={post}
                key={index}
                showMore={showMoreIds.includes(post.userId)}
                setShowMoreId={handleCallBackShowMore}
                text={text}
              />
            ))
          : ''}
      </div>
    </div>
  )
}
