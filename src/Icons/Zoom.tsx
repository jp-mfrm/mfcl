import React from 'react'

interface Props {
  width?: string | number
  height?: string | number
  fillColor?: string
  [x: string]: unknown // for the rest property
}

const Zoom: React.FunctionComponent<Props> = ({ width = '26', height = '25', fillColor = '#2D2926', ...rest }) => (
  <svg width={width} height={height} viewBox="0 0 26 25" {...rest}>
    <path
      fill={fillColor}
      fillRule="evenodd"
      d="M17.59 15.91l7.29 7.28v-.02c.097.099.15.233.143.372-.005.138-.068.268-.173.358-.186.182-.484.182-.67 0l-7.29-7.29c-3.834 3.455-9.724 3.225-13.277-.518C.06 12.349.136 6.456 3.786 2.806c3.65-3.65 9.542-3.726 13.286-.173 3.743 3.554 3.973 9.443.518 13.277zm-7.04 2.15c-4.056.005-7.55-2.856-8.346-6.833-.795-3.978 1.33-7.963 5.077-9.518 3.746-1.554 8.07-.246 10.324 3.126 2.255 3.372 1.813 7.867-1.055 10.735-1.6 1.57-3.758 2.444-6 2.43v.06zm3-9h-2.5v-2.5c0-.276-.224-.5-.5-.5s-.5.224-.5.5v2.5H7.56c-.276 0-.5.224-.5.5s.224.5.5.5h2.49v2.5c.005.274.226.495.5.5.276 0 .5-.224.5-.5v-2.5h2.5c.276 0 .5-.224.5-.5s-.224-.5-.5-.5z"
      clipRule="evenodd"
    />
  </svg>
)

export default Zoom
