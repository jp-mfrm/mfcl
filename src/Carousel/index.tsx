import React, { FunctionComponent } from 'react'

import carouselHelper from './carouselHelper'
import clsx from 'clsx'
import styles from './carousel.module.scss'

interface Props {
  /** Aria label to set apart different carousels in the page.
   * Label is prefixed with 'carousel-'
   */
  ariaLabel: string
  /** Sets the class for the Carousel wrapper */
  carouselClass?: string
  /** Sets how many slides to show */
  itemsToShow?: number
  /** Sets the transition control button alignments. Two non conflicting configurations can be combined.
   * Valid configurations are: 'top', 'middle', 'center', 'apart', 'left', 'right', 'bottom'.
   * 'middle' centers vertically while 'center' centers horizontally. */
  controlAlignment?: string
  /** Sets the control buttons' style */
  controlStyle?: 'square' | 'round'
  /** Hides control buttons unless hovered */
  hideControls?: boolean
  /** Sets the indicator buttons' style */
  indicatorStyle?: 'bar' | 'round'
  /** Sets indicator bar background color*/
  indicatorBg?: 'dark' | 'light'
  /** Hides indicator buttons */
  hideIndicators?: boolean
  /** Supply a px margin between slides */
  layoutGap?: number
  /** Allows Carousel to be cyclical. */
  infinite?: boolean
  /** Enables automatic transitions. */
  autoSlide?: boolean
  /** Time in milliseconds for autoSlide */
  duration?: number
  /** Override props at certain breakpoints  
  

  responsive prop properties:   


    breakpoint: number,  
    itemsToShow: number,   
    controlAlignment: string,    
    hideIndicators: boolean,   
    hideControls: boolean,  
    indicatorStyle: string,   
    layoutGap: number   
  
  */
  responsive?: object[]
  [rest: string]: unknown // ...rest property
}

const Carousel: FunctionComponent<Props> = ({
  carouselClass,
  ariaLabel,
  itemsToShow = 1,
  controlAlignment = 'middle apart',
  hideIndicators = false,
  hideControls = false,
  indicatorStyle = 'round',
  controlStyle = 'square',
  indicatorBg = 'light',
  layoutGap = 0,
  infinite = false,
  autoSlide = false,
  duration = 3000,
  responsive = [{}],
  children
}) => {
  const {
    slidesRef,
    slidesLeft,
    slides,
    slidesWidth,
    indicators,
    controlButtons,
    indicatorVisibility,
    indicatorRef,
    slidesTransition,
    ariaLive,
    handleDragStart,
    handleDragEndHandler,
    handleDragActionHandler,
    handleIndexCheck,
    handleClickViaCapturing 
  } = carouselHelper(
    children,
    itemsToShow,
    controlAlignment,
    hideControls,
    controlStyle,
    hideIndicators,
    indicatorStyle,
    duration,
    infinite,
    autoSlide,
    layoutGap,
    //@ts-ignore
    responsive
  )

  const screenReaderInstructions = (
    <p className={clsx(styles['sr-only'])}>
      This is a draggable carousel
      {autoSlide && 'It has auto-rotating slides'}
      Use Next and Previous buttons to navigate.
      {!indicatorVisibility && 'You can also jump to a slide using the slide dots.'}
    </p>
  )

  const indicatorWrapper = (
    <div
      ref={indicatorRef}
      className={clsx(styles['carousel-wrapper-indicators'], indicatorBg == 'dark' && styles['dark'])}
    >
      {!indicatorVisibility && indicators}
    </div>
  )

  const template = (
    <section
      className={clsx(styles['carousel-wrapper'], styles['loaded'], carouselClass)}
      aria-label={'carousel-' + ariaLabel}
    >
      {screenReaderInstructions}
      {controlButtons[0]}
      <div className={styles['carousel-wrapper-slider']}>
        <div
          className={styles['carousel-wrapper-slides']}
          aria-live={ariaLive}
          style={{
            left: `${slidesLeft}%`,
            width: `${slidesWidth}%`,
            transition: slidesTransition,
            WebkitTransition: slidesTransition,
            MozTransition: slidesTransition,
            msTransition: slidesTransition,
            OTransition: slidesTransition
          }}
          ref={slidesRef}
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
          onTouchEnd={handleDragEndHandler}
          onTouchMove={handleDragActionHandler}
          onTouchCancel={handleIndexCheck}
          onTransitionEnd={handleIndexCheck}
        >
          {slides}
        </div>
        {!indicatorVisibility && indicatorWrapper}
      </div>
      {controlButtons[1]}
    </section>
  )

  return template
}

export default Carousel
