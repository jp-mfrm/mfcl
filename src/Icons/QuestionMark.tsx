import React from 'react'

interface Props {
  width?: string | number
  height?: string | number
  fillColor?: string
  [x: string]: unknown // for the rest property
}

const QuestionMark: React.FunctionComponent<Props> = ({
  width = '26',
  height = '26',
  fillColor = '#2D2926',
  ...rest
}) => (
  <svg width={width} height={height} fill="none" viewBox="0 0 26 26" {...rest}>
    <mask id="59sdfyqt4a" width="26" height="26" x="0" y="0" maskUnits="userSpaceOnUse">
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M.5 13c0 6.904 5.596 12.5 12.5 12.5 6.899-.011 12.489-5.601 12.5-12.5C25.5 6.096 19.904.5 13 .5S.5 6.096.5 13zm1 0C1.5 6.649 6.649 1.5 13 1.5c6.349.006 11.494 5.151 11.5 11.5 0 6.351-5.149 11.5-11.5 11.5S1.5 19.351 1.5 13zm14.87-4c0-1.82-1.37-2.81-3.37-2.81-1.587-.137-3.063.824-3.58 2.33l-1-.55c.734-1.86 2.585-3.031 4.58-2.9 2.47 0 4.53 1.36 4.53 4 0 1.654-1.057 2.74-2.118 3.829-1.069 1.098-2.142 2.2-2.142 3.891h-1.15c0-2.084 1.208-3.308 2.336-4.45.987-1 1.914-1.94 1.914-3.34zm-3.65 9.94c-.552 0-1 .448-1 1s.448 1 1 1 1-.448 1-1-.448-1-1-1z"
        clipRule="evenodd"
      />
    </mask>
    <g mask="url(#59sdfyqt4a)">
      <path fill={fillColor} d="M-2 -2H28V28H-2z" />
    </g>
  </svg>
)

export default QuestionMark
