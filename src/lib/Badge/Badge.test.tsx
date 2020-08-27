import React from 'react';
import { render } from '@testing-library/react';

import Badge from './index';

describe('Badge Component', () => {

  it('renders a className', () => {
  const { container } = render(
    <Badge className="test-class-name">Click Me</Badge>,
  );
  expect(container.querySelector('.badge-wrapper')?.classList).toContain('test-class-name')
  })
});
