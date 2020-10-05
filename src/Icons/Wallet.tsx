import React from 'react'

interface Props {
  width?: string | number
  height?: string | number
  fillColor?: string
  [x: string]: unknown // for the rest property
}

const Wallet: React.FunctionComponent<Props> = ({ width = '24', height = '24', fillColor = '#2D2926', ...rest }) => (
  <svg width={width} height={height} fill="none" viewBox="0 0 24 24" {...rest}>
    <path
      fill={fillColor}
      fillRule="evenodd"
      d="M23.39 6.45c-.885-1.739-2.623-2.88-4.57-3l-.77-1.54-.05-.07C16.891.554 15.04.205 13.54 1L9 3.45H2c-1.105 0-2 .895-2 2v18h24v-17h-.61zm-1.15 0h-1.93l-1-1.92c1.195.22 2.251.912 2.93 1.92zm-3.05 0l-1.41-2.82-5.22 2.82h6.63zM14 1.85c.613-.335 1.337-.4 2-.18.572.183 1.058.566 1.37 1.08l-6.88 3.7h-5L14 1.85zM2 4.45c-.552 0-1 .448-1 1v1h2.37l3.72-2H2zm21 13h-4.69c-2.53-2.19-1-5 1.19-5H23v5zm-5.2 1c-3.49-3.1-1.3-7 1.7-7l3.5.05V9c0-.53-.094-1.055-.28-1.55H1v15h22v-4h-5.11c-.03.008-.06.008-.09 0zM18 15c0 .828.672 1.5 1.5 1.5S21 15.828 21 15c0-.829-.672-1.5-1.5-1.5S18 14.17 18 15zm1.5.5c.276 0 .5-.224.5-.5s-.224-.5-.5-.5-.5.224-.5.5.224.5.5.5z"
      clipRule="evenodd"
    />
  </svg>
)

export default Wallet
