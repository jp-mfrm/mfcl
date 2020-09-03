import React from 'react';
import { render } from '@testing-library/react';

import Pagination from './index';

describe('Pagination Component', () => {

  it('renders a className', () => {
  const { container } = render(
    <Pagination className="test-class-name">Click Me</Pagination>,
  );
  expect(container.querySelector('.pagination-wrapper')?.classList).toContain('test-class-name')
  })
});
