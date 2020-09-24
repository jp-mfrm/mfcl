import React from 'react'

interface Props {
  width?: string | number
  height?: string | number
  fillColor?: string
  [x: string]: unknown // for the rest property
}

const Twin: React.FunctionComponent<Props> = ({ width = '14', height = '24', fillColor = '#2D2926', ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} {...rest} fill="none" viewBox="0 0 14 24">
    <mask id="bpcr4wxwza" width="14" height="24" x="0" y="0" maskUnits="userSpaceOnUse">
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M2.43 24h9.14c.946 0 1.714-.764 1.72-1.71V1.71C13.285.764 12.516 0 11.57 0H2.43C1.484 0 .716.764.71 1.71v20.58c.006.946.774 1.71 1.72 1.71zM1.86 1.71c0-.315.255-.57.57-.57h9.14c.315 0 .57.255.57.57v20.58c0 .315-.255.57-.57.57H2.43c-.315 0-.57-.255-.57-.57V1.71zm8.57 20.21H3.57c-.313-.005-.565-.257-.57-.57V9.71c.005-.313.257-.565.57-.57h6.86c.313.005.565.257.57.57v11.64c-.005.313-.257.565-.57.57zm-.57-1.15H4.14V10.29h5.72v10.48zM4.92 2.21c-.809-.005-1.516.545-1.71 1.33l-.63 2.51c-.133.527-.015 1.085.32 1.513.334.428.847.678 1.39.677h5.42c.543 0 1.056-.25 1.39-.68.33-.428.449-.984.32-1.51l-.63-2.51c-.194-.785-.901-1.335-1.71-1.33H4.92zm-.63 5h5.42v.02c.234-.005.453-.12.59-.31.14-.182.191-.416.14-.64l-.63-2.51c-.08-.338-.383-.575-.73-.57H4.92c-.346 0-.647.234-.73.57l-.63 2.51c-.05.224 0 .458.14.64.142.182.36.29.59.29z"
        clipRule="evenodd"
      />
    </mask>
    <g mask="url(#bpcr4wxwza)">
      <path fill={fillColor} d="M-8 -3H22V27H-8z" />
    </g>
  </svg>
)

export default Twin
