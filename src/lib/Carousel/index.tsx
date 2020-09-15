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
  btnAlignment?: 'top' | 'middle' | 'center' | 'apart' | 'left' | 'right' | 'bottom' 
  /** Hides indicator buttons */
  hideIndicators?: boolean
  /** Hides control buttons unless hovered */
  hideControls?: boolean
  /** Sets the indicator buttons' style */
  indicatorStyle?: 'bar' | 'round'
  /** Removes margins from the slides */
  marginless?: boolean
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
  hideControls = false,
  indicatorStyle = 'round',
  marginless = false,
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
    slideMargin,
    indicators,
    setAction,
    handleTransitionEnd
  } = carouselHelper(
    children,
    itemsToShow,
    itemsToScroll,
    btnAlignment,
    indicatorStyle,
    duration,
    marginless,
    infinite,
    autoSlide
  )

  const slider = (
    <div ref={sliderRef} className={clsx(styles['carousel-wrapper-slider'])} onTransitionEnd={handleTransitionEnd}>
      {childrenArr?.map((child: ReactNode, index: number) => {
        if (isValidElement(child)) {
          return (
            <div
              key={index}
              className={clsx(styles['slide'], marginless && styles['marginless'])}
              style={{ ...child.props.style, flexBasis: `${slideFlexBasis}%`, margin: `0 ${slideMargin}%` }}
            >
              {cloneElement(child, child.props)}
            </div>
          )
        }
      })}
    </div>
  )

  const buttons = (
    <>
      <a
        className={clsx(
          styles['prev'],
          styles['carousel-wrapper-controls'],
          hideControls && styles['hidden'],
          alignment
        )}
        onClick={() => setAction('prev')}
      ></a>
      <a
        className={clsx(
          styles['next'],
          styles['carousel-wrapper-controls'],
          hideControls && styles['hidden'],
          alignment
        )}
        onClick={() => setAction('next')}
      ></a>
    </>
  )
  var template

  if (draggable) {
    const {
      draggableSliderRef,
      sliderLeft,
      slides,
      sliderWidth,
      indicators,
      alignment,
      handleDragStart,
      handleDragEndHandler,
      handleDragActionHandler,
      handleIndexCheck,
      shiftSlide
    } = draggableHelper(children, itemsToShow, marginless, btnAlignment, indicatorStyle, duration, infinite, autoSlide)

    template = (
      <div className={clsx(styles['carousel-drag-wrapper'], styles['loaded'])}>
        <div className={styles['carousel-drag-wrapper-slider']}>
          <div
            className={styles['carousel-drag-wrapper-slides']}
            style={{
              left: `${sliderLeft}%`,
              width: `${sliderWidth}%`
            }}
            ref={draggableSliderRef}
            onMouseDown={handleDragStart}
            onTouchStart={handleDragStart}
            onTouchEnd={handleDragEndHandler}
            onTouchMove={handleDragActionHandler}
            onTransitionEnd={handleIndexCheck}
          >
            {slides}
          </div>
          <div className={clsx(styles['carousel-wrapper-indicators'])}>{!hideIndicators && indicators}</div>
        </div>
        <a
          id="prev"
          className={clsx(
            styles['carousel-drag-wrapper-control'],
            styles['prev'],
            hideControls && styles['hidden'],
            alignment
          )}
          onClick={() => shiftSlide(-1)}
        ></a>
        <a
          id="next"
          className={clsx(
            styles['carousel-drag-wrapper-control'],
            styles['next'],
            hideControls && styles['hidden'],
            alignment
          )}
          onClick={() => shiftSlide(1)}
        ></a>
      </div>
    )
  } else {
    template = (
      <>
        <div className={clsx(styles['carousel-wrapper'], carouselClass)}>
          {slider}
          <div className={clsx(styles['carousel-wrapper-indicators'])}>{!hideIndicators && indicators}</div>
        </div>
        {buttons}
      </>
    )
  }
  return template
}

export default Carousel
