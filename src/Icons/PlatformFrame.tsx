import React from 'react'

interface Props {
  width?: string | number
  height?: string | number
  fillColor?: string
  [x: string]: unknown // for the rest property
}

const PlatformFrame: React.FunctionComponent<Props> = ({
  width = '24',
  height = '6',
  fillColor = '#2D2926',
  ...rest
}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} {...rest} fill="none" viewBox="0 0 24 6">
    <mask id="dppw6flera" width="24" height="7" x="0" y="0" maskUnits="userSpaceOnUse">
      <path
        fill="#fff"
        fill-rule="evenodd"
        d="M.6 1.2h22.8c.331 0 .6-.269.6-.6 0-.331-.269-.6-.6-.6H.6C.269 0 0 .269 0 .6c0 .331.269.6.6.6zm0 1.2h22.8c.331 0 .6.269.6.6 0 .331-.269.6-.6.6h-1.8v1.8c0 .331-.269.6-.6.6-.331 0-.6-.269-.6-.6V3.6H3.6v1.8c.009.162-.052.32-.166.434-.115.114-.272.175-.434.166-.162.009-.32-.052-.434-.166-.114-.115-.175-.272-.166-.434V3.6H.6C.269 3.6 0 3.331 0 3c0-.331.269-.6.6-.6z"
        clip-rule="evenodd"
      />
    </mask>
    <g mask="url(#dppw6flera)">
      <path fill={fillColor} d="M-3 -12H27V18H-3z" />
    </g>
  </svg>
)

export default PlatformFrame
