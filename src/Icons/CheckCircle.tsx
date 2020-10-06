import React from 'react'

interface Props {
  width?: string | number
  height?: string | number
  className?: string
  fillColor?: string
  [x: string]: unknown // for the rest property
}

const CheckCircle: React.FunctionComponent<Props> = ({
  width = '24',
  height = '24',
  fillColor = '#006601',
  ...rest
}) => (
  <svg className={rest.className} width={width} height={height} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="12" fill={fillColor} />
    <circle cx="12" cy="12" r="11" fill="white" />
    <path
      d="M11.2104 15.4139L7.56053 11.8198L7 12.5L10.6332 16.3133C10.7914 16.5243 11.0212 16.6299 11.2849 16.6299C11.5245 16.6131 11.7467 16.4987 11.8994 16.3133L18.5 8.5L17.5 8L11.2104 15.4139Z"
      fill="#006601"
    />
  </svg>
)

export default CheckCircle
