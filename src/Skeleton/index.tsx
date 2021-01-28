import React, { FunctionComponent } from 'react'

import clsx from 'clsx'
import styles from './skeleton.module.scss'

interface Props {
  /** Sets the skeleton-pulse style */
  type?: 'text' | 'image' | 'button' | 'button-secondary'
  /** Sets the width of the skeleton. */
  width?: number | string | []
  /** Sets the height of the skeleton. */
  height?: number | string | []
  /** Makes the skeleton look like a circle */
  circle?: boolean
  [rest: string]: unknown // ...rest property
}

const Skeleton: FunctionComponent<Props> = ({ type = 'text', width, height, circle, ...rest }) => {
  const isTextType = type === 'text'
  const inlineStyle = {
    // @ts-ignore
    ...rest.style,
    width: `${width ?? (isTextType ? '100%' : '')}`,
    height: `${height}`
  }

  return (
    <span
      className={clsx(
        styles.pulse,
        styles[`${type}`],
        isTextType && styles.transform,
        type === 'button-secondary' && styles.button,
        circle && styles.circle,
        rest.className as string
      )}
      style={inlineStyle}
    />
  )
}

export default Skeleton
