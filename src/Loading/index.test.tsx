/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React from 'react'
import { cleanup, render } from '@testing-library/react'
import Loading from './index'

afterEach(cleanup)

describe('Loading', () => {
  it('should have the right color', () => {
    const color = '#fff'
    const { getByTestId } = render(<Loading color={color} type="dots" data-testid="loading" />)

    expect(getByTestId('loading')).toHaveStyle(`color: ${color}`)
  })

  it('should have the right size', () => {
    const color = '#eee'
    const size = '18px'
    const { getByTestId } = render(<Loading color={color} size={size} />)

    // @ts-ignore
    expect(getByTestId('spinner').getAttribute('height')).toBe(size)
  })
})
