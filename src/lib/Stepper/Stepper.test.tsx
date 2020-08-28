import React from 'react'
import { render } from '@testing-library/react'

import Stepper from './index'

const stepperWords = ['Create Account', 'Issuer Info', 'Offering Info', 'Submit']

describe('Stepper Component', () => {
  it('renders a className', () => {
    const { container } = render(<Stepper activeStep={0} className="test-class-name" steps={stepperWords} />)
    expect(container.querySelector('.progress-tracker-wrapper')?.classList).toContain('test-class-name')
  })

  // it('should add the color prop', () => {
  //   const color = '#000'
  //   const wrapper = mount(<ProgressTracker activeIndex={1} color={color} items={progressTrackerWords} />)
  //   const circleNumber = wrapper.find('div[role="button"]')
  //   expect(circleNumber.prop('style')).toHaveProperty('backgroundColor', color)
  //   expect(circleNumber.prop('style')).toHaveProperty('border', `2px solid ${color}`)
  //   const activeLi = wrapper.find('li').at(0).childAt(1)
  //   expect(activeLi.prop('style')).toHaveProperty('backgroundColor', color)
  // })

  // it('should not be able to click on number step that the user has not passed yet', () => {
  //   const wrapper = mount(<ProgressTracker activeIndex={0} items={progressTrackerWords} />)
  //   const circleNumber = wrapper.find('div[role="button"]')
  //   expect(circleNumber.exists()).toBeFalsy()
  // })

  // it('selects the index using selectIndex when clicked on the number circle and has passed that step', () => {
  //   let activeIndex = 3
  //   const selectIndex = (index) => {
  //     activeIndex = index
  //   }
  //   const wrapper = mount(
  //     <ProgressTracker activeIndex={activeIndex} items={progressTrackerWords} selectIndex={selectIndex} />
  //   )

  //   expect(activeIndex).toBe(3)

  //   wrapper.find('div[role="button"]').at(1).simulate('click')
  //   expect(activeIndex).toBe(1)

  //   wrapper.find('div[role="button"]').at(0).simulate('keyPress')
  //   expect(activeIndex).toBe(0)
  // })

  // it('should accept the vertical prop', () => {
  //   const wrapper = mount(<ProgressTracker activeIndex={1} items={progressTrackerWords} vertical />)
  //   expect(wrapper.prop('vertical')).toBe(true)
  // })
})
