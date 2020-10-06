import React from 'react'

interface Props {
  width?: string | number
  height?: string | number
  fillColor?: string
  [x: string]: unknown // for the rest property
}

const Plus: React.FunctionComponent<Props> = ({ width = '18', height = '18', fillColor = '#2D2926', ...rest }) => (
  <svg width={width} height={height} viewBox="0 0 18 18" {...rest}>
    <path
      fill={fillColor}
      d="M17.53 8.53H9.47V.47C9.47.21 9.26 0 9 0s-.47.21-.47.47v8.06H.47C.21 8.53 0 8.74 0 9s.21.47.47.47h8.06v8.06c0 .26.21.47.47.47s.47-.21.47-.47V9.47h8.06c.26 0 .47-.21.47-.47s-.21-.47-.47-.47z"
    />
  </svg>
)

export default Plus
