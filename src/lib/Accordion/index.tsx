import React, {
  FunctionComponent,
  useState,
  ReactNode,
  CSSProperties,
  Children,
  isValidElement,
  cloneElement
} from 'react'
import clsx from 'clsx'
import styles from './accordion.module.scss'
import AccordionItem from './AccordionItem'

interface AccordionItem {
  title: string
  content: string | ReactNode
  id?: string
  preview?: string
  icon?: string | ReactNode
  /* Option to have accordionItem already open */
  initialOpen?: boolean
  /* Function to be called when accordionItem is opened */
  onOpen?: Function
  /* Function to be called when accordionItem is closed */
  onClose?: Function
  /* Function to be called when accordionItem is focused */
  onFocus?: Function
}

type Props = {
  /* class to pass to the accordion wrapper */
  accordionClass?: string
  /* Option to hide preview text of AccordionItem on it's open state */
  hidePreview?: boolean
  /* list of AccordionItems to be rendered */
  items?: AccordionItem[]
  /* styles to pass to each section title wrapper */
  titleStyles?: CSSProperties
  /* width of the Accordion */
  width?: string
  /* Optional children to use instead of items prop */
  children?: ReactNode | null
}

const Accordion: FunctionComponent<Props> = ({
  accordionClass,
  items = [],
  hidePreview = false,
  titleStyles = {},
  width = 'auto',
  children
}) => {
  const ids = children ? Children.map(children, (child, index) => index) : items.map((_item, index) => index)

  const [focused, setFocus] = useState(-1)

  function setIndex(goTo: string) {
    if (!ids) {
      return
    }

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
  const accordionItemProps = {
    focused,
    setIndex,
    setFocus,
    hidePreview
  }

  return (
    <div className={clsx(styles['accordionList'], accordionClass)} style={{ width }}>
      {children
        ? Children.map(children, (child, index) => {
            if (isValidElement(child)) {
              return cloneElement(child, { index, ...accordionItemProps })
            }
          })
        : items?.map((item, index) => {
            return (
              <AccordionItem
                key={index}
                {...item}
                id={item.id || index.toString()}
                index={index}
                {...accordionItemProps}
                titleStyles={titleStyles}
              />
            )
          })}
    </div>
  )
}

export default Accordion
