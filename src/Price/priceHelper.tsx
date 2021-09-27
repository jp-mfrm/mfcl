import clsx from 'clsx'
import React from 'react'

import styles from './price.module.scss'

function priceStyle(formattedPrice: string, discount: boolean, decimalsTop: boolean, decimalsBottom: boolean) {
  const decimals = Boolean(decimalsTop || decimalsBottom)

  if (formattedPrice) {
    const range = formattedPrice.split(' - ')
    const lowerRange = range[0]
    const upperRange = range.length > 1 ? range[1] : ''
    const [lowerInteger, lowerDecimal] = lowerRange.split('.')
    const [upperInteger, upperDecimal] = upperRange?.split('.')
    return (
      <div className={clsx(styles['price-inner'], !discount && styles['price-cut'])}>
        <div className={styles['price-integer']}>{lowerInteger}</div>
        {decimals && (
          <div
            className={clsx(
              styles['price-decimal'],
              decimalsTop && styles[`price-decimal-top`],
              decimalsBottom && styles[`price-decimal-bottom`]
            )}
          >
            {lowerDecimal}
          </div>
        )}
        {upperRange && (
          <>
            <div className={styles['range-divider']}> - </div>
            <div className={styles['price-integer']}>{upperInteger}</div>
            {decimals && (
              <div
                className={clsx(
                  styles['price-decimal'],
                  decimalsTop && styles[`price-decimal-top`],
                  decimalsBottom && styles[`price-decimal-bottom`]
                )}
              >
                {upperDecimal}
              </div>
            )}
          </>
        )}
      </div>
    )
  }

  return <></>
}

function priceFormatter(price: number[], discount = false, decimalsTop = false, decimalsBottom = false) {
  const decimals = Boolean(decimalsTop || decimalsBottom)

  let p = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: decimals ? 2 : 0,
    minimumFractionDigits: decimals ? 2 : 0
  }).format(price[0])

  if (price[1]) {
    p +=
      ' - ' +
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: decimals ? 2 : 0,
        minimumFractionDigits: decimals ? 2 : 0
      }).format(price[1])
  }

  return priceStyle(p, discount, decimalsTop, decimalsBottom)
}

export default priceFormatter
