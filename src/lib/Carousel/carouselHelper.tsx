import { ReactNode, Children, useState, useEffect, RefObject } from "react";
import styles from "./carousel.module.scss";

function getChildrenArr(children: ReactNode) {
  const cloneEls: ReactNode[] = [];

  Children.map(children, (child: ReactNode) => {
    cloneEls.push(child);
  });

  return cloneEls;
}

export default function carouselHelper(
  children: ReactNode,
  itemsToShow: number,
  btnAlignment: string,
  duration: number,
  infinite: boolean,
  autoSlide: boolean,
  slideRef: RefObject<HTMLDivElement>
) {

  if(autoSlide)
    infinite = true;

  const itemWidth = itemsToShow && itemsToShow > 1 ? 100 / itemsToShow : 100;
  const itemCount = Children.count(children);
  const sliderWidth = itemCount * 100;
  const slideFlexBasis = (1 / itemCount) * 100;
  const alignment = [styles[(btnAlignment + "").split(" ")[0]], styles[(btnAlignment + "").split(" ")[1]]];
  const [childrenArr, updateChildArr] = useState<ReactNode[]>(getChildrenArr(children));
  const [direction, setDirection] = useState(-1);
  const [index, setIndex] = useState(0);
  const [started, setStarted] = useState(duration ? true : false);
  const [directionHandle, setDirectionHandle] = useState<Boolean>(false);
  const [carouselJustify, setCarouselJustify] = useState("flex-start");
  const [slideTransform, setSlideTransform] = useState(0);
  const [slideTransition, setSlideTransition] = useState("all 0.5s");

  const goLeft = () => {
    if(!infinite && index == 0)
      return;

    if (direction === -1) {
      setDirection(1);
      if (childrenArr) {
        // Take off first element, append to the end
        const el = childrenArr.shift();
        childrenArr.push(el);
        updateChildArr(childrenArr);
      }
    }

    setCarouselJustify("flex-end");
    setSlideTransform(slideFlexBasis);
    setIndex((index != 0) ? index-1 : childrenArr.length-1);

    if(autoSlide) 
      setStarted(!started);
  };

  const goRight = () => {
    if(!infinite && index == childrenArr.length-1)
      return;

    if (direction === 1) {
      setDirection(-1);
      if (childrenArr) {
        // Take off last element, prepend to the start
        const el = childrenArr.pop();
        childrenArr.unshift(el);
        updateChildArr(childrenArr);
      }
    }

    setCarouselJustify("flex-start");
    setSlideTransform(-slideFlexBasis);
    setIndex((index != childrenArr.length-1) ? index+1 : 0);

    if(autoSlide) 
      setStarted(!started);
  };

  const handleOnTransitionEnd = () => {
    // Prevents the second slide from being rendered after initialization
    if (!directionHandle) {
      setDirectionHandle(true);
    }

    if (direction === 1) {
      if (childrenArr) {
        // Take off last element, prepend to the start
        const el = childrenArr.pop();
        childrenArr.unshift(el);

        updateChildArr(childrenArr);
      }
    } else {
      if (childrenArr) {
        // Take off first element, append to the end
        const el = childrenArr.shift();
        childrenArr.push(el);

        updateChildArr(childrenArr);
      }
    }

    setSlideTransition("none");
    setSlideTransform(0);
    setTimeout(() => {
      setSlideTransition("all 0.5s");
    });
  };

  useEffect(() => {
    if(autoSlide) {
      let timer!: NodeJS.Timeout;
    
      clearInterval(timer);
      timer = setInterval(() => goRight(), duration);
  
      return () => clearInterval(timer);
    }
  }, [started]);

  useEffect(() => {
    if(slideRef && slideRef.current)
      slideRef.current.focus();
  }, [])

  return {
    itemWidth,
    itemCount,
    sliderWidth,
    slideFlexBasis,
    alignment,
    childrenArr,
    carouselJustify,
    slideTransform,
    slideTransition,
    goLeft,
    goRight,
    handleOnTransitionEnd,
  };
}
