import React from 'react'

interface Props {
  width?: string | number
  height?: string | number
  fillColor?: string
  [x: string]: unknown // for the rest property
}

const AdjustableBaseFull: React.FunctionComponent<Props> = ({
  width = '24',
  height = '14',
  fillColor = '#2D2926',
  ...rest
}) => (
  <svg width={width} height={height} fill="none" viewBox="0 0 24 14" {...rest}>
    <mask id="if0bxpw4ea" width="24" height="14" x="0" y="0" maskUnits="userSpaceOnUse">
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M23.16 6.726c0 .12.12.12.24.12.24 0 .48-.11.48-.2.13-.29.028-.63-.24-.8l-7.2-3.45c-.184-.111-.415-.111-.6 0l-4.67 3.31H5.65L1.09.226C.884-.026.517-.074.25.116c-.24.23-.36.57-.12.8l4.8 5.7c.12.142.295.225.48.23h6c.16.018.31-.078.36-.23l4.55-3.19 6.84 3.3zm.24 2.4H.61c-.314 0-.57-.255-.57-.57 0-.315.256-.57.57-.57H23.4c.316 0 .57.255.57.57 0 .315-.254.57-.57.57zm0 1.14H.61c-.314 0-.57.255-.57.57 0 .315.256.57.57.57h1.8v1.71c-.006.159.057.312.172.421.114.11.271.164.429.15.158.014.314-.04.43-.15.114-.109.176-.263.17-.42v-1.71H20.4v1.71c0 .33.268.6.6.6.331 0 .6-.27.6-.6v-1.71h1.8c.315 0 .57-.256.57-.57 0-.316-.255-.57-.57-.57z"
        clipRule="evenodd"
      />
    </mask>
    <g mask="url(#if0bxpw4ea)">
      <path fill={fillColor} d="M-3 -9H27V21H-3z" />
    </g>
  </svg>
)

export default AdjustableBaseFull
