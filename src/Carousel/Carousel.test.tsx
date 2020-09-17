import React, {ReactNode} from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import Carousel from './index';

describe('Carousel Component', () => {

  it('should render the carouselClass prop', () => {
    const { container } = render(
      <Carousel ariaLabel="test" carouselClass="test-class-name"></Carousel>
    );
    expect(container.querySelector('.carousel-drag-wrapper')?.classList).toContain('test-class-name')
  })

  it('should align the buttons properly', () => {
    const { container, rerender } = render(
      <Carousel ariaLabel="test" infinite></Carousel>
    );
    expect(container.querySelector('.carousel-drag-wrapper-control')?.classList).toContain('middle');
    expect(container.querySelector('.carousel-drag-wrapper-control')?.classList).toContain('apart');

    rerender(
      <Carousel ariaLabel="test" autoSlide btnAlignment='top'></Carousel>
    );
    expect(container.querySelector('.carousel-drag-wrapper-control')?.classList).toContain('top');

    rerender(
      <Carousel ariaLabel="test" btnAlignment='top center'></Carousel>
    );
    expect(container.querySelector('.carousel-drag-wrapper-control')?.classList).toContain('top');
    expect(container.querySelector('.carousel-drag-wrapper-control')?.classList).toContain('center');

    rerender(
      <Carousel ariaLabel="test" btnAlignment='middle left bottom'></Carousel>
    );
    expect(container.querySelector('.carousel-drag-wrapper-control')?.classList).toContain('middle');
    expect(container.querySelector('.carousel-drag-wrapper-control')?.classList).toContain('left');
    expect(container.querySelector('.carousel-drag-wrapper-control')?.classList).not.toContain('bottom');
  })

  it('should call the control button functions', () => {
    const { container } = render(
      <Carousel draggable ariaLabel="test"></Carousel>
    );

    fireEvent.click(container.querySelector('.prev')!);
    fireEvent.click(container.querySelector('.next')!);

    //TO-DO: figure out how to check dom change

  })

  it('should hide the control buttons when necessary', () => {
    const { container, rerender } = render(
      <Carousel ariaLabel="test"></Carousel>
    );

    expect(container.querySelector('.prev')?.classList).not.toContain('hidden');
    expect(container.querySelector('.next')?.classList).not.toContain('hidden');

    rerender(<Carousel hideControls ariaLabel="test"></Carousel>);

    expect(container.querySelector('.prev')?.classList).toContain('hidden');
    expect(container.querySelector('.next')?.classList).toContain('hidden');

  })

  it('should autoslide when necessary', () => {
    const { container } = render(
      <Carousel autoSlide ariaLabel="test">
        <div>One</div>
        <div>Two</div>
        <div>Three</div>
      </Carousel>
    );

    //TO-DO: How to check if dom changed

  })

  it('should trigger transition click events', async () => {
    const { container } = render(
      <Carousel infinite ariaLabel='test'>
        <div>One</div>
        <div>Two</div>
        <div>Three</div>
      </Carousel>
    )
    fireEvent.click(container.querySelector('.next')!);

    screen.debug();
  })

  // it('should trigger transition click events', async () => {
  //   var children: ReactNode;
    
  //   const { result } = renderHook(() => carouselHelper(children, 1, 1, 'middle apart', false, 'round', 3000, false, true, false));

  //   console.log(result.current.alignment);

  // })
});
