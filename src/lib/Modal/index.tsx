import React, { useState, useEffect, useCallback, useRef, FunctionComponent } from 'react';
import clsx from 'clsx'
import styles from './modal.module.scss';

interface Props {
  header?: string
  isOpen?: boolean
  onClose?: Function | null
  // children?: React.ReactNode
  [rest: string]: unknown; // ...rest property
};
let timeout: ReturnType<typeof setTimeout>
const Modal: FunctionComponent<Props> = ({
  isOpen = false,
  onClose = null,
  ...rest
}) => {
  const [isShowing, setIsShowing] = useState(isOpen)
  const modalRef: any = useRef<HTMLDivElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const firstUpdate = useRef(true)
  const callbackRef = useCallback(element => {
    console.log('callback')
    console.log(element)
    if (element) {
      element.focus();
    }
  }, []);

  useEffect(() => {
    if (firstUpdate.current) {
      console.log('first udpate')
      firstUpdate.current = false
      return
    }
    console.log(isOpen)
    if (isOpen) {
      console.log('use effect')
      setIsShowing(true);

      console.log(closeBtnRef)
      if (closeBtnRef.current !== null) {
        console.log('focus')
        console.log(closeBtnRef.current)
        closeBtnRef.current.focus()
      }
    }

  }, [isOpen])


  const hideModal = () => {
    if (onClose) {
      timeout = setTimeout(() => {
        onClose()
      }, 250)
    }

    console.log('hide modal')
    setIsShowing(!isOpen)
  }

  const handleClick = () => {
    console.log('click click')
  }
    
  // const handleKeys = (e: any) => {
  //   console.log('handle')
  //   const key = e.keyCode || e.which

  //   switch (key) {
  //     // Escape
  //     case 27: {
  //       hideModal()
  //       break
  //     }
  //     // tab
  //     case 9: {
  //       // trapFocus(e)
  //       break
  //     }
  //     default:
  //       break
  //   }
  // }

  return (
    <div className={clsx(styles['modal-wrapper'], isShowing && styles['active'])}>
      <div className={styles['modal-overlay']}></div>
 
      <div className={`${styles['modal']} ${isShowing ? 'active' : ''}`}
        role="dialog"
        id="dialog1"
        aria-labelledby="dialog1_label"
        aria-modal="true"
        // onKeyDown={handleKeys} 
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

        </div>
      </div>
    </div>
  );
};

export default Modal;
