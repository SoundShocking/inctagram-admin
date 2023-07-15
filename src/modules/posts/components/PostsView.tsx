import { ChangeEvent, useState } from 'react'

import { useQuery } from '@apollo/client'
import Image from 'next/image'
import Link from 'next/link'

import { GET_POSTS_LIST } from '@/modules/posts'
import { Avatar, GlobalInput } from '@/ui'

export const PostsView = () => {
  const [search, setSearch] = useState<string>('')

  const { loading, error, data, fetchMore } = useQuery(GET_POSTS_LIST, {
    variables: {
      search: search,
      pageSize: 16,
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
        <div className="max-w-[234px] flex flex-col h-auto">
          <div className="w-full">
            <Image
              className="bg-dark-300"
              width={234}
              height={240}
              src={
                'https://mykaleidoscope.ru/x/uploads/posts/2022-09/1663655218_46-mykaleidoscope-ru-p-emotsii-krutie-instagram-49.jpg'
              }
              alt={'asdf'}
            />
            <div className="flex pt-[6px] justify-between">
              <div className="flex gap-3">
                <Avatar
                  src={
                    'https://pixelbox.ru/wp-content/uploads/2022/08/avatar-boy-telegram-pixelbox.ru-94.jpg'
                  }
                  alt={'user avatar'}
                  height={36}
                  width={36}
                />
                <Link href={'/'}>
                  <span className="font-semibold leading-6 text-base">URLProfile</span>
                </Link>
              </div>
              <span>STATUS</span>
            </div>
            <span className="pt-3 font-normal text-light-900 leading-4 text-xs">22 min ago</span>
            <p className="text-sm text-light-100 leading-6 font-normal">
              {showMore ? text : `${text.substring(0, 83)}`}
              <button className="text-accent-700" onClick={() => setShowMore(!showMore)}>
                {showMore ? 'Show hide' : 'Show more'}
              </button>
            </p>
          </div>
        </div>
        <div className="max-w-[234px] flex flex-col h-auto ">
          <div className="w-full">
            <Image
              className="bg-dark-300"
              width={234}
              height={240}
              src={
                'https://mykaleidoscope.ru/x/uploads/posts/2022-09/1663655218_46-mykaleidoscope-ru-p-emotsii-krutie-instagram-49.jpg'
              }
              alt={'asdf'}
            />
            <div className="flex pt-[6px] justify-between">
              <div className="flex gap-3">
                <Avatar
                  src={
                    'https://pixelbox.ru/wp-content/uploads/2022/08/avatar-boy-telegram-pixelbox.ru-94.jpg'
                  }
                  alt={'user avatar'}
                  height={36}
                  width={36}
                />
                <Link href={'/'}>
                  <span className="font-semibold leading-6 text-base">URLProfile</span>
                </Link>
              </div>
              <span>STATUS</span>
            </div>
            <span className="pt-3 font-normal text-light-900 leading-4 text-xs">22 min ago</span>
            <p className="text-sm text-light-100 leading-6 font-normal">
              {showMore ? text : `${text.substring(0, 83)}`}
              <button className="text-accent-700" onClick={() => setShowMore(!showMore)}>
                {showMore ? 'Show hide' : 'Show more'}
              </button>
            </p>
          </div>
        </div>
        <div className="max-w-[234px] flex flex-col h-auto">
          <div className="w-full">
            <Image
              className="bg-dark-300"
              width={234}
              height={240}
              src={
                'https://mykaleidoscope.ru/x/uploads/posts/2022-09/1663655218_46-mykaleidoscope-ru-p-emotsii-krutie-instagram-49.jpg'
              }
              alt={'asdf'}
            />
            <div className="flex pt-[6px] justify-between">
              <div className="flex gap-3">
                <Avatar
                  src={
                    'https://pixelbox.ru/wp-content/uploads/2022/08/avatar-boy-telegram-pixelbox.ru-94.jpg'
                  }
                  alt={'user avatar'}
                  height={36}
                  width={36}
                />
                <Link href={'/'}>
                  <span className="font-semibold leading-6 text-base">URLProfile</span>
                </Link>
              </div>
              <span>STATUS</span>
            </div>
            <span className="pt-3 font-normal text-light-900 leading-4 text-xs">22 min ago</span>
            <p className="text-sm text-light-100 leading-6 font-normal">
              {showMore ? text : `${text.substring(0, 83)}`}
              <button className="text-accent-700" onClick={() => setShowMore(!showMore)}>
                {showMore ? 'Show hide' : 'Show more'}
              </button>
            </p>
          </div>
        </div>
        <div className="max-w-[234px] flex flex-col h-auto">
          <div className="w-full">
            <Image
              className="bg-dark-300"
              width={234}
              height={240}
              src={
                'https://mykaleidoscope.ru/x/uploads/posts/2022-09/1663655218_46-mykaleidoscope-ru-p-emotsii-krutie-instagram-49.jpg'
              }
              alt={'asdf'}
            />
            <div className="flex pt-[6px] justify-between">
              <div className="flex gap-3">
                <Avatar
                  src={
                    'https://pixelbox.ru/wp-content/uploads/2022/08/avatar-boy-telegram-pixelbox.ru-94.jpg'
                  }
                  alt={'user avatar'}
                  height={36}
                  width={36}
                />
                <Link href={'/'}>
                  <span className="font-semibold leading-6 text-base">URLProfile</span>
                </Link>
              </div>
              <span>STATUS</span>
            </div>
            <span className="pt-3 font-normal text-light-900 leading-4 text-xs">22 min ago</span>
            <p className="text-sm text-light-100 leading-6 font-normal">
              {showMore ? text : `${text.substring(0, 83)}`}
              <button className="text-accent-700" onClick={() => setShowMore(!showMore)}>
                {showMore ? 'Show hide' : 'Show more'}
              </button>
            </p>
          </div>
        </div>
        <div className="max-w-[234px] flex flex-col h-auto">
          <div className="w-full">
            <Image
              className="bg-dark-300"
              width={234}
              height={240}
              src={
                'https://mykaleidoscope.ru/x/uploads/posts/2022-09/1663655218_46-mykaleidoscope-ru-p-emotsii-krutie-instagram-49.jpg'
              }
              alt={'asdf'}
            />
            <div className="flex pt-[6px] justify-between">
              <div className="flex gap-3">
                <Avatar
                  src={
                    'https://pixelbox.ru/wp-content/uploads/2022/08/avatar-boy-telegram-pixelbox.ru-94.jpg'
                  }
                  alt={'user avatar'}
                  height={36}
                  width={36}
                />
                <Link href={'/'}>
                  <span className="font-semibold leading-6 text-base">URLProfile</span>
                </Link>
              </div>
              <span>STATUS</span>
            </div>
            <span className="pt-3 font-normal text-light-900 leading-4 text-xs">22 min ago</span>
            <p className="text-sm text-light-100 leading-6 font-normal">
              {showMore ? text : `${text.substring(0, 83)}`}
              <button className="text-accent-700" onClick={() => setShowMore(!showMore)}>
                {showMore ? 'Show hide' : 'Show more'}
              </button>
            </p>
          </div>
        </div>
        <div className="max-w-[234px] flex flex-col h-auto">
          <div className="w-full">
            <Image
              className="bg-dark-300"
              width={234}
              height={240}
              src={
                'https://mykaleidoscope.ru/x/uploads/posts/2022-09/1663655218_46-mykaleidoscope-ru-p-emotsii-krutie-instagram-49.jpg'
              }
              alt={'asdf'}
            />
            <div className="flex pt-[6px] justify-between">
              <div className="flex gap-3">
                <Avatar
                  src={
                    'https://pixelbox.ru/wp-content/uploads/2022/08/avatar-boy-telegram-pixelbox.ru-94.jpg'
                  }
                  alt={'user avatar'}
                  height={36}
                  width={36}
                />
                <Link href={'/'}>
                  <span className="font-semibold leading-6 text-base">URLProfile</span>
                </Link>
              </div>
              <span>STATUS</span>
            </div>
            <span className="pt-3 font-normal text-light-900 leading-4 text-xs">22 min ago</span>
            <p className="text-sm text-light-100 leading-6 font-normal">
              {showMore ? text : `${text.substring(0, 83)}`}
              <button className="text-accent-700" onClick={() => setShowMore(!showMore)}>
                {showMore ? 'Show hide' : 'Show more'}
              </button>
            </p>
          </div>
        </div>
        <div className="max-w-[234px] flex flex-col h-auto">
          <div className="w-full">
            <Image
              className="bg-dark-300"
              width={234}
              height={240}
              src={
                'https://mykaleidoscope.ru/x/uploads/posts/2022-09/1663655218_46-mykaleidoscope-ru-p-emotsii-krutie-instagram-49.jpg'
              }
              alt={'asdf'}
            />
            <div className="flex pt-[6px] justify-between">
              <div className="flex gap-3">
                <Avatar
                  src={
                    'https://pixelbox.ru/wp-content/uploads/2022/08/avatar-boy-telegram-pixelbox.ru-94.jpg'
                  }
                  alt={'user avatar'}
                  height={36}
                  width={36}
                />
                <Link href={'/'}>
                  <span className="font-semibold leading-6 text-base">URLProfile</span>
                </Link>
              </div>
              <span>STATUS</span>
            </div>
            <span className="pt-3 font-normal text-light-900 leading-4 text-xs">22 min ago</span>
            <p className="text-sm text-light-100 leading-6 font-normal">
              {showMore ? text : `${text.substring(0, 83)}`}
              <button className="text-accent-700" onClick={() => setShowMore(!showMore)}>
                {showMore ? 'Show hide' : 'Show more'}
              </button>
            </p>
          </div>
        </div>
        <div className="max-w-[234px] flex flex-col h-auto">
          <div className="w-full">
            <Image
              className="bg-dark-300"
              width={234}
              height={240}
              src={
                'https://mykaleidoscope.ru/x/uploads/posts/2022-09/1663655218_46-mykaleidoscope-ru-p-emotsii-krutie-instagram-49.jpg'
              }
              alt={'asdf'}
            />
            <div className="flex pt-[6px] justify-between">
              <div className="flex gap-3">
                <Avatar
                  src={
                    'https://pixelbox.ru/wp-content/uploads/2022/08/avatar-boy-telegram-pixelbox.ru-94.jpg'
                  }
                  alt={'user avatar'}
                  height={36}
                  width={36}
                />
                <Link href={'/'}>
                  <span className="font-semibold leading-6 text-base">URLProfile</span>
                </Link>
              </div>
              <span>STATUS</span>
            </div>
            <span className="pt-3 font-normal text-light-900 leading-4 text-xs">22 min ago</span>
            <p className="text-sm text-light-100 leading-6 font-normal">
              {showMore ? text : `${text.substring(0, 83)}`}
              <button className="text-accent-700" onClick={() => setShowMore(!showMore)}>
                {showMore ? 'Show hide' : 'Show more'}
              </button>
            </p>
          </div>
        </div>
        <div className="max-w-[234px] flex flex-col h-auto">
          <div className="w-full">
            <Image
              className="bg-dark-300"
              width={234}
              height={240}
              src={
                'https://mykaleidoscope.ru/x/uploads/posts/2022-09/1663655218_46-mykaleidoscope-ru-p-emotsii-krutie-instagram-49.jpg'
              }
              alt={'asdf'}
            />
            <div className="flex pt-[6px] justify-between">
              <div className="flex gap-3">
                <Avatar
                  src={
                    'https://pixelbox.ru/wp-content/uploads/2022/08/avatar-boy-telegram-pixelbox.ru-94.jpg'
                  }
                  alt={'user avatar'}
                  height={36}
                  width={36}
                />
                <Link href={'/'}>
                  <span className="font-semibold leading-6 text-base">URLProfile</span>
                </Link>
              </div>
              <span>STATUS</span>
            </div>
            <span className="pt-3 font-normal text-light-900 leading-4 text-xs">22 min ago</span>
            <p className="text-sm text-light-100 leading-6 font-normal">
              {showMore ? text : `${text.substring(0, 83)}`}
              <button className="text-accent-700" onClick={() => setShowMore(!showMore)}>
                {showMore ? 'Show hide' : 'Show more'}
              </button>
            </p>
          </div>
        </div>
        <div className="max-w-[234px] flex flex-col h-auto">
          <div className="w-full">
            <Image
              className="bg-dark-300"
              width={234}
              height={240}
              src={
                'https://mykaleidoscope.ru/x/uploads/posts/2022-09/1663655218_46-mykaleidoscope-ru-p-emotsii-krutie-instagram-49.jpg'
              }
              alt={'asdf'}
            />
            <div className="flex pt-[6px] justify-between">
              <div className="flex gap-3">
                <Avatar
                  src={
                    'https://pixelbox.ru/wp-content/uploads/2022/08/avatar-boy-telegram-pixelbox.ru-94.jpg'
                  }
                  alt={'user avatar'}
                  height={36}
                  width={36}
                />
                <Link href={'/'}>
                  <span className="font-semibold leading-6 text-base">URLProfile</span>
                </Link>
              </div>
              <span>STATUS</span>
            </div>
            <span className="pt-3 font-normal text-light-900 leading-4 text-xs">22 min ago</span>
            <p className="text-sm text-light-100 leading-6 font-normal">
              {showMore ? text : `${text.substring(0, 83)}`}
              <button className="text-accent-700" onClick={() => setShowMore(!showMore)}>
                {showMore ? 'Show hide' : 'Show more'}
              </button>
            </p>
          </div>
        </div>
        <div className="max-w-[234px] flex flex-col h-auto">
          <div className="w-full">
            <Image
              className="bg-dark-300"
              width={234}
              height={240}
              src={
                'https://mykaleidoscope.ru/x/uploads/posts/2022-09/1663655218_46-mykaleidoscope-ru-p-emotsii-krutie-instagram-49.jpg'
              }
              alt={'asdf'}
            />
            <div className="flex pt-[6px] justify-between">
              <div className="flex gap-3">
                <Avatar
                  src={
                    'https://pixelbox.ru/wp-content/uploads/2022/08/avatar-boy-telegram-pixelbox.ru-94.jpg'
                  }
                  alt={'user avatar'}
                  height={36}
                  width={36}
                />
                <Link href={'/'}>
                  <span className="font-semibold leading-6 text-base">URLProfile</span>
                </Link>
              </div>
              <span>STATUS</span>
            </div>
            <span className="pt-3 font-normal text-light-900 leading-4 text-xs">22 min ago</span>
            <p className="text-sm text-light-100 leading-6 font-normal">
              {showMore ? text : `${text.substring(0, 83)}`}
              <button className="text-accent-700" onClick={() => setShowMore(!showMore)}>
                {showMore ? 'Show hide' : 'Show more'}
              </button>
            </p>
          </div>
        </div>
        <div className="max-w-[234px] flex flex-col h-auto">
          <div className="w-full">
            <Image
              className="bg-dark-300"
              width={234}
              height={240}
              src={
                'https://mykaleidoscope.ru/x/uploads/posts/2022-09/1663655218_46-mykaleidoscope-ru-p-emotsii-krutie-instagram-49.jpg'
              }
              alt={'asdf'}
            />
            <div className="flex pt-[6px] justify-between">
              <div className="flex gap-3">
                <Avatar
                  src={
                    'https://pixelbox.ru/wp-content/uploads/2022/08/avatar-boy-telegram-pixelbox.ru-94.jpg'
                  }
                  alt={'user avatar'}
                  height={36}
                  width={36}
                />
                <Link href={'/'}>
                  <span className="font-semibold leading-6 text-base">URLProfile</span>
                </Link>
              </div>
              <span>STATUS</span>
            </div>
            <span className="pt-3 font-normal text-light-900 leading-4 text-xs">22 min ago</span>
            <p className="text-sm text-light-100 leading-6 font-normal">
              {showMore ? text : `${text.substring(0, 83)}`}
              <button className="text-accent-700" onClick={() => setShowMore(!showMore)}>
                {showMore ? 'Show hide' : 'Show more'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
