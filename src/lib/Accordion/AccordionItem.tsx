import React, { FunctionComponent, useState, ReactNode, useEffect, useRef, CSSProperties } from 'react'
import styles from './accordion.module.scss'
import clsx from 'clsx'

type Props = {
  title: string
  content: string | ReactNode
  preview?: string | ReactNode
  hidePreview?: boolean
  icon?: string | ReactNode
  id: string
  focused?: number
  setFocus: Function
  setIndex: Function
  index?: number
  titleStyles: CSSProperties
  contentStyles: CSSProperties
  initialOpen?: boolean
}

const AccordionItem: FunctionComponent<Props> = ({
  title = '',
  content = '',
  icon,
  preview,
  id = '',
  index,
  focused,
  setFocus,
  setIndex,
  hidePreview = false,
  titleStyles,
  contentStyles,
  initialOpen = false
}) => {
  const labelId = `label-${id}`
  const sectionId = `section-${id}`
  const [open, setOpen] = useState(false)

  const labelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (index === focused) {
      if (labelRef && labelRef.current) {
        labelRef.current.focus()
      }
    }
  }, [index, focused])

  useEffect(() => {
    setOpen(initialOpen)
  }, [])

  const withPreviewStyle = preview ? styles['withPreview'] : ''
  const hidePreviewStyle = hidePreview ? styles['hidePreview'] : ''

  const lineStyles = clsx(styles['line'], withPreviewStyle, hidePreviewStyle)
  const centerStyles = clsx(styles['center'], withPreviewStyle, hidePreviewStyle)
  const previewStyles = clsx(styles['preview'], hidePreviewStyle)
  const innerConentStyles = clsx(styles['content'], icon && styles['alignedContent'])

  const handleKeys = (e: any) => {
    switch (e.key) {
      case ' ':
      case 'Enter':
        setOpen(!open)
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
        style={titleStyles}
        role="button"
        ref={labelRef}
        onClick={() => {
          setOpen(!open)
        }}
        onKeyDown={handleKeys}
        onFocus={() => {
          setFocus(index)
        }}
        onBlur={() => {
          setFocus(-1)
        }}
      >
        {icon && <div className={styles.icon}>{icon}</div>}
        <div className={centerStyles}>
          <div className={styles.title}>{title}</div>
          {preview && <span className={previewStyles}>{preview} </span>}
        </div>
        <span className={styles.openIcon} />
      </div>
      <div className={styles.inner}>
        <div className={innerConentStyles} role="region" aria-labelledby={labelId} id={sectionId} style={contentStyles}>
          <div className={styles.innerContent}>{content}</div>
        </div>
      </div>
    </div>
  )
}

export default AccordionItem
