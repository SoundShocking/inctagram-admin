import { ChangeEvent, useState } from 'react'

import { useQuery } from '@apollo/client'

import { GET_POSTS_LIST, Posts } from '@/modules/posts'
import { GlobalInput } from '@/ui'

export const PostsList = () => {
  const [search, setSearch] = useState<string>('')

  const { data } = useQuery(GET_POSTS_LIST, {
    variables: {
      search: search,
      pageSize: 100,
    },
  })

  const [showMore, setShowMore] = useState<boolean>(false)

  // const handleCallBackShowMore = ({ userId: number }: { userId: boolean }) => {}
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
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-4 gap-3">
        {data !== undefined
          ? data?.postsList?.items.map((data: any, index: number) => (
              <Posts
                data={data}
                key={index}
                showMore={showMore}
                setShowMore={setShowMore}
                text={text}
              />
            ))
          : ''}
      </div>
    </div>
  )
}
