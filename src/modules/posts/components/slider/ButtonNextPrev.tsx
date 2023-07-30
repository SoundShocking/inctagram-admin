import 'swiper/css/navigation'
import { CSSProperties } from 'react'
interface CustomStyle extends CSSProperties {
  '--swiper-navigation-size': string
}

export const ButtonNextPrev = () => {
  return (
    <div
      style={
        {
          '--swiper-navigation-size': '25px',
        } as CustomStyle
      }
    >
      <div className="swiper-button-next after:text-dark-700"></div>
      <div className="swiper-button-prev after:text-dark-700"></div>
      <div className="swiper-pagination "></div>
    </div>
  )
}
