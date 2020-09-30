import React from 'react'

interface Props {
  width?: string | number
  height?: string | number
  fillColor?: string
  [x: string]: unknown // for the rest property
}

const ChevronRight: React.FunctionComponent<Props> = ({
  width = '24',
  height = '24',
  fillColor = '#2D2926',
  ...rest
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={fillColor}
    stroke-width="1"
    stroke-linecap="round"
    stroke-linejoin="round"
    {...rest}
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

export default ChevronRight
