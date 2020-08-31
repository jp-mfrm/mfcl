import React from 'react';
import Textarea from './index';
import { render, fireEvent } from '@testing-library/react';

describe('Textarea Component', () => {

  it('should render the inputClass prop', () => {
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
    );
    expect(container.querySelector('.textarea-wrapper label'))?.toHaveTextContent('test label name');
    expect(container.querySelector('.textarea-wrapper label'))?.not.toHaveAttribute('for');
    expect(container.querySelector('.textarea-wrapper textarea'))?.not.toHaveAttribute('name');

    rerender(
      <Textarea label="test label name" name="test-name"></Textarea>
    );
    expect(container.querySelector('.textarea-wrapper label'))?.toHaveTextContent('test label name');
    expect(container.querySelector('.textarea-wrapper label')?.getAttribute('for')).toEqual('test-name');
    expect(container.querySelector('.textarea-wrapper textarea')?.getAttribute('name')).toEqual('test-name');
  })

  it('should implement the custom styling props correctly', () => {
    const { container } = render(
      <Textarea 
        wrapperStyling={{ width: '400px', backgroundColor: 'blue' }} 
        fieldStyling={{ height: '200px', alignItems: 'flex-start' }}>
      </Textarea>
    );
    expect(container.querySelector('.textarea-wrapper'))?.toHaveStyle('width: 400px; background-color: blue');
    expect(container.querySelector('.textarea-wrapper'))?.not.toHaveStyle('align-items: flex-start; height: 200px');
    expect(container.querySelector('.textarea-wrapper textarea'))?.toHaveStyle('align-items: flex-start; height: 200px');
    expect(container.querySelector('.textarea-wrapper textarea'))?.not.toHaveStyle('width: 400px; background-color: blue');
  });

  it('should render the focus prop correctly', () => {
    const { container, rerender } = render(
      <Textarea></Textarea>
    );
    expect(container.querySelector('textarea')?.classList).not.toContain('focus');

    rerender(
      <Textarea focus></Textarea>
    );
    expect(container.querySelector('textarea')?.classList).toContain('focus');
  });

  it('should render the error prop correctly', () => {
    const { container, rerender } = render(
      <Textarea></Textarea>
    );
    expect(container.querySelector('textarea')?.classList).not.toContain('error');

    rerender(
      <Textarea error></Textarea>
    );
    expect(container.querySelector('textarea')?.classList).toContain('error');
  });

  it('should properly handle keyDown and keyUp events', () => {
    const testKeyDownCallback = jest.fn();
    const testKeyUpCallback = jest.fn();

    const { container } = render(
      <Textarea 
        onKeyDown={ testKeyDownCallback } 
        onKeyUp={ testKeyUpCallback }>
      </Textarea>
    );

    fireEvent.keyDown(container.querySelector('textarea')!, { keyCode: 17 });
    expect(testKeyDownCallback).toHaveBeenCalledTimes(1);
    expect(testKeyUpCallback).toHaveBeenCalledTimes(0);
    
    fireEvent.keyUp(container.querySelector('textarea')!, { keyCode: 17 });
    expect(testKeyDownCallback).toHaveBeenCalledTimes(1);
    expect(testKeyUpCallback).toHaveBeenCalledTimes(1);
  });
});
