import React from 'react'

interface Props {
  width?: string | number
  height?: string | number
  fillColor?: string
  [x: string]: unknown
}

const Check: React.FunctionComponent<Props> = ({ width = '12', height = '10', fillColor = '#006601', ...rest }) => (
  <svg width={width} height={height} viewBox="0 0 13 11" fill="none">
    <path
      d="M5.20994 8.41387L1.56004 4.81983L0.349609 6.03026L4.61404 10.2947C4.7723 10.5057 5.02067 10.6299 5.28443 10.6299C5.52403 10.6131 5.74623 10.4987 5.89896 10.3133L12.7332 1.69134L11.3924 0.629883L5.20994 8.41387Z"
      fill={fillColor}
    />
  </svg>
)

export default Check
