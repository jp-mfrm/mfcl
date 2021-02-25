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

function getChildrenArr(children: ReactNode, chips?: Chips[]) {
  const cloneEls: ReactNode[] = []

  if (chips && chips.length > 0) {
    chips.map(({ label, url }) => {
      cloneEls.push(
        <Chip
          key={label}
          label={label}
          variant="default"
          // onClick={() => handleChipClick(url)}
          onClick={() => {
            console.log(url)
          }}
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

function getSliderMeasurements(
  current: any,
  slideGap: number,
  infinite: boolean,
  baseSlideCount: number,
  slidesShown: number,
  chips: Chips[]
) {
  const measurements = {
    slidesPxWidth: current.offsetWidth,
    slidesLeft: 0,
    slideMargin: 0,
    slidePxWidth: 0,
    slideFlexBasis: 0,
    slideFlexPxWidth: 0,
    slideShift: 0,
    allowChipShift: false,
    chipsShiftArray: [0],
    chipsPxLength: 0
  }

  let totalSlideCount = baseSlideCount + (infinite ? 2 : 0) * slidesShown
  measurements.slidePxWidth = measurements.slidesPxWidth / totalSlideCount

  console.log('slide stage width:', measurements.slidePxWidth)
  // console.log('slides shown:', slidesShown)
  if (chips?.length > 0) {
    measurements.slidesLeft = infinite ? -100 / slidesShown + (-100 / slidesShown) * (slidesShown - 1) : 0
    measurements.slideFlexBasis = 0
    measurements.slidesLeft = infinite ? -100 / slidesShown + (-100 / slidesShown) * (slidesShown - 1) : 0
    let chipsLength = 0
    let positionAdj = infinite ? slidesShown : 0
    let chipsLengthArray = []
    for (let i = positionAdj; i < current.children.length; i++) {
      let chipLength = current.children[i].getBoundingClientRect().width
      chipsLength += chipLength
      chipsLengthArray.push(chipLength)
    }
    // TODO: Add margin space between <?> (A)
    console.log('chips length:', chipsLength)
    // console.log('allow chip shift:', measurements.slidePxWidth < chipsLength)
    measurements.allowChipShift = measurements.slidePxWidth < chipsLength
    measurements.chipsPxLength = chipsLength
    measurements.slideShift = 100 / slidesShown // Shifting slides now varies on each slides width (differing widths)
    measurements.chipsShiftArray = chipsLengthArray; // NOTE: This may replace the above slideShift variable 
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
  indicatorVisibility: boolean
) {
  return (
    <>
      <button
        aria-hidden={(controlsVisibility && 'true') || 'false'}
        className={clsx(
          styles['carousel-wrapper-control'],
          styles[direction],
          controlsVisibility && styles['hidden'],
          alignment,
          styles[controlStyle],
          !indicatorVisibility && styles['mt-adjust'],
          controlClass
        )}
        onClick={(event) => {
          ;(event.target as HTMLElement).focus()
          shiftSlide(direction === 'next' ? 1 : -1)
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
  chips: Chips[]
) {
  const initSlides = childrenArr?.map((child: ReactNode, index: number) => {
    // TODO: Add Chips variation here, will need to change the margin to px <?> (A)
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
            chips?.length > 0 && styles['chip-slide']
          )}
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
  url: string
  [rest: string]: unknown // ...rest property
}

export default function carouselHelper(
  children: ReactNode,
  itemsToShow: number,
  controlAlignment: string,
  hideControls: boolean,
  controlStyle: string,
  controlClass: string,
  hideIndicators: boolean,
  indicatorStyle: string,
  duration: number,
  infinite: boolean,
  autoSlide: boolean,
  layoutGap: number,
  responsive: {
    breakpoint: number
    itemsToShow: number
    controlAlignment: string
    hideControls: boolean
    hideIndicators: boolean
    indicatorStyle: string
    layoutGap: number
  }[],
  chips: Chips[]
) {
  // Configure buttons
  const [alignment, setAlignment] = useState([
    styles[(controlAlignment + '').split(' ')[0]],
    styles[(controlAlignment + '').split(' ')[1]]
  ])
  const [indicatorVisibility, setIndicatorVisibility] = useState(hideIndicators)
  const [indicatorStyling, setIndicatorStyling] = useState(indicatorStyle)
  const [controlsVisibility, setControlVisibility] = useState(hideControls)

  // Configure autoslide / infinite
  if (autoSlide) infinite = true

  // Configure chip override(s)
  if (chips?.length > 0) {
    itemsToShow = 1
    infinite = false
  }
  const [allowChipShift, setAllowChipShift] = useState(false)
  const [chipsShiftArray, setChipsShiftArray] = useState<number[]>([])
  const [slideStageWidth, setSlideStageWidth] = useState(0) // TODO: Remove if not needed 
  const [chipsPxLength, setChipPxLength] = useState(0)

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
        chips
      ),
    [childrenArr, baseSlideCount, slidesShown, slideGrabbing, slideFlexBasis, slideMargin, slidesRef.current]
  )

  // Configure slider drag/touch handling
  const [handleCapturing, setHandleCapturing] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [dragAttempt, setDragAttempt] = useState(0)
  const [posInitial, setPosInitial] = useState(0)
  const [posX1, setPosX1] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const [allowShift, setAllowShift] = useState(true)

  // TODO: For chips list, might need to disregard the slides percentage conversion
  // - May need to update the variable name
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

  const calculateChipShift = (direction: string, numberOfShifts: number) => {
    // TODO: Walk through chipsShiftArray to aggregate the _extraSlideShift percentage 
    let theShift = 0

    let gapPercent = (numberOfShifts + 1) * ((layoutGap / chipsPxLength) * 100)
    console.log('chipsPxLength', chipsPxLength)
    console.log('gapPercent', gapPercent)
    if (direction === "left") {
      for (let n = 0; n < numberOfShifts; n++) {
        let s = activeIndex - n - 1
        if (s <= 0) {
          // Check if infinite 
          return theShift;
        }
        theShift += (chipsShiftArray[s] / chipsPxLength) * 100 + gapPercent
      }
    } else {
      for (let n = 0; n < numberOfShifts; n++) {
        if (n >= chipsShiftArray.length) {
          // Check if infinite 
          return theShift;
        }
        theShift += (chipsShiftArray[n] / chipsPxLength) * 100 + gapPercent // + ((gapPercent / chipsPxLength) * 100)
      }
    }

    return theShift;
  }

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

    // TODO: Add chips variation here <?> (B)
    // - shiftSlide might be an array type with chip lengths and indices match with chip order starting at 0
    // - shiftSlide array to use destinationIndex and activeIndex variation
    // - challenge: initPosition might only understand percentages
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

          if (chips && chips.length > 0) {
            if (allowChipShift) {
              let _extraSlideShift = 0
              let _slideShift = (chipsShiftArray[activeIndex] / chipsPxLength) * 100

              if (destinationIndex == 1) {
                _extraSlideShift = calculateChipShift("right", extraShift) 
                setSlidesLeft(initPosition - _slideShift - _extraSlideShift)
                destinationIndex = destinationIndex + activeIndex + extraShift
              } else {
                let indexAdj = 1 
                if (activeIndex === 0) indexAdj = 0
                _slideShift = (chipsShiftArray[activeIndex - indexAdj] / chipsPxLength) * 100
                _extraSlideShift = calculateChipShift("left", extraShift) 
                // destinationIndex == -1
                setSlidesLeft(initPosition + _slideShift + _extraSlideShift)
                destinationIndex = destinationIndex + activeIndex - extraShift
              }
            } else {
              // TODO: Would we ever hit this? 
              return;
            }
          } else {
            let extraSlideShift = slideShift * extraShift
            if (destinationIndex == 1) {
              setSlidesLeft(initPosition - slideShift - extraSlideShift)
              destinationIndex = destinationIndex + activeIndex + extraShift
            } else {
              // destinationIndex == -1
              setSlidesLeft(initPosition + slideShift + extraSlideShift)
              destinationIndex = destinationIndex + activeIndex - extraShift
            }
          }

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
          // TODO: Determine if chips variation will work with this out of box
          setSlidesLeft(slidesLeft - nextPosition)
        }

        setHandleCapturing(true)
      }
    },
    [dragActive, posInitial, slidesLeft]
  )

  // Event Handler: mouseup
  const handleDragEndHandler = useCallback(
    (event: any) => {
      if (dragActive) {

        var posFinal = slidesLeft
        let diff = posFinal - posInitial // TODO: Need to check if this is percentages or px?
       
        // TODO: Check allowChipShift here <?> (D)
        // TODO: Every chip would have different neighboring thresholds
        // - For chip, will have to break into left/right threshold
        // - For now, infinite seems to big of an ordeal
        // Check if sliding chips is enabled 

        // TODO: I need to account for the margin space in between when performing the extraShifts 
        // TODO: Behavior is still buggy, boundary checks might not be aligning with chips logic 
        let threshold = 0
        let extraSlides = 0
        if (chips && chips.length > 0) {
          if (allowChipShift) {
            console.log('activeIndex', activeIndex)
            console.log('current chip px length:', chipsShiftArray[activeIndex])
            //TODO:let gapPercent = ((layoutGap / chipsPxLength) * 100)
            const chipLengthPercent = chipsShiftArray[activeIndex] / chipsPxLength
            threshold = (chipLengthPercent / 2) * 100
            extraSlides = calculateExtraChipSlides(diff, threshold, activeIndex, chipsShiftArray, chipsPxLength)
            console.log('extra slides:', extraSlides)
          } else {
            diff = 0
          }
        } else {
          threshold = slideShift / 2
          extraSlides = calculateExtraSlides(diff, slideShift, threshold)
        }
        
        
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
    [dragActive, posInitial, slidesLeft, activeIndex]
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

  const calculateExtraChipSlides = (diff: number, threshold: number, activeChip: number, chipLengthArray: number[], stageWidth: number) => {
    // TODO: Might need to account for margin gaps 
    // - It looks like the chip lengths that are used, already includes the margin (offset width does that)
    let extraSlides = 0
    let chipIndex = activeChip;
    let absDiff = Math.abs(diff)
    for (let i = 0; i < absDiff; i = i + ((chipLengthArray[chipIndex] / stageWidth) * 100 )) {
      let chipLength = chipLengthArray[chipIndex]
      let chipLengthPercent =  chipLength / stageWidth
      threshold = (chipLengthPercent / 2) * 100 
      if (i - threshold <= absDiff && absDiff <= i + threshold) {
        break
      }

      chipIndex = chipIndex + 1 >= (chipLengthArray.length) ? 0 : chipIndex + 1  
      extraSlides++
    }

    return extraSlides - 1
  }

  const calculateExtraSlides = (diff: number, shift: number, threshold: number) => {
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

  const controlButtons: ReactNode[] = []
  controlButtons.push(
    getControlButtons(
      controlsVisibility,
      controlClass,
      alignment,
      shiftSlide,
      'prev',
      controlStyle,
      indicatorVisibility
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
      indicatorVisibility
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

  useEffect(() => {
    function handleResize() {
      // Reset measurements <?>
      const { current } = slidesRef
      const { ...measurements } = getSliderMeasurements(current, slideGap, infinite, baseSlideCount, slidesShown, chips)
      setInitLeftState(measurements.slidesLeft)
      setSlidesLeft(measurements.slidesLeft)
      setSlidesPxWidth(measurements.slidesPxWidth)
      console.log(measurements.slidesPxWidth)
      setSlideShift(measurements.slideShift)
      setSlideMargin(measurements.slideMargin)
      setSlideFlexBasis(measurements.slideFlexBasis)
      setAllowChipShift(measurements.allowChipShift)
      setChipsShiftArray(measurements.chipsShiftArray)
      setSlideStageWidth(measurements.slidePxWidth)
      setChipPxLength(measurements.chipsPxLength)
      // setChipPxLength(measurements.slidePxWidth)
      setChipPxLength(measurements.slidePxWidth)

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
            setIndicatorVisibility(newSettings.hideIndicators)
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
          setIndicatorVisibility(hideIndicators)
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
  }, [children])

  useEffect(() => {
    const { current } = slidesRef

    const { ...measurements } = getSliderMeasurements(current, slideGap, infinite, baseSlideCount, slidesShown, chips)

    setInitLeftState(measurements.slidesLeft)
    setSlidesLeft(measurements.slidesLeft)
    setSlidesPxWidth(measurements.slidesPxWidth)
    setSlideShift(measurements.slideShift)
    setSlideMargin(measurements.slideMargin)
    setSlideFlexBasis(measurements.slideFlexBasis)
    setAllowChipShift(measurements.allowChipShift)
    setChipsShiftArray(measurements.chipsShiftArray)
    setSlideStageWidth(measurements.slidePxWidth)
    // setChipPxLength(measurements.chipsPxLength)
    setChipPxLength(measurements.slidePxWidth)

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
