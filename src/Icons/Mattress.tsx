import React from 'react'

interface Props {
  width?: string | number
  height?: string | number
  fillColor?: string
  [x: string]: unknown // for the rest property
}

const Mattress: React.FunctionComponent<Props> = ({ width = '24', height = '14', fillColor = '#2D2926', ...rest }) => (
  <svg width={width} height={height} fill="none" viewBox="0 0 24 14" {...rest}>
    <mask id="57f8tyleba" width="24" height="14" x="0" y="0" maskUnits="userSpaceOnUse">
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M23.47 10v-.09L19 .9V.85l-.07-.09h-.07l-.1-.05H5.33c-.033.01-.064.027-.09.05h-.08L5.1.84V.9l-4.5 9v.09c-.36.271-.58.69-.6 1.14v1.75c0 .276.224.5.5.5h23c.276 0 .5-.224.5-.5v-1.75c-.005-.436-.199-.847-.53-1.13zM5.81 1.62h12.38l4 8H1.81l4-8zM1 12.38h22v-1.25c0-.276-.224-.5-.5-.5h-21c-.276 0-.5.224-.5.5v1.25z"
        clipRule="evenodd"
      />
    </mask>
    <g mask="url(#57f8tyleba)">
      <path fill={fillColor} d="M-3 -8H27V22H-3z" />
    </g>
  </svg>
)

export default Mattress
