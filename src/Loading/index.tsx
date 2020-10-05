import React, { memo } from 'react'
import Spinner from '../Icons/Spinner'

import styles from './loading.module.scss'

export interface Props {
  /** Override styles on wrapper */
  className?: string
  /** RBA or HEX value of spinner */
  color?: string
  /** Size of height/width of spinner */
  size?: 'sm' | 'md' | 'lg'
  /** Different types of spinners */
  type?: 'ring' | 'dots' // Pass "ring" for loading circle or "dots" for loading dots
  [x: string]: unknown // ...rest property
}

const sizes = {
  sm: '25px',
  md: '34px',
  lg: '44px'
}

const Loading: React.FunctionComponent<Props> = ({
  className = '',
  color = '#d63426',
  size = 'md',
  type = 'ring',
  ...rest
}) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  const loadingSize: string = sizes[size] || size // can be 'sm', 'md', 'lg' or a pixel size
  const dotStyle = {
    color,
    fontSize: `${loadingSize}`
  }
  const ringClassNameWrapper = `${styles['loading-ring']} ${className}`.trim()
  const dotsClassNameWrapper = `${styles['loading-dots']} ${className}`.trim()

  if (type === 'dots') {
    return <div className={dotsClassNameWrapper} style={dotStyle} {...rest} />
  }

  return (
    <div className={ringClassNameWrapper} {...rest}>
      <Spinner strokeColor={color} width={loadingSize} height={loadingSize} data-testid="spinner" />
    </div>
  )
}

export default memo(Loading)
