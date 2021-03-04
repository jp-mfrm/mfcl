import React, { FunctionComponent, useCallback } from 'react'
import clsx from 'clsx'
import styles from './price.module.scss'

interface Props {
  /** The array of original price(s) to be formatted */
  price: number[]
  divider?: boolean
  /** text to be added before price */
  text?: string
  /** text to be added to the right of the price */
  rightText?: string
  /** align the text in the center */
  center?: boolean
  /** align the text to the right */
  right?: boolean
  /** will add new styling to the price */
  discount?: boolean
  /** will cross out the price(s) and add new price(s) above the old price */
  discountPrice?: number[]
  /** will add discount percentage */
  discountPercentage?: boolean
  className?: string
  [rest: string]: unknown // ...rest property
}

const Price: FunctionComponent<Props> = ({
  price,
  discountPrice,
  text,
  rightText,
  center = false,
  right = false,
  divider = false,
  discount = false,
  discountPercentage = false,
  className,
  ...rest
}) => {
  const formatPrice = useCallback(
    (nums: number[]) => {
      if (price) {
        let p = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(nums[0])

        if (nums[1]) {
          p +=
            ' - ' +
            new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD'
            }).format(nums[1])
        }
        return p
      }
    },
    [price, discountPrice]
  )

  let productPrice = discountPrice ? formatPrice(discountPrice) : formatPrice(price)
  let productText = text && (
    <>
      {text} {divider && <span>|</span>}
    </>
  )
  let productRightText = rightText && <>{rightText}</>

  let productDiscount
  if (discountPrice) {
    if (discountPercentage) {
      let priceDiff = price[0] - discountPrice[0]
      let percentage = Math.round((priceDiff / price[0]) * 100)
      productDiscount = (
        <p className={styles['price-cut']}>
          <span className={clsx(percentage > 0 && styles['price-cut-percent'])}>
            {percentage > 0 ? percentage + '% Off ' : ''}
          </span>
          <span className={styles['price-cut-value']}>{formatPrice(price)}</span>
        </p>
      )
    } else {
      productDiscount = <p className={styles['price-cut']}>{formatPrice(price)}</p>
    }
  }

  return (
    <div
      className={clsx(styles['price-wrapper'], center && styles.center, right && styles.right, className && className)}
      {...rest}
    >
      <div data-testid="price-container-prices">
        <p
          className={clsx(
            styles['original-price'],
            discountPrice && styles['discounted-price'],
            discount && styles.discount
          )}
        >
          {productText} {productPrice} {productRightText}
        </p>
        {productDiscount}
      </div>
    </div>
  )
}

export default Price
