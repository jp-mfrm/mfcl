import React, {
  CSSProperties,
  FunctionComponent,
  ReactNode
} from 'react';

import styles from './input.module.scss';

/* TODO: Dark mode input */

/* TODO: hideBtn - boolean prop to show / hide button */
/* TODO: buttonLabel - button label  */
/* TODO: successMsg - submission success message */
/* TODO: errorMsg - submission error message */
/* TODO: disable - disable the input  */
/* TODO: Q: Add input validation, depends on type */
/* TODO: Q: Does textarea come as a variation from the Input component?  */
/* TODO: > Should textarea be its own component?  */
/* TODO: > How does textarea button look, does it with a button?  */

export interface Props {
  /* class to pass to the input wrapper: TODO make required */
  inputType: 'text' | 'email' | 'password' | 'number'
  /* class to pass to the input wrapper */
  inputClass?: string
  /* styles to pass to each section title wrapper */
  titleStyles?: CSSProperties
  /* styles to pass to each section content wrapper */
  contentStyles?: CSSProperties
  /* placeholder of the Input */
  placeholder?: string;
  /* placeholder of the Input */
  
  /* width of the Input */
  width?: string
  [rest: string]: unknown; // WIP...rest property
};

const Input: FunctionComponent<Props> = ({
  inputType,
  inputClass,
  titleStyles = {},
  contentStyles = {},
  placeholder = '',
  ...rest
}) => {
  return (
    <div className={styles['input-wrapper']} {...rest}>
      <input className={styles['input']} 
        type="text" 
        name="name" 
        placeholder={placeholder}/>
    </div>
  );
};

export default Input;
