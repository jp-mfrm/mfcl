import React from 'react'

interface Props {
  width?: string | number
  height?: string | number
  className?: string
  fillColor?: string
  [x: string]: unknown // for the rest property
}

const ChevronRightCircle: React.FunctionComponent<Props> = ({
  width = '24',
  height = '24',
  fillColor = '#D63426',
  ...rest
}) => (
  <svg className={rest.className} width={width} height={height} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="12" fill={fillColor} />
    <circle cx="12" cy="12" r="11" fill="white" />
    <path
      d="M9.29594 17.3336C9.16631 17.3334 9.04117 17.286 8.94394 17.2003C8.85256 17.1212 8.80005 17.0064 8.80005 16.8856C8.80005 16.7648 8.85256 16.6499 8.94394 16.5709L14.0053 12.0003L8.94394 7.42959C8.85256 7.35057 8.80005 7.23573 8.80005 7.11492C8.80005 6.99411 8.85256 6.87927 8.94394 6.80025C9.14442 6.62648 9.44214 6.62648 9.64261 6.80025L15.0559 11.6856C15.1457 11.7658 15.1979 11.8799 15.1999 12.0003C15.1985 12.1208 15.1462 12.2351 15.0559 12.3149L9.64261 17.2003C9.54676 17.2848 9.42374 17.3321 9.29594 17.3336Z"
      fill={fillColor}
    />
  </svg>
)

export default ChevronRightCircle
