import {
  Children,
  MutableRefObject,
  ReactNode,
  cloneElement,
  createElement,
  isValidElement,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'

import React from 'react'
import { act } from 'react-dom/test-utils'
import clsx from 'clsx'
import styles from './carousel.module.scss'

function getChildrenArr(children: ReactNode) {
  const cloneEls: ReactNode[] = []

  Children.map(children, (child: ReactNode) => {
    cloneEls.push(child)
  })

  return cloneEls
}

function getDragSliderMeasurements(marginless: boolean, infinite: boolean, itemsToShow: number, slidesShown: number) {
  var measurements = {
    slideMargin: 0,
    slideFlexBasis: 0,
    slideSize: 0,
    sliderLeftPos: 0,
    sliderWidth: 0
  }

  let slideCount = itemsToShow + (infinite ? 2 : 0)
  switch (true) {
    case marginless:
      measurements.slideFlexBasis = 100 / slideCount
      measurements.slideSize = 100 / slidesShown
      measurements.sliderLeftPos = infinite ? -100 / slidesShown + (-100 / slidesShown) * (slidesShown - 1) : 0
      measurements.sliderWidth = (itemsToShow * 100) / slidesShown + (infinite ? 100 * 2 : 0)
      break
    default:
      let baseMargin = 0.125
      measurements.slideMargin = baseMargin / slidesShown
      measurements.slideFlexBasis = (100 / slideCount / slidesShown) * 0.9 // Set as 90% of individual slide basis

      let marginAdj = 2 * measurements.slideMargin
      let test = 90.875 + baseMargin * (itemsToShow + 2)
      measurements.slideSize = test / slidesShown - (infinite ? 0 : 2 * marginAdj)

      let sliderLeftAdj = 100 - 13.875 + baseMargin * 3 * (itemsToShow - 1)
      measurements.sliderLeftPos = infinite ? -sliderLeftAdj : 4.5
      measurements.sliderWidth = itemsToShow * 100 + (infinite ? 100 * 2 : 0)
      break
  }

  return { ...measurements }
}

function getNumberOfIndicators(baseSlideCount: number, slidesShown: number) {
  var count = 1
  for (var i = baseSlideCount; 0 < i; i--) {
    if (i % slidesShown === 0 && slidesShown === i) break

    count++
  }

  return count //== 1 ? 0 : count
}

function updateDragIndicatorDots(
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

function updateDragAriaHidden(
  infinite: boolean,
  activeIndex: number,
  destinationIndex: number,
  sliderRef: MutableRefObject<any>,
  baseSlideCount: number,
  slidesShown: number
) {
  let positionAdj = infinite ? slidesShown : 0
  let activeIndexBoundary = activeIndex + 1 + (slidesShown - 1)
  for (let i = activeIndex; i < activeIndexBoundary; i++) {
    let pos1 = i + positionAdj
    sliderRef.current.children[pos1].ariaHidden = 'true'
  }

  if (destinationIndex > baseSlideCount - 1) {
    destinationIndex = 0
  } else if (destinationIndex < 0) {
    destinationIndex = baseSlideCount - 1
  }
  let destinationIndexBoundary = destinationIndex + 1 + (slidesShown - 1)
  for (let i = destinationIndex; i < destinationIndexBoundary; i++) {
    let pos2 = i + positionAdj
    sliderRef.current.children[pos2].ariaHidden = 'false'
  }
}

export function draggableHelper(
  children: ReactNode,
  itemsToShow: number,
  marginLess: boolean,
  btnAlignment: string,
  hideIndicators: boolean,
  indicatorStyle: string,
  duration: number,
  infinite: boolean,
  autoSlide: boolean
) {
  // Configure button alignment
  const alignment = [styles[(btnAlignment + '').split(' ')[0]], styles[(btnAlignment + '').split(' ')[1]]]

  // Configure autoslide / infinite
  const [started, setStarted] = useState(duration ? true : false)
  if (autoSlide) infinite = true

  // Configure slide boundary vars
  const [childrenArr, updateChildArr] = useState<ReactNode[]>(getChildrenArr(children))
  const [baseSlideCount] = useState(childrenArr.length)
  const [slidesShown] = useState(itemsToShow <= baseSlideCount ? itemsToShow : baseSlideCount)
  const { slideMargin, slideFlexBasis, slideSize, sliderLeftPos, sliderWidth } = getDragSliderMeasurements(
    marginLess,
    infinite,
    baseSlideCount,
    slidesShown
  )
  const [sliderLeft, setSliderLeft] = useState(sliderLeftPos)

  // Configure base slides
  const [slideGrabbing, setSlideGrabbing] = useState(false)
  const slides = childrenArr?.map((child: ReactNode, index: number) => {
    if (isValidElement(child)) {
      let label = `slide ${index + 1} of ${baseSlideCount}`
      return (
        <div
          aria-label={label}
          aria-hidden={slidesShown - 1 < index}
          className={clsx(styles['slide'], styles['draggable'], slideGrabbing && styles['grabbing'])}
          // {...child.props}
          key={index}
          style={{ ...child.props.style, flexBasis: `${slideFlexBasis}%`, margin: `0 ${slideMargin}%` }}
        >
          {cloneElement(child, {
            key: index
          })}
        </div>
      )
    }
  })

  // TODO: Change slice/reverse to filter
  // Configure infinite slider
  if (infinite) {
    const firstSlides = slides.slice(0, slidesShown)
    const lastSlides = slides.slice().reverse().slice(0, slidesShown).reverse()
    const cloneSlides = firstSlides.concat(lastSlides).map((child: ReactNode, index: number) => {
      if (isValidElement(child)) {
        return cloneElement(child, {
          key: -index - 100,
          'aria-hidden': 'true'
        })
      }
    })
    slides.unshift(...cloneSlides.slice(cloneSlides.length - slidesShown))
    slides.push(...cloneSlides.slice(0, slidesShown))
  }

  // Configure slider indicators
  const indicators: ReactNode[] = []

  if (baseSlideCount > 1) {
    let numOfIndicators = getNumberOfIndicators(baseSlideCount, slidesShown) + (infinite ? slidesShown - 1 : 0)
    Children.toArray(children)
      .splice(0, numOfIndicators)
      .forEach((value, index) => {
        let baseIndex = index + 1
        let slidesLabel = `Go to slide ${baseIndex}`
        if (slidesShown > 1) {
          let numToAdd = slidesShown - 1
          for (var i = 1; i <= numToAdd; i++) {
            let nextSlide = i

            if (baseIndex + i <= numOfIndicators) {
              nextSlide = baseIndex + i
            }

            if (baseIndex + i > numOfIndicators) {
              nextSlide = baseIndex + i - numOfIndicators
            }

            slidesLabel += `, ${nextSlide}`
          }
        }

        indicators.push(
          createElement(
            'button',
            {
              key: index,
              'data-selected': index === 0 ? 'true' : 'false',
              'aria-current': index === 0 ? 'true' : 'false',
              className: clsx(styles['indicator-button'], styles[indicatorStyle]),
              onClick: () => handleIndicatorClick(index)
            },
            createElement('span', { className: clsx(styles['sr-only']), value: slidesLabel })
          )
        )
      })

    const handleIndicatorClick = (destinationIndex: number) => {
      shiftSlide(destinationIndex, 'indicator')
    }
  }
  const indicatorRef = useRef<any>(null)
  const indicatorWrapper = (
    <div ref={indicatorRef} className={clsx(styles['carousel-wrapper-indicators'])}>
      {!hideIndicators && indicators}
    </div>
  )

  // Configure slider drag/touch handling
  const draggableSliderRef = useRef<any>(null)
  const [dragActive, setDragActive] = useState(false)
  const [posInitial, setPosInitial] = useState(0)
  const [posX1, setPosX1] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const [allowShift, setAllowShift] = useState(true)

  const toSliderXPercentage = (pixelVal: number) => {
    let _width = marginLess
      ? draggableSliderRef.current!.offsetWidth
      : (((baseSlideCount * 100) / slidesShown + (infinite ? 100 * 2 : 0)) / sliderWidth) *
        draggableSliderRef.current!.offsetWidth

    return ((pixelVal * slides.length) / (slidesShown * _width)) * 100
  }

  const getSliderLeftPos = useCallback(() => {
    return toSliderXPercentage(draggableSliderRef.current!.offsetLeft)
  }, [sliderLeft])

  const sliderHasTransition = () => {
    return draggableSliderRef.current!.style.transition
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
    if (sliderHasTransition()) return

    // Check if slide exceeds beginning/end boundaries by drag or control
    if (exceedsSliderBoundary(dir) && action !== 'indicator') {
      if (action) draggableSliderRef.current!.style.transition = 'left .5s ease-out'
      setSliderLeft(activeIndex === 0 ? sliderLeftPos : action ? posInitial : getSliderLeftPos())
      return
    }

    let destinationIndex = dir
    if (allowShift) {
      switch (true) {
        case action === 'indicator':
          // dir is the exact index destination
          let slideMultiplier = Math.abs(destinationIndex - activeIndex)
          if (slideMultiplier === 0) return
          let sliderLeftAdjustment = (activeIndex < destinationIndex ? -1 : 1) * slideSize * slideMultiplier
          setSliderLeft(sliderLeft + sliderLeftAdjustment)
          setActiveIndex(destinationIndex)
          break
        case action === 'drag':
        default:
          // dir is the direction: left (-1) or right (1)
          const initPosition = action ? posInitial : sliderLeft
          if (!action) {
            setPosInitial(initPosition)
          }

          if (destinationIndex == 1) {
            setSliderLeft(initPosition - slideSize)
          } else {
            // destinationIndex == -1
            setSliderLeft(initPosition + slideSize)
          }

          destinationIndex += activeIndex
          setActiveIndex(destinationIndex)
          break
      }

      updateDragAriaHidden(infinite, activeIndex, destinationIndex, draggableSliderRef, baseSlideCount, slidesShown)

      if (!hideIndicators && indicatorRef.current && indicatorRef.current.children) {
        updateDragIndicatorDots(indicators.length, activeIndex, destinationIndex, indicatorRef, baseSlideCount)
      }

      if (draggableSliderRef.current) {
        draggableSliderRef.current.style.transition = 'left .3s ease-out'
        draggableSliderRef.current.ariaLive = 'off'
      }
    }

    setAllowShift(false)
  }

  const handleIndexCheck = () => {
    if (draggableSliderRef.current) {
      draggableSliderRef.current.style.transition = ''
      draggableSliderRef.current.ariaLive = 'on'
    }

    if (activeIndex === -1) {
      let leftAdjustment = (baseSlideCount - slidesShown + (slidesShown - 1)) * slideSize
      setSliderLeft(sliderLeftPos - leftAdjustment)
      setActiveIndex(baseSlideCount - 1)
    }

    if (activeIndex === baseSlideCount) {
      setSliderLeft(sliderLeftPos)
      setActiveIndex(0)
    }

    setAllowShift(true)
  }

  const handleDragStart = (event: any) => {
    if (sliderHasTransition()) return

    event = event || window.event
    event.preventDefault()
    event.stopPropagation()

    setPosInitial(getSliderLeftPos())

    if (event.type == 'touchstart') {
      setPosX1(event.touches[0].clientX)
    } else {
      setPosX1(toSliderXPercentage(event.clientX))
    }

    document.body.style.cursor = 'grabbing'
    setSlideGrabbing(true)
    setDragActive(true)
  }

  const handleDragActionHandler = useCallback(
    (event: any) => {
      if (dragActive) {
        event = event || window.event

        var nextPosition = 0
        if (event.type == 'touchmove') {
          nextPosition = posX1 - toSliderXPercentage(event.touches[0].clientX)
          setPosX1(toSliderXPercentage(event.touches[0].clientX))
        } else {
          nextPosition = posX1 - toSliderXPercentage(event.clientX)
          setPosX1(toSliderXPercentage(event.clientX))
        }

        setSliderLeft(sliderLeft - nextPosition)
      }
    },
    [dragActive, posInitial, getSliderLeftPos]
  )

  const handleDragEndHandler = useCallback(
    (event: any) => {
      if (dragActive) {
        var posFinal = getSliderLeftPos()
        var threshold = 12

        if (posFinal - posInitial < -threshold) {
          shiftSlide(1, 'drag')
        } else if (posFinal - posInitial > threshold) {
          shiftSlide(-1, 'drag')
        } else {
          setSliderLeft(posInitial)
        }

        document.body.style.cursor = 'default'
        setSlideGrabbing(false)
        setDragActive(false)
      }
    },
    [dragActive, posInitial, getSliderLeftPos]
  )

  useEffect(() => {
    document.onmouseup = handleDragEndHandler
    document.onmousemove = handleDragActionHandler
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
  }, [draggableSliderRef, started, activeIndex, dragActive, allowShift])

  useEffect(() => {
    if (draggableSliderRef.current) {
      draggableSliderRef.current.ariaLive = 'on'
    }
  }, [])

  return {
    draggableSliderRef,
    sliderLeft,
    alignment,
    slides,
    sliderWidth,
    indicatorWrapper,
    slideMargin,
    handleDragStart,
    handleDragEndHandler,
    handleDragActionHandler,
    handleIndexCheck,
    shiftSlide
  }
}
