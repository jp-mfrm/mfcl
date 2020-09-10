import { ReactNode, Children, useState, useEffect, isValidElement, cloneElement, useRef, useCallback, createElement } from "react";
import styles from "./carousel.module.scss";
import React from "react";
import clsx from "clsx";

function getChildrenArr(children: ReactNode) {
  const cloneEls: ReactNode[] = [];

  Children.map(children, (child: ReactNode) => {
    cloneEls.push(child);
  });

  return cloneEls;
}

function getSliderMeasurements(marginless:boolean, infinite: boolean, itemsToShow: number, itemCount: number) {

  var slideMargin = marginless ? 0 : 0.25/itemsToShow;
  var slideWidth = 100/itemCount;
  var focusWidth = slideWidth/itemsToShow;
  var basisAdjustment = infinite ? 2 * slideMargin * ( itemCount-1 ) : slideMargin * ( itemCount-1 );
  var slideFlexBasis = focusWidth - basisAdjustment;
  var translationAdjustment = infinite ? ( 3 * slideMargin * itemsToShow )  : ( slideMargin * itemsToShow );

  return { slideMargin, slideFlexBasis, translationAdjustment};
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
  autoSlide: boolean,
) {

  if(autoSlide)
    infinite = true;

    const itemCount = Children.count(children);

    const {
      slideMargin,
      slideFlexBasis,
      translationAdjustment
    } = getSliderMeasurements(marginless, infinite, itemsToShow, itemCount);

    const alignment = [styles[(btnAlignment + "").split(" ")[0]], styles[(btnAlignment + "").split(" ")[1]]];
    const [childrenArr, updateChildArr] = useState<ReactNode[]>(getChildrenArr(children));
    const [started, setStarted] = useState(duration ? true : false);
  
    const [scrollAmount, setScrollAmount] = useState(itemsToScroll);
  
    const [sliderRef, setSliderRef] = useState(useRef<any>());
    const [activeIndex, setActiveIndex] = useState(0);
    const [action, setAction] = useState("");
  
    const [reposition, setReposition] = useState("");

    const indicators: ReactNode[] = [];
    
    Children.forEach(children, (value, index) => {
      indicators.push(createElement('button', {
        key: index,
        className: clsx(styles["indicator-button"], styles[indicatorStyle]),  
        onClick: () => handleIndicatorClick(index)}, 
        ));
    });
  
  const moveToDestination = (destinationIndex: number) => {
    let translate = ( -1 * destinationIndex * ( slideFlexBasis + ( 2 * slideMargin ) ) + translationAdjustment );
    if(sliderRef.current) {
      if((infinite && reposition) || !infinite) {
        sliderRef.current.style.transition = "all 0.5s";
      } else {
        sliderRef.current.style.transition = "all 0.01s";
      }

      sliderRef.current.style.transform = "translateX(" + translate + "%)";
    } 
  }

  const handleIndicatorClick = (destinationIndex: number) => {
    //Gets thrown off if the control buttons are clicked.
    if(infinite) {
      var scrollAmount = (destinationIndex + 1) - activeIndex;
      if(scrollAmount === 0) return;
      var carouselItems = sliderRef.current.children;
      if(scrollAmount > 0) {
        moveToDestination(0);
        for(let i=0; i < scrollAmount; i++) {
          sliderRef.current.insertBefore(carouselItems[0], carouselItems[itemCount-1].nextSibling);
        }
        moveToDestination(1);
        setActiveIndex(destinationIndex+1);
      } else {
        moveToDestination(2);
        for(let i=0; i < (-1*scrollAmount); i++) {
          sliderRef.current.insertBefore(carouselItems[itemCount-1], carouselItems[0])
        }
        moveToDestination(1);
        setActiveIndex(destinationIndex+1);
      }
    } else {
      moveToDestination(destinationIndex);
    }
  }

  const handleTransitionEnd = () => {

    if(infinite) {
      var carouselItems = sliderRef.current.children;

      if(reposition == "next") {  
        sliderRef.current.insertBefore(carouselItems[0], carouselItems[itemCount-1].nextSibling);
        moveToDestination(1)
      } else if (reposition == "prev") {
        sliderRef.current.insertBefore(carouselItems[itemCount-1], carouselItems[0])
        moveToDestination(1)
      }
  
      setReposition("");
    }
  }

  useEffect(() => {

    let destinationIndex = activeIndex;

    switch(true) {
      case action === "next" && infinite:
        setReposition("next");
        moveToDestination(0);
        destinationIndex = (activeIndex + scrollAmount) > itemCount - 1 ? 0 : activeIndex + scrollAmount;
        break;
      
      case action === "next" && !infinite:
        destinationIndex = (activeIndex + scrollAmount) > itemCount - 1 ? destinationIndex : activeIndex + scrollAmount;
        moveToDestination(destinationIndex);
        break;

      case action === "prev" && infinite:
        setReposition("prev");
        moveToDestination(2);
        destinationIndex = (activeIndex - scrollAmount) < 0 ? itemCount - 1 : activeIndex - scrollAmount;
        break;

      case action === "prev" && !infinite:
        destinationIndex = (activeIndex - scrollAmount) < 0 ? destinationIndex : activeIndex - scrollAmount;
        moveToDestination(destinationIndex);
        break;
    }
    
    setActiveIndex(destinationIndex);
    setAction("");
  }, [action])

  useEffect(() => {
    if(autoSlide) {
      let timer!: NodeJS.Timeout;
    
      clearInterval(timer);
      timer = setInterval(() => setAction("next"), duration);
  
      return () => clearInterval(timer);
    }
  }, [sliderRef, started]);

  useEffect(() => {
    if(sliderRef.current) {
      sliderRef.current.style.width = itemCount*100 + "%";
    }

    if(!infinite) {
      moveToDestination(0);
    } else {
      var carouselItems = sliderRef.current.children;
      sliderRef.current.insertBefore(carouselItems[itemCount-1], carouselItems[0]);
      moveToDestination(1);
      setActiveIndex(1);
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
  };
}

export function draggableHelper(children: ReactNode) {

  const [childrenArr, updateChildArr] = useState<ReactNode[]>(getChildrenArr(children));
  const itemCount = Children.count(children);
  const slideFlexBasis = (1 / itemCount) * 100;
  const slidesLength = Children.count(children)
  const sliderWidth = itemCount * 100;
  const slides = childrenArr?.map((child: ReactNode, index: number) => {
    if (isValidElement(child)) {
      // TODO: Figure out how to clone the outer wrapper of cloned element without overriding class name
      return (
        <div
          className={clsx(styles['slide'], styles['draggable'])}
          key={index}
          style={{ flexBasis: `${slideFlexBasis}%` }}
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

  const [dragActive, setDragActive] = useState(false)
  const [posInitial, setPosInitial] = useState(0)
  const [posX1, setPosX1] = useState(0)
  const [sliderLeft, setSliderLeft] = useState(-100)
  const [activeIndex, setActiveIndex] = useState(0)
  const [allowShift, setAllowShift] = useState(true)
  const slideSize = 100 // slideRef.current ? slideRef.current.offsetWidth : 0

  const draggableSliderRef = useRef<HTMLDivElement>(null)
 
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

  const convertPixelToPercentage = (pixelVal: number) => {
    return (pixelVal / (draggableSliderRef.current!.offsetWidth / slides.length)) * 100
  }

  const getSliderLeftPos = useCallback(() => {
    return convertPixelToPercentage(draggableSliderRef.current!.offsetLeft)
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
    draggableSliderRef.current!.style.transition = 'left 0.2s ease-out'

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
    draggableSliderRef.current!.style.transition = ''

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

  return {
    draggableSliderRef,
    sliderLeft,
    handleDragStart,
    handleDragEndHandler,
    handleDragActionHandler,
    checkIndex,
    shiftSlide,
    slides,
    sliderWidth
  };
}