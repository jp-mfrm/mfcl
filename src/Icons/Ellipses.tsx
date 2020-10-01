import React from 'react'

interface Props {
  width?: string | number
  height?: string | number
  className?: string
  stroke ?: string
  transform ?: string
  [x: string]: unknown // for the rest property
}

const Ellipses: React.FunctionComponent<Props> = ({ width = '92', height = '2', stroke = "#D63426", transform="translate(0, 12)", ...rest }) => (
<svg className={rest.className} width={width} height={height} viewBox="0 0 92 2" transform={transform} fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M-8.74227e-08 1L92 0.999998" stroke={stroke} strokeDasharray="2 5"/>
</svg>

)

export default Ellipses