import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Carousel from './index';
// import carouselHelper from './carouselHelper';
import { Simulate } from 'react-dom/test-utils';

describe('Carousel Component', () => {

  it('should render the carouselClass prop', () => {
    const { container } = render(
      <Carousel ariaLabel="test" carouselClass="test-class-name"></Carousel>
    );
    expect(container.querySelector('.carousel-wrapper')?.classList).toContain('test-class-name')
  })

  it('should align the buttons properly', () => {
    const { container, rerender } = render(
      <Carousel ariaLabel="test" infinite></Carousel>
    );
    expect(container.querySelector('.carousel-wrapper-controls')?.classList).toContain('middle');
    expect(container.querySelector('.carousel-wrapper-controls')?.classList).toContain('apart');

    rerender(
      <Carousel ariaLabel="test" autoSlide btnAlignment='top'></Carousel>
    );
    expect(container.querySelector('.carousel-wrapper-controls')?.classList).toContain('top');

    rerender(
      <Carousel ariaLabel="test" btnAlignment='top center'></Carousel>
    );
    expect(container.querySelector('.carousel-wrapper-controls')?.classList).toContain('top');
    expect(container.querySelector('.carousel-wrapper-controls')?.classList).toContain('center');

    rerender(
      <Carousel ariaLabel="test" btnAlignment='middle left bottom'></Carousel>
    );
    expect(container.querySelector('.carousel-wrapper-controls')?.classList).toContain('middle');
    expect(container.querySelector('.carousel-wrapper-controls')?.classList).toContain('left');
    expect(container.querySelector('.carousel-wrapper-controls')?.classList).not.toContain('bottom');
  })

  it('should trigger transition click events', () => {
    const { container } = render (
      <Carousel ariaLabel="test">
        <div>one</div>
        <div>two</div>
      </Carousel>
    );
    fireEvent.click(container.querySelector('.prev')!, { button: 0 });
    var childrenNodes = container.querySelectorAll('.carousel-wrapper-slider div')
    expect(childrenNodes.length).toEqual(2);
    expect(childrenNodes[0].innerHTML).toEqual('one');
    expect(childrenNodes[1].innerHTML).toEqual('two');

    fireEvent.click(container.querySelector('.next')!, { button: 0 });
    childrenNodes = container.querySelectorAll('.carousel-wrapper-slider div')
    expect(childrenNodes.length).toEqual(2);
  })
});
