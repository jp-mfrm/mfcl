import React, { FunctionComponent } from 'react';

import styles from './tabs.module.scss';

interface Props {
  [rest: string]: unknown; // ...rest property
};

const Tabs: FunctionComponent<Props> = ({
  ...rest
}) => {
  return (
    <div className={styles['tabs-wrapper']} {...rest}>
      Tabs
    </div>
  );
};

export default Tabs;
