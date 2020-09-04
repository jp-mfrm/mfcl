import React, { Children, FunctionComponent, ReactNode, cloneElement, isValidElement, useState } from 'react'

import clsx from 'clsx'
import styles from './carousel.module.scss'

interface Props {
  /** (WIP) */
  itemsToShow?: number
  /** (WIP) */
  itemsToScroll?: number
  /** Optional children to use instead of items prop */
  children?: ReactNode | null
  [rest: string]: unknown // ...rest property
}

const Carousel: FunctionComponent<Props> = ({ itemsToShow, itemsToScroll, children, ...rest }) => {
  function getChildrenArr(children: any) {
    const cloneEls: any = []

    Children.map(children, (child: ReactNode, index) => {
      cloneEls.push(child)
    })

    return cloneEls
  }

  const itemWidth = itemsToShow && itemsToShow > 1 ? 100 / itemsToShow : 100
  const itemCount = Children.count(children)
  const sliderWidth = itemCount * 100
  const slideFlexBasis = (1 / itemCount) * 100
  const [childrenArr, updateChildArr] = useState<ReactNode[]>(getChildrenArr(children))
  const [direction, setDirection] = useState(-1)
  const [directionHandle, setDirectionHandle] = useState<Boolean>(false)
  const [carouselJustify, setCarouselJustify] = useState('flex-start')
  const [slideTransform, setSlideTransform] = useState(0)
  const [slideTransition, setSlideTransition] = useState('all 0.5s')

  const goLeft = () => {
    if (direction === -1) {
      setDirection(1)
      if (childrenArr) {
        // Take off first element, append to the end
        const el = childrenArr.shift()
        childrenArr.push(el)
        updateChildArr(childrenArr)
      }
    }

    setCarouselJustify('flex-end')
    setSlideTransform(slideFlexBasis)
  }

  const goRight = () => {
    if (direction === 1) {
      setDirection(-1)
      if (childrenArr) {
        // Take off last element, prepend to the start
        const el = childrenArr.pop()
        childrenArr.unshift(el)
        updateChildArr(childrenArr)
      }
    }

    setCarouselJustify('flex-start')
    setSlideTransform(-slideFlexBasis)
  }

  const handleOnTransitionEnd = () => {
    if (direction === 1) {
      if (childrenArr) {
        // Take off last element, prepend to the start
        const el = childrenArr.pop()
        childrenArr.unshift(el)

        updateChildArr(childrenArr)
      }
    } else {
      if (childrenArr) {
        // Take off first element, append to the end
        const el = childrenArr.shift()
        childrenArr.push(el)

        updateChildArr(childrenArr)
      }
    }

    setSlideTransition('none')
    setSlideTransform(0)
    setTimeout(() => {
      setSlideTransition('all 0.5s')
    })
  }

  return (
    <div className={clsx(styles['carousel-wrapper'])} style={{ justifyContent: `${carouselJustify}` }}>
      <div
        className={clsx(styles['carousel-wrapper-slider'])}
        onTransitionEnd={handleOnTransitionEnd}
        style={{
          transform: `translate(${slideTransform}%)`,
          transition: ` ${slideTransition}`,
          width: `${sliderWidth}%`
        }}
      >
        {childrenArr?.map((child: ReactNode, index: number) => {
          if (isValidElement(child)) {
            return cloneElement(child, {
              key: index,
              className: clsx(styles['slide']),
              style: {
                flexBasis: `${slideFlexBasis}%`
              }
            })
          }
        })}
      </div>
      <div className={clsx(styles['carousel-wrapper-controls'])}>
        <button className={clsx(styles['next'])} onClick={goRight}>
          <i className="">Right</i>
        </button>
        <button className={clsx(styles['prev'])} onClick={goLeft}>
          <i className="">Left</i>
        </button>
      </div>
    </div>
  )
}

export default Carousel
