import React from 'react';
import { render } from '@testing-library/react';

import ProductCard from './index';

describe('ProductCard Component', () => {
  const { container } = render(
    <ProductCard className="test-class-name">Click Me</ProductCard>,
  );
  expect(container.querySelector('product-card-wrapper')?.classList).toContain('test-class-name')
});
