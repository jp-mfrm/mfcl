import React from 'react'

interface Props {
  width?: string | number
  height?: string | number
  fillColor?: string
  [x: string]: unknown // for the rest property
}

const MediumBed: React.FunctionComponent<Props> = ({ width = '24', height = '14', fillColor = '#2D2926', ...rest }) => (
  <svg width={width} height={height} fill="none" viewBox="0 0 24 14" {...rest}>
    <path
      fill={fillColor}
      fillRule="evenodd"
      d="M14.75 1.53c.956-.37 1.975-.55 3-.53 1.025-.017 2.043.163 3 .53.864.331 1.785.49 2.71.47.276 0 .5.224.5.5s-.224.5-.5.5c-1.025.017-2.043-.163-3-.53-.864-.331-1.785-.49-2.71-.47-.939-.025-1.873.134-2.75.47-.956.37-1.975.55-3 .53-1.025.02-2.044-.16-3-.53-.88-.337-1.818-.497-2.76-.47-.936-.028-1.867.132-2.74.47-.957.367-1.975.547-3 .53-.276 0-.5-.224-.5-.5S.224 2 .5 2c.952.031 1.9-.129 2.79-.47.956-.37 1.975-.55 3-.53 1.025-.02 2.044.16 3 .53.864.331 1.785.49 2.71.47.939.025 1.873-.134 2.75-.47zM.5 3.5c-.276 0-.5.224-.5.5s.224.5.5.5h23c.276 0 .5-.224.5-.5s-.224-.5-.5-.5H.5zm0 2c-.276 0-.5.224-.5.5v5c0 .276.224.5.5.5H1v2c0 .276.224.5.5.5s.5-.224.5-.5v-2h20v2c0 .276.224.5.5.5s.5-.224.5-.5v-2h.5c.276 0 .5-.224.5-.5V6c0-.276-.224-.5-.5-.5H.5zm.5 1v4h22v-4H1z"
      clipRule="evenodd"
    />
  </svg>
)

export default MediumBed
