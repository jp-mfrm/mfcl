import React from 'react'

interface Props {
  width?: string | number
  height?: string | number
  fillColor?: string
  [x: string]: unknown // for the rest property
}

const Person: React.FunctionComponent<Props> = ({ width = '19', height = '22', fillColor = '#2D2926', ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} {...rest} fill="none" viewBox="0 0 19 22">
    <mask id="1ze4hel2ra" width="19" height="22" x="0" y="0" maskUnits="userSpaceOnUse">
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M3.443 6c0-3.314 2.686-6 6-6s6 2.686 6 6-2.686 6-6 6-6-2.686-6-6zm11 0c0-2.761-2.239-5-5-5s-5 2.239-5 5 2.239 5 5 5 5-2.239 5-5zM.503 21.5c-.142.001-.278-.061-.37-.17-.098-.105-.146-.247-.13-.39.542-4.804 4.606-8.434 9.44-8.434s8.898 3.63 9.44 8.434c.016.143-.032.285-.13.39-.092.109-.227.171-.37.17H.503zm8.94-8.01c4.118 0 7.642 2.955 8.36 7.01H1.083c.718-4.055 4.242-7.01 8.36-7.01z"
        clipRule="evenodd"
      />
    </mask>
    <g mask="url(#1ze4hel2ra)">
      <path fill={fillColor} d="M-6 -4H24V26H-6z" />
    </g>
  </svg>
)

export default Person
