import React, { FunctionComponent, useCallback } from 'react'
import clsx from 'clsx'
import styles from './price.module.scss'
import priceFormatter from './priceHelper'

interface Props {
  /** The array of original price(s) to be formatted */
  price: number[]
  /** Sets whether there is a | demarcation between price and text */
  divider?: boolean
  /** text to be added before price */
  text?: string
  /** text to be added to the right of the price */
  rightText?: string
  /** align the text in the center */
  center?: boolean
  /** align the text to the right */
  right?: boolean
  /** Sets whether to show decimals or not */
  decimals?: boolean
  /** minimizes and aligns the decimals vertically at the top */
  decimalsTop?: boolean
  /** minimizes and aligns the decimals vertically to the bottom */
  decimalsBottom?: boolean
  /** will cross out the price(s) and add new price(s) above the old price */
  originalPrice?: number[]
  /** will add discount percentage */
  discountPercentage?: boolean
  className?: string
  [rest: string]: unknown // ...rest property
}

const Price: FunctionComponent<Props> = ({
  price,
  originalPrice,
  text,
  rightText,
  center = false,
  right = false,
  decimals = false,
  decimalsTop = false,
  decimalsBottom = false,
  divider = false,
  discountPercentage = false,
  className,
  ...rest
}) => {
  const showDecimals = decimals || decimalsTop || decimalsBottom

  const formatPrice = useCallback(
    (nums: number[], isDiscount = true) => {
      if (price) return priceFormatter(nums, isDiscount, showDecimals, decimalsTop, decimalsBottom)
      return null
    },
    [price, originalPrice]
  )

  let productPrice = formatPrice(price)

  let productText = text && (
    <>
      <span className={styles['text']}>{text}</span> {divider && <span className={styles['divider']}>|</span>}
    </>
  )

  let productRightText = rightText && <>{rightText}</>

  let formattedOriginalPrice
  if (originalPrice) {
    if (discountPercentage) {
      let priceDiff = originalPrice[0] - price[0]
      let percentage = Math.round((priceDiff / originalPrice[0]) * 100)
      formattedOriginalPrice = (
        <>
          <span className={clsx(percentage > 0 && styles['price-cut-percent'])}>
            {percentage > 0 ? percentage + '% Off ' : ''}
          </span>
          {formatPrice(originalPrice, false)}
        </>
      )
    } else {
      formattedOriginalPrice = formatPrice(originalPrice, false)
    }
  }

  return (
    <div
      className={clsx(styles['price-wrapper'], center && styles.center, right && styles.right, className && className)}
      {...rest}
      data-testid="price-container-prices"
    >
      <div className={clsx(styles['price'])}>
        {productText} {productPrice} {productRightText}
      </div>
      {formattedOriginalPrice}
    </div>
  )
}

export default Price
