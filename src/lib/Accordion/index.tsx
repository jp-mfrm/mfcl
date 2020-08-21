import React, { FunctionComponent, useState, ReactNode, CSSProperties } from 'react'
import clsx from 'clsx'
import styles from './accordion.module.scss'
import AccordionItem from './AccordionItem'

interface AccordionItem {
  title: string
  content: string | ReactNode
  id?: string
  preview?: string
  icon?: string | ReactNode
  initialOpen?: boolean
}

type Props = {
  accordionClass?: string
  hidePreview?: boolean
  items?: AccordionItem[]
  titleStyles?: CSSProperties
  contentStyles?: CSSProperties
  width?: string
}

const Accordion: FunctionComponent<Props> = ({
  accordionClass,
  items = [],
  hidePreview = false,
  titleStyles = {},
  contentStyles = {},
  width = 'auto'
}) => {
  const ids = items.map((_item, index) => index)

  const [focused, setFocus] = useState(-1)

  function setIndex(goTo: string) {
    if (goTo === 'prev') {
      if (focused == 0) {
        setFocus(ids[ids.length - 1])
      } else {
        setFocus(ids[focused - 1])
      }
    } else if (goTo === 'next') {
      if (focused >= ids.length - 1) {
        setFocus(ids[0])
      } else {
        setFocus(ids[focused + 1])
      }
    } else if (goTo === 'start') {
      setFocus(ids[0])
    } else if (goTo === 'end') {
      setFocus(ids[ids.length - 1])
    }
  }

  return (
    <div className={clsx(styles['accordionList'], accordionClass)} style={{ width }}>
      {items?.map((item, index) => {
        return (
          <AccordionItem
            {...item}
            setFocus={setFocus}
            setIndex={setIndex}
            index={index}
            focused={focused}
            id={item.id || index.toString()}
            hidePreview={hidePreview}
            titleStyles={titleStyles}
            contentStyles={contentStyles}
          />
        )
      })}
    </div>
  )
}

export default Accordion
