import React, {
  FunctionComponent,
  useState,
  ReactNode,
  CSSProperties,
  Children,
  isValidElement,
  cloneElement
} from 'react'
import AccordionItem, { AccordionItemProps } from '../AccordionItem'
import clsx from 'clsx'
import styles from '../AccordionItem/accordionItem.module.scss'


type Props = {
  /** class to pass to the accordion wrapper */
  className?: string
  /** Option to hide preview text of AccordionItem on it's open state */
  hidePreview?: boolean
  /** list of AccordionItems to be rendered */
  items?: AccordionItemProps[]
  /** styles to pass to each section title wrapper */
  titleStyles?: CSSProperties
  /** styles to pass to each section center wrapper */
  centerStyles?: CSSProperties
  /** property to apply MM styling, is true if there's only one item and using hardcoded AccordionItem as a child */
  singleItemAccordion?: boolean
  /** property to apply horizontal accordion with dynamic sizing */
  horizontal?: boolean
  /** width of the Accordion */
  width?: string
  /** Optional children to use instead of items prop */
  children?: ReactNode | null
}

const Accordion: FunctionComponent<Props> = ({
  className,
  items = [],
  hidePreview = false,
  titleStyles = {},
  centerStyles = {},
  width = 'auto',
  singleItemAccordion = false,
  horizontal = false,
  children
}) => {
  const ids = children
    ? Children.map(children, (child, index) => index)
    : items.map((_item, index) => index)

  const [focused, setFocus] = useState(-1)
  const [openIndex, setOpenIndex] = useState(items?.findIndex(x => x.initialOpen))

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
    openIndex, 
    setIndex,
    setFocus,
    hidePreview
  }

  const horizontalContent = horizontal ? items?.map((item) => {
    return item.content
  }) : null;
  const showContent = horizontal && openIndex >= 0
  const content = horizontalContent?.[openIndex]
  const accordionItemStyle = { width: `${horizontal && (100 / items.length)}%`}

  return (
    <div
      className={clsx(singleItemAccordion && styles.singleItemAccordion, horizontal && styles.horizontalAccordion, className)}
      style={{ width, fontFamily: "'Rubik', 'Arial', sans-serif", margin: 'auto' }}
    >
      {children
        ? Children.map(children, (child, index) => {
            if (isValidElement(child)) {
              return cloneElement(child, { index, ...accordionItemProps })
            }
          })
        : <> {items?.map((item, index) => {
            
          const onOpen = () => {
            if (item.onOpen) item.onOpen()
            setOpenIndex(index)
          }

          const onClose = () => {
            if (item.onClose) item.onClose()
            setOpenIndex(-1)
          }

            return (
              <AccordionItem
                horizontal={horizontal}
                key={index}
                titleInlineStyle={titleStyles}
                centerInlineStyle={centerStyles}
                {...item}
                id={item.id || index.toString()}
                index={index}
                onOpen={onOpen}
                onClose={onClose}
                accordionItemStyle={accordionItemStyle}
                {...accordionItemProps}
              />
            )
          } )}
          </>
          }
          {showContent && <div className={styles.horizontalContent}>{content}</div> }
    </div>
  )
}

export default Accordion
