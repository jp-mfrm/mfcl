import React from 'react';
import { render } from '@testing-library/react';

import Carousel from './index';

describe('Carousel Component', () => {

  it('renders a className', () => {
  const { container } = render(
    <Carousel className="test-class-name">Click Me</Carousel>,
  );
  expect(container.querySelector('.carousel-wrapper')?.classList).toContain('test-class-name')
  })
});
