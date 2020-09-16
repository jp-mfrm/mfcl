import React, { FunctionComponent } from 'react'
import { PreviousArrow, NextArrow } from './arrows'
import clsx from 'clsx'

import styles from './pagination.module.scss'

interface Props {
  arrowType: 'Previous' | 'Next'
  className?: string
  [rest: string]: unknown // ...rest property
}

const PaginationArrow: FunctionComponent<Props> = ({ arrowType, className, ...rest }) => {
  let children
  if (arrowType === 'Previous') {
    children = <PreviousArrow />
  }
  if (arrowType === 'Next') {
    children = <NextArrow />
  }
  return (
    <button aria-label={arrowType} className={clsx(styles.arrowButton, className)} {...rest}>
      {children}
    </button>
  )
}

export default PaginationArrow
