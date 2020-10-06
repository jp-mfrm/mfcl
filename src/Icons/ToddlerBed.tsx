import React from 'react'

interface Props {
  width?: string | number
  height?: string | number
  fillColor?: string
  [x: string]: unknown // for the rest property
}

const ToddlerBed: React.FunctionComponent<Props> = ({
  width = '24',
  height = '16',
  fillColor = '#2D2926',
  ...rest
}) => (
  <svg width={width} height={height} viewBox="0 0 24 16" {...rest}>
    <path
      fill={fillColor}
      fillRule="evenodd"
      d="M23 7c0-.276.224-.5.5-.5s.5.224.5.5v8.5c0 .276-.224.5-.5.5s-.5-.224-.5-.5v-1H1v1c0 .276-.224.5-.5.5s-.5-.224-.5-.5V.5C0 .224.224 0 .5 0s.5.224.5.5v9h10c.523-.002.958.4 1 .92V12h10c.276 0 .5.224.5.5s-.224.5-.5.5H12v.47h11V7zM9 13.5h2V13H9v.5zM8 12H6.25v-1.54H8V12zm-4.5 0h1.75v-1.52H3.5V12zm1.75 1v.47H3.5V13h1.75zM8 13H6.25v.47H8V13zm3-2.58V12H9v-1.56l2-.02zm-8.5.08H1v2.97h1.5V13H2c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h.5v-1.5z"
      clipRule="evenodd"
    />
  </svg>
)

export default ToddlerBed
