import React from 'react'

interface Props {
  width?: string | number
  height?: string | number
  fillColor?: string
  [x: string]: unknown // for the rest property
}

const PlushBed: React.FunctionComponent<Props> = ({ width = '24', height = '12', fillColor = '#2D2926', ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="none" viewBox="0 0 24 12">
    <mask id="o0dttzgnga" width="24" height="12" x="0" y="0" maskUnits="userSpaceOnUse">
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M17.75.5c-1.025-.02-2.044.16-3 .53-.877.336-1.811.495-2.75.47-.93.012-1.855-.157-2.72-.5-.956-.37-1.975-.55-3-.53-1.025-.02-2.044.16-3 .53-.864.331-1.785.49-2.71.47-.276 0-.5.224-.5.5s.224.5.5.5c1.025.017 2.043-.163 3-.53.86-.333 1.778-.493 2.7-.47.936-.004 1.863.176 2.73.53.956.37 1.975.55 3 .53 1.025.02 2.044-.16 3-.53.867-.332 1.791-.492 2.72-.47.925-.02 1.846.139 2.71.47.957.367 1.975.547 3 .53.276 0 .5-.224.5-.5s-.224-.5-.5-.5c-.906-.007-1.802-.187-2.64-.53-.971-.362-2.004-.532-3.04-.5zM.5 3.5c-.276 0-.5.224-.5.5v5c0 .276.224.5.5.5H1v2c0 .276.224.5.5.5s.5-.224.5-.5v-2h20v2c0 .276.224.5.5.5s.5-.224.5-.5v-2h.5c.276 0 .5-.224.5-.5V4c0-.276-.224-.5-.5-.5H.5zm.5 1v4h22v-4H1z"
        clipRule="evenodd"
      />
    </mask>
    <g mask="url(#o0dttzgnga)">
      <path fill={fillColor} d="M-3 -9H27V21H-3z" />
    </g>
  </svg>
)

export default PlushBed
