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

  const marker = storeLocation && <MapMarker fillColor="#d63426" className={styles.mapMarker} />
  const arrow = storeLocation && <ChevronRight style={{ transform: 'rotate(90deg)', marginRight: '10px' }} />
  const btnText = storeLocation ? <span className={styles.mobileColor}>Available to try in-store</span> : 'Online Only'

  return (
    <button
      className={clsx(styles['store-location-btn'], storeLocation && styles.align, className)}
      onClick={() => handleClick()}
    >
      <span className={clsx(styles['store-location-btn-filling'])}>
        {marker} {btnText} <span className={styles.location}>{storeLocation}</span>
      </span>{' '}
      {arrow}
    </button>
  )
}

export default StoreLocationButton
