import React from 'react'

interface Props {
  width?: string | number
  height?: string | number
  fillColor?: string
  [x: string]: unknown // for the rest property
}

const HamburgerMenu: React.FunctionComponent<Props> = ({
  width = '26',
  height = '20',
  fillColor = '#2D2926',
  ...rest
}) => (
  <svg width={width} height={height} fill="none" viewBox="0 0 26 20" {...rest}>
    <path
      fill={fillColor}
      fillRule="evenodd"
      d="M.5 2C.5 1.172 1.172.5 2 .5h22c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5H2C1.172 3.5.5 2.828.5 2zm0 8c0-.828.672-1.5 1.5-1.5h22c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5H2c-.828 0-1.5-.672-1.5-1.5zM2 16.5c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5h22c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5H2z"
      clipRule="evenodd"
    />
  </svg>
)

export default HamburgerMenu
