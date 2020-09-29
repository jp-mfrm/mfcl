import React from 'react'

interface Props {
  width?: string | number
  height?: string | number
  fillColor?: string
  [x: string]: unknown // for the rest property
}

const Laptop: React.FunctionComponent<Props> = ({ width = '24', height = '21', fillColor = '#2D2926', ...rest }) => (
  <svg width={width} height={height} fill="none" viewBox="0 0 24 21" {...rest}>
    <mask id="80xwd1v2ya" width="24" height="21" x="0" y="0" maskUnits="userSpaceOnUse">
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M21.86 12.99c.072.12.12.252.14.39L24 18v2c0 .552-.448 1-1 1H1c-.552 0-1-.448-1-1v-2.2l2.01-4.42c.02-.138.068-.27.14-.39-.094-.146-.146-.316-.15-.49v-11c0-.552.448-1 1-1h18c.552 0 1 .448 1 1v11c0 .173-.05.343-.14.49zM21 1.5H3v11h18v-11zm2 16.61V20H1v-1.89l2-4.41v-.2h18l2 4.61zM12.35 3.44h2.83c.276 0 .5.224.5.5v2.83c0 .13-.05.256-.14.35L12 10.66c-.093.091-.22.142-.35.14-.134.003-.264-.047-.36-.14L8.46 7.83c-.192-.198-.192-.512 0-.71L12 3.59c.09-.097.217-.152.35-.15zm2.33 3.12l-3 3-2.12-2.12 3-3h2.12v2.12zm-.472-1.145c0 .133-.053.261-.148.355-.196.194-.511.193-.706-.002-.195-.195-.195-.51 0-.706.195-.195.51-.196.706-.002.095.094.148.222.148.355zM19.5 15.5c.276 0 .5-.224.5-.5s-.224-.5-.5-.5h-15c-.276 0-.5.224-.5.5s.224.5.5.5h15zM3 17c0-.276.224-.5.5-.5h17c.276 0 .5.224.5.5s-.224.5-.5.5h-17c-.276 0-.5-.224-.5-.5z"
        clipRule="evenodd"
      />
    </mask>
    <g mask="url(#80xwd1v2ya)">
      <path fill={fillColor} d="M-3 -4H27V26H-3z" />
    </g>
  </svg>
)

export default Laptop
