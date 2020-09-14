/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React from 'react'
import { render } from '@testing-library/react'
import ProgressBar from './index'

describe('ProgressBar', () => {
  it('should pass down the className prop', () => {
    const { getByTestId } = render(<ProgressBar className="test" data-testid="progress" />)
    expect(getByTestId('progress').classList).toContain('test')
  })

  it('should do the correct calculations', () => {
    const { container, rerender } = render(<ProgressBar max={50} value={20} />)
    expect(container.querySelector('.bar')).toHaveStyle('transform: translateX(-60%)')

    rerender(<ProgressBar max={40} value={20} />)
    expect(container.querySelector('.bar')).toHaveStyle('transform: translateX(-50%)')
  })
})
