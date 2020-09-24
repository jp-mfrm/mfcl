import React from 'react'

interface Props {
  width?: string | number
  height?: string | number
  fillColor?: string
  [x: string]: unknown // for the rest property
}

const ShoppingCart: React.FunctionComponent<Props> = ({
  width = '24',
  height = '25',
  fillColor = '#2D2926',
  ...rest
}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} {...rest} fill="none" viewBox="0 0 24 25">
    <mask id="9c6e532qla" width="24" height="25" x="0" y="0" maskUnits="userSpaceOnUse">
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M.15.185C.253.072.398.005.55 0H3.82c.213.03.39.177.46.38l1 2.62h18.17c.172.02.327.109.43.247.102.139.142.314.11.483l-1.649 7.81c-.044.24-.238.426-.48.46L8.557 13.19l-.92 2.44h12.814c.331 0 .6.269.6.6 0 .331-.269.6-.6.6H6.818c-.187-.025-.353-.133-.45-.295-.097-.161-.116-.358-.05-.535l1.28-3.41c-.27-.74-.537-1.479-.805-2.217C5.683 7.315 4.576 4.26 3.449 1.2H.551C.398 1.195.253 1.128.15 1.015.046.903-.007.753 0 .6-.006.447.047.297.15.185zM5.708 4.2H22.77l-1.4 6.64L8.538 12 5.708 4.2zm3.79 20.3c-1.655 0-2.998-1.343-2.998-3s1.343-3 2.999-3c1.656 0 2.999 1.343 2.999 3s-1.343 3-3 3zm5.002-3c0 1.657 1.343 3 2.999 3 1.656 0 2.999-1.343 2.999-3s-1.343-3-3-3c-1.655 0-2.998 1.343-2.998 3zm4.998 0c0 1.105-.895 2-2 2-1.103 0-1.998-.895-1.998-2s.895-2 1.999-2 1.999.895 1.999 2zm-8 0c0 1.105-.895 2-2 2-1.103 0-1.998-.895-1.998-2s.895-2 1.999-2 1.999.895 1.999 2z"
        clipRule="evenodd"
      />
    </mask>
    <g mask="url(#9c6e532qla)">
      <path fill={fillColor} d="M-3 -3H27V27H-3z" />
    </g>
  </svg>
)

export default ShoppingCart
