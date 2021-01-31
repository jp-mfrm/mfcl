import React, { FunctionComponent, useState, useEffect, useCallback } from 'react'
import styles from './tabs.module.scss'
interface Props {
  activeTabElement: any
  duration?: number
  position: 'top' | 'left'
}
const BREAKPOINT = 767
const Indicator: FunctionComponent<Props> = ({ activeTabElement, position, duration }) => {
  const [style, setStyle] = useState<any>({})
  const changeStyle = useCallback(() => {
    const newStyle: any = {}
 if (activeTabElement?.current) {
   if (position === 'top' && window.innerWidth >= BREAKPOINT) {
     newStyle.bottom = '0px'
     newStyle.left = activeTabElement.current.offsetLeft - 10
     newStyle.height = '5px'
     if(!activeTabElement.current.offsetWidth && activeTabElement.current.children.length) {
      newStyle.width = activeTabElement.current.children[0].offsetWidth + 20
     } else {
      newStyle.width = activeTabElement.current.offsetWidth
     }
     
   } else if (position === 'left') {
     newStyle.right = '0px'
     newStyle.top = activeTabElement.current.offsetTop - 10
     if(!activeTabElement.current.offsetHeight && activeTabElement.current.children.length) {
      newStyle.height = activeTabElement.current.children[0].offsetHeight + 20
     } else {
      newStyle.height = activeTabElement.current.offsetHeight + 20
     }
     newStyle.width = '5px'
   }
 }


    setStyle(newStyle)
  }, [activeTabElement, position])

  useEffect(() => {
    window.addEventListener('resize', changeStyle)
    return () => {
      window.removeEventListener('resize', changeStyle)
    }
  }, [changeStyle])
  
  useEffect(() => {
    changeStyle()
  }, [activeTabElement, position])
  return <div className={styles.indicator} style={style} />
}
Indicator.defaultProps = {
  duration: 300
}
export default Indicator