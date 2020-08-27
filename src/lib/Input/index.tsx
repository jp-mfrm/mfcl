import React, {
  CSSProperties,
  FunctionComponent,
  ReactNode,
  useCallback
} from 'react';

import Button from '../Button'
import clsx from 'clsx'
import styles from './input.module.scss';

export interface Props {
  /** Class to pass to the input wrapper */
  inputClass?: string
  /** Field and label name */
  name?: string
  /** Label for input field */
  label?: string | ReactNode
  /** Option to show/hide button */
  addBtn?: boolean
  /** Label for button */
  btnLabel?: string  
  /** Properties to be passed to Button component */
  btnProps?: object
  /** Size of the Input */
  size?: 'lg' | 'md' | 'sm'
  /** Makes the input field disabled */
  disabled?: boolean
  /** Apply focused styling */
  focus?: boolean
  /** Apply error styling */
  error?: boolean
  /** Success/Error message for input submission  */ 
  inputMessage?:  
    { infoMsg?: string,  
      successMsg?: string,  
      errorMsg?: string,  
      alignment?: 'left' | 'center' | 'right'   
    }
  [rest: string]: unknown; // ...rest property
};

const Input: FunctionComponent<Props> = ({
  inputClass,
  name,
  label,
  addBtn = false,
  btnLabel = 'Submit',
  btnProps,
  size = 'lg',
  disabled = false,
  focus = false,
  error = false,
  inputMessage,
  ...rest
}) => {

let inputField = []; 

  inputField.push(
    <input className={clsx(styles['input'], styles[size], focus && styles['focus'], error && styles['error'], inputClass)} {...rest}
      key="inputField"
      name={name}
      disabled={disabled}
      />
  );
  
  if(addBtn) {
    inputField.push(<Button key="inputBtn" disabled={disabled} {...btnProps}>{btnLabel}</Button>);
  }
  
  return (
    <div className={clsx(styles['input-wrapper'])}>

      {label && (
        <label htmlFor={name} className={clsx(styles['label'])}>
          {label}
        </label>
      )}

      <div className={clsx(styles['input-wrapper-inner'])}>
        {inputField}
      </div>
      
      {(inputMessage) && (
        <div className={clsx(styles['input-wrapper-footer'], inputMessage.alignment && styles[inputMessage.alignment])}>
            {(inputMessage.infoMsg) && (
              <p data-info >{inputMessage.infoMsg}</p>)}
            
            {(inputMessage.successMsg) && (
              <p data-success >{inputMessage.successMsg}</p>)}
            
            {(inputMessage.errorMsg) && (
              <p data-error >{inputMessage.errorMsg}</p>)}
        </div>
      )}
    </div>)
};

export default Input;
