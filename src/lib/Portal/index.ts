import { useEffect, useRef, ReactNode, FunctionComponent, MutableRefObject } from 'react'
import { createPortal } from 'react-dom'
import isClient from '../utils/isClient'

type HTMLElRef = MutableRefObject<HTMLElement>
interface Props {
  el?: HTMLElRef
  children?: ReactNode
}

const Portal: FunctionComponent<Props> = ({ el, children = null }) => {
  const mount = useRef(isClient ? document.createElement('div') : null) as HTMLElRef

  useEffect(() => {
    if (isClient && !el && !mount.current) {
      mount.current = document.createElement('div')
    }
    if (!el && mount.current) {
      document.body.appendChild(mount.current)
      return () => {
        document.body.removeChild(mount.current)
      }
    }
  }, [mount, isClient, el])

  const node = el?.current || mount.current
  return createPortal(children, node)
}

export default Portal
