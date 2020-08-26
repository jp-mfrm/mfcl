import React, { useEffect, useRef, FunctionComponent, MutableRefObject } from 'react'
import { createPortal } from "react-dom";
import isClient from '../utils/isClient'

type HTMLElRef = MutableRefObject<HTMLElement>
interface Props {
  el: React.ReactNode;
  children?: React.ReactNode
}

const Portal: FunctionComponent<Props> = ({
  el = null, children = null
}) => {
  const mount = useRef(isClient ? document.createElement('div') : null) as HTMLElRef

  const firstUpdate = useRef(true)

  useEffect(() => {
    if (isClient && !mount.current) mount.current = document.createElement('div')
  }, [mount, isClient])

  useEffect(() => {
    // need this for modal so it doesnt run before btn is clicked but need to future proof it for other elements that just get loaded on a page without click event
    if (firstUpdate.current) {
      firstUpdate.current = false
      return
    }
    
    document.body.appendChild(mount.current)
    if (mount.current) {
      mount.current.appendChild(el);
      return () => { 
        mount.current.removeChild(el); 
        mount.current.remove();
      }
    }
  }, [el]);
  // @ts-ignore
  return createPortal(children, el)
}

export default Portal
