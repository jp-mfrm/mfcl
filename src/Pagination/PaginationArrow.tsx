import React, { FunctionComponent } from 'react'
import clsx from 'clsx'
import ChevronRight from '../Icons/ChevronRight'
import ChevronLeft from '../Icons/ChevronLeft'

import styles from './pagination.module.scss'

interface Props {
  arrowType: 'Previous' | 'Next'
  show: boolean
  [rest: string]: unknown
}

const PaginationArrow: FunctionComponent<Props> = ({ arrowType, className, show, ...rest }) => {
  return (
    <li>
      <button
        aria-label={`${arrowType} page`}
        aria-hidden={!show}
        disabled={!show}
        className={clsx(styles.arrowButton, !show && styles.hideArrow)}
        type="button"
        {...rest}
      >
        {arrowType === 'Previous' ? (
          <ChevronLeft width="13" height="18" fillColor="#D63426" aria-hidden focusable={false} />
        ) : (
          <ChevronRight width="13" height="18" fillColor="#D63426" aria-hidden focusable={false} />
        )}
      </button>
    </li>
  )
}

export default PaginationArrow
