import React from 'react'
import { render } from '@testing-library/react'

import { createCounterSubtractFactory, createCounterAddFactory } from './factory.counter'

describe('NumberIncrementer Component', () => {
  it('counts the numbers correctly', () => {
    let num = 10
    expect(createCounterAddFactory(num)).toEqual(11)
  })

  it('equals 0 on the counter', () => {
    let num = 0
    expect(createCounterSubtractFactory(num)).toEqual(0)
  })

  it('subtracts from the counter', () => {
    let num = 3
    expect(createCounterSubtractFactory(num)).toEqual(2)
  })
})
