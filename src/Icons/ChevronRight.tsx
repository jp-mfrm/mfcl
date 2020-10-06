import React from 'react'

interface Props {
  width?: string | number
  height?: string | number
  fillColor?: string
  [x: string]: unknown // for the rest property
}

const ChevronRight: React.FunctionComponent<Props> = ({
  width = '8',
  height = '12',
  fillColor = '#2D2926',
  ...rest
}) => (
  <svg width={width} height={height} viewBox="0 0 8 12" {...rest}>
    <path
      d="M1.29594 11.3336C1.16631 11.3334 1.04117 11.286 0.943944 11.2003C0.852565 11.1212 0.800049 11.0064 0.800049 10.8856C0.800049 10.7648 0.852565 10.6499 0.943944 10.5709L6.00528 6.00025L0.943944 1.42959C0.852565 1.35057 0.800049 1.23573 0.800049 1.11492C0.800049 0.994113 0.852565 0.879273 0.943944 0.800253C1.14442 0.626478 1.44214 0.626478 1.64261 0.800253L7.05595 5.68559C7.1457 5.76583 7.19789 5.87988 7.19995 6.00025C7.19855 6.12077 7.14624 6.23508 7.05595 6.31492L1.64261 11.2003C1.54676 11.2848 1.42374 11.3321 1.29594 11.3336Z"
      fill={fillColor}
    />
  </svg>
)

export default ChevronRight
