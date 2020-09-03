import React, { FunctionComponent, Children, useState, isValidElement, cloneElement, useEffect, createRef, useRef, useLayoutEffect } from "react";
import clsx from 'clsx'
import styles from "./carousel.module.scss";
import useTransition from './useTransition';

interface Props {
  /** Time in milliseconds before carousel auto slides */
  duration?: number
  // width?: number
  navAlign?: 'top' | 'center' | 'bottom'
  btnAlign?: 'buttons-left' | 'buttons-center' | 'buttons-right' | 'buttons-apart'
  [rest: string]: unknown; // ...rest property
}

const Carousel: FunctionComponent<Props> = ({
  children,
  navAlign = 'center',
  btnAlign = 'buttons-apart',
  duration,
  ...rest 
}) => {

  const unit:string = 'px';

  const {
    translate,
    items,
    width,
    setAction
  } = useTransition(children);

  const handleNext = () => setAction('next');
  const handlePrev = () => setAction('prev');
  
  

  const slides = 
  items.map((item, index) => {
    return(
      <div key={index} className={clsx(styles['carousel-wrapper-container-inner-item'])} style={{width: `${width}${unit}`}}>
        {item}
      </div>
    );
  })

  const buttons = 
  <div className={clsx(styles['carousel-wrapper-controls'])}>
    <button className={clsx(styles['carousel-wrapper-controls-next'])} onClick={handleNext}>Next</button>
    <button className={clsx(styles['carousel-wrapper-controls-prev'])} onClick={handlePrev}>Prev</button>
  </div>


  return (
    <div className={clsx(styles['carousel-wrapper'])} style={{width: `${width}${unit}`}}>
      <div className={clsx(styles['carousel-wrapper-container'])}>
        <div className={clsx(styles['carousel-wrapper-container-inner'])} style={{width: `${width * items.length}${unit}`, transform: `translateX(-${translate}${unit})`}}>
          {slides}
        </div>
      </div>
      {buttons}
    </div>
  );

};

export default Carousel;
