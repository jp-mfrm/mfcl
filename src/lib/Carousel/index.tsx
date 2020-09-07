import React, {
  Children,
  FunctionComponent,
  ReactNode,
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'

import carouselHelper from './carouselHelper'
import clsx from 'clsx'
import styles from './carousel.module.scss'

/// TODO: Props to implement
/// as: 'div' | 'section' | 'a' | 'img'
/// asProps: {}
/// controls: boolean;
/// indicators: boolean; (High priority)
/// nextIcon: node (Low priority)
/// nextLabel: string (Low priority)
/// prevIcon: node (Low priority)
/// prevLabel: string (Low priority)
/// pause: 'hover' | false (Low priority)
/// touch: boolean (High priority)

interface Props {
  /** Sets the class for the Carousel wrapper */
  carouselClass?: string
  /** Sets how many slides to show */
  itemsToShow?: number
  /** Sets how many slides to scroll per click */
  itemsToScroll?: number
  /** Sets the transition control button alignments. Two non conflicting configurations can be combined.
   * 'middle' centers vertically while 'center' centers horizontally. */
  btnAlignment?: string | 'top' | 'middle' | 'center' | 'apart' | 'left' | 'right' | 'bottom'
  /** Allows Carousel to be cyclical. */
  infinite?: boolean
  /** Enables automatic transitions. */
  autoSlide?: boolean
  /** Time in milliseconds for autoSlide */
  duration?: number
  /** Enable draggable slides */
  draggable?: boolean
  [rest: string]: unknown // ...rest property
}

const Carousel: FunctionComponent<Props> = ({
  carouselClass,
  itemsToShow = 1,
  itemsToScroll = 1,
  btnAlignment = 'middle apart',
  infinite = false,
  autoSlide = false,
  duration = 3000,
  draggable = false,
  children
}) => {
  const slideRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)

  const {
    sliderWidth,
    slideFlexBasis,
    childrenArr,
    alignment,
    carouselJustify,
    slideTransform,
    slideTransition,
    goLeft,
    goRight,
    handleOnTransitionEnd
  } = carouselHelper(children, itemsToShow, btnAlignment, duration, infinite, autoSlide, slideRef)

  const slidesLength = Children.count(children)
  const slides = childrenArr?.map((child: ReactNode, index: number) => {
    if (isValidElement(child)) {
      // TODO: Figure out how to clone the outer wrapper of cloned element without overriding class name
      return (
        <div
          className={clsx(styles['slide'], draggable && styles['draggable'])}
          key={index}
          style={{ flexBasis: draggable ? '' : `${slideFlexBasis}%` }}
        >
          {cloneElement(child, {
            key: index
          })}
        </div>
      )
      // return cloneElement(child, {
      //   key: index,
      //   style: { flexBasis: !draggable && `${slideFlexBasis}%` }
      // })
    }
  })

  if (draggable) {
    const firstSlide = slides[0]
    const lastSlide = slides[slides.length - 1]
    const cloneSlides = [firstSlide, lastSlide].map((child: ReactNode, index: number) => {
      if (isValidElement(child)) {
        return cloneElement(child, {
          key: index === 0 ? -1 : slides.length
        })
      }
    })
    slides.unshift(cloneSlides[1])
    slides.push(cloneSlides[0])
  }

  const buttons = (
    <div className={clsx(styles['carousel-wrapper-controls'], alignment)}>
      <button className={clsx(styles['prev'])} onClick={goLeft}>
        <i className={clsx()}></i>
      </button>
      <button className={clsx(styles['next'])} onClick={goRight}>
        <i className={clsx()}></i>
      </button>
    </div>
  )

  const [dragActive, setDragActive] = useState(false)
  const [posInitial, setPosInitial] = useState(0)
  const [posX1, setPosX1] = useState(0)
  const [sliderLeft, setSliderLeft] = useState(-100)
  const [activeIndex, setActiveIndex] = useState(0)
  const [allowShift, setAllowShift] = useState(true)
  const slideSize = 100 // slideRef.current ? slideRef.current.offsetWidth : 0

  const convertPixelToPercentage = (pixelVal: number) => {
    return (pixelVal / (sliderRef.current!.offsetWidth / slides.length)) * 100
  }

  const getSliderLeftPos = useCallback(() => {
    return convertPixelToPercentage(sliderRef.current!.offsetLeft)
    // return(sliderRef.current!.offsetLeft / (sliderRef.current!.offsetWidth / slides.length)) * 100
  }, [sliderLeft])

  const handleDragStart = (event: any) => {
    event = event || window.event
    event.preventDefault()

    setPosInitial(getSliderLeftPos())

    if (event.type == 'touchstart') {
      setPosX1(event.touches[0].clientX)
    } else {
      setPosX1(convertPixelToPercentage(event.clientX))
    }

    setDragActive(true)
  }

  const handleDragActionHandler = useCallback(
    (event: any) => {
      if (dragActive) {
        event = event || window.event

        var nextPosition = 0
        if (event.type == 'touchmove') {
          nextPosition = posX1 - convertPixelToPercentage(event.touches[0].clientX)
          setPosX1(convertPixelToPercentage(event.touches[0].clientX))
        } else {
          nextPosition = posX1 - convertPixelToPercentage(event.clientX)
          setPosX1(convertPixelToPercentage(event.clientX))
        }

        setSliderLeft(getSliderLeftPos() - nextPosition)
      }
    },
    [dragActive, posInitial, getSliderLeftPos]
  )

  const handleDragEndHandler = useCallback(
    (event: any) => {
      if (dragActive) {
        var posFinal = getSliderLeftPos()
        var threshold = 25 // 100
        if (posFinal - posInitial < -threshold) {
          shiftSlide(1, 'drag')
        } else if (posFinal - posInitial > threshold) {
          shiftSlide(-1, 'drag')
        } else {
          setSliderLeft(posInitial)
        }

        setDragActive(false)
      }
    },
    [dragActive, posInitial, getSliderLeftPos]
  )

  const shiftSlide = (dir: number, action?: string) => {
    sliderRef.current!.style.transition = 'left 0.2s ease-out'

    if (allowShift) {
      const initPosition = action ? posInitial : getSliderLeftPos()
      if (!action) {
        setPosInitial(initPosition)
      }

      if (dir == 1) {
        setSliderLeft(initPosition - slideSize)
        setActiveIndex(activeIndex + 1)
      } else if (dir == -1) {
        setSliderLeft(initPosition + slideSize)
        setActiveIndex(activeIndex - 1)
      }
    }

    setAllowShift(false)
  }

  const checkIndex = () => {
    sliderRef.current!.style.transition = ''

    if (activeIndex === -1) {
      setSliderLeft(-(slidesLength * slideSize))
      setActiveIndex(slidesLength - 1)
    }

    if (activeIndex === slidesLength) {
      setSliderLeft(-(1 * slideSize))
      setActiveIndex(0)
    }

    setAllowShift(true)
  }

  useEffect(() => {
    document.onmouseup = handleDragEndHandler
    document.onmousemove = handleDragActionHandler
  }, [handleDragEndHandler, handleDragActionHandler])

  const draggableTemplate = (
    <div id="slider" className={clsx(styles['slider'], styles['loaded'])}>
      <div className={styles['wrapper']}>
        <div
          id="slides"
          className={styles['slides']}
          style={{
            left: `${sliderLeft}%`,
            width: `${sliderWidth + 200}%`
          }}
          ref={sliderRef}
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
          onTouchEnd={handleDragEndHandler}
          onTouchMove={handleDragActionHandler}
          onTransitionEnd={checkIndex}
        >
          {slides}
        </div>
      </div>
      <a id="prev" className={clsx(styles['control'], styles['prev'])} onClick={() => shiftSlide(-1)}></a>
      <a id="next" className={clsx(styles['control'], styles['next'])} onClick={() => shiftSlide(1)}></a>
    </div>
  )

  const template = (
    <div className={clsx(styles['carousel-wrapper'], carouselClass)} style={{ justifyContent: `${carouselJustify}` }}>
      <div
        onTransitionEnd={handleOnTransitionEnd}
        className={clsx(styles['carousel-wrapper-slider'])}
        style={{
          transform: `translate(${slideTransform}%)`,
          transition: ` ${slideTransition}`,
          width: `${sliderWidth}%`
        }}
      >
        {slides}
      </div>
      {buttons}
    </div>
  )

  return draggable ? draggableTemplate : template
}

export default Carousel
