import React from 'react';
import { render } from '@testing-library/react';
import Button from './index';

describe('Button Component', () => {
  it('should render the children', () => {
    const { getByText } = render(<Button btnType="primary">Click Me</Button>);
    expect(getByText('Click Me')).toBeInTheDocument();
  });

  it('should render the btnTpe prop correctly', () => {
    const { getByRole, rerender } = render(
      <Button btnType="primary">Click Me</Button>,
    );
    expect(getByRole('button').classList).toContain('primary');

    rerender(<Button btnType="link">Click Me</Button>);
    expect(getByRole('button').classList.contains('primary')).toEqual(false);
    expect(getByRole('button').classList).toContain('link');

    rerender(<Button btnType="secondary">Click Me</Button>);
    expect(getByRole('button').classList.contains('primary')).toEqual(false);
    expect(getByRole('button').classList).toContain('secondary');

    rerender(<Button btnType="tertiary">Click Me</Button>);
    expect(getByRole('button').classList.contains('primary')).toEqual(false);
    expect(getByRole('button').classList).toContain('tertiary');
  });

  it('should render the className prop correctly', () => {
    const { getByRole } = render(
      <Button className="explosion">Click Me</Button>,
    );
    expect(getByRole('button').classList).toContain('explosion');
  });

  it('should render the href prop correctly', () => {
    const { container } = render(<Button href="/about">Click Me</Button>);
    expect(container.querySelector('a')).toBeInTheDocument();
  });

  it('should render the loading prop correctly', () => {
    const { getByRole } = render(<Button loading>Click Me</Button>);
    expect(getByRole('button').classList).toContain('loading');
  });

  it('should render the size prop correctly', () => {
    const { getByRole, rerender } = render(<Button size="sm">Click Me</Button>);
    expect(getByRole('button').classList).toContain('sm');

    rerender(<Button size="md">Click Me</Button>);
    expect(getByRole('button').classList.contains('sm')).toEqual(false);
    expect(getByRole('button').classList).toContain('md');
  });

  it('should render the loading prop correctly', () => {
    const { container } = render(<Button type="submit">Click Me</Button>);
    expect(container.querySelector('button[type=submit]')).toBeInTheDocument();
  });
});
