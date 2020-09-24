import React from 'react'

interface Props {
  width?: string | number
  height?: string | number
  fillColor?: string
  [x: string]: unknown // for the rest property
}

const CribSize: React.FunctionComponent<Props> = ({ width = '10', height = '20', fillColor = '#2D2926', ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} fill="none" {...rest} viewBox="0 0 10 20">
    <mask id="lsfh6vv00a" width="10" height="20" x="0" y="0" maskUnits="userSpaceOnUse">
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M1.36 19.55h7.28c.753-.006 1.36-.617 1.36-1.37V1.82C10 1.067 9.393.455 8.64.45H1.36C.607.455 0 1.067 0 1.82v16.36c0 .753.607 1.364 1.36 1.37zM.91 1.82c0-.25.2-.455.45-.46h7.28c.25.005.45.21.45.46v16.36c0 .25-.2.454-.45.46H1.36c-.25-.006-.45-.21-.45-.46V1.82zm6.82 16.07H2.27c-.121 0-.237-.049-.322-.135-.084-.087-.13-.204-.128-.325V8.18c0-.249.201-.45.45-.45h5.46c.249 0 .45.201.45.45v9.25c.003.121-.044.238-.128.325-.085.086-.2.135-.322.135zm-.46-.91H2.73V8.64h4.54v8.34zM3.34 2.21c-.634.012-1.183.445-1.34 1.06l-.5 2c-.096.413-.002.848.258 1.184.26.335.658.536 1.082.546h4.32c.43-.003.835-.203 1.1-.542.265-.339.36-.78.26-1.198l-.5-2c-.16-.622-.718-1.057-1.36-1.06l-3.32.01zm-.5 4h4.32V6.2c.183 0 .355-.09.46-.24.12-.14.161-.332.11-.51l-.5-2c-.061-.265-.298-.452-.57-.45H3.34c-.278 0-.517.197-.57.47l-.5 2c-.051.178-.01.37.11.51.107.147.278.232.46.23z"
        clipRule="evenodd"
      />
    </mask>
    <g mask="url(#lsfh6vv00a)">
      <path fill={fillColor} d="M-10 -5H20V25H-10z" />
    </g>
  </svg>
)

export default CribSize
