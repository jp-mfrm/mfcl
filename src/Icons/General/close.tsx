import React from 'react'

interface Props {
  width?: string | number
  height?: string | number
  fillColor?: string
  [x: string]: unknown // for the rest property
}

const Close: React.FunctionComponent<Props> = ({ width = '26', height = '26', fillColor = '#2D2926', ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} {...rest} fill="none" viewBox="0 0 26 26">
    <mask id="yr1ttl3jva" width="26" height="26" x="0" y="0" maskUnits="userSpaceOnUse">
      <path
        fill="#fff"
        d="M13.69 13L24.86 1.84c.193-.193.193-.507 0-.7-.193-.193-.507-.193-.7 0L13 12.31 1.84 1.14c-.193-.193-.507-.193-.7 0-.193.193-.193.507 0 .7L12.31 13 1.14 24.16c-.193.193-.193.507 0 .7.193.193.507.193.7 0L13 13.69l11.16 11.17c.193.193.507.193.7 0 .193-.193.193-.507 0-.7L13.69 13z"
      />
    </mask>
    <g mask="url(#yr1ttl3jva)">
      <path fill={fillColor} d="M-2 -2H28V28H-2z" />
    </g>
  </svg>
)

export default Close
