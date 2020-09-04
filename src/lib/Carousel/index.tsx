import React, {
  FunctionComponent,
  ReactNode,
  cloneElement,
  isValidElement,
  useRef,
} from "react";

import clsx from "clsx";
import styles from "./carousel.module.scss";
import carouselHelper from "./carouselHelper";

interface Props {
  /** Sets how many slides to show */
  itemsToShow?: number;
  /** Sets how many slides to scroll per click */
  itemsToScroll?: number;
  /** Sets the transition control button alignments. Two non conflicting configurations can be combined.  
   * 'middle' centers vertically while 'center' centers horizontally. */
  btnAlignment?: 'top' | 'middle' | 'center' | 'apart' | 'left' | 'right' | 'bottom' 
  /** Allows Carousel to be cyclical. */
  infinite?: boolean;
  /** Enables automatic transitions. */
  autoSlide?: boolean;
  /** Time in milliseconds for autoSlide */
  duration?: number;
  [rest: string]: unknown; // ...rest property
}

const Carousel: FunctionComponent<Props> = ({
  itemsToShow = 1,
  itemsToScroll,
  btnAlignment = 'middle apart',
  infinite = false,
  autoSlide = false,
  duration = 3000,
  children,
}) => {

  const slideRef = useRef<HTMLDivElement>(null);

  if(autoSlide)
    infinite = true;

  const {
    sliderWidth,
    slideFlexBasis,
    childrenArr,
    alignment,
    carouselJustify,
    slideTransform,
    slideTransition,
    goLeft,
    goRight,
    handleOnTransitionEnd,
  } = carouselHelper(children, itemsToShow, btnAlignment, duration, infinite, autoSlide, slideRef);

  const slides = 
    childrenArr?.map((child: ReactNode, index: number) => {
      if (isValidElement(child)) {
        return cloneElement(child, {
          ref: slideRef,
          key: index,
          className: clsx(styles["slide"]),
          style: {flexBasis: `${slideFlexBasis}%`},
        });
      }
    });
  
  const buttons = 
    <div className={clsx(styles["carousel-wrapper-controls"], alignment)}>
      <button className={clsx(styles["prev"])} onClick={goLeft}>
        <i className={clsx()}></i>
      </button>
      <button className={clsx(styles["next"])} onClick={goRight}>
        <i className={clsx()}></i>
      </button>
    </div>
   
  return (
    <div 
      className={clsx(styles["carousel-wrapper"])} 
      style={{ justifyContent: `${carouselJustify}` }}>
      <div
        onTransitionEnd={handleOnTransitionEnd} 
        className={clsx(styles["carousel-wrapper-slider"])} 
        style={{ transform: `translate(${slideTransform}%)`, transition: ` ${slideTransition}`, width: `${sliderWidth}%` }}>
        {slides}
      </div>
        {buttons}
    </div>
  );
};

export default Carousel;
