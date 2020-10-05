import React, { memo, FunctionComponent } from 'react'
import clsx from 'clsx'
import styles from './progressBar.module.scss'

export interface Props {
  /** Override styles to wrapper */
  className?: string
  /** Max number the progress bar goes */
  max?: number
  /** The number the progress bar starts at */
  min?: number
  /** the duration of the animation */
  transitionDuration?: number
  /** the current progress value */
  value?: number
  [rest: string]: unknown
}

const ProgressBar: FunctionComponent<Props> = ({
  className = '',
  value = 0,
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
