import React from 'react'

interface Props {
  width?: string | number
  height?: string | number
  fillColor?: string
  [x: string]: unknown // for the rest property
}

const Instagram: React.FunctionComponent<Props> = ({ width = '24', height = '24', fillColor = '#2D2926', ...rest }) => (
  <svg width={width} height={height} {...rest} fill="none" viewBox="0 0 24 24">
    <mask id="52fh4xsyba" width="24" height="24" x="0" y="0" maskUnits="userSpaceOnUse">
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M3.5 0h17C22.433 0 24 1.567 24 3.5v17c0 1.933-1.567 3.5-3.5 3.5h-17C1.567 24 0 22.433 0 20.5v-17C0 1.567 1.567 0 3.5 0zM2 1.51v3c0 .276.224.5.5.5s.5-.224.5-.5V1.05c.166-.015.334-.015.5 0H4V4.5c0 .276.224.5.5.5s.5-.224.5-.5V1h1v3.5c0 .276.224.5.5.5s.5-.224.5-.5V1h13.5C21.88 1 23 2.12 23 3.5V7h-7.64c-2.03-1.372-4.69-1.372-6.72 0H1V3.5c.002-.784.372-1.521 1-1.99zM20.5 6h-3c-.276 0-.5-.224-.5-.5v-3c0-.276.224-.5.5-.5h3c.276 0 .5.224.5.5v3c0 .276-.224.5-.5.5zM18 3h2v2h-2V3zm-3 9c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm-1 0c0-1.105-.895-2-2-2s-2 .895-2 2 .895 2 2 2 2-.895 2-2zM3.5 23C2.12 23 1 21.88 1 20.5V8h6.54c-2.162 2.402-2.032 6.085.292 8.33 2.325 2.245 6.01 2.245 8.335 0 2.325-2.245 2.455-5.928.293-8.33H23v12.5c0 1.38-1.12 2.5-2.5 2.5h-17zM17 12c0-2.761-2.239-5-5-5s-5 2.239-5 5 2.239 5 5 5 5-2.239 5-5z"
        clipRule="evenodd"
      />
    </mask>
    <g mask="url(#52fh4xsyba)">
      <path fill={fillColor} d="M-3 -3H27V27H-3z" />
    </g>
  </svg>
)

export default Instagram
