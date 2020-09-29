import React, { FunctionComponent } from 'react'

interface Props {
  width?: string | number
  height?: string | number
  backgroundStrokeColor?: string
  strokeColor?: string
  [x: string]: unknown // for the rest property
}

const Spinner: FunctionComponent<Props> = ({
  width = '35px',
  height = '35px',
  strokeColor = '#d63426',
  backgroundStrokeColor = '#d8d8d8',
  ...rest
}) => (
  <svg width={width} height={height} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" {...rest}>
    <circle cx="50" cy="50" r="30" stroke={backgroundStrokeColor} strokeWidth="10" fill="none"></circle>
    <circle cx="50" cy="50" r="30" stroke={strokeColor} strokeWidth="8" strokeLinecap="round" fill="none">
      <animateTransform
        attributeName="transform"
        type="rotate"
        repeatCount="indefinite"
        dur="1.4492753623188404s"
        values="0 50 50;180 50 50;720 50 50"
        keyTimes="0;0.5;1"
      ></animateTransform>
      <animate
        attributeName="stroke-dasharray"
        repeatCount="indefinite"
        dur="1.4492753623188404s"
        values="18.84955592153876 169.64600329384882;94.2477796076938 94.24777960769377;18.84955592153876 169.64600329384882"
        keyTimes="0;0.5;1"
      ></animate>
    </circle>
  </svg>
)

export default Spinner
