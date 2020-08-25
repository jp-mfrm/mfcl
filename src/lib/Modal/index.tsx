import React, { useState, useEffect, useCallback, useRef, FunctionComponent } from 'react';
import clsx from 'clsx'
import styles from './modal.module.scss';
import Portal from '../utils/portal';
import isClient from '../utils/isClient'
import trapFocus from '../utils/trapFocus'

interface Props {
  header?: string
  isOpen?: boolean
  onClose?: Function | null
  [rest: string]: unknown; // ...rest property
};
let timeout: ReturnType<typeof setTimeout>
const Modal: FunctionComponent<Props> = ({
  isOpen = false,
  onClose = null,
  ...rest
}) => {
  const [isSafari] = useState(() => (isClient ? /^((?!chrome|android).)*safari/i.test(navigator.userAgent) : false))
  const [isShowing, setIsShowing] = useState(isOpen)
  
  const modalRef: any = useRef<HTMLDivElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const firstUpdate = useRef(true)

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false
      return
    }
    if (isOpen) {
      setIsShowing(true);
      document.body.style.overflow = 'hidden'

      // safari doesn't respect overflows on body/html. You need to set the position to fixed
      if (isSafari) {
        document.body.style.top = `${-window.pageYOffset}px`
        document.body.style.position = 'fixed'
      } 

      if (closeBtnRef.current !== null) {
        closeBtnRef.current.focus()
      }
    }

  }, [isOpen, isShowing])

  const hideModal = () => {
    if (onClose) {
        onClose()
    }
    setIsShowing(!isOpen)
  }
    
  const handleKeys = (e: any) => {
    console.log('handle keys')
    const key = e.keyCode || e.which

    switch (key) {
      // Escape
      case 27: {
        hideModal()
        break
      }
      // tab
      case 9: {
        trapFocus(e, modalRef)
        break
      }
      default:
        break
    }
  }

  return (
    <Portal>
      <div className={clsx(styles['modal-wrapper'], isShowing && styles['active'])} >
        <div className={styles['modal-overlay']} onClick={hideModal}></div>
  
        <div className={`${styles['modal']} ${isShowing ? 'active' : ''}`}
          role="dialog"
          id="dialog1"
          aria-labelledby="dialog1_label"
          aria-modal="true"
          onKeyDown={handleKeys} 
          ref={modalRef}
          {...rest}
        >
          <div className={styles['modal-header']}>
              <button
                type="button"
                onClick={hideModal}
                className={styles.close}
                aria-label="Close Modal"
                ref={closeBtnRef}
              >
                <span aria-hidden="true">&times;</span>
              </button>
          </div>
          <div className="modal-content">
            <h1>Modal Example</h1>
            <p>Mattress ipsum dolor amet Pain pillow protectors bundle best prices gel memory foam nap spine customized shopping options california king tulo mattress extra firm hypoallergenic neck pillow top snuggle malouf wrap hot save brand Seally medium Purple Sterns & Foster Sleepy's hybrid zzzzzz bunk bed America's top-rated brands snooze sleep trial plush mattress toppers free delivery innerspring bed sets Serta 50% firm futon dreams queen memory foam size comfort side snoring stomach comforters crib king</p>
            <p>Mattress ipsum dolor amet Pain pillow protectors bundle best prices gel memory foam nap spine customized shopping options california king tulo mattress extra firm hypoallergenic neck pillow top snuggle malouf wrap hot save brand Seally medium Purple Sterns & Foster Sleepy's hybrid zzzzzz bunk bed America's top-rated brands snooze sleep trial plush mattress toppers free delivery innerspring bed sets Serta 50% firm futon dreams queen memory foam size comfort side snoring stomach comforters crib king</p>
            <p>Mattress ipsum dolor amet Pain pillow protectors bundle best prices gel memory foam nap spine customized shopping options california king tulo mattress extra firm hypoallergenic neck pillow top snuggle malouf wrap hot save brand Seally medium Purple Sterns & Foster Sleepy's hybrid zzzzzz bunk bed America's top-rated brands snooze sleep trial plush mattress toppers free delivery innerspring bed sets Serta 50% firm futon dreams queen memory foam size comfort side snoring stomach comforters crib king</p>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
