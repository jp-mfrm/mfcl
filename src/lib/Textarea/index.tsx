import React, { FunctionComponent, ReactNode, CSSProperties } from 'react';

import styles from './textarea.module.scss';
import clsx from 'clsx';

interface Props {
  inputClass?: string
  customStyling?: CSSProperties
  resizeable?: boolean
  focus?: boolean
  error?: boolean
  label?: string | ReactNode
  [rest: string]: unknown; // ...rest property
};

const Textarea: FunctionComponent<Props> = ({
  inputClass,
  resizeable = true,
  focus = false,
  error = false,
  label,
  customStyling,
  ...rest
}) => {

  // TODO: auto resize based on container's width and height
  // const inputRef = React.useRef(null);
  // const input = inputRef.current;
  // const ownerDocument = (input) || document;
  // const containerWindow = ownerDocument.defaultView || window;
  // const computedStyle = containerWindow.getComputedStyle(input); 

  return (
    <div className={clsx(styles['textarea-wrapper'])}>
      {label && (
        <label htmlFor={name} className={clsx(styles['label'])}>
          {label}
        </label>
      )}
      <textarea 
        className={clsx(inputClass, focus && styles['focus'], error && styles['error'])}
        style={customStyling}
        {...rest}>
      </textarea>
    </div>
  );
};

export default Textarea;
