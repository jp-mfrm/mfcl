import React from 'react'

interface Props {
  width?: string | number
  height?: string | number
  fillColor?: string
  fillOpacity?: string
  stroke?: string
  [x: string]: unknown // for the rest property
}

const Cart: React.FunctionComponent<Props> = ({ width = '37', height = '28', fillColor="white", fillOpacity="0.3", stroke="white", ...rest }) => (
  <svg width={width} height={height} viewBox="0 0 37 28" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 15.6994C8 15.6994 17.7072 13.966 21.9971 12.7267C27.9387 11.0101 28.501 6.20176 31 4.30088C32.3305 3.28883 36.1706 3.27927 35.988 3.62509C34.8238 5.82881 32.1693 20.9996 32.1693 20.9996L9.4021 20.5614L8 15.6994Z"
      fill={fillColor}
      fillOpacity={fillOpacity}
    />
    <path
      d="M1 1H5.47209L9.6483 20H31.9849L36 2.46224"
      stroke={stroke}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="13.25" cy="25.25" r="2.25" fill={fillColor} />
    <circle cx="28.25" cy="25.25" r="2.25" fill={fillColor} />
  </svg>
)

export default Cart
