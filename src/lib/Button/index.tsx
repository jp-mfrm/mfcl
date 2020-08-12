/* eslint-disable react/button-has-type */
import React, { FunctionComponent, ReactNode } from 'react';
import clsx from 'clsx';
import Loading from '../Loading';

import styles from './button.module.scss';

interface Props {
  btnType?: 'primary' | 'link';
  children?: ReactNode;
  className?: string;
  href?: string; // Link to leave page. Turns the button into an "a" tag.
  loading?: boolean;
  loadingColor?: string;
  size?: 'lg' | 'md' | 'sm';
  type?: 'button' | 'submit' | 'reset'; // The default type to be applied to the button
  [x: string]: unknown; // ...rest property
}

const marginRight = { marginRight: '15px' };

const Button: FunctionComponent<Props> = ({
  btnType = 'primary',
  children = null,
  className = '',
  href = '',
  loading = false,
  loadingColor = '#fff',
  size = 'lg',
  type = 'button',
  ...rest
}) => {
  const load = loading ? styles.loading : '';
  const btnClassName = clsx(
    styles.btn,
    styles[size],
    load,
    styles[btnType],
    className,
  );

  const buttonChildren = (
    <div className={styles['btn-flex']}>
      {loading && <Loading color={loadingColor} style={marginRight} />}
      {children}
    </div>
  );

  if (href) {
    return (
      <a href={href} className={btnClassName} {...rest}>
        {buttonChildren}
      </a>
    );
  }

  if (btnType === 'link') {
    return (
      <button type={type} className={btnClassName} {...rest}>
        {children}
      </button>
    );
  }

  return (
    <button type={type} className={btnClassName} {...rest}>
      {buttonChildren}
    </button>
  );
};

export default Button;
