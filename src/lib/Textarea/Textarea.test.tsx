import React from 'react';
import { render } from '@testing-library/react';

import Textarea from './index';

describe('Textarea Component', () => {

  it('renders a className', () => {
  const { container } = render(
    <Textarea className="test-class-name">Click Me</Textarea>,
  );
  expect(container.querySelector('.textarea-wrapper')?.classList).toContain('test-class-name')
  })
});
