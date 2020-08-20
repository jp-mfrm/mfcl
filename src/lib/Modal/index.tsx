import React, { useState, useEffect, FunctionComponent } from 'react';
import clsx from 'clsx'
import styles from './modal.module.scss';

interface Props {
  header?: string
  isOpen?: boolean
  children?: React.ReactNode
  close?: boolean
  [rest: string]: unknown; // ...rest property
};

const Modal: FunctionComponent<Props> = ({
  isOpen,
  ...rest
}) => {
  const [isShowing, setIsShowing] = useState(isOpen)

  useEffect(() => {
    if (isOpen) {
      console.log('use effect')
      setIsShowing(true);
    }
  }, [isOpen])

  return (
    <div className={clsx(styles['modal-wrapper'], isOpen && styles['active'])}>
      <div className={styles['modal-overlay']}></div>
 
      <div className={`${styles['modal']} ${isOpen ? 'active' : ''}`}
        role="dialog"
        id="dialog1"
        aria-labelledby="dialog1_label"
        aria-modal="true" 
        {...rest}
      >
        <button className="close-button" id="close-button">X</button>
        <div className="modal-content">
          <h1>Modal Example</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae expedita corrupti laudantium aperiam, doloremque explicabo ipsum earum dicta saepe delectus totam vitae ipsam doloribus et obcaecati facilis eius assumenda, cumque.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae expedita corrupti laudantium aperiam, doloremque explicabo ipsum earum dicta saepe delectus totam vitae ipsam doloribus et obcaecati facilis eius assumenda, cumque.</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
