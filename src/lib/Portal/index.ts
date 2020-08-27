import { useEffect, useRef, ReactNode, FunctionComponent, MutableRefObject } from 'react'
import { createPortal } from 'react-dom'
import isClient from '../utils/isClient'

type HTMLElRef = MutableRefObject<HTMLElement>
interface Props {
  children?: ReactNode
}

const Portal: FunctionComponent<Props> = ({ children = null }) => {
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

  return createPortal(children, mount.current)
}

export default Portal
