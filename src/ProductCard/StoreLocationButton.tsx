import React, { FunctionComponent } from 'react'
import ChevronRight from '../Icons/ChevronRight'
import MapMarker from '../Icons/MapMarker'
import clsx from 'clsx'

import styles from './productCard.module.scss'
import ChevronLeft from '../Icons/ChevronLeft'

interface Props {
  storeLocation?: string
  btnText: string
  onClick?: Function
  className?: string
}

const StoreLocationButton: FunctionComponent<Props> = ({ storeLocation, className, btnText, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick
    }
  }

  return (
    <button className={clsx(styles['store-location-btn'], className)} onClick={() => handleClick()}>
      <MapMarker /> {btnText} <b>{storeLocation}</b>{' '}
      <ChevronRight style={{ transform: 'rotate(90deg)', marginLeft: '70px' }} />
    </button>
  )
}

export default StoreLocationButton
