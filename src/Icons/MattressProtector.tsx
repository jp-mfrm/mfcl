import React from 'react'

interface Props {
  width?: string | number
  height?: string | number
  fillColor?: string
  [x: string]: unknown // for the rest property
}

const MattressProtector: React.FunctionComponent<Props> = ({
  width = '24',
  height = '14',
  fillColor = '#2D2926',
  ...rest
}) => (
  <svg width={width} height={height} fill="none" viewBox="0 0 24 12" {...rest}>
    <mask id="m2tyrpswqa" width="24" height="12" x="0" y="0" maskUnits="userSpaceOnUse">
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M23.52 5.22c.015-.063.015-.128 0-.19-.021-.065-.059-.124-.11-.17L19.19.68c-.098-.098-.232-.149-.37-.14H5.21c-.14-.01-.28.04-.38.14L.65 4.86c-.051.046-.089.105-.11.17-.015.062-.015.127 0 .19-.014.062-.014.127 0 .19.052.121.148.218.27.27h22.37c.122-.052.218-.149.27-.27.014-.063.014-.128 0-.19h.07zM.5 11.47h23c.265 0 .484-.206.5-.47V8.22c0-.829-.672-1.5-1.5-1.5h-21c-.828 0-1.5.671-1.5 1.5V11c.016.264.235.47.5.47zm22.5-1H1V8.22c0-.276.224-.5.5-.5h21c.276 0 .5.224.5.5v2.25zm-4.37-8.94H5.39L2.21 4.72h19.6l-3.18-3.19z"
        clipRule="evenodd"
      />
    </mask>
    <g mask="url(#m2tyrpswqa)">
      <path fill={fillColor} d="M-3 -9H27V21H-3z" />
    </g>
  </svg>
)

export default MattressProtector
