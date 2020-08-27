import React, { FunctionComponent } from 'react';

import styles from './badge.module.scss';

interface Props {
  [rest: string]: unknown; // ...rest property
};

const Badge: FunctionComponent<Props> = ({
  ...rest
}) => {
  return (
    <div className={styles['badge-wrapper']} {...rest}>
      Badge
    </div>
  );
};

export default Badge;
