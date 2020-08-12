import React, { memo } from 'react'

import styles from './loading.module.scss'

type Props = {
  className?: string
  color?: string
  size?: string
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
  color = '#000',
  size = 'sm',
  type = 'ring',
  ...rest
}) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  const loadingSize: string = sizes[size] || size // can be 'sm', 'md', 'lg' or a pixel size
  const ringStyle = {
    border: `1px solid ${color}`,
    borderColor: `${color} transparent transparent transparent`,
    height: loadingSize,
    width: loadingSize
  }
  const dotStyle = {
    color,
    fontSize: `${loadingSize}`
  }
  const ringClassNameWrapper = `${styles['loading-ring']} ${className}`.trim()
  const dotsClassNameWrapper = `${styles['loading-dots']} ${className}`.trim()

  if (type === 'dots') {
    return <div className={dotsClassNameWrapper} style={dotStyle} {...rest} />
  }

  // TODO: change to SVG
  return (
    <div className={ringClassNameWrapper} {...rest}>
      <div style={ringStyle} />
      <div style={ringStyle} />
      <div style={ringStyle} />
      <div style={ringStyle} />
    </div>
  )
}

export default memo(Loading)
