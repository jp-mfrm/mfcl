import React, {
  FunctionComponent,
  ReactNode,
  cloneElement,
  isValidElement,
} from "react";

import clsx from "clsx";
import styles from "./carousel.module.scss";
import carouselHelper from "./carouselHelper";

interface Props {
  /** (WIP) */
  itemsToShow?: number;
  /** (WIP) */
  itemsToScroll?: number;
  /** (WIP) */
  btnAlignment?: 'top' | 'middle' | 'center' | 'apart' | 'left' | 'right' | 'bottom' 
  /** (WIP) */
  duration?: number;
  /** (WIP) */
  infinite?: boolean;
  /** Optional children to use instead of items prop */
  children?: ReactNode | null;
  [rest: string]: unknown; // ...rest property
}

const Carousel: FunctionComponent<Props> = ({
  itemsToShow = 1,
  itemsToScroll,
  btnAlignment = 'middle apart',
  infinite = false,
  duration = 3000,
  children,
}) => {

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
  } = carouselHelper(children, itemsToShow, btnAlignment, duration, infinite);

  const slides = 
    childrenArr?.map((child: ReactNode, index: number) => {
      if (isValidElement(child)) {
        return cloneElement(child, {
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
