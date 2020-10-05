import React, { FunctionComponent, useCallback } from 'react'
import clsx from 'clsx'
import styles from './price.module.scss'

interface Props {
  /** The array of original price(s) to be formatted */
  price: number[]
  divider?: boolean
  /** text to be added before price */
  text?: string
  /** align the text in the center */
  center?: boolean
  /** will add new styling to the price */
  discount?: boolean
  /** will cross out the price(s) and add new price(s) above the old price */  
  discountPrice?: number[]
  className?: string
  [rest: string]: unknown // ...rest property
}

const Price: FunctionComponent<Props> = ({
  price,
  discountPrice,
  text,
  center = false,
  divider = false,
  discount = false,
  className,
  ...rest
}) => {
  const formatPrice = useCallback((nums: number[]) => {
    if(price) {
      let p = new Intl.NumberFormat('en-US', { 
        style: 'currency',
        currency: 'USD',}).format(nums[0])

      if(nums[1]) {
        p += " - " + new Intl.NumberFormat('en-US', { 
          style: 'currency',
          currency: 'USD',}).format(nums[1])
      }
      return p;
    }
    
    
  }, [price, discountPrice])

  let productPrice = discountPrice ? formatPrice(discountPrice) : formatPrice(price)
  let productText = text && (
    <>
      {text} {divider && <span>|</span>}
    </>
  )

  let productDiscount
  if (discountPrice) {
    productDiscount = <p className={styles['price-cut']}>{formatPrice(price)}</p>
  }

  return (
    <div className={clsx(styles['price-wrapper'], center && styles.center, className && className)} {...rest}>
      <div data-testid="price-container-prices">
        <p
          className={clsx(
            styles['original-price'],
            discountPrice && styles['discounted-price'],
            discount && styles.discount
          )}
        >
          {productText} {productPrice}
        </p>
        {productDiscount}
      </div>
    </div>
  )
}

export default Price
