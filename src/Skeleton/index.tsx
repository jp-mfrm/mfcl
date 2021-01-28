import React, { FunctionComponent } from 'react'

import clsx from 'clsx'
import styles from './skeleton.module.scss'

interface Props {
  /** Sets the skeleton-pulse style */
  type?: 'text' | 'image' | 'button' | 'button-secondary'
  /** Sets the width of the skeleton. Default unit is px. */
  width?: number | string
  /** Sets the height of the skeleton. Default unit is px. */
  height?: number | string
  /** Makes the skeleton look like a circle */
  circle?: boolean
  /** Override classNames on wrapper */
  className?: string
  /** Override styles on wrapper */
  style?: object
  [rest: string]: unknown // ...rest property
}

const getValidCSSInput = (input: string | number) => {
  switch (typeof input) {
    case 'undefined':
    case 'boolean':
      return null
    case 'number':
      return `${input}px`
    default:
      const parsedInput = parseFloat(input)
      const unit = input.match(/%|em/)
      return isNaN(parsedInput) ? '' : unit ? `${parsedInput}${unit}` : parsedInput + 'px'
  }
}

const Skeleton: FunctionComponent<Props> = ({
  width,
  height,
  circle,
  type = 'text',
  className = '',
  style = {},
  ...rest
}) => {
  const isTextType = type === 'text'

  return (
    <span
      {...rest}
      className={clsx(
        styles.pulse,
        styles[`${type}`],
        isTextType && styles.transform,
        type === 'button-secondary' && styles.button,
        circle && styles.circle,
        className
      )}
      style={{
        ...style,
        //@ts-ignore
        width: `${getValidCSSInput(width) ?? (isTextType ? '100%' : '')}`,
        //@ts-ignore
        height: `${getValidCSSInput(height) ?? ''}`
      }}
    />
  )
}

export default Skeleton
