import React from 'react'

interface Props {
  width?: string | number
  height?: string | number
  fillColor?: string
  [x: string]: unknown // for the rest property
}

const TrashCan: React.FunctionComponent<Props> = ({ width = '24', height = '15', fillColor = '#2D2926', ...rest }) => (
  <svg height="26" viewBox="0 0 23 26" width="23">
    <g fill={fillColor}>
      <path clipRule="evenodd" d="m4 25.5h15.09l2.01-23h-19.1zm14.16-1h-13.24l-1.87-21h16.9z" fillRule="evenodd" />
      <path d="m22.5 3.5h-22c-.276142 0-.5-.22386-.5-.5s.223858-.5.5-.5h22c.2761 0 .5.22386.5.5s-.2239.5-.5.5z" />
      <rect height="14.97" rx=".5" width="1" x="10.99" y="6.53003" />
      <rect height="14.97" rx=".5" width="1" x="7.09998" y="6.53003" />
      <rect height="14.97" rx=".5" width="1" x="14.88" y="6.53003" />
    </g>
    <path d="m8 .5h7" stroke="#000" strokeLinecap="round" />
  </svg>
)

export default TrashCan
