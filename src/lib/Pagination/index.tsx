import React, { FunctionComponent } from 'react';

import styles from './pagination.module.scss';

interface Props {
  [rest: string]: unknown; // ...rest property
};

const Pagination: FunctionComponent<Props> = ({
  ...rest
}) => {
  return (
    <div className={styles['pagination-wrapper']} {...rest}>
      Pagination
    </div>
  );
};

export default Pagination;
