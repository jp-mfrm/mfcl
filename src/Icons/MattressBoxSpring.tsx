import React from 'react'

interface Props {
  width?: string | number
  height?: string | number
  fillColor?: string
  [x: string]: unknown // for the rest property
}

const MatressWithBoxSpring: React.FunctionComponent<Props> = ({
  width = '24',
  height = '18',
  fillColor = '#2D2926',
  ...rest
}) => (
  <svg width={width} height={height} fill="none" viewBox="0 0 24 18" {...rest}>
    <mask id="i9i0g0jjra" width="24" height="18" x="0" y="0" maskUnits="userSpaceOnUse">
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M23.47 9.72v-.09l-4.5-9-.07-.09h-.07l-.1-.05H5.33c-.033.01-.064.027-.09.05h-.08L5.1.62v.06l-4.5 9v.09c-.346.257-.564.65-.6 1.08v1.75c0 .276.224.5.5.5h23c.276 0 .5-.224.5-.5v-1.75c-.004-.436-.198-.848-.53-1.13zM5.81 1.35h12.38l4 8H1.81l4-8zM1 12.1h22v-1.25c0-.276-.224-.5-.5-.5h-21c-.276 0-.5.224-.5.5v1.25zm22.5 2H.5c-.276 0-.5.224-.5.5v2.55c0 .276.224.5.5.5h23c.276 0 .5-.224.5-.5V14.6c0-.276-.224-.5-.5-.5zm-.5 2.55V15.1H1v1.55h22z"
        clipRule="evenodd"
      />
    </mask>
    <g mask="url(#i9i0g0jjra)">
      <path fill={fillColor} d="M-3 -6H27V24H-3z" />
    </g>
  </svg>
)

export default MatressWithBoxSpring
