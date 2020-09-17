import React from 'react';
import { render } from '@testing-library/react';

import Typography from './index';

describe('Typography Component', () => {

  it('renders a className', () => {
  const { container } = render(
    <Typography className="test-class-name">Click Me</Typography>,
  );
  expect(container.querySelector('.typography-wrapper')?.classList).toContain('test-class-name')
  })
});
