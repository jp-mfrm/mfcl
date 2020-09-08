import { ReactNode, Children, useState, useEffect, RefObject, isValidElement, cloneElement, useRef, useCallback, createElement } from "react";
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

export function carouselHelper(
  children: ReactNode,
  itemsToShow: number,
  itemsToScroll: number,
  btnAlignment: string,
  indicatorStyle: string,
  duration: number,
  infinite: boolean,
  autoSlide: boolean,
) {

  if(autoSlide)
    infinite = true;

    const itemCount = Children.count(children);
    const slideFlexBasis = 18/itemsToShow;
    const slideMargin = 0.25; 
    const alignment = [styles[(btnAlignment + "").split(" ")[0]], styles[(btnAlignment + "").split(" ")[1]]];
    const [childrenArr, updateChildArr] = useState<ReactNode[]>(getChildrenArr(children));
    const [started, setStarted] = useState(duration ? true : false);
  
    const [scrollAmount, setScrollAmount] = useState(itemsToScroll);
  
    const [sliderRef, setSliderRef] = useState(useRef<any>());
    const [activeIndex, setActiveIndex] = useState(0);
    const [action, setAction] = useState("");
  
    const indicators: ReactNode[] = [];
    Children.forEach(children, (value, index) => {
      indicators.push(createElement('button', {
        key: index,
        className: clsx(styles["indicator-button"], styles[indicatorStyle]),  
        onClick: () => moveToDestination(index)}, 
        ));
    });
  
  const moveToDestination = (destinationIndex: number) => {
    //  translate = ( -1 x destinationIndex x ( flexBasis + ( 2 x margins )  ) + ( margins x 3 )
    let translate = ( -1 * destinationIndex * ( slideFlexBasis + ( 2 * slideMargin ) ) + ( slideMargin * 3 ) );
    if(sliderRef.current) {
      sliderRef.current.style.transform = "translateX(" + translate + "%)";
    }
  }

  useEffect(() => {

    let destinationIndex = activeIndex;

    switch(true) {
      case action === "next" && infinite:
        destinationIndex = activeIndex >= itemCount - scrollAmount ? 0 : activeIndex + scrollAmount; 

        moveToDestination(destinationIndex);
          
        break;
      
      case action === "next" && !infinite:
        // destinationIndex = activeIndex + itemsToScroll;
        
        let itemsToScroll = scrollAmount;

        if(activeIndex + (itemsToShow-1) + itemsToScroll > itemCount-1)
        {
            while(activeIndex + (itemsToShow-1) + itemsToScroll >= itemCount-1) {
              itemsToScroll-=1;
            }
            destinationIndex = activeIndex + itemsToScroll;
            moveToDestination(destinationIndex);
        } else {
          destinationIndex = activeIndex + itemsToScroll;
          moveToDestination(destinationIndex);
        }

        // if(activeIndex + itemsToScroll > itemCount-1) {
        //   return;
        // } else {
        //   if(activeIndex + itemsToShow + itemsToScroll >= itemCount-1) {
        //     destinationIndex = activeIndex + 1;
        //   } else {
        //     destinationIndex = activeIndex + itemsToScroll;
        //   }
          moveToDestination(destinationIndex);
        //}
        break;

      case action === "prev" && infinite:
        destinationIndex = activeIndex === 0 ? itemCount - scrollAmount : activeIndex - scrollAmount;
        // sliderRef.current.insertBefore(sliderRef.current.children[itemCount-1], sliderRef.current.children[0]);
        moveToDestination(destinationIndex);
        
        break;

      case action === "prev" && !infinite:
        if(activeIndex === 0) {
          return;
        } else {
          if(activeIndex - scrollAmount <= 0 || activeIndex - itemsToShow - scrollAmount <= 0) {
            destinationIndex = activeIndex - 1;
          } else {
            destinationIndex = activeIndex - scrollAmount;
          }
          moveToDestination(destinationIndex);
        } 
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
  }, [started]);

  useEffect(() => {
    moveToDestination(0);
  }, [])

  return {
    slideFlexBasis,
    childrenArr,
    alignment,
    sliderRef,
    indicators,
    setAction,
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