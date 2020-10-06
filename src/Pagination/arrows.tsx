import React, { FunctionComponent } from 'react'

interface Props {
  width?: string
  height?: string
  fill?: string
  [rest: string]: unknown // ...rest property
}

export const NextArrow: FunctionComponent<Props> = ({ width = '11', height = '18', fill = 'none', ...rest }) => {
  return (
    <svg {...rest} width={width} height={height} viewBox="0 0 11 18" fill={fill}>
      <path d="M1 1L9 9.08122L1 17" stroke="#D63426" strokeWidth="2" />
    </svg>
  )
}

export const PreviousArrow: FunctionComponent<Props> = ({ width = '11', height = '18', fill = 'none', ...rest }) => {
  return (
    <svg {...rest} width={width} height={height} viewBox="0 0 11 18" fill={fill}>
      <path d="M10 1L2 9.08122L10 17" stroke="#D63426" strokeWidth="2" />
    </svg>
  )
}
