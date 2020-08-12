import React, { memo, FunctionComponent } from 'react'
import clsx from 'clsx'
import styles from './progressBar.module.scss'

export interface Props {
  className?: string
  innerRef?: any
  max?: number
  min?: number
  transitionDuration?: number
  value?: number
  [rest: string]: unknown
}

const ProgressBar: FunctionComponent<Props> = ({
  className = '',
  value = 0,
  innerRef = null,
  max = 100,
  min = 0,
  transitionDuration = 0.2,
  ...rest
}) => (
  <div
    className={clsx(styles.root, className)}
    role="progressbar"
    aria-valuenow={Math.round(value)}
    aria-valuemin={min}
    aria-valuemax={max}
    ref={innerRef}
    {...rest}
  >
    <div
      className={styles.bar}
      style={{
        transform: `translateX(${(value / max) * 100 - 100}%)`,
        transition: `transform ${transitionDuration}s linear`
      }}
    />
  </div>
)

export default memo(ProgressBar)
