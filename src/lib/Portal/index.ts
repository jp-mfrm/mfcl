import { useEffect, useRef, ReactNode, FunctionComponent, MutableRefObject } from 'react'
import { createPortal } from 'react-dom'
import isClient from '../utils/isClient'

type HTMLElRef = MutableRefObject<HTMLElement>

const Portal = ({ children = null }: { children: ReactNode | null }) => {
  const mount = useRef(isClient ? document.createElement('div') : null) as HTMLElRef

  useEffect(() => {
    if (isClient && !mount.current) {
      mount.current = document.createElement('div')
    }

    if (mount.current) {
      document.body.appendChild(mount.current)
      return () => {
        document.body.removeChild(mount.current)
      }
    }
  }, [mount, isClient])

  if (!isClient) {
    return children
  }

  return createPortal(children, mount.current)
}

export default Portal
