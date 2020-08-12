/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React from 'react'
import Transition from 'react-transition-group/Transition'

type Props = {
  /** Controls if the fade is currently showing or not (default: true) */
  in?: boolean
  /** All of these match react-transition-group/Transition props */
  addEndListener?: Function
  appear?: boolean
  children?: React.ReactNode
  className?: string
  duration?: number
  enter?: boolean
  exit?: boolean
  innerRef?: HTMLInputElement | null
  mountOnEnter?: boolean
  onEnter?: ((node: HTMLElement, isAppearing: boolean) => void) | undefined
  onEntered?: ((node: HTMLElement, isAppearing: boolean) => void) | undefined
  onEntering?: ((node: HTMLElement, isAppearing: boolean) => void) | undefined
  onExit?: ((node: HTMLElement) => void) | undefined
  onExited?: ((node: HTMLElement) => void) | undefined
  onExiting?: ((node: HTMLElement) => void) | undefined
  opacity?: number | string
  tag?: string
  unmountOnExit?: boolean
  [x: string]: unknown // ...rest property
}

const defaultStyle = (duration: number) => ({
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
  willChange: 'transition'
})

const transitionStyles = (opacity: number | string) => ({
  entering: { opacity: 0 },
  entered: { opacity },
  exiting: {},
  exited: {},
  unmounted: {}
})

const Fade: React.FunctionComponent<Props> = ({
  tag: Tag = 'div',
  innerRef = null,
  children,
  duration = 150,
  in: show = true,
  mountOnEnter,
  unmountOnExit,
  appear = true,
  enter = true,
  exit = true,
  onEnter,
  onEntering,
  onEntered,
  onExit,
  onExiting,
  onExited,
  opacity = 1,
  ...rest
}) => {
  return (
    <Transition
      timeout={duration}
      in={show}
      mountOnEnter={mountOnEnter}
      unmountOnExit={unmountOnExit}
      appear={appear}
      enter={enter}
      exit={exit}
      onEnter={onEnter}
      onEntering={onEntering}
      onEntered={onEntered}
      onExit={onExit}
      onExiting={onExiting}
      onExited={onExited}
    >
      {(status) => (
        // @ts-ignore
        <Tag
          ref={innerRef}
          style={{
            ...defaultStyle(duration),
            ...transitionStyles(opacity)[status]
          }}
          {...rest}
        >
          {children}
        </Tag>
      )}
    </Transition>
  )
}

export default Fade
