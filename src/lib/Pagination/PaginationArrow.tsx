import React, { FunctionComponent } from 'react'
import { NextArrow, PreviousArrow } from './arrows'
import clsx from 'clsx'

import styles from './pagination.module.scss'

interface Props {
  previous?: boolean
  next?: boolean
  className?: string
  [rest: string]: unknown // ...rest property
}

const PaginationArrow: FunctionComponent<Props> = ({ previous = false, next = false, className, ...rest }) => {
  let children
  let ariaLabel
  if (previous) {
    ariaLabel = 'Previous'
    children = <PreviousArrow />
  }
  if (next) {
    ariaLabel = 'Next'
    children = <NextArrow />
  }
  return (
    <button aria-label={ariaLabel} className={clsx(styles.arrowButton, className)} {...rest}>
      {children}
    </button>
  )
}

export default PaginationArrow
