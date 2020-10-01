import React, { FunctionComponent, useState, ReactNode, useEffect, useRef, CSSProperties } from 'react'
import Collapse from '../Collapse'
import styles from './accordionItem.module.scss'
import clsx from 'clsx'

type Props = {
  title: string
  content: string | ReactNode
  preview?: string | ReactNode
  hidePreview?: boolean
  icon?: string | ReactNode
  id: string
  focused?: number
  setFocus?: Function
  setIndex?: Function
  index?: number
  titleInlineStyle?: CSSProperties
  centerInlineStyle?: CSSProperties
  initialOpen?: boolean
  onOpen?: Function
  onClose?: Function
  onFocus?: Function
}

const AccordionItem: FunctionComponent<Props> = ({
  title = '',
  content = '',
  icon,
  preview,
  id = '',
  index,
  focused,
  setFocus = () => {},
  setIndex = () => {},
  hidePreview = false,
  titleInlineStyle = {},
  centerInlineStyle = {},
  initialOpen = false,
  onOpen = () => {},
  onClose = () => {},
  onFocus = () => {}
}) => {
  const labelId = `label-${id}`
  const sectionId = `section-${id}`
  const [open, setOpen] = useState(initialOpen)

  const labelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (index === focused) {
      if (labelRef && labelRef.current) {
        labelRef.current.focus()
        onFocus()
      }
    }
  }, [index, focused])

  const handleClick = () => {
    if (open) {
      onClose()
    } else {
      onOpen()
    }
    setOpen(!open)
  }

  const withPreviewStyle = preview ? styles['withPreview'] : ''
  const hidePreviewStyle = hidePreview ? styles['hidePreview'] : ''

  const lineStyles = clsx(styles['line'], withPreviewStyle, hidePreviewStyle)
  const centerStyles = clsx(styles['center'], withPreviewStyle, hidePreviewStyle)
  const previewStyles = clsx(styles['preview'], hidePreviewStyle)
  // const innerConentStyles = clsx(styles['content'], icon && styles['alignedContent'])

  const handleKeys = (e: any) => {
    switch (e.key) {
      case ' ':
      case 'Enter':
        handleClick()
        break
      case 'ArrowDown':
        setIndex('next')
        break
      case 'ArrowUp':
        setIndex('prev')
        break
      case 'Home':
        setIndex('start')
        break
      case 'End':
        setIndex('end')
        break
      default:
    }
  }

  return (
    <div className={clsx(styles['accordionItem'], open && styles['open'])}>
      <div
        className={lineStyles}
        aria-expanded={open}
        aria-controls={sectionId}
        tabIndex={0}
        id={labelId}
        style={titleInlineStyle}
        role="button"
        ref={labelRef}
        onClick={handleClick}
        onKeyDown={handleKeys}
        onFocus={() => {
          setFocus(index)
        }}
        onBlur={() => {
          setFocus(-1)
        }}
        data-testid="accordion-title"
      >
        {icon && <div className={styles.icon}>{icon}</div>}
        <div className={centerStyles} style={centerInlineStyle}>
          <div className={styles.title}>{title}</div>
          {preview && <span className={previewStyles}>{preview} </span>}
        </div>
        <span className={styles.openIcon} />
      </div>
      <Collapse
        isOpen={open}
        childProps={{
          role: 'region',
          id: sectionId,
          'aria-labelledby': labelId,
          'aria-hidden': open ? 'false' : 'true',
          'data-testid': 'accordion-content'
        }}
      >
        <div className={styles.innerContent}>{content}</div>
      </Collapse>
    </div>
  )
}

export default AccordionItem
