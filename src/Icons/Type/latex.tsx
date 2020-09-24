import React from 'react'

interface Props {
  width?: string | number
  height?: string | number
  fillColor?: string
  [x: string]: unknown // for the rest property
}

const Latex: React.FunctionComponent<Props> = ({ width = '24', height = '22', fillColor = '#2D2926', ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} {...rest} fill="none" viewBox="0 0 24 22">
    <mask id="5sy3hieq5a" width="24" height="22" x="0" y="0" maskUnits="userSpaceOnUse">
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M1 0h22c.552 0 1 .448 1 1v20c0 .552-.448 1-1 1H1c-.552 0-1-.448-1-1V1c0-.552.448-1 1-1zm0 1v20h2V1H1zm3 20V1h2.4v20H4zM7.4 1v20h2.4V1H7.4zm3.4 20V1h2.4v20h-2.4zm3.4-20v20h2.4V1h-2.4zm3.4 20V1H20v20h-2.4zm3.4 0h2V1h-2v20z"
        clipRule="evenodd"
      />
    </mask>
    <g mask="url(#5sy3hieq5a)">
      <path fill={fillColor} d="M-3 -3H27V27H-3z" />
    </g>
  </svg>
)

export default Latex
