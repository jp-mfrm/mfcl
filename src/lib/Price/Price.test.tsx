import React from 'react';
import { render } from '@testing-library/react';

import Price from './index';

describe('Price Component', () => {

  it('renders a className', () => {
  const { container } = render(
    <Price className="test-class-name">Click Me</Price>,
  );
  expect(container.querySelector('.price-wrapper')?.classList).toContain('test-class-name')
  })
});
