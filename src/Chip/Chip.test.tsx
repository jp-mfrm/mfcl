import React from 'react';
import { render } from '@testing-library/react';

import Chip from './index';

describe('Chip Component', () => {
  it('renders a className', () => {
    const { container } = render(
      <Chip className="test-class-name">Click Me</Chip>,
    );
    expect(container.querySelector('.chip-wrapper')?.classList).toContain('test-class-name')
  })
});
