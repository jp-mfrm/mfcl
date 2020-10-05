/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React, { useState, ReactNode } from 'react'
import Transition from 'react-transition-group/Transition'

import styles from './collapse.module.scss'

interface ChildProps {
  [props: string]: unknown
}

export interface Props {
  isOpen: boolean
  children?: ReactNode | string
  appear?: boolean
  enter?: boolean
  exit?: boolean
  className?: string
  id?: string
  timeout?: number
  childProps?: ChildProps
  onEntering?: Function
  onEntered?: Function
  onExit?: Function
  onExiting?: Function
  onExited?: Function
  [rest: string]: unknown
}

const transitionStatusToClassHash = {
  entering: 'collapsing',
  entered: 'show',
  exiting: 'collapsing',
  exited: 'collapse',
  unmounted: 'collapse'
}

const noop = () => {}

const Collapse: React.FunctionComponent<Props> = ({
  children = null,
  className = '',
  isOpen = false,
  appear = false,
  enter = true,
  exit = true,
  childProps,
  id = '',
  timeout = 350,
  onEntering = noop,
  onEntered = noop,
  onExit = noop,
  onExiting = noop,
  onExited = noop,
  ...rest
}) => {
  const [height, setHeight] = useState<number | undefined>(undefined)

  const handleEntering = (node: any, isAppearing: any) => {
    setHeight(node.scrollHeight)
    onEntering(node, isAppearing)
  }

  const handleEntered = (node: any, isAppearing: any) => {
    setHeight(undefined)
    onEntered(node, isAppearing)
  }

  const handleExit = (node: any) => {
    setHeight(node.scrollHeight)
    onExit(node)
  }

  const handleExiting = (node: any) => {
    // NOTE: getting this variable triggers a reflow
    // @ts-ignore
    const unused = node.offsetHeight // eslint-disable-line
    setHeight(0)
    onExiting(node)
  }

  const handleExited = (node: any) => {
    setHeight(undefined)
    onExited(node)
  }

  return (
    <Transition
      {...rest}
      appear={appear}
      enter={enter}
      exit={exit}
      timeout={timeout}
      in={isOpen}
      onEntering={handleEntering}
      onEntered={handleEntered}
      onExit={handleExit}
      onExiting={handleExiting}
      onExited={handleExited}
    >
      {(status) => {
        const collapseClass = transitionStatusToClassHash[status] || 'collapse'
        const classes = `${styles[collapseClass]} ${className || ''}`.trim()
        let style = height === undefined ? {} : { height }

        if (childProps && childProps.style) {
          style = { ...(childProps.style as {}), ...style }
        }
        return (
          <div {...childProps} style={style} className={classes} id={id}>
            {children}
          </div>
        )
      }}
    </Transition>
  )
}

export default Collapse
