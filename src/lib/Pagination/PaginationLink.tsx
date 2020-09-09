import React, { FunctionComponent, ReactNode } from 'react'
import PropTypes from 'prop-types'

import styles from './pagination.module.scss'

interface Props {
  className?: string
  next?: boolean
  previous?: boolean
  children?: ReactNode
  [rest: string]: unknown // ...rest property
}

export const PaginationLink: FunctionComponent<Props> = ({
  className = '',
  next = false,
  previous = false,
  children = null,
  ...rest
}) => {
  const classes = `${styles['page-link']} ${className}`.trim()
  let defaultAriaLabel
  if (previous) {
    defaultAriaLabel = 'Previous'
    children = (
      <span className={styles.caret} aria-hidden="true" key="caret">
        {'\u2039'}
      </span>
    )
  } else if (next) {
    defaultAriaLabel = 'Next'
    children = (
      <span className={styles.caret} aria-hidden="true" key="caret">
        {'\u203A'}
      </span>
    )
  }
  return (
    <button type="button" {...rest} className={classes} aria-label={defaultAriaLabel}>
      {children}
    </button>
  )
}

PaginationLink.defaultProps = {
  children: null,
  className: '',
  next: false,
  previous: false
}
