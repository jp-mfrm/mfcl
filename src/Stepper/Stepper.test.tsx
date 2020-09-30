import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import Stepper from './index'

const stepperWords = [{ label: 'Create Account' }, { label: 'Order Sent', color: '#000' }, { label: 'Delivered' }, {}]

describe('Stepper Component', () => {
  it('renders a className', () => {
    const { container } = render(<Stepper activeStep={0} className="test-class-name" steps={stepperWords} />)
    expect(container.querySelector('.stepper-wrapper')?.classList).toContain('test-class-name')
  })

  it('should add the color key', () => {
    const { container } = render(<Stepper activeStep={1} steps={stepperWords} />)
    expect(container.querySelectorAll('.circle')[0]).toHaveStyle(`border: 2px solid #d63426`)
    expect(container.querySelectorAll('.circle')[1]).toHaveStyle(`border: 2px solid #000`)
  })

  it('selects the index using selectIndex when clicked on the number circle and has passed that step', () => {
    let activeStep = 3
    const selectIndex = (index: number) => {
      activeStep = index
    }
    const { container } = render(<Stepper activeStep={activeStep} steps={stepperWords} selectIndex={selectIndex} />)

    expect(activeStep).toBe(3)

    fireEvent.click(container.querySelectorAll('.circle')[1])
    expect(activeStep).toBe(1)
  })

  it('should accept the vertical prop', () => {
    const { container } = render(<Stepper activeStep={1} steps={stepperWords} vertical />)
    expect(container.querySelector('.vertical')).toBeInTheDocument()
  })
})
