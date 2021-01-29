import React, { FunctionComponent, useState, useEffect, useCallback } from 'react'
import styles from './tabs.module.scss'

interface Props {
  activeTabElement: any
}

const BREAKPOINT = 767

const Indicator: FunctionComponent<Props> = ({ activeTabElement }) => {
  const [style, setStyle] = useState<any>({})

  const changeStyle = useCallback(() => {
    const newStyle: any = {}
    if (activeTabElement?.current) {
      if (window.innerWidth > BREAKPOINT) {
        newStyle.bottom = '0px'
        newStyle.left = activeTabElement.current.offsetLeft
        newStyle.height = '2px'
        newStyle.width = activeTabElement.current.offsetWidth
      }
    }

    setStyle(newStyle)
  }, [activeTabElement])

  useEffect(() => {
    window.addEventListener('resize', changeStyle)
    return () => {
      window.removeEventListener('resize', changeStyle)
    }
  }, [changeStyle])

  useEffect(() => {
    changeStyle()
  }, [activeTabElement])

  return <div className={styles.indicator} style={style} />
}

export default Indicator
