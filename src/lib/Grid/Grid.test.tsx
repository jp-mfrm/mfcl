import React from 'react';
import { render } from '@testing-library/react';

import Grid from './index';

describe('Grid Component', () => {

  it('renders a className', () => {
  const { container } = render(
    <Grid className="test-class-name">Click Me</Grid>,
  );
  expect(container.querySelector('.grid-wrapper')?.classList).toContain('test-class-name')
  })
});
