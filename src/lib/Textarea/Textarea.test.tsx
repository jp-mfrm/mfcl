import React from 'react';
import Textarea from './index';
import { render } from '@testing-library/react';

describe('Textarea Component', () => {

  it('should renders the inputClass prop', () => {
  const { container } = render(
    <Textarea inputClass="test-class"></Textarea>,
  );
  expect(container.querySelector('.textarea-wrapper textarea')?.classList).toContain('test-class')
  })

  it('should render the label and name attribute props correctly', () => {
    const { container, rerender } = render(
      <Textarea name="test-name"></Textarea>,
      );
    expect(container.querySelector('.textarea-wrapper textarea')?.getAttribute('name')).toEqual('test-name');
    expect(container.querySelector('.textarea-wrapper label')).not.toBeInTheDocument();

    rerender(
      <Textarea label="test label name"></Textarea>
    )
    expect(container.querySelector('.textarea-wrapper label'))?.toHaveTextContent('test label name');
    expect(container.querySelector('.textarea-wrapper label'))?.not.toHaveAttribute('for');
    expect(container.querySelector('.textarea-wrapper textarea'))?.not.toHaveAttribute('name');

    rerender(
      <Textarea label="test label name" name="test-name"></Textarea>
    )
    expect(container.querySelector('.textarea-wrapper label'))?.toHaveTextContent('test label name');
    expect(container.querySelector('.textarea-wrapper label')?.getAttribute('for')).toEqual('test-name');
    expect(container.querySelector('.textarea-wrapper textarea')?.getAttribute('name')).toEqual('test-name');
  })
});
