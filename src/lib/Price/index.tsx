import React, { FunctionComponent, useCallback } from 'react';
import clsx from 'clsx'
import styles from './price.module.scss';

interface Props {
  price: number
  divider?: boolean
  text?: string
  discount?: boolean
  discountPrice?: number
  className?: string
  [rest: string]: unknown; // ...rest property
};

const Price: FunctionComponent<Props> = ({
  price,
  discountPrice,
  text,
  divider = false,
  discount = false,
  className,
  ...rest
}) => {


  const formatPrice = useCallback((n: number) => {
    if(price) {
      let p = new Intl.NumberFormat('en-US', { 
        style: 'currency',
        currency: 'USD',}).format(n)
  
        return p
    }
  }, [price, discountPrice])

  let productPrice = discountPrice ? formatPrice(discountPrice) : formatPrice(price)
  let productText = text && <>{text} {divider && <span>|</span>}</>

  let productDiscount
  if (discountPrice) {
    productDiscount = <p className={styles['price-cut']}>{formatPrice(price)}</p>
  }

  return (
    <div className={clsx(styles['price-wrapper'], className && className)} {...rest}>
      <div data-testid="price-container-prices">
        <p className={clsx(styles['original-price'], discountPrice && styles['discounted-price'], discount && styles.discount)}>
          {productText} {productPrice}
        </p>
        {productDiscount}
      </div>
    </div>
  );
};

export default Price;

