import React from 'react'

interface Props {
  width?: string | number
  height?: string | number
  fillColor?: string
  [x: string]: unknown // for the rest property
}

const Location: React.FunctionComponent<Props> = ({ width = '25', height = '25', fillColor = '#2D2926', ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} {...rest} fill="none" viewBox="0 0 25 25">
    <mask id="yre6p1iena" width="25" height="26" x="0" y="0" maskUnits="userSpaceOnUse">
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M19.74 18.22l4.17 6c.109.153.12.355.03.52-.098.166-.278.265-.47.26H.56c-.192.005-.372-.094-.47-.26-.1-.159-.1-.36 0-.52l4.17-6c.102-.141.266-.223.44-.22h4.08c-2.1-3-4.6-7.13-4.6-9.5C4.273 4.272 7.771.916 12 1c4.229-.084 7.727 3.272 7.82 7.5 0 2.37-2.5 6.5-4.6 9.5h4.08c.174-.003.338.079.44.22zM12 2c3.663-.067 6.693 2.837 6.78 6.5 0 3.14-5.22 10.18-6.78 12.16-1.56-2-6.78-9-6.78-12.16C5.307 4.837 8.337 1.933 12 2zM1.5 24L5 19h4.5c.794 1.106 1.467 1.991 1.82 2.455.146.19.237.31.26.345.102.127.257.2.42.2.163 0 .318-.073.42-.2l.093-.119c.273-.346 1.069-1.354 1.987-2.68H19l3.48 5H1.5zM9.39 8.5c0-1.441 1.168-2.61 2.61-2.61 1.441 0 2.61 1.169 2.61 2.61 0 1.442-1.168 2.61-2.61 2.61-1.441 0-2.61-1.168-2.61-2.61zM12 4.85c2.016 0 3.65 1.634 3.65 3.65s-1.634 3.65-3.65 3.65-3.65-1.634-3.65-3.65S9.984 4.85 12 4.85z"
        clipRule="evenodd"
      />
    </mask>
    <g mask="url(#yre6p1iena)">
      <path fill={fillColor} d="M-3 -2H27V28H-3z" />
    </g>
  </svg>
)

export default Location
