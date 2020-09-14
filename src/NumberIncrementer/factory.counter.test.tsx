import { createFactoryCounter } from './factory.counter'
import { render } from '@testing-library/react'

describe('NumberIncrementer Component', () => {
  it('counts the numbers correctly', () => {
    expect(createFactoryCounter(10, 'add')).toEqual(11)
  })
  it('equals 0 on the counter', () => {
    expect(createFactoryCounter(1, 'subtract')).toEqual(0)
  })
  it('subtracts from the counter', () => {
    expect(createFactoryCounter(3, 'subtract')).toEqual(2)
  })
})
