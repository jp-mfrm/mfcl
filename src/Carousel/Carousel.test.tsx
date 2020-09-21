import React from 'react';
import { render, screen, fireEvent} from '@testing-library/react';

import Carousel from './index';

describe('Carousel Component', () => {

  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.clearAllTimers()
  })

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
    expect(container.querySelector('.carousel-wrapper-control')?.classList).toContain('middle');
    expect(container.querySelector('.carousel-wrapper-control')?.classList).toContain('apart');

    rerender(
      <Carousel ariaLabel="test" autoSlide controlAlignment='top'></Carousel>
    );
    expect(container.querySelector('.carousel-wrapper-control')?.classList).toContain('top');

    rerender(
      <Carousel ariaLabel="test" controlAlignment='top center'></Carousel>
    );
    expect(container.querySelector('.carousel-wrapper-control')?.classList).toContain('top');
    expect(container.querySelector('.carousel-wrapper-control')?.classList).toContain('center');

    rerender(
      <Carousel ariaLabel="test" controlAlignment='middle left bottom'></Carousel>
    );
    expect(container.querySelector('.carousel-wrapper-control')?.classList).toContain('middle');
    expect(container.querySelector('.carousel-wrapper-control')?.classList).toContain('left');
    expect(container.querySelector('.carousel-wrapper-control')?.classList).not.toContain('bottom');
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

  it('should hide the indicator buttons when necessary', () => {
    const { container } = render(
      <Carousel hideIndicators ariaLabel="test">
        <div>One</div>
      </Carousel>
    );

    setTimeout(() => {
      expect(container.querySelectorAll('.carousel-wrapper-indicators > button')?.length).toBe(0);
    }, 0)
  
  })

  it('should render marginless slides correctly', () => {
    const { container, rerender, getAllByLabelText } = render(
      <Carousel layoutGap={0} infinite itemsToShow={2} ariaLabel="test">
        <div>One</div>
        <div>Two</div>
      </Carousel>
    );
    
    expect(getAllByLabelText('slide 1 of 2')[0]?.classList).toContain('marginless');

    rerender(
      <Carousel layoutGap={0} itemsToShow={2} ariaLabel="test">
        <div>One</div>
        <div>Two</div>
      </Carousel>
    );

    expect(getAllByLabelText('slide 1 of 2')[0]?.classList).toContain('marginless');
  
  })

  it('should autoslide when necessary', () => {
    const { container, getAllByLabelText  } = render(
      <Carousel autoSlide ariaLabel="test">
        <div>One</div>
        <div>Two</div>
        <div>Three</div>
      </Carousel>
    );

    setTimeout(() => {
      expect(getAllByLabelText('slide 1 of 3')[0]).toHaveAttribute('aria-hidden', 'true');
      expect(getAllByLabelText('slide 2 of 3')[0]).toHaveAttribute('aria-hidden', 'false');
      expect(getAllByLabelText('slide 3 of 3')[0]).toHaveAttribute('aria-hidden', 'true');
    }, 3100)

  })

  it('should trigger transition click events', () => {

    const { container, getAllByLabelText } = render(
      <Carousel ariaLabel='test'>
        <div>One</div>
        <div>Two</div>
      </Carousel>
    )

    const next = container.querySelector('.next');
    const prev = container.querySelector('.prev');

    //@ts-ignore
    fireEvent.click(next)
    
    setTimeout(() => {
      expect(getAllByLabelText('slide 1 of 2')[0]).toHaveAttribute('aria-hidden', 'true');
      expect(getAllByLabelText('slide 2 of 2')[0]).toHaveAttribute('aria-hidden', 'false');
    }, 100);

    //@ts-ignore
    fireEvent.click(prev);

    setTimeout(() => {
      expect(getAllByLabelText('slide 1 of 2')[0]).toHaveAttribute('aria-hidden', 'false');
      expect(getAllByLabelText('slide 2 of 2')[0]).toHaveAttribute('aria-hidden', 'true');;
    }, 100)
    
    //@ts-ignore
    fireEvent.click(prev);

    setTimeout(() => {
      expect(getAllByLabelText('slide 1 of 2')[0]).toHaveAttribute('aria-hidden', 'false');
      expect(getAllByLabelText('slide 2 of 2')[0]).toHaveAttribute('aria-hidden', 'true');;
    }, 100)

    //@ts-ignore
    fireEvent.click(next)

    setTimeout(() => {
      expect(getAllByLabelText('slide 1 of 2')[0]).toHaveAttribute('aria-hidden', 'true');
      expect(getAllByLabelText('slide 2 of 2')[0]).toHaveAttribute('aria-hidden', 'false');;
    }, 100)
  })

  it('should render the carouselClass prop', () => {
    const { container } = render(
      <Carousel ariaLabel="test">
        <div>One</div>
        <div>Two</div>
      </Carousel>
    );
  })

  it('should render the correct number of items to show', () => {
    const { container, getAllByLabelText } = render(
      <Carousel infinite itemsToShow={2} ariaLabel='test'>
        <div>One</div>
        <div>Two</div>
        <div>Three</div>
        <div>Four</div>
      </Carousel>
    )

    setTimeout(() => {
      expect(getAllByLabelText('slide 1 of 4')[0]).toHaveAttribute('aria-hidden', 'false');
      expect(getAllByLabelText('slide 2 of 4')[0]).toHaveAttribute('aria-hidden', 'false');
      expect(getAllByLabelText('slide 3 of 4')[0]).toHaveAttribute('aria-hidden', 'true');
      expect(getAllByLabelText('slide 4 of 4')[0]).toHaveAttribute('aria-hidden', 'true');
    }, 100)
  })

  it('should correctly transition on indicator button click', () => {
    const { container, getAllByLabelText } = render(
      <Carousel ariaLabel='test'>
        <div>One</div>
        <div>Two</div>
        <div>Three</div>
        <div>Four</div>
      </Carousel>
    )

    fireEvent.click(container.querySelectorAll('.indicator-button')[1]!);

    setTimeout(() => {
      expect(getAllByLabelText('slide 1 of 4')[0]).toHaveAttribute('aria-hidden', 'true');
      expect(getAllByLabelText('slide 2 of 4')[0]).toHaveAttribute('aria-hidden', 'false');
      expect(getAllByLabelText('slide 3 of 4')[0]).toHaveAttribute('aria-hidden', 'true');
      expect(getAllByLabelText('slide 4 of 4')[0]).toHaveAttribute('aria-hidden', 'true');
    }, 100)
  })

  it('should correctly handle drag event', () => {
    const { container, rerender } = render(
      <Carousel ariaLabel='test'>
        <div>One</div>
        <div>Two</div>
      </Carousel>
    )

    fireEvent.mouseDown(container.querySelectorAll('.slide')[1]!);
    fireEvent.mouseMove(container.querySelectorAll('.slide')[1]!, {clientX: 500});

    jest.clearAllTimers();

    setTimeout(() => {
      expect(container.querySelectorAll('.slide')[1]?.classList).toContain('grabbing');
    }, 100)

    fireEvent.mouseUp(container.querySelectorAll('.slide')[1]!);

    rerender(
      <Carousel infinite duration={0} ariaLabel='test'>
        <div>One</div>
        <div>Two</div>
      </Carousel>
    );

    fireEvent.mouseDown(container.querySelectorAll('.slide')[1]!, {clientX: 500});
    fireEvent.mouseMove(container.querySelectorAll('.slide')[1]!, {clientX: 0});

    jest.clearAllTimers();

    setTimeout(() => {
      expect(container.querySelectorAll('.slide')[1]?.classList).toContain('grabbing');
    }, 100)

    fireEvent.mouseUp(container.querySelectorAll('.slide')[1]!);
  })

});
