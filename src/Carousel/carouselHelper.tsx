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

import Chip from '../Chip'
import React from 'react'
import clsx from 'clsx'
import styles from './carousel.module.scss'

function getChildrenArr(children: ReactNode, chips?: CarouselChips) {
  const cloneEls: ReactNode[] = []

  if (chips && chips.list && chips.list.length > 0) {
    const { list, onClick: parentOnClick, ...parentRest } = chips
    list.map(({ label, value, onClick, ...rest }) => {
      if (!onClick) {
        onClick = parentOnClick
      }

      if (Object.keys(rest).length <= 0) {
        rest = parentRest
      }

      cloneEls.push(
        <Chip
          key={label}
          label={label}
          variant="default"
          onClick={() => {
            if (onClick) {
              onClick(value)
            }
          }}
          {...rest}
        />
      )
    })
  } else {
    Children.map(children, (child: ReactNode) => {
      cloneEls.push(child)
    })
  }

  return cloneEls
}

function getDynamicMeasurements(current: any, slidePxWidth: number, slideGap: number) {
  let dynamicIndexLimit = -1
  let slidesLength = 0
  let slideWidthArray = []
  const nodeLength = current && current.children && current.children.length
  for (let i = 0; i < nodeLength; i++) {
    let slideLength = current.children[i].getBoundingClientRect().width + slideGap
    slidesLength += slideLength
    slideWidthArray.push(slideLength)
  }

  let remainingSlideLength = slidesLength - slideWidthArray[0] // always remove the first slide
  for (let i = 1; i < slideWidthArray.length; i++) {
    let slideLength = remainingSlideLength - slideWidthArray[i]
    if (dynamicIndexLimit === -1 && slideLength <= slidePxWidth) {
      dynamicIndexLimit = i
      break
    }
    remainingSlideLength = slideLength
  }
  const shiftEnabled = slidePxWidth < slidesLength
  return { dynamicIndexLimit, slideWidthArray, shiftEnabled }
}

function getSliderMeasurements(
  current: any,
  slideGap: number,
  infinite: boolean,
  baseSlideCount: number,
  slidesShown: number,
  dynamic: boolean
) {
  const measurements = {
    slidesPxWidth: current && current.offsetWidth,
    slidesLeft: 0,
    slideMargin: 0,
    slidePxWidth: 0,
    slideFlexBasis: 0,
    slideFlexPxWidth: 0,
    slideShift: 0,
    dynamic: {
      dynamicIndexLimit: 0,
      lengthArray: [0],
      shiftEnabled: false
    }
  }

  let totalSlideCount = baseSlideCount + (infinite ? 2 : 0) * slidesShown
  measurements.slidePxWidth = measurements.slidesPxWidth / totalSlideCount

  if (dynamic) {
    const { dynamicIndexLimit, shiftEnabled, slideWidthArray } = getDynamicMeasurements(
      current,
      measurements.slidePxWidth,
      slideGap
    )
    measurements.dynamic.lengthArray = slideWidthArray
    measurements.dynamic.shiftEnabled = shiftEnabled
    measurements.dynamic.dynamicIndexLimit = dynamicIndexLimit
    measurements.slideMargin = slideGap
  } else if (slideGap === 0) {
    measurements.slideFlexBasis = 100 / totalSlideCount
    measurements.slideShift = 100 / slidesShown
    measurements.slidesLeft = infinite ? -100 / slidesShown + (-100 / slidesShown) * (slidesShown - 1) : 0
  } else {
    let flexBasisPercent = 0.9
    measurements.slideFlexPxWidth = measurements.slidePxWidth * flexBasisPercent
    measurements.slideFlexBasis = 90 / totalSlideCount

    let maxScreenPxWidth = 2560
    let scaleFactor = measurements.slidesPxWidth / maxScreenPxWidth
    let defaultMarginPixel = slideGap * scaleFactor
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
  indicatorStyle: string,
  shiftSlide: Function
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
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            shiftSlide(index, 'indicator')
          }
        }}
      >
        <span className={clsx(styles['sr-only'])} aria-label={slidesLabel} />
      </button>
    )
  })

  return initIndicators
}

function getControlButtons(
  controlsVisibility: boolean,
  controlClass: string,
  alignment: string[],
  shiftSlide: Function,
  direction: string,
  controlStyle: string,
  indicatorVisibility: boolean,
  disableControls: boolean,
  buttonDisabled: boolean
) {
  return (
    <>
      {buttonDisabled ? null : (
        <button
          aria-hidden={disableControls || (controlsVisibility && 'true') || 'false'}
          className={clsx(
            styles['carousel-wrapper-control'],
            styles[direction],
            (disableControls || controlsVisibility) && styles['hidden'],
            disableControls && styles['disable-controls'],
            alignment,
            styles[controlStyle],
            !indicatorVisibility && styles['mt-adjust'],
            controlClass
          )}
          onClick={(event) => {
            if (!disableControls) {
              ;(event.target as HTMLElement).focus()
              shiftSlide(direction === 'next' ? 1 : -1)
            }
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              shiftSlide(direction === 'next' ? 1 : -1)
            }
          }}
        >
          {controlStyle === 'round' && (
            <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
              <circle cx="36" cy="36" r="35" transform="rotate(-180 36 36)" fill="white" stroke="#2D2926" />
              <path
                d="M55.9997 35.5L17.0176 35.5"
                stroke="#2D2926"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M29.0176 47.5L17.0176 35.5L29.0176 23.5"
                stroke="#2D2926"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}

          <p className={clsx(styles['sr-only'])}>
            {direction === 'next' ? 'Move Slider Left Button' : 'Move Slider Right Button'}
          </p>
        </button>
      )}
    </>
  )
}
function getSlides(
  childrenArr: ReactNode[],
  baseSlideCount: number,
  slidesShown: number,
  slideGrabbing: boolean,
  slideGap: number,
  flexBasis: number,
  margin: number,
  infinite: boolean,
  hasChips: boolean,
  hasDynamicWidth: boolean
) {
  const initSlides = childrenArr?.map((child: ReactNode, index: number) => {
    if (isValidElement(child)) {
      let label = `slide ${index + 1} of ${baseSlideCount}`
      return (
        <div
          aria-label={label}
          aria-hidden={slidesShown - 1 < index}
          key={label}
          className={clsx(
            styles['slide'],
            slideGrabbing && styles['grabbing'],
            slideGap === 0 && styles['marginless'],
            hasChips && styles['chip-slide']
          )}
          style={{
            ...child.props.style,
            flexBasis: `${flexBasis}%`,
            margin: hasDynamicWidth ? `0 ${margin}px 0 0` : `0 ${margin}%`
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

function updateSlideAttributes(
  infinite: boolean,
  activeIndex: number,
  destinationIndex: number,
  sliderRef: MutableRefObject<any>,
  baseSlideCount: number,
  slidesShown: number
) {
  const setSlideAttributes = (index: number, boundary: number, hidden: boolean) => {
    let positionAdj = infinite ? slidesShown : 0
    for (let i = index; i < boundary; i++) {
      let pos1 = i + positionAdj
      sliderRef.current.children[pos1].ariaHidden = hidden
    }
  }

  const activeIndexBoundary = activeIndex + 1 + (slidesShown - 1)
  setSlideAttributes(activeIndex, activeIndexBoundary, true)

  if (destinationIndex > baseSlideCount - 1) {
    destinationIndex = 0
  } else if (destinationIndex < 0) {
    destinationIndex = baseSlideCount - 1
  }

  const destinationIndexBoundary = destinationIndex + 1 + (slidesShown - 1)
  setSlideAttributes(destinationIndex, destinationIndexBoundary, false)
}

export interface Chips {
  label: string
  value: string
  onClick?: (value: any) => void
  [rest: string]: any // ...rest property
}

export interface CarouselChips {
  list: Chips[]
  onClick?: (value: any) => void
  [parentRest: string]: any // ...rest property
}

export interface CarouselSettings {
  autoSlide: boolean
  capturePropagation: string
  children: ReactNode
  chips: CarouselChips | undefined
  controlAlignment: string
  controlClass: string
  controlStyle: string
  disableControls: boolean
  duration: number
  hideControls: boolean
  hideIndicators: boolean
  hideDisabledButtons: boolean
  indicatorStyle: string
  itemsToShow: number
  infinite: boolean
  layoutGap: number
  responsive: {
    breakpoint: number
    itemsToShow: number
    controlAlignment: string
    hideControls: boolean
    hideIndicators: boolean
    indicatorStyle: string
    layoutGap: number
  }[]
  variableWidth: boolean
}

export default function carouselHelper(settings: CarouselSettings) {
  const {
    autoSlide,
    capturePropagation,
    children,
    chips,
    controlAlignment,
    controlStyle,
    controlClass,
    disableControls,
    duration,
    hideControls,
    hideIndicators,
    indicatorStyle,
    layoutGap,
    responsive,
    variableWidth
  } = settings

  let { itemsToShow, infinite, hideDisabledButtons } = settings

  // Configure dynamic override(s)
  const hasChips = typeof chips !== 'undefined' && chips.list && chips.list.length > 0
  const [hasDynamicWidth] = useState(variableWidth || hasChips)
  if (hasDynamicWidth) {
    itemsToShow = 1
    infinite = false
  }
  const [dynamicShiftEnabled, setDynamicShiftEnabled] = useState(false)
  const [dynamicWidthArray, setDynamicWidthArray] = useState<number[]>([])
  const [slideStageWidth, setSlideStageWidth] = useState(0)
  const [dynamicIndexLimit, setDynamicIndexLimit] = useState(-1)

  // Configure buttons
  const [alignment, setAlignment] = useState([
    styles[(controlAlignment + '').split(' ')[0]],
    styles[(controlAlignment + '').split(' ')[1]]
  ])
  const [indicatorVisibility, setIndicatorVisibility] = useState(hasDynamicWidth || hideIndicators)
  const [indicatorStyling, setIndicatorStyling] = useState(indicatorStyle)
  const [controlsVisibility, setControlVisibility] = useState(hideControls)

  // Configure autoslide / infinite
  if (autoSlide) infinite = true

  // Configure slide boundary vars
  const [childrenArr, setChildrenArray] = useState<ReactNode[]>(getChildrenArr(children, chips))
  const [baseSlideCount] = useState(childrenArr.length)
  const [slidesShown, setSlidesShown] = useState(itemsToShow <= baseSlideCount ? itemsToShow : baseSlideCount)
  const [initLeftPos, setInitLeftState] = useState(0)

  // Configure base slides
  const slidesRef = useRef<any>(null)
  const [slidesWidth, setSlidesWidth] = useState<number>(
    (baseSlideCount * 100) / slidesShown + (infinite ? 100 * 2 : 0)
  )
  const [slidesTransition, setSlidesTransition] = useState<string>('')
  const [slidesLeft, setSlidesLeft] = useState(0)
  const [slidesPxWidth, setSlidesPxWidth] = useState(0)
  const [slideGap, setSlideGap] = useState(layoutGap)
  const [slideMargin, setSlideMargin] = useState<number>(layoutGap)
  const [slideFlexBasis, setSlideFlexBasis] = useState<number>(100)
  const [slideGrabbing, setSlideGrabbing] = useState(false)
  const [slideShift, setSlideShift] = useState<number>(0)
  const [ariaLive, setAriaLive] = useState<'off' | 'assertive' | 'polite' | undefined>('off')

  // Configure responsive settings
  const [windowWidth, setWindowWidth] = useState(0)
  const [responsiveSettings] = useState(responsive)

  const slides = useMemo(
    () =>
      getSlides(
        childrenArr,
        baseSlideCount,
        slidesShown,
        slideGrabbing,
        slideGap,
        slideFlexBasis,
        slideMargin,
        infinite,
        hasChips,
        hasDynamicWidth
      ),
    [
      childrenArr,
      chips,
      hasDynamicWidth,
      baseSlideCount,
      slidesShown,
      slideGrabbing,
      slideFlexBasis,
      slideMargin,
      slidesRef.current
    ]
  )

  // Configure slider drag/touch handling
  const [handleCapturing, setHandleCapturing] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [dragAttempt, setDragAttempt] = useState(0)
  const [posInitial, setPosInitial] = useState(0)
  const [posX1, setPosX1] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const [allowShift, setAllowShift] = useState(true)
  const [rightDisabled, setRightDisabled] = useState(false)
  const [leftDisabled, setLeftDisabled] = useState(false)

  const toSlidesPercentage = (pixelVal: number) => {
    let _width

    if (slideGap === 0) {
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

  const calculateEvenShift = (shiftingRight: boolean, shift: number, numberOfShifts: number) => {
    const extraSlideShift = shift * numberOfShifts * (shiftingRight ? -1 : 1)
    return { extraSlideShift, shift: shift * (shiftingRight ? -1 : 1) }
  }

  const calculateDynamicShift = useCallback(
    (shiftingRight: boolean, numberOfShifts: number) => {
      const dynamicIndex = shiftingRight ? activeIndex : activeIndex - 1
      let dynamicShift = getDynamicSlidePercentage(dynamicWidthArray[dynamicIndex]) * (shiftingRight ? -1 : 1)

      if (dynamicIndex + 1 === dynamicWidthArray.length - 1) {
        const adjustedShift = ((slideStageWidth - (dynamicWidthArray[dynamicIndex] - slideGap)) / slideStageWidth) * 100

        if (shiftingRight) {
          dynamicShift = dynamicShift + adjustedShift
        } else {
          dynamicShift = dynamicShift - adjustedShift
        }
      }

      let extraShiftPercent = 0
      for (let n = 0; n < numberOfShifts; n++) {
        if (shiftingRight) {
          extraShiftPercent += getDynamicSlidePercentage(dynamicWidthArray[activeIndex + n + 1])
        } else {
          extraShiftPercent += getDynamicSlidePercentage(dynamicWidthArray[activeIndex - n - 2])
        }
      }
      if (extraShiftPercent !== 0 && shiftingRight) extraShiftPercent *= -1
      return { dynamicShift, extraShiftPercent }
    },
    [activeIndex, dynamicWidthArray]
  )

  const getSlideShiftDimensions = useCallback(
    (direction: number, numberOfShifts: number) => {
      const shiftingRight = direction === 1 // right (1), left (-1)
      const indexShift = direction + activeIndex + (shiftingRight ? numberOfShifts : -numberOfShifts)

      if (hasDynamicWidth) {
        const { dynamicShift, extraShiftPercent } = calculateDynamicShift(shiftingRight, numberOfShifts)
        return { extraShiftPercent, indexShift, shiftPercent: dynamicShift }
      } else {
        const { extraSlideShift, shift } = calculateEvenShift(shiftingRight, slideShift, numberOfShifts)
        return { extraShiftPercent: extraSlideShift, indexShift, shiftPercent: shift }
      }
    },
    [hasDynamicWidth, calculateDynamicShift]
  )

  const shiftSlide = (dir: number, action?: string, extraShift: number = 0) => {
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
          if (hasDynamicWidth && !dynamicShiftEnabled) return

          // dir is the direction: left (-1) or right (1)
          const initPosition = action ? posInitial : slidesLeft
          if (!action) {
            setPosInitial(initPosition)
          }

          const { extraShiftPercent, indexShift, shiftPercent } = getSlideShiftDimensions(destinationIndex, extraShift)
          setSlidesLeft(initPosition + shiftPercent + extraShiftPercent)
          destinationIndex = indexShift

          // Handle destination index overshot
          if (destinationIndex < -1) {
            destinationIndex = indicatorsLength + destinationIndex
          } else if (destinationIndex > indicatorsLength) {
            destinationIndex = destinationIndex - indicatorsLength
          }
          setActiveIndex(destinationIndex)
          break
      }

      if (action != 'initialize')
        updateSlideAttributes(infinite, activeIndex, destinationIndex, slidesRef, baseSlideCount, slidesShown)

      if (!indicatorVisibility && indicatorRef.current && indicatorRef.current.children && action != 'initialize') {
        updateIndicatorDots(indicators.length, activeIndex, destinationIndex, indicatorRef, baseSlideCount)
      }

      setAriaLive('off')
      setSlidesTransition('left .3s ease-out')
    }
    setAllowShift(false)
  }

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
    // Check if we are currently transitioning
    if (slidesTransition) {
      handleIndexCheck()

      if (dragAttempt < 1) {
        setDragAttempt(1)
        return
      }

      setDragAttempt(0)
    }

    event = event || window.event
    if (event.type !== 'touchstart') {
      event.preventDefault()
      ;(document.activeElement as HTMLElement).blur()
    }
    event.stopPropagation()

    setPosInitial(slidesLeft)

    if (event.type == 'touchstart') {
      setPosX1(toSlidesPercentage(event.touches[0]?.clientX))
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
          nextPosition = posX1 - toSlidesPercentage(event.touches[0]?.clientX)
          setPosX1(toSlidesPercentage(event.touches[0]?.clientX))
        } else {
          nextPosition = posX1 - toSlidesPercentage(event.clientX)
          setPosX1(toSlidesPercentage(event.clientX))
        }

        if (infinite && slidesLeft > 0) {
          setSlidesLeft(-slideShift * baseSlideCount)
        } else if (infinite && slidesLeft < -(slideShift * baseSlideCount) - 100) {
          setSlidesLeft(-100)
        } else {
          setSlidesLeft(slidesLeft - nextPosition)
        }

        if (capturePropagation === 'allow') {
          setHandleCapturing(true)
        }
      }
    },
    [dragActive, posInitial, slidesLeft]
  )

  // Event Handler: mouseup
  const handleDragEndHandler = useCallback(
    (event: any) => {
      if (dragActive) {
        let { diff, extraSlides, threshold } = getBoundaryProps()

        if (diff < -threshold) {
          if (!infinite) extraSlides = boundaryCheck(1, extraSlides)
          shiftSlide(1, 'drag', extraSlides)
        } else if (diff > threshold) {
          if (!infinite) extraSlides = boundaryCheck(-1, extraSlides)
          shiftSlide(-1, 'drag', extraSlides)
        } else {
          setSlidesLeft(posInitial)
        }

        document.body.style.cursor = 'default'
        setSlideGrabbing(false)
        setDragActive(false)
      }
    },
    [dragActive, posInitial, slidesLeft, activeIndex, hasDynamicWidth]
  )

  const handleClickViaCapturing = useCallback(
    (event: any) => {
      if (handleCapturing) {
        event.stopPropagation()
        setHandleCapturing(false)
      }
    },
    [handleCapturing]
  )

  const getDynamicSlidePercentage = (width: number) => {
    return (width / slideStageWidth) * 100
  }

  const getDynamicBoundaryProps = (diff: number) => {
    const currentLengthPercent = getDynamicSlidePercentage(dynamicWidthArray[activeIndex])
    const currentThreshold = currentLengthPercent / 2

    let direction = 'right'
    if (diff > currentThreshold) direction = 'left'

    let absDiff = Math.abs(diff)
    let dynamicIndex = activeIndex
    let dynamicThreshold = currentThreshold
    let dynamicPercent = currentLengthPercent
    let extraSlides = 0
    for (let i = dynamicPercent; i < absDiff; i = i + dynamicPercent) {
      if (i - dynamicThreshold <= absDiff && absDiff <= i + dynamicThreshold) {
        break // threshold is exceeding, quit adding extra slides
      }

      if (direction === 'right' && activeIndex + 1 + extraSlides > dynamicIndexLimit) {
        break // boundary is exceeding, quit adding extra slides
      }
      dynamicIndex = dynamicIndex + (direction === 'right' ? 1 : -1)
      extraSlides++
      dynamicPercent = getDynamicSlidePercentage(dynamicWidthArray[dynamicIndex])
      dynamicThreshold = dynamicPercent / 2
    }

    return {
      additionalSlides: extraSlides,
      currentThreshold,
      direction,
      limitExceeded: false
    }
  }

  const getEvenBoundaryProps = (diff: number, shift: number, threshold: number) => {
    let extraSlides = 0
    let absDiff = Math.abs(diff)
    for (let i = 0; i < absDiff; i = i + shift) {
      if (i - threshold <= absDiff && absDiff <= i + threshold) {
        break
      }

      extraSlides++
    }

    return extraSlides - 1
  }

  const getBoundaryProps = () => {
    var posFinal = slidesLeft
    let diff = posFinal - posInitial

    let threshold = 0
    let extraSlides = 0

    if (hasDynamicWidth) {
      if (!dynamicShiftEnabled) diff = 0
      else {
        const { additionalSlides, currentThreshold, direction } = getDynamicBoundaryProps(diff)
        if (direction === 'right' && activeIndex === dynamicIndexLimit + 1) {
          diff = 0
        }
        extraSlides = additionalSlides
        threshold = currentThreshold
      }
    } else {
      threshold = slideShift / 2
      extraSlides = getEvenBoundaryProps(diff, slideShift, threshold)
    }

    return { diff, extraSlides, threshold }
  }

  const boundaryCheck = (dir: number, extraSlides: number) => {
    let destinationIndex = dir + activeIndex + dir * extraSlides

    if (destinationIndex <= -1) {
      var limit = dir + activeIndex
      return limit > 0 ? limit : 0
    }

    if (destinationIndex >= indicatorsLength) {
      var limit = indicatorsLength - 1 - activeIndex - 1
      return limit > 0 ? limit : 0
    }

    return extraSlides
  }

  // Configure slider indicators
  const indicatorsLength = useMemo(() => getNumberOfIndicators(baseSlideCount, slidesShown, infinite), [
    baseSlideCount,
    slidesShown,
    infinite
  ])
  const indicatorRef = useRef<any>(null)
  const indicators = useMemo(
    () => getIndicators(indicatorsLength, baseSlideCount, slidesShown, childrenArr, indicatorStyling, shiftSlide),
    [activeIndex, slidesTransition, slidesLeft, slideShift]
  )

  useEffect(() => {
    if (!infinite && hideDisabledButtons) {
      setLeftDisabled(!infinite && activeIndex === 0)
      setRightDisabled(!infinite && activeIndex >= baseSlideCount - 1 - (slidesShown > 1 ? slidesShown - 1 : 0))
    }
  }, [activeIndex])

  const controlButtons: ReactNode[] = []
  controlButtons.push(
    getControlButtons(
      controlsVisibility,
      controlClass,
      alignment,
      shiftSlide,
      'prev',
      controlStyle,
      indicatorVisibility,
      disableControls,
      leftDisabled
    )
  )
  controlButtons.push(
    getControlButtons(
      controlsVisibility,
      controlClass,
      alignment,
      shiftSlide,
      'next',
      controlStyle,
      indicatorVisibility,
      disableControls,
      rightDisabled
    )
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

  // useWindowResizeMeasurements
  useEffect(() => {
    function handleResize() {
      const { current } = slidesRef
      const { ...measurements } = getSliderMeasurements(
        current,
        slideGap,
        infinite,
        baseSlideCount,
        slidesShown,
        hasDynamicWidth
      )
      setInitLeftState(measurements.slidesLeft)
      setSlidesLeft(measurements.slidesLeft)
      setSlidesPxWidth(measurements.slidesPxWidth)
      setSlideShift(measurements.slideShift)
      setSlideMargin(measurements.slideMargin)
      setSlideFlexBasis(measurements.slideFlexBasis)
      setSlideStageWidth(measurements.slidePxWidth)
      setDynamicShiftEnabled(measurements.dynamic.shiftEnabled)
      setDynamicWidthArray(measurements.dynamic.lengthArray)
      setDynamicIndexLimit(measurements.dynamic.dynamicIndexLimit)
      if (hasDynamicWidth) {
        setActiveIndex(0)
      }

      setWindowWidth(window.innerWidth)

      if (responsiveSettings.length) {
        let possibleSettings = responsiveSettings.filter((settings) => window.innerWidth <= settings.breakpoint)
        let newSettings = null
        if (possibleSettings.length) {
          newSettings = possibleSettings.reduce((min, settings) =>
            min.breakpoint < settings.breakpoint ? min : settings
          )
        }

        if (newSettings) {
          if ('itemsToShow' in newSettings) {
            let newItemsToShow = baseSlideCount ? newSettings.itemsToShow : baseSlideCount

            setSlidesShown(newItemsToShow)
            setSlidesWidth((baseSlideCount * 100) / newItemsToShow + (infinite ? 100 * 2 : 0))
          }
          if ('controlAlignment' in newSettings) {
            setAlignment([
              styles[(newSettings.controlAlignment + '').split(' ')[0]],
              styles[(newSettings.controlAlignment + '').split(' ')[1]]
            ])
          }
          if ('hideControls' in newSettings) {
            setControlVisibility(newSettings.hideControls)
          }
          if ('hideIndicators' in newSettings) {
            setIndicatorVisibility(hasDynamicWidth || newSettings.hideIndicators)
          }
          if ('indicatorStyle' in newSettings) {
            setIndicatorStyling(newSettings.indicatorStyle)
          }
          if ('layoutGap' in newSettings) {
            setSlideGap(newSettings.layoutGap)
          }
        } else {
          setSlidesShown(itemsToShow)
          setSlidesWidth((baseSlideCount * 100) / itemsToShow + (infinite ? 100 * 2 : 0))
          setAlignment([styles[(controlAlignment + '').split(' ')[0]], styles[(controlAlignment + '').split(' ')[1]]])
          setControlVisibility(hideControls)
          setIndicatorVisibility(hasDynamicWidth || hideIndicators)
          setIndicatorStyling(indicatorStyle)
          setSlideGap(layoutGap)
        }
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [windowWidth])

  useEffect(() => {
    setChildrenArray(getChildrenArr(children, chips))
  }, [children, chips])

  useEffect(() => {
    const { current } = slidesRef

    const { ...measurements } = getSliderMeasurements(
      current,
      slideGap,
      infinite,
      baseSlideCount,
      slidesShown,
      hasDynamicWidth
    )

    setInitLeftState(measurements.slidesLeft)
    setSlidesLeft(measurements.slidesLeft)
    setSlidesPxWidth(measurements.slidesPxWidth)
    setSlideShift(measurements.slideShift)
    setSlideMargin(measurements.slideMargin)
    setSlideFlexBasis(measurements.slideFlexBasis)

    setAriaLive('polite')
  }, [windowWidth])

  return {
    slidesRef,
    slidesLeft,
    slides,
    slidesWidth,
    indicators,
    controlButtons,
    indicatorVisibility,
    indicatorRef,
    slidesTransition,
    ariaLive,
    handleDragStart,
    handleDragEndHandler,
    handleDragActionHandler,
    handleIndexCheck,
    handleClickViaCapturing
  }
}
