import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

// @ts-ignore
const Portal = ({children}) => {
  // @ts-ignore
  const mount = document.createElement('div', {id: 'portal-react'});
  // @ts-ignore
  const el = document.createElement("div", {id: 'testing123'});
  const firstUpdate = useRef(true)
  // @ts-ignore
  useEffect(() => {
    // need this for modal so it doesnt run before btn is clicked but need to future proof it for other elements that just get loaded on a page without click event
    if (firstUpdate.current) {
      firstUpdate.current = false
      return
    }

    console.log('use effect in the portal')
    
    document.body.appendChild(mount)
    if (mount) {
      mount.appendChild(el);
      return () => { 
        mount.removeChild(el); 
        mount.remove();
      }
    }
  }, [el, mount]);

  return createPortal(children, el)
};

export default Portal;
