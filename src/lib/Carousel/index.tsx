import React, { FunctionComponent, useState } from 'react'

import CarouselItem from './CarouselItem'
import styles from './carousel.module.scss'

interface Props {
  [rest: string]: unknown // ...rest property
}

const Carousel: FunctionComponent<Props> = ({ ...rest }) => {
  const sliderArr = [
    <CarouselItem></CarouselItem>,
    <CarouselItem></CarouselItem>,
    <CarouselItem></CarouselItem>,
    <CarouselItem></CarouselItem>
  ]
  const [x, setX] = useState(0)
  const goLeft = () => {
    x === 0 ? setX(-100 * (sliderArr.length - 1)) : setX(x + 100)
  }
  const goRight = () => {
    //sliderArr.length was used so the input can be dynamic
    x === -100 * (sliderArr.length - 1) ? setX(0) : setX(x - 100)
  }
  return (
    <div className={styles['carousel-wrapper']} {...rest}>
      {sliderArr.map((item, index) => {
        return (
          <div key={index} className={styles['slide']} style={{ transform: `translateX(${x}%)` }}>
            {item}
          </div>
        )
      })}
      <button id={styles['goLeft']} className={styles['nav-buttons']} onClick={goLeft}>
        left
      </button>
      <button id={styles['goRight']} className={styles['nav-buttons']} onClick={goRight}>
        right
      </button>
    </div>
  )
}

export default Carousel
