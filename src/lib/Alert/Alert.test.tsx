/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Alert from './index'

describe('Alert Component', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.clearAllTimers()
  })

  it('should render the className prop correctly', () => {
    const { getByRole } = render(
      <Alert collapse={false} className="alerty">
        Alert
      </Alert>
    )
    expect(getByRole('alert').classList).toContain('alerty')
  })

  it('should render the color prop correctly', () => {
    const { getByRole } = render(
      <Alert fade={false} collapse={false} color="error">
        Alert
      </Alert>
    )
    expect(getByRole('alert').classList).toContain('alert-error')
  })

  it('should render close props correctly', () => {
    let num = 0
    const onClose = () => {
      num += 1
    }
    const { container, rerender } = render(
      <Alert fade={false} onClose={onClose}>
        Alert
      </Alert>
    )
    const closeIcon = container.querySelector('button')
    // @ts-ignore
    fireEvent.click(closeIcon)
    jest.runAllTimers()
    expect(num).toBe(1)

    rerender(
      <Alert fade onClose={onClose}>
        Alert
      </Alert>
    )
    // @ts-ignore
    fireEvent.click(closeIcon)
    jest.runAllTimers()
  })
})
