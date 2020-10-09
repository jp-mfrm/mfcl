import React from 'react';
import { render } from '@testing-library/react';

import Slider from './index';

describe('Slider Component', () => {
  it('renders a className', () => {
    const { container } = render(
      <Slider className="test-class-name">Click Me</Slider>,
    );
    expect(container.querySelector('.slider-wrapper')?.classList).toContain('test-class-name')
  })
});
