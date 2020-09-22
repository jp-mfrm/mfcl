import React, { FunctionComponent, useState, useEffect } from 'react'

import styles from './tabs.module.scss'

interface Props {
  activeTabElement: any
  duration?: number
  position: 'top' | 'left'
}

const Indicator: FunctionComponent<Props> = ({ activeTabElement, position, duration }) => {
  const [style, setStyle] = useState<any>({})

  const changeStyle = () => {
    if (activeTabElement?.current) {
      const newStyle: any = {}
      if (position === 'top') {
        newStyle.bottom = '0px'
        newStyle.left = activeTabElement.current.offsetLeft
        newStyle.height = '5px'
        newStyle.width = activeTabElement.current.offsetWidth
      } else if (position === 'left') {
        newStyle.right = '0px'
        newStyle.top = activeTabElement.current.offsetTop
        newStyle.height = activeTabElement.current.offsetHeight
        newStyle.width = '5px'
      }
      setStyle(newStyle)
    }
  }

  useEffect(() => {
    window.addEventListener('resize', changeStyle)
    return () => {
      window.removeEventListener('resize', changeStyle)
    }
  }, [])

  useEffect(() => {
    changeStyle()
  }, [activeTabElement, position])

  return <div className={styles.indicator} style={style} />
}

Indicator.defaultProps = {
  duration: 300
}

export default Indicator
