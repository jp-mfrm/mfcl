import React from 'react'

interface Props {
  width?: string | number
  height?: string | number
  fillColor?: string
  [x: string]: unknown // for the rest property
}

const Comforter: React.FunctionComponent<Props> = ({ width = '24', height = '14', fillColor = '#2D2926', ...rest }) => (
  <svg width={width} height={height} fill="none" viewBox="0 0 24 14" {...rest}>
    <mask id="n3hjy1ln3a" width="24" height="14" x="0" y="0" maskUnits="userSpaceOnUse">
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M21.832 2.085c.375.96.12 2.05-.642 2.745 1.995.81 3.137 2.918 2.725 5.031-.412 2.113-2.262 3.638-4.415 3.639h-13C2.91 13.5 0 10.59 0 7S2.91.5 6.5.5h13c1.03-.005 1.957.625 2.332 1.585zM6.5 12.5h13c1.933 0 3.5-1.567 3.5-3.5s-1.567-3.5-3.5-3.5h-12C6.672 5.5 6 6.172 6 7s.672 1.5 1.5 1.5h11c.276 0 .5.224.5.5s-.224.5-.5.5h-11C6.12 9.5 5 8.38 5 7s1.12-2.5 2.5-2.5h12c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5h-13C3.462 1.5 1 3.962 1 7s2.462 5.5 5.5 5.5z"
        clipRule="evenodd"
      />
    </mask>
    <g mask="url(#n3hjy1ln3a)">
      <path fill={fillColor} d="M-3 -8H27V22H-3z" />
    </g>
  </svg>
)

export default Comforter
