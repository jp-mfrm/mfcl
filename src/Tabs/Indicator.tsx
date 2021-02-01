import React, { FunctionComponent, useState, useEffect, useCallback } from 'react'
import styles from './tabs.module.scss'

interface Props {
  activeTabElement: any
}

const Indicator: FunctionComponent<Props> = ({ activeTabElement }) => {
  const [style, setStyle] = useState<any>({})

  const changeStyle = useCallback(() => {
    if (activeTabElement?.current) {
      const newStyle: any = {}
      newStyle.left = activeTabElement.current.offsetLeft
      newStyle.width = activeTabElement.current.offsetWidth
      setStyle(newStyle)
    }
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
