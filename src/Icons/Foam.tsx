import React from 'react'

interface Props {
  width?: string | number
  height?: string | number
  fillColor?: string
  [x: string]: unknown // for the rest property
}

const Foam: React.FunctionComponent<Props> = ({ width = '24', height = '24', fillColor = '#2D2926', ...rest }) => (
  <svg width={width} height={height} fill="none" viewBox="0 0 24 24" {...rest}>
    <path
      fill={fillColor}
      fillRule="evenodd"
      d="M23 0H1C.448 0 0 .448 0 1v20c0 .552.448 1 1 1h22c.552 0 1-.448 1-1V1c0-.552-.448-1-1-1zm0 1v20H1V1h22zM0 23.5c0-.276.224-.5.5-.5h23c.276 0 .5.224.5.5s-.224.5-.5.5H.5c-.276 0-.5-.224-.5-.5zm7-19C7 5.328 6.328 6 5.5 6S4 5.328 4 4.5 4.672 3 5.5 3 7 3.672 7 4.5zm3 6c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zM20.5 9c0 .828-.672 1.5-1.5 1.5s-1.5-.672-1.5-1.5.672-1.5 1.5-1.5 1.5.672 1.5 1.5zm-10 10c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5zM21 17.5c0 .828-.672 1.5-1.5 1.5s-1.5-.672-1.5-1.5.672-1.5 1.5-1.5 1.5.672 1.5 1.5zM14.5 6c.828 0 1.5-.672 1.5-1.5S15.328 3 14.5 3 13 3.672 13 4.5 13.672 6 14.5 6zM7 13.5c0 .828-.672 1.5-1.5 1.5S4 14.328 4 13.5 4.672 12 5.5 12s1.5.672 1.5 1.5zm7.5 1.5c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5-1.5.672-1.5 1.5.672 1.5 1.5 1.5z"
      clipRule="evenodd"
    />
  </svg>
)

export default Foam
