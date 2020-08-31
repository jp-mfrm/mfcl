import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import Stepper from './index'

const stepperWords = ['Create Account', 'Issuer Info', 'Offering Info', 'Submit']

describe('Stepper Component', () => {
  it('renders a className', () => {
    const { container } = render(<Stepper activeStep={0} className="test-class-name" steps={stepperWords} />)
    expect(container.querySelector('.stepper-wrapper')?.classList).toContain('test-class-name')
  })

  it('should add the color prop', () => {
    const color = '#000'
    const { container } = render(<Stepper activeStep={1} color={color} steps={stepperWords} />)
    expect(container.querySelector('.circle')).toHaveStyle(`backgroundColor: ${color}`)
    expect(container.querySelector('.line')).toHaveStyle(`backgroundColor: ${color}`)
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
