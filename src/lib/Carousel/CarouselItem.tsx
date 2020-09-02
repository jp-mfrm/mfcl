import React, { FunctionComponent, useState } from 'react'

import styles from './carousel.module.scss'

interface Props {
  [rest: string]: unknown // ...rest property
}

const CarouselItem: FunctionComponent<Props> = ({ ...rest }) => {
  const itemStyles = {
    width: 100 + '%',
    height: 'auto'
  }
  return <div style={itemStyles}> test </div>
}

export default CarouselItem
