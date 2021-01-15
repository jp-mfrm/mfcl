import React from 'react';
import { render } from '@testing-library/react';

import Popper from './index';

describe('Popper Component', () => {
  it('renders a className', () => {
    const { container } = render(
      <Popper className="test-class-name">Click Me</Popper>,
    );
    expect(container.querySelector('.popper-wrapper')?.classList).toContain('test-class-name')
  })
});
