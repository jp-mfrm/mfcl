/* eslint-disable react/prop-types */
import React from 'react'
import { render } from '@testing-library/react'
import Fade from './index'

describe('Fade', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.clearAllTimers()
  })

  it('should pass className down', () => {
    const { getByTestId } = render(
      <Fade in data-testid="fade" className="test-class-name">
        Yo!
      </Fade>
    )
    expect(getByTestId('fade').classList).toContain('test-class-name')
  })

  it('should change opacity based on faded in or out', () => {
    const { getByTestId } = render(
      <Fade in={false} data-testid="fade">
        Yo!
      </Fade>
    )
    expect(getByTestId('fade').style.opacity).toBe('1')
  })
})
