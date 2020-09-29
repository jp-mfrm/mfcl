import React from 'react'

interface Props {
  width?: string | number
  height?: string | number
  fillColor?: string
  [x: string]: unknown // for the rest property
}

const Email: React.FunctionComponent<Props> = ({ width = '24', height = '16', fillColor = '#2D2926', ...rest }) => (
  <svg width={width} height={height} fill="none" viewBox="0 0 24 16" {...rest}>
    <mask id="7o23vn5tda" width="24" height="16" x="0" y="0" maskUnits="userSpaceOnUse">
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M0 13.5C0 14.88 1.12 16 2.5 16h19c1.38 0 2.5-1.12 2.5-2.5v-11c.003-.664-.26-1.301-.73-1.77-.469-.47-1.106-.733-1.77-.73h-19C1.12 0 0 1.12 0 2.5v11zM2.5 1C1.672 1 1 1.672 1 2.5v11c0 .828.672 1.5 1.5 1.5h19c.828 0 1.5-.672 1.5-1.5v-11c0-.828-.672-1.5-1.5-1.5h-19zm7.92 7.5c.463.324 1.015.498 1.58.5.556 0 1.1-.168 1.56-.48l8.2-5.61c.19-.167.227-.45.084-.659-.143-.209-.42-.278-.644-.161L13 7.7c-.607.4-1.393.4-2 0L2.78 2.09c-.225-.117-.501-.048-.644.161-.143.21-.107.492.084.659l8.2 5.59zM2.5 14c-.148.005-.29-.062-.38-.18-.088-.098-.131-.229-.12-.36.012-.133.077-.255.18-.34l6-5c.131-.14.332-.193.515-.135.183.057.317.215.345.405.026.192-.06.382-.22.49l-6 5c-.088.079-.202.122-.32.12zm19 0c-.118.002-.232-.041-.32-.12l-6-5c-.16-.108-.246-.298-.22-.49.027-.19.162-.348.345-.405.184-.058.384-.005.515.135l6 5c.103.085.168.207.18.34.011.131-.032.262-.12.36-.09.118-.232.185-.38.18z"
        clipRule="evenodd"
      />
    </mask>
    <g mask="url(#7o23vn5tda)">
      <path fill={fillColor} d="M-3 -7H27V23H-3z" />
    </g>
  </svg>
)

export default Email
