import React from 'react'

interface Props {
  width?: string | number
  height?: string | number
  fillColor?: string
  [x: string]: unknown // for the rest property
}

const Search: React.FunctionComponent<Props> = ({ width = '25', height = '25', fillColor = '#2D2926', ...rest }) => (
  <svg width={width} height={height} viewBox="0 0 25 25" {...rest}>
    <path
      fill={fillColor}
      fillRule="evenodd"
      d="M17.59 16.85l7.29 7.28v.04c.164.198.15.488-.03.67-.186.182-.484.182-.67 0l-7.29-7.29c-3.834 3.455-9.724 3.225-13.277-.518C.06 13.289.136 7.395 3.786 3.746 7.436.096 13.328.02 17.072 3.573c3.743 3.554 3.973 9.443.518 13.277zM2.204 12.166C3 16.145 6.494 19.006 10.55 19c2.251-.002 4.41-.897 6-2.49 2.868-2.868 3.31-7.363 1.055-10.735C15.35 2.403 11.027 1.095 7.28 2.65 3.535 4.204 1.41 8.19 2.204 12.166z"
      clipRule="evenodd"
    />
  </svg>
)

export default Search
