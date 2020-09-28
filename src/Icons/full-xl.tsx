import React from 'react'

interface Props {
  width?: string | number
  height?: string | number
  fillColor?: string
  [x: string]: unknown // for the rest property
}

const FullXl: React.FunctionComponent<Props> = ({ width = '18', height = '24', fillColor = '#2D2926', ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} {...rest} fill="none" viewBox="0 0 18 24">
    <mask id="852nuhkxca" width="18" height="24" x="0" y="0" maskUnits="userSpaceOnUse">
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M.57 22.29c.006.946.774 1.71 1.72 1.71h13.42c.946 0 1.714-.764 1.72-1.71V1.71C17.424.764 16.656 0 15.71 0H2.29C1.344 0 .576.764.57 1.71v20.58zM1.71 1.71c.005-.316.264-.57.58-.57h13.42c.316 0 .575.254.58.57v20.58c-.005.316-.264.57-.58.57H2.29c-.316 0-.575-.254-.58-.57V1.71zM14.57 22H3.43c-.153 0-.3-.061-.407-.17-.107-.11-.166-.257-.163-.41V9.71c0-.315.255-.57.57-.57h11.14c.315 0 .57.255.57.57v11.66c.017.161-.035.322-.144.442-.109.12-.264.189-.426.188zM14 20.8H4V10.29h10V20.8zM7 2.21c-.806-.004-1.51.546-1.7 1.33l-.63 2.51c-.133.527-.015 1.085.32 1.513.334.428.847.678 1.39.677h5.42c.543 0 1.056-.25 1.39-.68.33-.428.449-.984.32-1.51l-.63-2.51c-.194-.785-.901-1.335-1.71-1.33H7zm-.64 5h5.44l-.02.02c.23 0 .448-.108.59-.29.14-.182.188-.418.13-.64l-.6-2.51c-.086-.333-.386-.567-.73-.57H7c-.345-.012-.652.217-.74.55l-.63 2.51c-.05.224 0 .458.14.64.142.182.36.29.59.29zm2.39 8.85H7.69v3.93h2.88v-1.06H8.75v-2.87zM9 13.77l-1.19 1.18-.74-.74 1.19-1.19-1.19-1.19.74-.74L9 12.27l1.19-1.18.74.74-1.18 1.19 1.18 1.19-.74.74L9 13.77z"
        clipRule="evenodd"
      />
    </mask>
    <g mask="url(#852nuhkxca)">
      <path fill={fillColor} d="M-6 -3H24V27H-6z" />
    </g>
  </svg>
)

export default FullXl
