import React, { FunctionComponent } from 'react'
import styles from './carousel.module.scss'

interface Props {
  [rest: string]: unknown // ...rest property
}

const CarouselItem: FunctionComponent<Props> = ({ ...rest }) => {
  const itemStyles = {}
  return <div style={itemStyles} {...rest}></div>
}

export default CarouselItem
