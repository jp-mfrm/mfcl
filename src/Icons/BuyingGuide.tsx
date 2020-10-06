import React from 'react'

interface Props {
  width?: string | number
  height?: string | number
  fillColor?: string
  [x: string]: unknown // for the rest property
}

const BuyingGuide: React.FunctionComponent<Props> = ({
  width = '22',
  height = '24',
  fillColor = '#2D2926',
  ...rest
}) => (
  <svg width={width} height={height} viewBox="0 0 22 24" {...rest}>
    <path
      fill={fillColor}
      fillRule="evenodd"
      d="M20.27 2.7H2.42c-.4-.087-.685-.441-.685-.85s.285-.763.685-.85h18.51c.276 0 .5-.224.5-.5s-.224-.5-.5-.5H2.42C1.41 0 .59.82.59 1.83V22.2c.005.992.808 1.794 1.8 1.8h17.88c.63 0 1.14-.51 1.14-1.14v-19c.005-.306-.112-.6-.327-.82-.214-.217-.507-.34-.813-.34zm-4.46 1v6.8L14 9.57c-.232-.12-.508-.12-.74 0l-1.76.92V3.66l4.31.04zm4.46 19.38c.1 0 .18-.08.18-.18l.02-19.06c0-.1-.08-.18-.18-.18h-3.5v7.08c.001.283-.147.545-.39.69-.126.079-.271.12-.42.12-.129-.001-.255-.032-.37-.09l-2-1-1.9 1c-.252.134-.555.125-.8-.022-.243-.148-.392-.413-.39-.698V3.66h-8.1c-.304 0-.603-.076-.87-.22v18.8c.005.462.378.835.84.84h17.88z"
      clipRule="evenodd"
    />
  </svg>
)

export default BuyingGuide
