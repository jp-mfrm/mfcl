import React from 'react'

interface Props {
  width?: string | number
  height?: string | number
  fillColor?: string
  [x: string]: unknown // for the rest property
}

const Futon: React.FunctionComponent<Props> = ({ width = '26', height = '16', fillColor = '#2D2926', ...rest }) => (
  <svg width={width} height={height} fill="none" viewBox="0 0 26 16" {...rest}>
    <mask id="j03c7x4lja" width="26" height="16" x="0" y="0" maskUnits="userSpaceOnUse">
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M24.48 10.9H21.8v-.73h2.68c.212.06.44-.02.567-.2.128-.18.128-.42 0-.6-.127-.18-.355-.26-.567-.2H21.8V8c.003-.415-.16-.815-.453-1.11-.293-.294-.692-.46-1.107-.46H9L1.84.89C1.692.776 1.494.75 1.32.82c-.173.072-.294.23-.32.415-.024.186.052.37.2.485l6.1 4.67H5.76c-.423 0-.827.171-1.121.474-.294.304-.453.714-.439 1.136v2.9H1.52c-.262.036-.457.26-.457.525s.195.489.457.525H4.2v2.75c-.06.212.02.44.2.567.18.128.42.128.6 0 .18-.127.26-.355.2-.567V12h15.56v2.7c-.06.212.02.44.2.567.18.128.42.128.6 0 .18-.127.26-.355.2-.567V12h2.68c.262-.036.457-.26.457-.525s-.195-.489-.457-.525l.04-.05zm-4.24-3.47c.14 0 .274.056.371.156.098.1.152.234.149.374v1.17h-8.17l-2.21-1.7h9.86zM5.24 8v2.9l15.52.04v-.73h-8.52L8.66 7.47h-2.9c-.14 0-.273.056-.371.156-.098.1-.152.234-.149.374z"
        clipRule="evenodd"
      />
    </mask>
    <g mask="url(#j03c7x4lja)">
      <path fill={fillColor} d="M-2 -7H28V23H-2z" />
    </g>
  </svg>
)

export default Futon
