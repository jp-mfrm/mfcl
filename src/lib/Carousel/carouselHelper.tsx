import { ReactNode, Children, useState, useEffect } from "react";
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
  infinite: boolean
) {
  const itemWidth = itemsToShow && itemsToShow > 1 ? 100 / itemsToShow : 100;
  const itemCount = Children.count(children);
  const sliderWidth = itemCount * 100;
  const slideFlexBasis = (1 / itemCount) * 100;
  const alignment = [styles[(btnAlignment + "").split(" ")[0]], styles[(btnAlignment + "").split(" ")[1]]];
  const [childrenArr, updateChildArr] = useState<ReactNode[]>(getChildrenArr(children));
  const [direction, setDirection] = useState(-1);
  const [index, setIndex] = useState(1);
  const [directionHandle, setDirectionHandle] = useState<Boolean>(false);
  const [carouselJustify, setCarouselJustify] = useState("flex-start");
  const [slideTransform, setSlideTransform] = useState(0);
  const [slideTransition, setSlideTransition] = useState("all 0.5s");

  const goLeft = () => {
    if(!infinite && index == 1)
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
    // setIndex((index != 1) ? index-1 : childrenArr.length);
    if(index != 1)
      setIndex(index-1);
    else
      setIndex(childrenArr.length);
  };

  const goRight = () => {
    if(!infinite && index == childrenArr.length)
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
    setIndex((childrenArr.length) ? index+1 : 1);
    if(index != childrenArr.length)
      setIndex(index+1);
    else
      setIndex(1);
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
    if (duration) {
      const timer = setInterval(() => goRight(), duration);
      return () => clearInterval(timer);
    }
  }, [childrenArr]);

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
