import { FC, memo } from 'react'

import { Maybe } from '@graphql-tools/utils'
import { InitDetail } from 'lightgallery/lg-events'
import lgRotate from 'lightgallery/plugins/rotate'
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgZoom from 'lightgallery/plugins/zoom'
import LightGallery from 'lightgallery/react'

interface Props {
  onInit: (detail: InitDetail) => void
  images: Maybe<string[]> | undefined
}

export const PostsLightGallery: FC<Props> = memo(({ onInit, images }) => {
  console.log('posts lg rerender')

  return (
    <>
      <LightGallery
        onInit={onInit}
        elementClassNames="hidden"
        plugins={[lgThumbnail, lgRotate, lgZoom]}
      >
        {images ? (
          images.map(image => (
            <div data-src={image} key={image}>
              <img src={image} alt="" />
            </div>
          ))
        ) : (
          <div data-src="https://bee-brick-test.s3.eu-central-1.amazonaws.com/users/41/post/06a189f0-8c35-49a7-b61b-e6bfeb9c3cf0-images-1440x810">
            <img
              src={
                'https://bee-brick-test.s3.eu-central-1.amazonaws.com/users/41/post/06a189f0-8c35-49a7-b61b-e6bfeb9c3cf0-images-1440x810'
              }
              alt=""
            />
          </div>
        )}
      </LightGallery>
    </>
  )
})
