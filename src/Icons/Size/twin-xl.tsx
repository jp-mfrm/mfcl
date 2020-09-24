import React from 'react'

interface Props {
  width?: string | number
  height?: string | number
  fillColor?: string
  [x: string]: unknown // for the rest property
}

const TwinXl: React.FunctionComponent<Props> = ({ width = '12', height = '24', fillColor = '#2D2926', ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} {...rest} fill="none" viewBox="0 0 12 24">
    <mask id="bxxv7n46aa" width="12" height="24" x="0" y="0" maskUnits="userSpaceOnUse">
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M1.78 0h8.44c.873 0 1.58.707 1.58 1.58v20.84c0 .873-.707 1.58-1.58 1.58H1.78C.907 24 .2 23.293.2 22.42V1.58C.2.707.907 0 1.78 0zm8.44 22.95c.293 0 .53-.237.53-.53V1.58c0-.293-.237-.53-.53-.53H1.78c-.293 0-.53.237-.53.53v20.84c0 .293.237.53.53.53h8.44zM9.16 8.7H2.84c-.293 0-.53.237-.53.53v12.35c0 .14.056.274.156.371.1.098.234.152.374.149h6.32c.14.003.274-.05.374-.149.1-.098.156-.231.156-.371V9.23c0-.293-.237-.53-.53-.53zm-5.8 12.35h5.28V9.76H3.36v11.29zM9.5 3.27C9.336 2.529 8.68 2 7.92 2H4.08c-.76 0-1.416.529-1.58 1.27l-.58 2.31c-.12.488-.01 1.004.3 1.4.305.397.78.626 1.28.62h5c.497.011.97-.21 1.28-.6.31-.396.42-.912.3-1.4L9.5 3.27zm-1 3.4c.215 0 .418-.1.55-.27.12-.16.164-.365.12-.56l-.58-2.32C8.512 3.214 8.236 3 7.92 3H4.08c-.289.017-.537.213-.62.49l-.58 2.32c-.054.205-.01.423.12.59.121.157.303.255.5.27h5zm-2.75 9.39H4.69v3.93h2.88v-1.06H5.75v-2.87zM6 13.77l-1.19 1.18-.74-.74 1.19-1.19-1.19-1.19.74-.74L6 12.27l1.19-1.18.74.74-1.18 1.19 1.18 1.19-.74.74L6 13.77z"
        clipRule="evenodd"
      />
    </mask>
    <g mask="url(#bxxv7n46aa)">
      <path fill={fillColor} d="M-9 -3H21V27H-9z" />
    </g>
  </svg>
)

export default TwinXl
