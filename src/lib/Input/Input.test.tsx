import React from 'react';
import { render } from '@testing-library/react';

import Input from './index';

describe('Input Component', () => {

  it('renders a className', () => {
  const { container } = render(
    <Input className="test-class-name">Click Me</Input>,
  );
  expect(container.querySelector('.input-wrapper')?.classList).toContain('test-class-name')
  })
});
