import React, { FunctionComponent } from 'react'
import carouselHelper, { CarouselSettings, CarouselChips } from './carouselHelper'

import clsx from 'clsx'
import styles from './carousel.module.scss'

interface Props {
  /** Aria label to set apart different carousels in the page.
   * Label is prefixed with 'carousel-'
   */
  ariaLabel: string
  /** Enables automatic transitions. */
  autoSlide?: boolean
  /** Sets the class for the Carousel wrapper */
  carouselClass?: string
  /** List of carousel chips to be rendered (sets itemsToShow to 1 and infinite to false) */
  chips?: CarouselChips
  /** Disables the control buttons */
  disableControls?: boolean
  /** Time in milliseconds for autoSlide */
  duration?: number
  /** List of carousel chips to be rendered.
   *  Will override the following props: itemsToShow */
  itemsToShow?: number
  /** Sets the transition control button alignments. Two non conflicting configurations can be combined.
   * Valid configurations are: 'top', 'middle', 'center', 'apart', 'left', 'right', 'bottom'.
   * 'middle' centers vertically while 'center' centers horizontally. */
  controlAlignment?: string
  /** Sets the class for the control buttons */
  controlClass?: string
  /** Sets the control buttons' style */
  controlStyle?: 'square' | 'round' | 'legacy'
  /** Hides control buttons unless hovered */
  hideControls?: boolean
  /** Hides indicator buttons */
  hideIndicators?: boolean
  /** Sets the indicator buttons' style */
  indicatorStyle?: 'bar' | 'round'
  /** Sets indicator bar background color*/
  indicatorBg?: 'dark' | 'light'
  /** Allows Carousel to be cyclical. */
  infinite?: boolean
  /** Supply a px margin between slides */
  layoutGap?: number
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
  /** Indicate if slides have variable width (sets itemsToShow to 1 and infinite to false) */
  variableWidth?: boolean
  [rest: string]: unknown // ...rest property
}

const Carousel: FunctionComponent<Props> = ({
  ariaLabel,
  autoSlide = false,
  carouselClass,
  chips = undefined,
  children,
  controlAlignment = 'middle apart',
  controlClass = '',
  controlStyle = 'square',
  disableControls = false,
  duration = 3000,
  hideControls = false,
  hideIndicators = false,
  indicatorStyle = 'round',
  indicatorBg = 'light',
  itemsToShow = 1,
  layoutGap = 0,
  infinite = false,
  responsive = [{}],
  variableWidth = false
}) => {
  const helperSettings: CarouselSettings = {
    autoSlide,
    children,
    chips,
    controlAlignment,
    controlClass,
    controlStyle,
    disableControls,
    duration,
    hideControls,
    hideIndicators,
    indicatorStyle,
    infinite,
    itemsToShow,
    layoutGap,
    //@ts-ignore
    responsive,
    variableWidth
  }
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
  } = carouselHelper(helperSettings)

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
      className={clsx(styles['carousel-wrapper'], styles['loaded'], styles['carousel-chips'], carouselClass)}
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
          onClickCapture={handleClickViaCapturing}
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
