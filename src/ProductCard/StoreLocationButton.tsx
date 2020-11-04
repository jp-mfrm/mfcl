import React, { FunctionComponent } from 'react'
import ChevronRight from '../Icons/ChevronRight'
import MapMarker from '../Icons/MapMarker'
import clsx from 'clsx'

import styles from './productCard.module.scss'

interface Props {
  storeLocation?: string
  onClick?: Function
  className?: string
}

const StoreLocationButton: FunctionComponent<Props> = ({ storeLocation, className, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick
    }
  }

  const marker = storeLocation && <MapMarker style={{ margin: '0 5px' }} />
  const arrow = storeLocation && <ChevronRight style={{ transform: 'rotate(90deg)', marginRight: '10px' }} />
  const btnText = storeLocation ? 'Available to try in' : 'Online Only'

  return (
    <button className={clsx(styles['store-location-btn'], className)} onClick={() => handleClick()}>
      <span className={styles['store-location-btn-filling']}>
        {marker} {btnText} <span className={styles.location}>{storeLocation}</span>
      </span>{' '}
      {arrow}
    </button>
  )
}

export default StoreLocationButton
