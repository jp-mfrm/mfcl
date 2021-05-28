import React, {
  useLayoutEffect,
  ReactElement,
  MutableRefObject,
  useState,
  useContext,
  createContext,
  forwardRef
} from 'react'
import { createPortal } from 'react-dom'
import isClient from '../utils/isClient'

const PortalContext = createContext(isClient ? document.body : null)

interface Props {
  children: ReactElement | null
  ariaRole?: string
  ariaLabel?: string
}

const Portal = forwardRef<HTMLDivElement, Props>(({ children, ariaRole, ariaLabel }: Props, ref) => {
  const context = useContext(PortalContext)
  const [container] = useState(() => {
    if (isClient) {
      const div = document.createElement('div')
      const myRef = ref as MutableRefObject<HTMLDivElement>
      myRef.current = div
      return div
    }
    return null
  })

  useLayoutEffect(() => {
    if (!container || !context) return undefined
    if (ariaRole) container.setAttribute('role', ariaRole)
    if (ariaLabel) container.setAttribute('aria-label', ariaLabel)

    context.appendChild(container)
    return () => {
      context.removeChild(container)
    }
  }, [container, context])

  if (container) {
    const portal = createPortal(children, container)
    return <PortalContext.Provider value={container}>{portal}</PortalContext.Provider>
  }

  // not Client
  return null
})

export default Portal
