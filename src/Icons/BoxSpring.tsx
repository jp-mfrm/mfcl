import React from 'react'

interface Props {
  width?: string | number
  height?: string | number
  fillColor?: string
  [x: string]: unknown // for the rest property
}

const BoxSpring: React.FunctionComponent<Props> = ({ width = '24', height = '8', fillColor = '#2D2926', ...rest }) => (
  <svg width={width} height={height} viewBox="0 0 24 8" {...rest}>
    <path
      fill={fillColor}
      fillRule="evenodd"
      d="M23.4 1.5H.6C.285 1.46.05 1.192.05.875S.284.29.6.25h22.8c.315.04.55.308.55.625s-.235.585-.55.625zM1.2 6.62h21.6V4.38H1.2v2.24zM.6 7.75h22.8c.156.014.31-.039.425-.146.115-.107.178-.257.175-.414V3.81c.003-.157-.06-.307-.175-.414-.114-.107-.269-.16-.425-.146H.6c-.156-.014-.31.039-.425.146-.115.107-.178.257-.175.414v3.38c-.003.157.06.307.175.414.114.107.269.16.425.146z"
      clipRule="evenodd"
    />
  </svg>
)

export default BoxSpring
