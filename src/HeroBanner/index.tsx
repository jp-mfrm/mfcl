import React, { FunctionComponent } from 'react';

import styles from './heroBanner.module.scss';

interface Props {
  [rest: string]: unknown; // ...rest property
};

const HeroBanner: FunctionComponent<Props> = ({
  ...rest
}) => {
  return (
    <div className={styles['hero-banner-wrapper']} {...rest}>
      HeroBanner
    </div>
  );
};

export default HeroBanner;
