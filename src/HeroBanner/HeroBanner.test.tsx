import React from 'react';
import { render } from '@testing-library/react';

import HeroBanner from './index';

describe('HeroBanner Component', () => {

  it('renders a className', () => {
  const { container } = render(
    <HeroBanner className="test-class-name">Click Me</HeroBanner>,
  );
  expect(container.querySelector('.hero-banner-wrapper')?.classList).toContain('test-class-name')
  })
});
