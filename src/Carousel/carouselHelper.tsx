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
  slideGap: number,
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

  if (slideGap === 0) {
    measurements.slideFlexBasis = 100 / totalSlideCount
    measurements.slideShift = 100 / slidesShown
    measurements.slidesLeft = infinite ? -100 / slidesShown + (-100 / slidesShown) * (slidesShown - 1) : 0
  } else {
    let flexBasisPercent = 0.9
    measurements.slideFlexPxWidth = measurements.slidePxWidth * flexBasisPercent
    measurements.slideFlexBasis = 90 / totalSlideCount

    var scaleFactor = measurements.slidesPxWidth/2344
    let defaultMarginPixel = slideGap * scaleFactor;
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
        onKeyDown={(event) => {if(event.key === "Enter") {shiftSlide(index, 'indicator');}}}
      >
        <span className={clsx(styles['sr-only'])} aria-label={slidesLabel} />
      </button>
    )
  })

  return initIndicators
}

function getControlButtons(
  controlsVisibility: boolean, 
  alignment: string[], 
  shiftSlide: Function
) {
  return (
  <>
    <button
      aria-hidden={(controlsVisibility && 'true') || 'false'}
      className={clsx(
        styles['carousel-wrapper-control'],
        styles['prev'],
        controlsVisibility && styles['hidden'],
        alignment
      )}
      onClick={() => shiftSlide(-1)}
      onKeyDown={(event) => {if(event.key === "Enter") {shiftSlide(-1);}}}
    >
      <p className={clsx(styles['sr-only'])}>Move Slider Left Button.</p>
    </button>
    <button
      aria-hidden={(controlsVisibility && 'true') || 'false'}
      className={clsx(
        styles['carousel-wrapper-control'],
        styles['next'],
        controlsVisibility && styles['hidden'],
        alignment
      )}
      onClick={() => shiftSlide(1)}
      onKeyDown={(event) => {if(event.key === "Enter") {shiftSlide(1);}}}
    >
      <p className={clsx(styles['sr-only'])}>Move Slider Right Button.</p>
    </button>
  </>
  );
}

function getSlides(
  childrenArr: ReactNode[],
  baseSlideCount: number,
  slidesShown: number,
  slideGrabbing: boolean,
  slideGap: number,
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
          tabIndex={-1}
          className={clsx(
            styles['slide'],
            slideGrabbing && styles['grabbing'],
            slideGap === 0 && styles['marginless']
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
      sliderRef.current.children[pos1].attributes["tabindex"].value = hidden ? -1 : 0 
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

export default function carouselHelper(
  children: ReactNode,
  itemsToShow: number,
  controlAlignment: string,
  hideControls: boolean,
  hideIndicators: boolean,
  indicatorStyle: string,
  duration: number,
  infinite: boolean,
  autoSlide: boolean,
  layoutGap: number,
  responsive: {
    breakpoint: number, 
    itemsToShow: number, 
    controlAlignment: string, 
    hideControls: boolean,
    hideIndicators: boolean,
    indicatorStyle: string,
    layoutGap: number
  }[]
) {

  // Configure buttons
  const [alignment, setAlignment] = useState([styles[(controlAlignment + '').split(' ')[0]], styles[(controlAlignment + '').split(' ')[1]]])
  const [indicatorVisibility, setIndicatorVisibility] = useState(hideIndicators); 
  const [indicatorStyling, setIndicatorStyling] = useState(indicatorStyle);
  const [controlsVisibility, setControlVisibility] = useState(hideControls);

  // Configure autoslide / infinite
  if (autoSlide) infinite = true

  // Configure slide boundary vars
  const [childrenArr] = useState<ReactNode[]>(getChildrenArr(children))
  const [baseSlideCount] = useState(childrenArr.length)
  const [slidesShown, setSlidesShown] = useState(itemsToShow <= baseSlideCount ? itemsToShow : baseSlideCount)
  const [initLeftPos, setInitLeftState] = useState(0)

  // Configure base slides
  const slidesRef = useRef<any>(null)
  const [slidesWidth, setSlidesWidth] = useState<number>((baseSlideCount * 100) / slidesShown + (infinite ? 100 * 2 : 0))
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
  const [windowWidth, setWindowWidth] = useState(0);
  const [responsiveSettings] = useState(responsive);

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
        infinite
      ),
    [childrenArr, baseSlideCount, slidesShown, slideGrabbing, slideFlexBasis, slideMargin, slidesRef.current]
  )

  // Configure slider drag/touch handling
  const [dragActive, setDragActive] = useState(false)
  const [dragAttempt, setDragAttempt] = useState(0)
  const [posInitial, setPosInitial] = useState(0)
  const [posX1, setPosX1] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const [allowShift, setAllowShift] = useState(true)

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
          // dir is the direction: left (-1) or right (1)
          const initPosition = action ? posInitial : slidesLeft
          if (!action) {
            setPosInitial(initPosition)
          }

          let extraSlideShift = slideShift * extraShift
          if (destinationIndex == 1) {
            setSlidesLeft(initPosition - slideShift - extraSlideShift)
            destinationIndex = destinationIndex + activeIndex + extraShift
          } else {
            // destinationIndex == -1
            setSlidesLeft(initPosition + slideShift + extraSlideShift)
            destinationIndex = destinationIndex + activeIndex - extraShift
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
    if (event.type !== 'touchstart') event.preventDefault()
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
      }
    },
    [dragActive, posInitial, slidesLeft]
  )

  // Event Handler: mouseup
  const handleDragEndHandler = useCallback(
    (event: any) => {
      if (dragActive) {
        var posFinal = slidesLeft
        var threshold = slideShift / 2

        let diff = posFinal - posInitial
        let extraSlides = calculateExtraSlides(diff, slideShift, threshold)

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
    [dragActive, posInitial, slidesLeft]
  )

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

  const controlButtons =  getControlButtons(controlsVisibility, alignment, shiftSlide)
  
  const initializeTabIndices = (infinite: boolean, slidesShown: number, index: number) => {
    let positionAdj = infinite ? slidesShown : 0
    for (let i = index; i < index + 1 + (slidesShown - 1); i++) {
      let pos1 = i + positionAdj
      if(slidesRef.current.children[pos1]) {
        slidesRef.current.children[pos1].attributes['tabindex'].value = 0
      }
    }
  }

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
      setWindowWidth(window.innerWidth);

      if(responsiveSettings.length) {
        let possibleSettings = responsiveSettings.filter(settings => window.innerWidth <= settings.breakpoint);
        let newSettings = null
        if(possibleSettings.length) {
          newSettings = possibleSettings.reduce((min, settings) => min.breakpoint < settings.breakpoint ? min : settings)
        }
        
        if(newSettings) {
          if("itemsToShow" in newSettings) {
            let newItemsToShow = baseSlideCount ? newSettings.itemsToShow : baseSlideCount;

            for (let i = 0; i < slidesRef.current.children.length; i++) {
              slidesRef.current.children[i].attributes["tabindex"].value = -1;
            }

            setSlidesShown(newItemsToShow)
            setSlidesWidth((baseSlideCount * 100) / newItemsToShow + (infinite ? 100 * 2 : 0))            
          }
          if("controlAlignment" in newSettings) {
            setAlignment([styles[(newSettings.controlAlignment + '').split(' ')[0]], styles[(newSettings.controlAlignment + '').split(' ')[1]]])
          }
          if("hideControls" in newSettings) {
            setControlVisibility(newSettings.hideControls)
          }
          if("hideIndicators" in newSettings) {
            setIndicatorVisibility(newSettings.hideIndicators)
          }
          if("indicatorStyle" in newSettings) {
            setIndicatorStyling(newSettings.indicatorStyle)
          }
          if("layoutGap" in newSettings) {
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
    
    window.addEventListener("resize", handleResize);
    handleResize();
    
    return () => window.removeEventListener("resize", handleResize);
  }, [windowWidth]); 

  useEffect(() => {
    const { current } = slidesRef

    const { ...measurements } = getSliderMeasurements(current, slideGap, infinite, baseSlideCount, slidesShown)

    setInitLeftState(measurements.slidesLeft)
    setSlidesLeft(measurements.slidesLeft)
    setSlidesPxWidth(measurements.slidesPxWidth)
    setSlideShift(measurements.slideShift)
    setSlideMargin(measurements.slideMargin)
    setSlideFlexBasis(measurements.slideFlexBasis)

    setAriaLive('polite')
    initializeTabIndices(infinite, slidesShown, activeIndex)
    
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
    handleIndexCheck
  }
}
