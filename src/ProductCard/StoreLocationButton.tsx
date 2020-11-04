import React, { FunctionComponent } from 'react'
import styles from './productCard.module.scss'

interface Props {
  storeLocation: string
  onClick?: Function
  className?: string
}

const StoreLocationButton: FunctionComponent<Props> = ({ storeLocation, className, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick
    }
  }

  return (
    <button className={styles['store-location-btn']} onClick={() => handleClick()}>
      Available to try in <b>{storeLocation}</b>
    </button>
  )
}

export default StoreLocationButton
