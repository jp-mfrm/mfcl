import React, { FunctionComponent } from 'react';

import styles from './typography.module.scss';

interface Props {
  [rest: string]: unknown; // ...rest property
};

const Typography: FunctionComponent<Props> = ({
  ...rest
}) => {
  return (
    <div className={styles['typography-wrapper']} {...rest}>
      Typography
    </div>
  );
};

export default Typography;
