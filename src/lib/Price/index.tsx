import React, { FunctionComponent } from 'react';
import clsx from 'clsx'
import styles from './price.module.scss';

interface Props {
  price: string | number
  divider?: boolean
  text?: string
  discount?: boolean
  discountedPrice?: string
  className?: string
  [rest: string]: unknown; // ...rest property
};

const Price: FunctionComponent<Props> = ({
  price, 
  discountedPrice,
  text,
  divider = false,
  discount = false,
  className,
  ...rest
}) => {
  let productPrice = discountedPrice ? discountedPrice : price
  let productText = text && <>{text} {divider && <span>|</span>}</>

  let productDiscount
  if (discountedPrice) {
    productDiscount = <p className={styles['price-cut']}>&#36;{price}</p>
  }

  return (
    <div className={clsx(styles['price-wrapper'], className && className)} {...rest}>
      <div data-testid="price-container-prices">
        <p className={clsx(styles['original-price'], discountedPrice && styles['discounted-price'], discount && styles.discount)}>
          {productText} &#36;{productPrice}
        </p>
        {productDiscount}
      </div>
    </div>
  );
};

export default Price;

