import React from 'react'

interface Props {
  width?: string | number
  height?: string | number
  fillColor?: string
  [x: string]: unknown // for the rest property
}

const BedSets: React.FunctionComponent<Props> = ({ width = '24', height = '12', fillColor = '#2D2926', ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} {...rest} fill="none" viewBox="0 0 24 12">
    <mask id="puwmtauaua" width="26" height="12" x="-1" y="0" maskUnits="userSpaceOnUse">
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M.17 11.094c.115.11.271.168.43.156.159.011.315-.045.43-.156.114-.11.176-.265.17-.424V8.92h21.6v1.75c-.006.16.056.313.17.424.115.11.271.168.43.156.159.011.315-.045.43-.156.114-.11.176-.265.17-.424V8.393 8.33v.063c-.008.138-.067.27-.166.368-.115.113-.273.17-.434.159h-.6V7.75h.6c.159-.011.315.045.43.156.104.1.165.237.17.381V3.67c0-.331-.269-.6-.6-.6-.331 0-.6.269-.6.6v4.08H1.2V1.33c.006-.16-.056-.313-.17-.424C.915.796.759.739.6.75.441.739.285.795.17.906c-.114.11-.176.265-.17.424v7V10.67c-.006.16.056.313.17.424zM0 8.393v-.106c.006-.144.066-.28.17-.381.115-.11.271-.167.43-.156h.6v1.17H.6c-.16.012-.319-.046-.434-.16-.1-.097-.158-.229-.166-.367zM3 6.58h18c.32 0 .58-.26.58-.58 0-.32-.26-.58-.58-.58H3c-.32 0-.58.26-.58.58 0 .32.26.58.58.58z"
        clipRule="evenodd"
      />
    </mask>
    <g mask="url(#puwmtauaua)">
      <path fill={fillColor} d="M-3 -9H27V21H-3z" />
    </g>
  </svg>
)

export default BedSets
