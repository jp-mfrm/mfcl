import React from 'react'

export const subtractCounter = (n: number) => {
  if (n <= 1) {
    return n
  } else if (n > 1) {
    return n - 1
  }
}
