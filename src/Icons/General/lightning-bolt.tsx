import React from 'react'

interface Props {
  width?: string | number
  height?: string | number
  fillColor?: string
  [x: string]: unknown // for the rest property
}

const LightningBolt: React.FunctionComponent<Props> = ({
  width = '16',
  height = '25',
  fillColor = '#2D2926',
  ...rest
}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} {...rest} fill="none" viewBox="0 0 16 25">
    <mask id="u64sn44m6a" width="16" height="25" x="0" y="0" maskUnits="userSpaceOnUse">
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M3.5 24c.076.015.154.015.23 0 .161-.003.31-.09.39-.23l11-14c.118-.14.141-.336.06-.5-.078-.166-.246-.272-.43-.27H9.63L15.15.75c.085-.156.085-.344 0-.5-.085-.152-.245-.247-.42-.25h-7c-.175 0-.336.096-.42.25L.84 11.85c-.086.145-.086.325 0 .47.083.148.24.24.41.24h5.36L3.27 23.43c-.067.22.029.458.23.57zm3.76-12.45H2.07L8 1h5.85L8.33 9.25c-.09.151-.09.339 0 .49.085.16.25.259.43.26h5L4.95 21.17l2.77-9c.049-.143.022-.3-.07-.42-.088-.128-.235-.204-.39-.2z"
        clipRule="evenodd"
      />
    </mask>
    <g mask="url(#u64sn44m6a)">
      <path fill={fillColor} d="M-7 -3H23V27H-7z" />
    </g>
  </svg>
)

export default LightningBolt
