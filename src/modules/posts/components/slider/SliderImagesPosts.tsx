import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css/bundle'
import 'swiper/css/navigation'
import { ButtonNextPrev } from '@/modules/posts'
import { Placeholder } from '@/ui'

export const SliderImagesPost = ({ postImages }: { postImages: string[] }) => {
  return (
    <>
      <Swiper
        style={
          {
            '--swiper-pagination-color': '#2f68cc',
          } as any
        }
        modules={[Navigation, Pagination]}
        navigation={{
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
        }}
        pagination={{ clickable: true }}
        spaceBetween={50}
      >
        {postImages.map((image, index) => (
          <SwiperSlide key={index}>
            <Placeholder
              alt={'Post image'}
              className="bg-dark-300 h-[240px] object-cover "
              width={234}
              height={240}
              src={image}
            />
          </SwiperSlide>
        ))}
        <ButtonNextPrev />
      </Swiper>
    </>
  )
}
