/* eslint-disable jsx-a11y/alt-text */
import React, { useLayoutEffect, useState, useRef, memo } from 'react'

type Props = {
  src: string
  [rest: string]: unknown
}

const LazyImage: React.FunctionComponent<Props> = ({ src, ...rest }) => {
  const [stateSrc, setStateSrc] = useState('') // you could set a fallback image here
  const firstUpdate = useRef(true)

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false
      return
    }
    setStateSrc(src)
  }, [src])

  return <img data-lazy={src} src={stateSrc} {...rest} />
}

export default memo(LazyImage)
