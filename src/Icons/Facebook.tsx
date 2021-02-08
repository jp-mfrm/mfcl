import React from 'react'

interface Props {
  width?: string | number
  height?: string | number
  fillColor?: string
  variant?: 'stencil' | 'red'
  [x: string]: unknown // for the rest property
}

const Facebook: React.FunctionComponent<Props> = ({
  width,
  height,
  fillColor = '#2D2926',
  variant = 'stencil',
  ...rest
}) => {
  switch (variant) {
    case 'red':
      width = width ?? '35'
      height = height ?? '35'
      return (
        <svg width={width} height={height} viewBox="0 0 35 35" fill="none"  {...rest}>
          <rect width={width} height={height} rx="17.5" fill='#D63426' />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M19.3147 29H14.4372V17.4985H12V13.5355H14.4372V11.1563C14.4372 7.92344 15.8127 6 19.723 6H22.9776V9.96447H20.9435C19.4213 9.96447 19.3207 10.5183 19.3207 11.5518L19.314 13.5355H23L22.5686 17.4985H19.314V29H19.3147Z"
            fill="white"
          />
        </svg>
      )
    default:
      width = width ?? '30'
      height = height ?? '30'
      return (
        <svg width={width} height={height} viewBox="0 0 24 24" {...rest}>
          <path
            fill={fillColor}
            fillRule="evenodd"
            d="M16.5 24h5c.664.003 1.301-.26 1.77-.73.47-.469.733-1.106.73-1.77v-19c.003-.664-.26-1.301-.73-1.77-.469-.47-1.106-.733-1.77-.73h-19C1.12 0 0 1.12 0 2.5v19c-.003.664.26 1.301.73 1.77.469.47 1.106.733 1.77.73h11c.276 0 .5-.224.5-.5v-9c0-.276-.224-.5-.5-.5H11v-2h2.5c.276 0 .5-.224.5-.5v-3c.01-2.48 2.02-4.489 4.5-4.5H20v2h-1.5C17.12 6 16 7.12 16 8.5v3c0 .276.224.5.5.5h3.31l-.67 2H16.5c-.276 0-.5.224-.5.5v9c0 .276.224.5.5.5zm5-1H17v-8h2.5c.212-.005.4-.14.47-.34l1-3c.057-.15.034-.32-.06-.45-.096-.13-.248-.208-.41-.21H17V8.5c0-.828.672-1.5 1.5-1.5h2c.276 0 .5-.224.5-.5v-3c0-.276-.224-.5-.5-.5h-2c-3.035.006-5.495 2.465-5.5 5.5V11h-2.5c-.276 0-.5.224-.5.5v3c0 .276.224.5.5.5H13v8H2.5c-.828 0-1.5-.672-1.5-1.5v-19C1 1.672 1.672 1 2.5 1h19c.828 0 1.5.672 1.5 1.5v19c0 .828-.672 1.5-1.5 1.5z"
            clipRule="evenodd"
          />
        </svg>
      )
  }
}

export default Facebook
