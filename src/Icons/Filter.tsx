import React from 'react'

type Props = {
  fillColor?: string
  height?: string | number
  width?: string | number
  [x: string]: unknown
}

const Filter: React.FunctionComponent<Props> = ({ fillColor = '#2D2926', width = 24, height = 18, ...rest }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 24 18" {...rest}>
      <path d="M1 8.91797H23" stroke={fillColor} strokeWidth="2" strokeLinecap="round" />
      <circle cx="7" cy="9" r="2" fill="white" stroke={fillColor} strokeWidth="2" />
      <path d="M1 2.91797H23" stroke={fillColor} strokeWidth="2" strokeLinecap="round" />
      <circle cx="16" cy="3" r="2" fill="white" stroke={fillColor} strokeWidth="2" />
      <path d="M1 14.918H23" stroke={fillColor} strokeWidth="2" strokeLinecap="round" />
      <circle cx="18" cy="15" r="2" fill="white" stroke={fillColor} strokeWidth="2" />
    </svg>
  )
}

export default Filter
