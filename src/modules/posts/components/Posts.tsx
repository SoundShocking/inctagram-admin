import Image from 'next/image'
import Link from 'next/link'

import { Avatar } from '@/ui'

export const Posts = ({
  data,
  showMore,
  setShowMore,
  text,
}: {
  data?: any[]
  showMore: boolean
  setShowMore: (show: boolean) => void
  text: string
}) => {
  return (
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
    </div>
  )
}
