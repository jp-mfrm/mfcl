import { useEffect, useRef } from 'react'

type Props = {
  isOpen: boolean
  setIsShowing: Function
  closeBtnRef?: any
}

const onCloseAction = () => {
  document.body.style.overflow = ''
  document.documentElement.style.overflow = ''
}

const useOpenModal = ({ isOpen, setIsShowing, closeBtnRef }: Props) => {
  const firstUpdate = useRef(true)

  useEffect(() => {
    let isSubscribed = true
    if (isSubscribed) {
      if (firstUpdate.current) {
        firstUpdate.current = false
        return
      }
      if (isOpen) {
        setIsShowing(true)
        document.body.style.overflow = 'hidden'
        document.documentElement.style.overflow = 'hidden'

        if (closeBtnRef.current !== null) {
          closeBtnRef.current.focus()
        }
      } else {
        setIsShowing(false)
        onCloseAction()
      }
    }
    return () => {
      isSubscribed = false 
    }
  }, [isOpen])
}

export default useOpenModal
