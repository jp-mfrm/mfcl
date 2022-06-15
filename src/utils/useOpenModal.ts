import { useEffect, useRef } from 'react'

type Props = {
  isOpen: boolean
  setIsShowing: Function
  closeBtnRef?: any
}

const DATA_DIALOG_MARKER_ATTR = 'data-dialog-marker'

const onCloseAction = () => {
  const dataDialogMarker = document.body.getAttribute(DATA_DIALOG_MARKER_ATTR) 
  const isFinalMarker = dataDialogMarker === '1'
  if (isFinalMarker) {
    document.body.style.overflow = ''
    document.documentElement.style.overflow = ''
    document.body.removeAttribute(DATA_DIALOG_MARKER_ATTR)
  } else {
    const newMarker = dataDialogMarker === null ? 1 : parseInt(dataDialogMarker) - 1
    document.body.setAttribute(DATA_DIALOG_MARKER_ATTR, `${newMarker}`)
  }
}

const getNewDialogMarker = () => {
  const dataDialogMarker = document.body.getAttribute(DATA_DIALOG_MARKER_ATTR) 
  return dataDialogMarker === null ? 1 : parseInt(dataDialogMarker) + 1
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
        document.body.setAttribute(DATA_DIALOG_MARKER_ATTR, `${getNewDialogMarker()}`)

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
