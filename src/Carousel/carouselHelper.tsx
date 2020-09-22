import {
  Children,
  MutableRefObject,
  ReactNode,
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'

import React from 'react'
import clsx from 'clsx'
import styles from './carousel.module.scss'

function getChildrenArr(children: ReactNode) {
  const cloneEls: ReactNode[] = []

  Children.map(children, (child: ReactNode) => {
    cloneEls.push(child)
  })

  return cloneEls
}

function getSliderMeasurements(
  current: any,
  layoutGap: number,
  infinite: boolean,
  baseSlideCount: number,
  slidesShown: number
) {
  const measurements = {
    slidesPxWidth: current.offsetWidth,
    slidesLeft: 0,
    slideMargin: 0,
    slidePxWidth: 0,
    slideFlexBasis: 0,
    slideFlexPxWidth: 0,
    slideShift: 0
  }

  let totalSlideCount = baseSlideCount + (infinite ? 2 : 0) * slidesShown
  measurements.slidePxWidth = measurements.slidesPxWidth / totalSlideCount

  if (layoutGap === 0) {
    measurements.slideFlexBasis = 100 / totalSlideCount
    measurements.slideShift = 100 / slidesShown
    measurements.slidesLeft = infinite ? -100 / slidesShown + (-100 / slidesShown) * (slidesShown - 1) : 0
  } else {
    let flexBasisPercent = 0.9
    measurements.slideFlexPxWidth = measurements.slidePxWidth * flexBasisPercent
    measurements.slideFlexBasis = 90 / totalSlideCount

    let defaultMarginPixel = layoutGap // 5
    measurements.slideMargin = (defaultMarginPixel / measurements.slidesPxWidth) * 100

    measurements.slideShift =
      (((measurements.slideFlexPxWidth + defaultMarginPixel * 2) / measurements.slidePxWidth) * 100) / slidesShown

    let remainingWidthPx = measurements.slidePxWidth - measurements.slideFlexPxWidth
    let offsetLeftPx = remainingWidthPx / 2 - defaultMarginPixel
    let startPos = (offsetLeftPx / measurements.slidePxWidth) * 100
    measurements.slidesLeft = infinite ? startPos - measurements.slideShift * slidesShown : startPos
  }

  return { ...measurements }
}

function getNumberOfIndicators(baseSlideCount: number, slidesShown: number, infinite: boolean) {
  var count = 1
  for (var i = baseSlideCount; 0 < i; i--) {
    if (i % slidesShown === 0 && slidesShown === i) break

    count++
  }

  return count + (infinite ? slidesShown - 1 : 0)
}

function getIndicators(
  indicatorsLength: number,
  baseSlideCount: number,
  slidesShown: number,
  childrenArr: ReactNode[],
  indicatorStyle: any,
  shiftSlide: any
) {
  if (baseSlideCount < 1) return []

  let initIndicators: ReactNode[] = []

  let copy = childrenArr.slice()
  copy.splice(0, indicatorsLength).forEach((value, index) => {
    let baseIndex = index + 1
    let slidesLabel = `Go to slide ${baseIndex}`
    if (slidesShown > 1) {
      let numToAdd = slidesShown - 1
      for (var i = 1; i <= numToAdd; i++) {
        let nextSlide = i

        if (baseIndex + i <= indicatorsLength) {
          nextSlide = baseIndex + i
        }

        if (baseIndex + i > indicatorsLength) {
          nextSlide = baseIndex + i - indicatorsLength
        }

        slidesLabel += `, ${nextSlide}`
      }
    }

    initIndicators.push(
      <button
        key={index}
        type="button"
        data-selected={index === 0 ? 'true' : 'false'}
        aria-current={index === 0 ? 'true' : 'false'}
        className={clsx(styles['indicator-button'], styles[indicatorStyle])}
        onClick={() => shiftSlide(index, 'indicator')}
      >
        <span className={clsx(styles['sr-only'])} aria-label={slidesLabel} />
      </button>
    )
  })

  return initIndicators
}

function getSlides(
  childrenArr: ReactNode[],
  baseSlideCount: number,
  slidesShown: number,
  slideGrabbing: boolean,
  layoutGap: number,
  flexBasis: number,
  margin: number,
  infinite: boolean
) {
  const initSlides = childrenArr?.map((child: ReactNode, index: number) => {
    if (isValidElement(child)) {
      let label = `slide ${index + 1} of ${baseSlideCount}`
      return (
        <div
          aria-label={label}
          aria-hidden={slidesShown - 1 < index}
          className={clsx(
            styles['slide'],
            slideGrabbing && styles['grabbing'],
            layoutGap === 0 && styles['marginless']
          )}
          key={label}
          style={{
            ...child.props.style,
            flexBasis: `${flexBasis}%`,
            margin: `0 ${margin}%`
          }}
        >
          {cloneElement(child, {
            key: index
          })}
        </div>
      )
    }
  })

  // Configure infinite slider
  if (infinite) {
    const initSlidesLength = initSlides.length
    const firstSlides = initSlides.slice(0, slidesShown)
    const lastSlides = initSlides.slice(initSlidesLength - slidesShown, initSlidesLength)
    const cloneSlides = firstSlides.concat(lastSlides).map((child: ReactNode, index: number) => {
      if (isValidElement(child)) {
        return cloneElement(child, {
          key: -index - 100,
          'aria-hidden': 'true'
        })
      }
    })
    initSlides.unshift(...cloneSlides.slice(cloneSlides.length - slidesShown))
    initSlides.push(...cloneSlides.slice(0, slidesShown))
  }

  return initSlides
}

function updateIndicatorDots(
  indicatorCount: number,
  activeIndex: number,
  destinationIndex: number,
  indicatorRef: MutableRefObject<any>,
  baseSlideCount: number
) {
  if (indicatorRef.current && indicatorRef.current.children) {
    if (destinationIndex < 0) {
      destinationIndex = baseSlideCount + destinationIndex
    }

    if (destinationIndex === indicatorCount) {
      destinationIndex = 0
    }

    indicatorRef.current.children[activeIndex].ariaCurrent = 'false'
    indicatorRef.current.children[activeIndex].attributes['data-selected'].value = 'false'
    indicatorRef.current.children[destinationIndex].ariaCurrent = 'true'
    indicatorRef.current.children[destinationIndex].attributes['data-selected'].value = 'true'
  }
}

function updateAriaHidden(
  infinite: boolean,
  activeIndex: number,
  destinationIndex: number,
  sliderRef: MutableRefObject<any>,
  baseSlideCount: number,
  slidesShown: number
) {
  const setAriaHidden = (index: number, boundary: number, val: string) => {
    let positionAdj = infinite ? slidesShown : 0
    for (let i = index; i < boundary; i++) {
      let pos1 = i + positionAdj
      sliderRef.current.children[pos1].ariaHidden = val
    }
  }

  const activeIndexBoundary = activeIndex + 1 + (slidesShown - 1)
  setAriaHidden(activeIndex, activeIndexBoundary, 'true')

  if (destinationIndex > baseSlideCount - 1) {
    destinationIndex = 0
  } else if (destinationIndex < 0) {
    destinationIndex = baseSlideCount - 1
  }

  const destinationIndexBoundary = destinationIndex + 1 + (slidesShown - 1)
  setAriaHidden(destinationIndex, destinationIndexBoundary, 'false')
}

export default function carouselHelper(
  children: ReactNode,
  itemsToShow: number,
  controlAlignment: string,
  hideIndicators: boolean,
  indicatorStyle: string,
  duration: number,
  infinite: boolean,
  autoSlide: boolean,
  layoutGap: number
) {
  // Configure button alignment
  const alignment = [styles[(controlAlignment + '').split(' ')[0]], styles[(controlAlignment + '').split(' ')[1]]]

  // Configure autoslide / infinite
  if (autoSlide) infinite = true

  // Configure slide boundary vars
  const [childrenArr] = useState<ReactNode[]>(getChildrenArr(children))
  const [baseSlideCount] = useState(childrenArr.length)
  const [slidesShown] = useState(itemsToShow <= baseSlideCount ? itemsToShow : baseSlideCount)
  const [initLeftPos, setInitLeftState] = useState(0)

  // Configure base slides
  const slidesRef = useRef<any>(null)
  const [slidesWidth] = useState<number>((baseSlideCount * 100) / slidesShown + (infinite ? 100 * 2 : 0))
  const [slidesTransition, setSlidesTransition] = useState<string>('')
  const [slidesLeft, setSlidesLeft] = useState(0)
  const [slidesPxWidth, setSlidesPxWidth] = useState(0)
  const [slideMargin, setSlideMargin] = useState<number>(layoutGap)
  const [slideFlexBasis, setSlideFlexBasis] = useState<number>(100)
  const [slideGrabbing, setSlideGrabbing] = useState(false)
  const [slideShift, setSlideShift] = useState<number>(0)
  const [ariaLive, setAriaLive] = useState<'off' | 'assertive' | 'polite' | undefined>('off')

  const slides = useMemo(
    () =>
      getSlides(
        childrenArr,
        baseSlideCount,
        slidesShown,
        slideGrabbing,
        layoutGap,
        slideFlexBasis,
        slideMargin,
        infinite
      ),
    [childrenArr, baseSlideCount, slidesShown, slideGrabbing, slideFlexBasis, slideMargin, slidesRef.current]
  )

  // Configure slider drag/touch handling
  const [dragActive, setDragActive] = useState(false)
  const [posInitial, setPosInitial] = useState(0)
  const [posX1, setPosX1] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const [allowShift, setAllowShift] = useState(true)

  const toSlidesPercentage = (pixelVal: number) => {
    let _width

    if (layoutGap === 0) {
      _width = slidesPxWidth
    } else {
      let additionalWidth = infinite ? 100 * 2 : 0
      let visibleWidth = (baseSlideCount * 100) / slidesShown
      _width = ((visibleWidth + additionalWidth) / slidesWidth) * slidesPxWidth
    }

    let percentage = ((pixelVal * slides.length) / (slidesShown * _width)) * 100
    return percentage
  }

  const exceedsSliderBoundary = (dir: number) => {
    return (
      !infinite &&
      ((dir == -1 && activeIndex === 0) ||
        (dir == 1 && activeIndex >= baseSlideCount - 1 - (slidesShown > 1 ? slidesShown - 1 : 0)))
    )
  }

  const shiftSlide = (dir: number, action?: string) => {
    // Check if slide is in the middle of a transition
    if (slidesTransition) return

    // Check if slide exceeds beginning/end boundaries by drag or control
    if (exceedsSliderBoundary(dir) && action !== 'indicator') {
      if (action !== 'drag') return

      setSlidesTransition('left .5s ease-out')
      setSlidesLeft(activeIndex === 0 ? initLeftPos : action ? posInitial : slidesLeft)
      return
    }

    let destinationIndex = dir
    if (allowShift) {
      switch (true) {
        case action === 'indicator':
          // dir is the exact index destination
          let slideMultiplier = Math.abs(destinationIndex - activeIndex)
          if (slideMultiplier === 0) return
          let sliderLeftAdjustment = (activeIndex < destinationIndex ? -1 : 1) * slideShift * slideMultiplier
          setSlidesLeft(slidesLeft + sliderLeftAdjustment)
          setActiveIndex(destinationIndex)
          break
        case action === 'drag':
        default:
          // dir is the direction: left (-1) or right (1)
          const initPosition = action ? posInitial : slidesLeft
          if (!action) {
            setPosInitial(initPosition)
          }

          if (destinationIndex == 1) {
            setSlidesLeft(initPosition - slideShift)
          } else {
            // destinationIndex == -1
            setSlidesLeft(initPosition + slideShift)
          }

          destinationIndex += activeIndex
          setActiveIndex(destinationIndex)
          break
      }

      if (action != 'initialize')
        updateAriaHidden(infinite, activeIndex, destinationIndex, slidesRef, baseSlideCount, slidesShown)

      if (!hideIndicators && indicatorRef.current && indicatorRef.current.children && action != 'initialize') {
        updateIndicatorDots(indicators.length, activeIndex, destinationIndex, indicatorRef, baseSlideCount)
      }

      setAriaLive('off')
      setSlidesTransition('left .3s ease-out')
    }
    setAllowShift(false)
  }

  // Configure slider indicators
  const indicatorsLength = useMemo(() => getNumberOfIndicators(baseSlideCount, slidesShown, infinite), [
    baseSlideCount,
    slidesShown,
    infinite
  ])
  const indicatorRef = useRef<any>(null)
  const indicators = useMemo(
    () => getIndicators(indicatorsLength, baseSlideCount, slidesShown, childrenArr, indicatorStyle, shiftSlide),
    [activeIndex, slidesTransition, slidesLeft, slideShift]
  )

  // Event Handler: transitionend
  const handleIndexCheck = () => {
    setSlidesTransition('')
    setAriaLive('polite')

    if (activeIndex === -1) {
      let leftAdjustment = (baseSlideCount - slidesShown + (slidesShown - 1)) * slideShift
      setSlidesLeft(initLeftPos - leftAdjustment)
      setActiveIndex(baseSlideCount - 1)
    }

    if (activeIndex === baseSlideCount) {
      setSlidesLeft(initLeftPos)
      setActiveIndex(0)
    }

    setAllowShift(true)
  }

  // Event Handler: mousedown
  const handleDragStart = (event: any) => {
    if (slidesTransition) return

    event = event || window.event
    event.preventDefault()
    event.stopPropagation()

    setPosInitial(slidesLeft)

    if (event.type == 'touchstart') {
      setPosX1(toSlidesPercentage(event.touches[0].clientX))
    } else {
      setPosX1(toSlidesPercentage(event.clientX))
    }

    document.body.style.cursor = 'grabbing'
    setSlideGrabbing(true)
    setDragActive(true)
  }

  // Event Handler: mouseover
  const handleDragActionHandler = useCallback(
    (event: any) => {
      if (dragActive) {
        event = event || window.event

        var nextPosition = 0
        if (event.type == 'touchmove') {
          nextPosition = posX1 - toSlidesPercentage(event.touches[0].clientX)
          setPosX1(toSlidesPercentage(event.touches[0].clientX))
        } else {
          nextPosition = posX1 - toSlidesPercentage(event.clientX)
          setPosX1(toSlidesPercentage(event.clientX))
        }

        setSlidesLeft(slidesLeft - nextPosition)
      }
    },
    [dragActive, posInitial, slidesLeft]
  )

  // Event Handler: mouseup
  const handleDragEndHandler = useCallback(
    (event: any) => {
      if (dragActive) {
        var posFinal = slidesLeft
        var threshold = 12

        if (posFinal - posInitial < -threshold) {
          shiftSlide(1, 'drag')
        } else if (posFinal - posInitial > threshold) {
          shiftSlide(-1, 'drag')
        } else {
          setSlidesLeft(posInitial)
        }

        document.body.style.cursor = 'default'
        setSlideGrabbing(false)
        setDragActive(false)
      }
    },
    [dragActive, posInitial, slidesLeft]
  )

  useEffect(() => {
    document.addEventListener('mouseup', handleDragEndHandler)
    document.addEventListener('mousemove', handleDragActionHandler)

    return () => {
      document.removeEventListener('mouseup', handleDragEndHandler)
      document.removeEventListener('mousemove', handleDragActionHandler)
    }
  }, [handleDragEndHandler, handleDragActionHandler])

  useEffect(() => {
    if (autoSlide && !dragActive) {
      let timer!: NodeJS.Timeout

      clearInterval(timer)
      timer = setInterval(() => {
        shiftSlide(1)
      }, duration)

      return () => clearInterval(timer)
    }
  }, [activeIndex, dragActive, allowShift, slidesLeft])

  useEffect(() => {
    const { current } = slidesRef

    const { ...measurements } = getSliderMeasurements(current, layoutGap, infinite, baseSlideCount, slidesShown)

    setInitLeftState(measurements.slidesLeft)
    setSlidesLeft(measurements.slidesLeft)
    setSlidesPxWidth(measurements.slidesPxWidth)
    setSlideShift(measurements.slideShift)
    setSlideMargin(measurements.slideMargin)
    setSlideFlexBasis(measurements.slideFlexBasis)

    setAriaLive('polite')
  }, [])

  return {
    slidesRef,
    slidesLeft,
    alignment,
    slides,
    slidesWidth,
    indicators,
    indicatorRef,
    slidesTransition,
    ariaLive,
    handleDragStart,
    handleDragEndHandler,
    handleDragActionHandler,
    handleIndexCheck,
    shiftSlide
  }
}
