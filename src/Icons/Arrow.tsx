import React from 'react'

interface Props {
  width?: string | number
  height?: string | number
  fillColor?: string
  [x: string]: unknown // for the rest property
}

const Arrow: React.FunctionComponent<Props> = ({ width = '12', height = '21', fillColor = '#2D2926', ...rest }) => (
  <svg fill="none" viewBox="0 0 12 21" {...rest}>
    <mask id="r0z7mlnq3a" width="12" height="20" x="0" y="0" maskUnits="userSpaceOnUse">
      <path
        fill="#fff"
        d="M.93 20c-.243 0-.478-.09-.66-.25-.171-.148-.27-.363-.27-.59 0-.227.099-.442.27-.59L9.76 10 .27 1.43C.099 1.282 0 1.067 0 .84 0 .613.1.398.27.25c.376-.326.934-.326 1.31 0l10.15 9.16c.168.15.266.364.27.59-.003.226-.1.44-.27.59L1.58 19.75c-.18.159-.41.247-.65.25z"
      />
    </mask>
    <g mask="url(#r0z7mlnq3a)">
      <path fill={fillColor} d="M-9 -5H21V25H-9z" />
    </g>
  </svg>
)

export default Arrow
