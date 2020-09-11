import {
  Children,
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
import clsx from 'clsx'
import styles from './carousel.module.scss'

function getChildrenArr(children: ReactNode) {
  const cloneEls: ReactNode[] = []

  Children.map(children, (child: ReactNode) => {
    cloneEls.push(child)
  })

  return cloneEls
}

function getSliderMeasurements(marginless: boolean, infinite: boolean, itemsToShow: number, itemCount: number) {
  var slideMargin = marginless ? 0 : 0.25 / itemsToShow
  var slideWidth = 100 / itemCount
  var focusWidth = slideWidth / itemsToShow
  var basisAdjustment = infinite ? 2 * slideMargin * (itemCount - 1) : slideMargin * (itemCount - 1)
  var slideFlexBasis = focusWidth - basisAdjustment
  var translationAdjustment = infinite ? 3 * slideMargin * itemsToShow : slideMargin * itemsToShow

  return { slideMargin, slideFlexBasis, translationAdjustment }
}

export function carouselHelper(
  children: ReactNode,
  itemsToShow: number,
  itemsToScroll: number,
  btnAlignment: string,
  indicatorStyle: string,
  duration: number,
  marginless: boolean,
  infinite: boolean,
  autoSlide: boolean
) {
  if (autoSlide) infinite = true

  const itemCount = Children.count(children)

  const { slideMargin, slideFlexBasis, translationAdjustment } = getSliderMeasurements(
    marginless,
    infinite,
    itemsToShow,
    itemCount
  )

  const alignment = [styles[(btnAlignment + '').split(' ')[0]], styles[(btnAlignment + '').split(' ')[1]]]
  const [childrenArr, updateChildArr] = useState<ReactNode[]>(getChildrenArr(children))
  const [started, setStarted] = useState(duration ? true : false)

  const [scrollAmount, setScrollAmount] = useState(itemsToScroll)

  const [sliderRef, setSliderRef] = useState(useRef<any>())
  const [activeIndex, setActiveIndex] = useState(0)
  const [action, setAction] = useState('')

  const [reposition, setReposition] = useState('')

  const indicators: ReactNode[] = []

  Children.forEach(children, (value, index) => {
    indicators.push(
      createElement('button', {
        key: index,
        className: clsx(styles['indicator-button'], styles[indicatorStyle]),
        onClick: () => handleIndicatorClick(index)
      })
    )
  })

  const moveToDestination = (destinationIndex: number) => {
    let translate = -1 * destinationIndex * (slideFlexBasis + 2 * slideMargin) + translationAdjustment
    if (sliderRef.current) {
      if ((infinite && reposition) || !infinite) {
        sliderRef.current.style.transition = 'all 0.5s'
      } else {
        sliderRef.current.style.transition = 'all 0.01s'
      }

      sliderRef.current.style.transform = 'translateX(' + translate + '%)'
    }
  }

  const handleIndicatorClick = (destinationIndex: number) => {
    //Gets thrown off if the control buttons are clicked.
    if (infinite) {
      var scrollAmount = destinationIndex + 1 - activeIndex
      if (scrollAmount === 0) return
      var carouselItems = sliderRef.current.children
      if (scrollAmount > 0) {
        moveToDestination(0)
        for (let i = 0; i < scrollAmount; i++) {
          sliderRef.current.insertBefore(carouselItems[0], carouselItems[itemCount - 1].nextSibling)
        }
        moveToDestination(1)
        setActiveIndex(destinationIndex + 1)
      } else {
        moveToDestination(2)
        for (let i = 0; i < -1 * scrollAmount; i++) {
          sliderRef.current.insertBefore(carouselItems[itemCount - 1], carouselItems[0])
        }
        moveToDestination(1)
        setActiveIndex(destinationIndex + 1)
      }
    } else {
      moveToDestination(destinationIndex)
    }
  }

  const handleTransitionEnd = () => {
    if (infinite) {
      var carouselItems = sliderRef.current.children

      if (reposition == 'next') {
        sliderRef.current.insertBefore(carouselItems[0], carouselItems[itemCount - 1].nextSibling)
        moveToDestination(1)
      } else if (reposition == 'prev') {
        sliderRef.current.insertBefore(carouselItems[itemCount - 1], carouselItems[0])
        moveToDestination(1)
      }

      setReposition('')
    }
  }

  useEffect(() => {
    let destinationIndex = activeIndex

    switch (true) {
      case action === 'next' && infinite:
        setReposition('next')
        moveToDestination(0)
        destinationIndex = activeIndex + scrollAmount > itemCount - 1 ? 0 : activeIndex + scrollAmount
        break

      case action === 'next' && !infinite:
        destinationIndex = activeIndex + scrollAmount > itemCount - 1 ? destinationIndex : activeIndex + scrollAmount
        moveToDestination(destinationIndex)
        break

      case action === 'prev' && infinite:
        setReposition('prev')
        moveToDestination(2)
        destinationIndex = activeIndex - scrollAmount < 0 ? itemCount - 1 : activeIndex - scrollAmount
        break

      case action === 'prev' && !infinite:
        destinationIndex = activeIndex - scrollAmount < 0 ? destinationIndex : activeIndex - scrollAmount
        moveToDestination(destinationIndex)
        break
    }

    setActiveIndex(destinationIndex)
    setAction('')
  }, [action])

  useEffect(() => {
    if (autoSlide) {
      let timer!: NodeJS.Timeout

      clearInterval(timer)
      timer = setInterval(() => setAction('next'), duration)

      return () => clearInterval(timer)
    }
  }, [sliderRef, started])

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.width = itemCount * 100 + '%'

      if (!infinite) {
        moveToDestination(0)
      } else {
        var carouselItems = sliderRef.current.children
        sliderRef.current.insertBefore(carouselItems[itemCount - 1], carouselItems[0])
        moveToDestination(1)
        setActiveIndex(1)
      }
    }
  }, [])

  return {
    slideFlexBasis,
    childrenArr,
    alignment,
    sliderRef,
    slideMargin,
    indicators,
    setAction,
    handleTransitionEnd
  }
}

export function draggableHelper(
  children: ReactNode,
  itemsToShow: number,
  itemsToScroll: number,
  btnAlignment: string,
  indicatorStyle: string,
  duration: number,
  infinite: boolean,
  autoSlide: boolean
) {
  // Configure autoslide / infinite
  const [started, setStarted] = useState(duration ? true : false)
  if (autoSlide) infinite = true

  // Configure slide boundary vars
  const [childrenArr, updateChildArr] = useState<ReactNode[]>(getChildrenArr(children))
  const baseSlideCount = childrenArr.length
  const slidesToShow = itemsToShow <= baseSlideCount ? itemsToShow : baseSlideCount
  const sliderWidth = (baseSlideCount * 100) / slidesToShow + (infinite ? (100 * 2 * slidesToShow) / slidesToShow : 0)
  const slideSize = 100 / (slidesToShow ? slidesToShow : 1)
  const [sliderLeft, setSliderLeft] = useState(
    infinite ? -100 / slidesToShow + (slidesToShow > 1 ? -100 / slidesToShow : 0) * (slidesToShow - 1) : 0
  )

  // Configure base slides
  const slideFlexBasis = (1 / baseSlideCount) * 100
  const [slideGrabbing, setSlideGrabbing] = useState(false)
  const slides = childrenArr?.map((child: ReactNode, index: number) => {
    if (isValidElement(child)) {
      return (
        <div
          className={clsx(styles['slide'], styles['draggable'], slideGrabbing && styles['grabbing'])}
          // {...child.props}
          key={index}
          style={{ ...child.props.style, flexBasis: `${slideFlexBasis}%` }}
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
    const firstSlides = slides.slice(0, slidesToShow)
    const lastSlides = slides.slice().reverse().slice(0, slidesToShow).reverse()
    const cloneSlides = firstSlides.concat(lastSlides).map((child: ReactNode, index: number) => {
      if (isValidElement(child)) {
        return cloneElement(child, {
          key: -index - 100
        })
      }
    })
    slides.unshift(...cloneSlides.slice(cloneSlides.length - slidesToShow))
    slides.push(...cloneSlides.slice(0, slidesToShow))
  }

  const getNumberOfIndicators = () => {
    var count = 1
    for (var i = baseSlideCount; 0 < i; i--) {
      if (i % slidesToShow === 0 && slidesToShow === i) break

      count++
    }

    return count == 1 ? 0 : count
  }

  // Configure slider indicators
  const indicators: ReactNode[] = []
  if (baseSlideCount > 1) {
    Children.toArray(children)
      .splice(0, getNumberOfIndicators())
      .forEach((value, index) => {
        indicators.push(
          createElement('button', {
            key: index,
            className: clsx(styles['indicator-button'], styles[indicatorStyle]),
            onClick: () => handleIndicatorClick(index)
          })
        )
      })

    const handleIndicatorClick = (destinationIndex: number) => {
      shiftSlide(destinationIndex, 'indicator')
    }
  }

  // Configure slider drag/touch handling
  const draggableSliderRef = useRef<HTMLDivElement>(null)
  const [dragActive, setDragActive] = useState(false)
  const [posInitial, setPosInitial] = useState(0)
  const [posX1, setPosX1] = useState(0)
  const [activeIndex, setActiveIndex] = useState(infinite ? slidesToShow - 1 : 0)
  const [allowShift, setAllowShift] = useState(true)

  const toSliderXPercentage = (pixelVal: number) => {
    return ((pixelVal * slides.length) / (slidesToShow * draggableSliderRef.current!.offsetWidth)) * 100
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
        (dir == 1 && activeIndex >= baseSlideCount - 1 - (slidesToShow > 1 ? slidesToShow - 1 : 0)))
    )
  }

  const shiftSlide = (dir: number, action?: string) => {
    if (sliderHasTransition()) return

    if (exceedsSliderBoundary(dir) && action !== 'indicator') {
      if (action) draggableSliderRef.current!.style.transition = 'left .5s ease-out'
      setSliderLeft(activeIndex === 0 ? 0 : action ? posInitial : getSliderLeftPos())
      return
    }

    if (allowShift) {
      switch (true) {
        case action === 'indicator':
          let indexAdjust = activeIndex - (infinite ? slidesToShow - 1 : 0)
          let slideMultiplier = Math.abs(dir - indexAdjust)
          if (slideMultiplier === 0) return
          let sliderLeftAdjustment = (indexAdjust < dir ? -1 : 1) * slideSize * slideMultiplier
          setSliderLeft(sliderLeft + sliderLeftAdjustment)
          setActiveIndex(dir + (infinite ? slidesToShow - 1 : 0))
          break
        case action === 'drag':
        default:
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
          break
      }

      draggableSliderRef.current!.style.transition = 'left .3s ease-out'
    }

    setAllowShift(false)
  }

  const handleIndexCheck = () => {
    draggableSliderRef.current!.style.transition = ''

    if (activeIndex === -1) {
      setSliderLeft(-(baseSlideCount * slideSize))
      setActiveIndex(baseSlideCount - 1)
    }

    if (activeIndex === baseSlideCount) {
      setSliderLeft(-(1 * slideSize))
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
        var threshold = 12 // 100

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

  return {
    draggableSliderRef,
    sliderLeft,
    handleDragStart,
    handleDragEndHandler,
    handleDragActionHandler,
    handleIndexCheck,
    shiftSlide,
    slides,
    sliderWidth,
    indicators
  }
}
