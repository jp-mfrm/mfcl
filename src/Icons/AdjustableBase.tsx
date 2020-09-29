import React from 'react'

interface Props {
  width?: string | number
  height?: string | number
  fillColor?: string
  [x: string]: unknown // for the rest property
}

const AdjustableBase: React.FunctionComponent<Props> = ({
  width = '24',
  height = '15',
  fillColor = '#2D2926',
  ...rest
}) => (
  <svg width={width} height={height} fill="none" viewBox="0 0 24 15" {...rest}>
    <mask id="01z7ehw39a" width="24" height="15" x="0" y="0" maskUnits="userSpaceOnUse">
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M5.36 7.07c.096.116.24.182.39.18h17.64c.276 0 .5-.223.5-.5 0-.276-.224-.5-.5-.5H6L1 .18C.886.044.707-.022.53.008.354.037.207.16.145.327S.115.683.23.821l5.13 6.25zm18.14 4.22H.5c-.238.049-.41.258-.41.5 0 .244.172.453.41.5h1.81v1.75c0 .277.224.5.5.5s.5-.223.5-.5v-1.75h18.11v1.75c0 .277.224.5.5.5s.5-.223.5-.5v-1.75h1.08c.238-.047.41-.256.41-.5 0-.242-.172-.451-.41-.5zm0-1.29H.5c-.276 0-.5-.223-.5-.5 0-.276.224-.5.5-.5h23c.276 0 .5.224.5.5 0 .277-.224.5-.5.5z"
        clipRule="evenodd"
      />
    </mask>
    <g mask="url(#01z7ehw39a)">
      <path fill={fillColor} d="M-3 -8H27V22H-3z" />
    </g>
  </svg>
)

export default AdjustableBase
