import React from 'react';
import { render } from '@testing-library/react';

import Modal from './index';

describe('Modal Component', () => {
  const { container } = render(
    <Modal className="test-class-name">Click Me</Modal>,
  );
  expect(container.querySelector('modal-wrapper')?.classList).toContain('test-class-name')
});
