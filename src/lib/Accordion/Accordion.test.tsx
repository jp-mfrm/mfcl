import React from 'react'
import { render } from '@testing-library/react'

import Accordion from './index'

// TODO - write tests
describe('Accordion Component', () => {
  const { container } = render(<Accordion className="test-class-name">Click Me</Accordion>)
  expect(container.querySelector('accordion-wrapper')?.classList).toContain('test-class-name')
})
