import React from 'react'

interface Props {
  width?: string | number
  height?: string | number
  fillColor?: string
  [x: string]: unknown // for the rest property
}

const StorageBelowBed: React.FunctionComponent<Props> = ({
  width = '24',
  height = '14',
  fillColor = '#2D2926',
  ...rest
}) => (
  <svg width={width} height={height} fill="none" viewBox="0 0 24 14" {...rest}>
    <path
      fill={fillColor}
      fillRule="evenodd"
      d="M23 4.39c0-.276.224-.5.5-.5s.5.224.5.5v8.42c0 .276-.224.5-.5.5H.5c-.276 0-.5-.224-.5-.5V1.19c0-.276.224-.5.5-.5s.5.224.5.5v2.67h3.64c1.465-.057 2.746.976 3 2.42H23V4.39zM6.75 10.35h-1c-.276 0-.5.224-.5.5s.224.5.5.5h1c.276 0 .5-.224.5-.5s-.224-.5-.5-.5zm11.48 0h-1c-.276 0-.5.224-.5.5s.224.5.5.5h1c.276 0 .5-.224.5-.5s-.224-.5-.5-.5zM1 9.6h10.5v2.71H1V9.6zm22 0H12.5v2.71H23V9.6zm0-1H1V7.3h22v1.3zM6.62 6.28c-.238-.87-1.05-1.456-1.95-1.41H1v1.41h5.62z"
      clipRule="evenodd"
    />
  </svg>
)

export default StorageBelowBed
