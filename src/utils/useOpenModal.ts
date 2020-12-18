import { useEffect, useRef, useState } from 'react'

import isClient from './isClient'

type Props = {
  isOpen: boolean
  setIsShowing: Function
  closeBtnRef?: any
}

const useOpenModal = ({ isOpen, setIsShowing, closeBtnRef }: Props) => {
  const [isSafari] = useState(() => (isClient ? /^((?!chrome|android).)*safari/i.test(navigator.userAgent) : false))
  const firstUpdate = useRef(true)

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false
      return
    }
    if (isOpen) {
      setIsShowing(true)
      document.body.style.overflow = 'hidden'

      // safari doesn't respect overflows on body/html. You need to set the position to fixed
      if (isSafari) {
        document.body.style.top = `${-window.pageYOffset}px`
        document.body.style.position = 'fixed'
      }

      if (closeBtnRef.current !== null) {
        closeBtnRef.current.focus()
      }
    } else {
      setIsShowing(false)
      document.body.style.overflow = ''

      // with a fixed position, the scroll goes to the top.
      // After setting the top, we grab that value and scroll to it to restore scroll position
      if (isSafari) {
        const offsetY = Math.abs(parseInt(document.body.style.top || '0', 10))
        document.body.style.position = ''
        document.body.style.top = ''
        window.scrollTo(0, offsetY || 0)
      }
    }
  }, [isOpen])
}

export default useOpenModal
