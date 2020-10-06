import React from 'react'

interface Props {
  width?: string | number
  height?: string | number
  className?: string
  fillColor?: string
  stroke?: string
  [x: string]: unknown // for the rest property
}

const CircleSolid: React.FunctionComponent<Props> = ({
  width = '24',
  height = '24',
  fillColor = '#F7D7D5',
  stroke = '#D63426',
  ...rest
}) => (
  <svg className={rest.className} width={width} height={height} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="11.5" fill={fillColor} stroke={stroke} />
  </svg>
)

export default CircleSolid
