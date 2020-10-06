import React from 'react'

interface Props {
  width?: string | number
  height?: string | number
  fillColor?: string
  [x: string]: unknown // for the rest property
}

const Crib: React.FunctionComponent<Props> = ({ width = '24', height = '14', fillColor = '#2D2926', ...rest }) => (
  <svg width={width} height={height} viewBox="0 0 24 14" {...rest}>
    <path
      fill={fillColor}
      fillRule="evenodd"
      d="M23.178.398c.09-.091.214-.14.342-.138.128-.003.252.047.342.138.091.09.14.214.138.342v12.52c0 .276-.224.5-.5.5s-.5-.224-.5-.5v-1.05H1v1.05c0 .276-.224.5-.5.5s-.5-.224-.5-.5V.74c0-.276.224-.5.5-.5s.5.224.5.5v1.94h22.04V.74c-.003-.128.047-.252.138-.342zM6.23 3.64H5.08v7.61h1.15V3.64zm-2.15 7.61H3V3.64h1.12l-.04 7.61zm4.23-7.61H7.15l.04 7.61h1.12V3.64zm.96 0h1.15v7.61H9.31l-.04-7.61zm3.27 0h-1.16l.04 7.61h1.12V3.64zm.96 0h1.15v7.61h-1.11l-.04-7.61zm3.27 0h-1.16l.04 7.61h1.12V3.64zm.96 0h1.15v7.61h-1.11l-.04-7.61zm3.27 0h-1.16l.04 7.61H21V3.64zm-20 0h1v7.61H1V3.64zm21 0v7.61h1V3.64h-1z"
      clipRule="evenodd"
    />
  </svg>
)

export default Crib
