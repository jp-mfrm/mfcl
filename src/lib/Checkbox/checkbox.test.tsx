import React from 'react'
import { render } from '@testing-library/react'
import Checkbox from './index'

describe('Checkbox Component', () => {
  it('should render the props correctly', () => {
    render(<Checkbox title="checkbox" />)
  })
})
