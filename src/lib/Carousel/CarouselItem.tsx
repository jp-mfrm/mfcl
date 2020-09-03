import React, { FunctionComponent, useState } from 'react'

import styles from './carousel.module.scss'

interface Props {
  [rest: string]: unknown // ...rest property
}

const CarouselItem: FunctionComponent<Props> = ({ children, ...rest }) => {
  return <div {...rest}>{children}</div>
}

export default CarouselItem
