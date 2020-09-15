import React from 'react';
import { render } from '@testing-library/react';

import Tabs from './index';

describe('Tabs Component', () => {

  it('renders a className', () => {
  const { container } = render(
    <Tabs className="test-class-name">Click Me</Tabs>,
  );
  expect(container.querySelector('.tabs-wrapper')?.classList).toContain('test-class-name')
  })
});
