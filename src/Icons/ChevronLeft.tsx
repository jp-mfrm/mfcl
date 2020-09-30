import React from 'react'
import ChevronRight from './ChevronRight'

interface Props {
  width?: string | number
  height?: string | number
  fillColor?: string
  [x: string]: unknown // for the rest property
}

const ChevronLeft: React.FunctionComponent<Props> = (props) => (
  <ChevronRight style={{ transform: 'rotate(180deg)' }} {...props} />
)

export default ChevronLeft
