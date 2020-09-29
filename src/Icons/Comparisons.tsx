import React from 'react'

interface Props {
  width?: string | number
  height?: string | number
  fillColor?: string
  [x: string]: unknown // for the rest property
}

const Comparison: React.FunctionComponent<Props> = ({
  width = '24',
  height = '18',
  fillColor = '#2D2926',
  ...rest
}) => (
  <svg width={width} height={height} fill="none" viewBox="0 0 24 18" {...rest}>
    <mask id="4zcjz0mfqa" width="25" height="18" x="-1" y="0" maskUnits="userSpaceOnUse">
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M12 5.06h11.52c.258 0 .47.203.48.46.003.128-.047.252-.138.342-.09.09-.214.14-.342.138H12l3.78 3.81c.09.09.141.212.141.34 0 .127-.05.25-.141.34-.087.088-.206.139-.33.14-.127 0-.25-.05-.34-.14l-4.61-4.6c-.178-.192-.178-.488 0-.68L15.1.6c.122-.122.299-.17.464-.125.166.045.296.174.34.34.045.166-.002.343-.124.465L12 5.06zM8.555 7.37c.126 0 .247.05.335.14l4.61 4.63c.09.09.141.212.141.34 0 .127-.05.25-.141.34l-4.6 4.6c-.092.087-.213.137-.34.14-.127 0-.25-.051-.34-.14-.09-.09-.141-.213-.141-.34 0-.128.05-.25.141-.34L12 12.96H.48c-.265 0-.48-.215-.48-.48-.003-.128.047-.252.138-.343.09-.09.214-.14.342-.137H12L8.22 8.19c-.09-.09-.141-.213-.141-.34 0-.128.05-.25.141-.34.088-.09.209-.14.335-.14z"
        clipRule="evenodd"
      />
    </mask>
    <g mask="url(#4zcjz0mfqa)">
      <path fill={fillColor} d="M-3 -6H27V24H-3z" />
    </g>
  </svg>
)

export default Comparison
