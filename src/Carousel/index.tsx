import React, {
  FunctionComponent,
  useRef,
  ReactNode,
  isValidElement,
  cloneElement,
} from 'react'

import { draggableHelper } from './carouselHelper'
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
  /** Aria label to set apart different carousels in the page
   * label is prefixed with 'carousel-'
   */
  ariaLabel : string
  /** Sets how many slides to show */
  itemsToShow?: number
  /** Sets how many slides to scroll per click */
  itemsToScroll?: number
  /** Sets the transition control button alignments. Two non conflicting configurations can be combined.
   * 'middle' centers vertically while 'center' centers horizontally. */
  btnAlignment?: string | 'top' | 'middle' | 'center' | 'apart' | 'left' | 'right' | 'bottom' 
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
  ariaLabel,
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
    draggableSliderRef,
    sliderLeft,
    slides,
    sliderWidth,
    indicatorWrapper,
    alignment,
    handleDragStart,
    handleDragEndHandler,
    handleDragActionHandler,
    handleIndexCheck,
    shiftSlide
  } = draggableHelper(
    children,
    itemsToShow,
    marginless,
    btnAlignment,
    hideIndicators,
    indicatorStyle,
    duration,
    infinite,
    autoSlide
  )

  const buttons = 
  <>
    <button
      id="prev"
      aria-hidden={hideControls && "true" || "false"}
      className={clsx(
        styles['carousel-drag-wrapper-control'],
        styles['prev'],
        hideControls && styles['hidden'],
        alignment
      )}
      onClick={() => shiftSlide(-1)}
    >
      <p className={clsx(styles["sr-only"])}>
        Move Slider Left Button.
      </p>
    </button>
    <button
      id="next"
      aria-hidden={hideControls && "true" || "false"}
      className={clsx(
        styles['carousel-drag-wrapper-control'],
        styles['next'],
        hideControls && styles['hidden'],
        alignment
      )}
      onClick={() => shiftSlide(1)}
    >
      <p className={clsx(styles["sr-only"])}>
        Move Slider Right Button.
      </p>
    </button>
  </>

  const screenReaderInstructions = 
  <p className={clsx(styles["sr-only"])}>
    {draggable && 'This is a draggable carousel.' || 'This is a carousel'} 
    {autoSlide && "It has auto-rotating slides"}
    Use Next and Previous buttons to navigate. 
    {!hideIndicators && 'You can also jump to a slide using the slide dots.'}
  </p>

  const template = (
    <section className={clsx(styles['carousel-drag-wrapper'], styles['loaded'], carouselClass)} aria-label={'carousel-' + ariaLabel}>
      {screenReaderInstructions}
      <div className={styles['carousel-drag-wrapper-slider']}>
        <div
          className={styles['carousel-drag-wrapper-slides']}
          aria-live="off"
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
        {indicatorWrapper}
      </div>
        {buttons}
      </section>
    )
  
  return template
}

export default Carousel
