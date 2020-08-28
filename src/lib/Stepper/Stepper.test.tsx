import React from 'react';
import { render } from '@testing-library/react';

import ProgressTracker from './index';

describe('ProgressTracker Component', () => {

  it('renders a className', () => {
  const { container } = render(
    <ProgressTracker className="test-class-name">Click Me</ProgressTracker>,
  );
  expect(container.querySelector('.progress-tracker-wrapper')?.classList).toContain('test-class-name')
  })
});
