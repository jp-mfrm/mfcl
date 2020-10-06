import React from 'react'

interface Props {
  width?: string | number
  height?: string | number
  fillColor?: string
  [x: string]: unknown // for the rest property
}

const ExtraFirmBed: React.FunctionComponent<Props> = ({
  width = '24',
  height = '12',
  fillColor = '#2D2926',
  ...rest
}) => (
  <svg width={width} height={height} viewBox="0 0 24 12" {...rest}>
    <path
      fill={fillColor}
      fillRule="evenodd"
      d="M.5 0C.224 0 0 .224 0 .5s.224.5.5.5h23c.276 0 .5-.224.5-.5s-.224-.5-.5-.5H.5zm0 1.5c-.276 0-.5.224-.5.5s.224.5.5.5h23c.276 0 .5-.224.5-.5s-.224-.5-.5-.5H.5zm23 2H.5c-.276 0-.5.224-.5.5v5c0 .276.224.5.5.5H1v2c0 .276.224.5.5.5s.5-.224.5-.5v-2h20v2c0 .276.224.5.5.5s.5-.224.5-.5v-2h.5c.276 0 .5-.224.5-.5V4c0-.276-.224-.5-.5-.5zM1 4.5v4h22v-4H1z"
      clipRule="evenodd"
    />
  </svg>
)

export default ExtraFirmBed
