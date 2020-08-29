import React from 'react';
import { render } from '@testing-library/react';

import NumberIncrementer from './index';

describe('NumberIncrementer Component', () => {

  it('renders a className', () => {
  const { container } = render(
    <NumberIncrementer className="test-class-name">Click Me</NumberIncrementer>,
  );
  expect(container.querySelector('.number-incrementer-wrapper')?.classList).toContain('test-class-name')
  })
});
