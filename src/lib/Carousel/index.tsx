import React, {
  FunctionComponent,
  useRef,
  ReactNode,
  isValidElement,
  cloneElement,
} from 'react'

import { carouselHelper, draggableHelper } from './carouselHelper'
import clsx from 'clsx'
import styles from './carousel.module.scss'

/// TODO: Props to implement
/// as: 'div' | 'section' | 'a' | 'img'
/// asProps: {}
/// controls: boolean;
/// indicators: boolean; (High priority)
/// nextIcon: node (Low priority)
/// nextLabel: string (Low priority)
/// prevIcon: node (Low priority)
/// prevLabel: string (Low priority)
/// pause: 'hover' | false (Low priority)
/// touch: boolean (High priority)

interface Props {
  /** Sets the class for the Carousel wrapper */
  carouselClass?: string
  /** Sets how many slides to show */
  itemsToShow?: number
  /** Sets how many slides to scroll per click */
  itemsToScroll?: number
  /** Sets the transition control button alignments. Two non conflicting configurations can be combined.
   * 'middle' centers vertically while 'center' centers horizontally. */
  btnAlignment?: string | 'top' | 'middle' | 'center' | 'apart' | 'left' | 'right' | 'bottom'
  /** hides indicator buttons */
  hideIndicators?: boolean
  /** Sets the indicator buttons' style */
  indicatorStyle?: string | 'bar' | 'round'
  /** Allows Carousel to be cyclical. */
  infinite?: boolean
  /** Enables automatic transitions. */
  autoSlide?: boolean
  /** Time in milliseconds for autoSlide */
  duration?: number
  /** Enable draggable slides */
  draggable?: boolean
  [rest: string]: unknown // ...rest property
}

const Carousel: FunctionComponent<Props> = ({
  carouselClass,
  itemsToShow = 1,
  itemsToScroll = 1,
  btnAlignment = 'middle apart',
  hideIndicators = false,
  indicatorStyle = 'round',
  infinite = false,
  autoSlide = false,
  duration = 3000,
  draggable = false,
  children
}) => {

  const {
    slideFlexBasis,
    childrenArr,
    alignment,
    sliderRef,
    indicators,
    setAction,
    handleTransitionEnd,
  } = carouselHelper(children, itemsToShow, itemsToScroll, btnAlignment, indicatorStyle, duration, infinite, autoSlide);

  const slides = 
    childrenArr?.map((child: ReactNode, index: number) => {
      if (isValidElement(child)) {
        return cloneElement(child, {
          ...child.props,
          key: index,
          index: index,
          className: clsx(styles["slide"]),
          style: {...child.props.style, flexBasis: `${slideFlexBasis}%`},
        });
      }
    });

  const buttons = 
  <>
    <a className={clsx(styles["prev"], styles["carousel-wrapper-controls"], alignment)} onClick={() => setAction("prev")}></a>
    <a className={clsx(styles["next"], styles["carousel-wrapper-controls"], alignment)} onClick={() => setAction("next")}></a>
  </>
  var template;

if(draggable) {
  const {
    draggableSliderRef,
    sliderLeft,
    handleDragStart,
    handleDragEndHandler,
    handleDragActionHandler,
    checkIndex,
    shiftSlide,
    slides,
    sliderWidth
  } = draggableHelper(children);

  template = (
    <div id="slider" className={clsx(styles['slider'], styles['loaded'])}>
      <div className={styles['wrapper']}>
        <div
          id="slides"
          className={styles['slides']}
          style={{
            left: `${sliderLeft}%`,
            width: `${sliderWidth + 200}%`
          }}
          ref={draggableSliderRef}
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
          onTouchEnd={handleDragEndHandler}
          onTouchMove={handleDragActionHandler}
          onTransitionEnd={checkIndex}
        >
          {slides}
        </div>
      </div>
      <a id="prev" className={clsx(styles['control'], styles['prev'])} onClick={() => shiftSlide(-1)}></a>
      <a id="next" className={clsx(styles['control'], styles['next'])} onClick={() => shiftSlide(1)}></a>
    </div>
  )
} else {
  template = (
    <>
    <div 
      className={clsx(styles["carousel-wrapper"], carouselClass)}>
      <div
        ref={sliderRef}
        className={clsx(styles["carousel-wrapper-slider"])}
        onTransitionEnd={handleTransitionEnd}
      >
        {slides}
      </div>
      <div className={clsx(styles["carousel-wrapper-indicators"])}>
        {!hideIndicators && indicators}
      </div>
    </div>
    {buttons} 
    </>
  )
}
  return template;
}

export default Carousel
