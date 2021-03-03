import { fireEvent, render } from '@testing-library/react'

import Carousel from './index'
import React from 'react'
import { act } from '@testing-library/react-hooks'
import { Chip } from '..'

const Chips = {
  onClick: (value: any) => {
    console.log(value)
  },
  className: 'CHEEPS',
  list: [
    {
      label: 'Serta',
      value: 'mattresses?brand=Serta',
      onClick: (value: any) => {
        console.log(value + ' custom!')
      },
      className: 'CHEEPS CUSTOM',
    },
    {
      label: 'Purple',
      value: 'mattresses?brand=Purple'
    },
    {
      label: 'Beautyrest',
      value: 'mattresses?brand=BeautyRest'
    },
    {
      label: 'Stearns & Foster',
      value: 'mattresses?brand=Stearns and Foster'
    },
    {
      label: 'Sealy',
      value: 'mattresses?brand=Sealy'
    }
  ]
}

describe('Carousel Component', () => {
  beforeEach(() => {
    jest.useFakeTimers()

    Object.defineProperties(window.HTMLElement.prototype, {
      offsetWidth: {
        get: function() { return this.tagName === 'SPAN' ? 100: 500}
      }
    });
    
    HTMLElement.prototype.getBoundingClientRect = jest.fn(() => {
        return {
            width: 120,
            height: 120,
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            x: 0,
            y: 0,
            toJSON: {} as any
        }
    });
  })

  afterEach(() => {
    jest.clearAllTimers()
  })

  it('should render the carouselClass prop', () => {
    const { container } = render(<Carousel ariaLabel="test" carouselClass="test-class-name"></Carousel>)
    expect(container.querySelector('.carousel-wrapper')?.classList).toContain('test-class-name')
  })

  it('should align the buttons properly', () => {
    const { container } = render(<Carousel ariaLabel="test" controlAlignment="middle left bottom"></Carousel>)
    expect(container.querySelector('.carousel-wrapper-control')?.classList).toContain('middle')
    expect(container.querySelector('.carousel-wrapper-control')?.classList).toContain('left')
    expect(container.querySelector('.carousel-wrapper-control')?.classList).not.toContain('bottom')
  })

  it('should hide the control buttons when necessary', () => {
    const { container } = render(<Carousel hideControls ariaLabel="test"></Carousel>)

    expect(container.querySelector('.prev')?.classList).toContain('hidden')
    expect(container.querySelector('.next')?.classList).toContain('hidden')
  })

  it('should hide the indicator buttons when necessary', () => {
    const { container } = render(
      <Carousel hideIndicators ariaLabel="test">
        <div>One</div>
      </Carousel>
    )

    setTimeout(() => {
      expect(container.querySelectorAll('.carousel-wrapper-indicators > button')?.length).toBe(0)
    }, 0)
  })

  it('should render marginless slides correctly', () => {
    const { container, rerender, getAllByLabelText } = render(
      <Carousel layoutGap={0} infinite itemsToShow={2} ariaLabel="test">
        <div>One</div>
        <div>Two</div>
      </Carousel>
    )

    expect(getAllByLabelText('slide 1 of 2')[0]?.classList).toContain('marginless')

    rerender(
      <Carousel layoutGap={0} itemsToShow={2} ariaLabel="test">
        <div>One</div>
        <div>Two</div>
      </Carousel>
    )

    expect(getAllByLabelText('slide 1 of 2')[0]?.classList).toContain('marginless')
  })

  it('should autoslide when necessary', () => {
    const { container, getAllByLabelText } = render(
      <Carousel autoSlide ariaLabel="test">
        <div>One</div>
        <div>Two</div>
        <div>Three</div>
      </Carousel>
    )

    setTimeout(() => {
      expect(getAllByLabelText('slide 1 of 3')[0]).toHaveAttribute('aria-hidden', 'true')
      expect(getAllByLabelText('slide 2 of 3')[0]).toHaveAttribute('aria-hidden', 'false')
      expect(getAllByLabelText('slide 3 of 3')[0]).toHaveAttribute('aria-hidden', 'true')
    }, 3100)
  })

  it('should render indicator BG correctly', () => {
    const { container, rerender } = render(
      <Carousel ariaLabel="test" indicatorBg="dark">
        <div>One</div>
        <div>Two</div>
      </Carousel>
    )

    expect(container.querySelector('.carousel-wrapper-indicators')?.classList).toContain('dark')

    rerender(
      <Carousel ariaLabel="test">
        <div>One</div>
        <div>Two</div>
      </Carousel>
    )

    expect(container.querySelector('.carousel-wrapper-indicators')?.classList).not.toContain('dark')
  })

  it('should render control style correctly', () => {
    const { container, rerender } = render(
      <Carousel ariaLabel="test" controlStyle="legacy">
        <div>One</div>
        <div>Two</div>
      </Carousel>
    )
    expect(container.querySelector('.carousel-wrapper-control')?.classList).toContain('legacy')

    rerender(
      <Carousel ariaLabel="test" controlStyle="round">
        <div>One</div>
        <div>Two</div>
      </Carousel>
    )
    expect(container.querySelector('.carousel-wrapper-control')?.classList).toContain('round')

    rerender(
      <Carousel ariaLabel="test">
        <div>One</div>
        <div>Two</div>
      </Carousel>
    )
    expect(container.querySelector('.carousel-wrapper-control')?.classList).not.toContain('round')
    expect(container.querySelector('.carousel-wrapper-control')?.classList).not.toContain('round')
  })

  it('should trigger transition click events', () => {
    const { container, getAllByLabelText } = render(
      <Carousel ariaLabel="test">
        <div>One</div>
        <div>Two</div>
      </Carousel>
    )

    const next = container.querySelector('.next')
    const prev = container.querySelector('.prev')

    //@ts-ignore
    fireEvent.click(prev)

    setTimeout(() => {
      expect(getAllByLabelText('slide 1 of 2')[0]).toHaveAttribute('aria-hidden', 'false')
      expect(getAllByLabelText('slide 2 of 2')[0]).toHaveAttribute('aria-hidden', 'true')
    }, 100)

    //@ts-ignore
    fireEvent.click(next)

    setTimeout(() => {
      expect(getAllByLabelText('slide 1 of 2')[0]).toHaveAttribute('aria-hidden', 'true')
      expect(getAllByLabelText('slide 2 of 2')[0]).toHaveAttribute('aria-hidden', 'false')
    }, 100)

    //@ts-ignore
    fireEvent.click(prev)

    setTimeout(() => {
      expect(getAllByLabelText('slide 1 of 2')[0]).toHaveAttribute('aria-hidden', 'false')
      expect(getAllByLabelText('slide 2 of 2')[0]).toHaveAttribute('aria-hidden', 'true')
    }, 100)

    //@ts-ignore
    fireEvent.click(prev)

    setTimeout(() => {
      expect(getAllByLabelText('slide 1 of 2')[0]).toHaveAttribute('aria-hidden', 'false')
      expect(getAllByLabelText('slide 2 of 2')[0]).toHaveAttribute('aria-hidden', 'true')
    }, 100)

    //@ts-ignore
    fireEvent.click(next)

    setTimeout(() => {
      expect(getAllByLabelText('slide 1 of 2')[0]).toHaveAttribute('aria-hidden', 'true')
      expect(getAllByLabelText('slide 2 of 2')[0]).toHaveAttribute('aria-hidden', 'false')
    }, 100)

    //@ts-ignore
    fireEvent.keyDown(next, { key: 'Enter' })

    setTimeout(() => {
      expect(getAllByLabelText('slide 1 of 2')[0]).toHaveAttribute('aria-hidden', 'true')
      expect(getAllByLabelText('slide 2 of 2')[0]).toHaveAttribute('aria-hidden', 'false')
    }, 100)

    //@ts-ignore
    fireEvent.keyDown(prev, { key: 'Enter' })

    setTimeout(() => {
      expect(getAllByLabelText('slide 1 of 2')[0]).toHaveAttribute('aria-hidden', 'false')
      expect(getAllByLabelText('slide 2 of 2')[0]).toHaveAttribute('aria-hidden', 'true')
    }, 100)

    //@ts-ignore
    fireEvent.keyDown(prev, { key: 'Tab' })

    setTimeout(() => {
      expect(getAllByLabelText('slide 1 of 2')[0]).toHaveAttribute('aria-hidden', 'false')
      expect(getAllByLabelText('slide 2 of 2')[0]).toHaveAttribute('aria-hidden', 'true')
    }, 100)
  })

  it('should handle invalid elements prop', () => {
    const { container } = render(<Carousel ariaLabel="test">Test</Carousel>)
    expect(container.querySelectorAll('.slide')[0]).toBeUndefined()
  })

  it('should render the correct number of items to show', () => {
    const { getAllByLabelText, rerender } = render(
      <Carousel layoutGap={5} infinite itemsToShow={2} ariaLabel="test">
        <div>One</div>
        <div>Two</div>
        <div>Three</div>
        <div>Four</div>
      </Carousel>
    )

    setTimeout(() => {
      expect(getAllByLabelText('slide 1 of 4')[0]).toHaveAttribute('aria-hidden', 'false')
      expect(getAllByLabelText('slide 2 of 4')[0]).toHaveAttribute('aria-hidden', 'false')
      expect(getAllByLabelText('slide 3 of 4')[0]).toHaveAttribute('aria-hidden', 'true')
      expect(getAllByLabelText('slide 4 of 4')[0]).toHaveAttribute('aria-hidden', 'true')
    }, 100)

    rerender(
      <Carousel layoutGap={0} ariaLabel="test">
        <div>One</div>
        <div>Two</div>
      </Carousel>
    )

    setTimeout(() => {
      expect(getAllByLabelText('slide 1 of 2')[0]).toHaveAttribute('aria-hidden', 'true')
      expect(getAllByLabelText('slide 2 of 2')[0]).toHaveAttribute('aria-hidden', 'false')
    }, 100)
  })

  it('should correctly transition on indicator button click', () => {
    const { container, getAllByLabelText } = render(
      <Carousel ariaLabel="test">
        <div>One</div>
        <div>Two</div>
        <div>Three</div>
        <div>Four</div>
      </Carousel>
    )

    fireEvent.click(container.querySelectorAll('.indicator-button')[0]!)
    fireEvent.click(container.querySelectorAll('.indicator-button')[1]!)

    setTimeout(() => {
      expect(getAllByLabelText('slide 1 of 4')[0]).toHaveAttribute('aria-hidden', 'true')
      expect(getAllByLabelText('slide 2 of 4')[0]).toHaveAttribute('aria-hidden', 'false')
      expect(getAllByLabelText('slide 3 of 4')[0]).toHaveAttribute('aria-hidden', 'true')
      expect(getAllByLabelText('slide 4 of 4')[0]).toHaveAttribute('aria-hidden', 'true')
    }, 100)

    //@ts-ignore
    fireEvent.keyDown(container.querySelectorAll('.indicator-button')[0]!, { key: 'Enter' })

    setTimeout(() => {
      expect(getAllByLabelText('slide 1 of 4')[0]).toHaveAttribute('aria-hidden', 'false')
      expect(getAllByLabelText('slide 2 of 4')[0]).toHaveAttribute('aria-hidden', 'true')
      expect(getAllByLabelText('slide 3 of 4')[0]).toHaveAttribute('aria-hidden', 'true')
      expect(getAllByLabelText('slide 4 of 4')[0]).toHaveAttribute('aria-hidden', 'true')
    }, 100)

    //@ts-ignore
    fireEvent.keyDown(container.querySelectorAll('.indicator-button')[0]!, { key: 'Tab' })

    setTimeout(() => {
      expect(getAllByLabelText('slide 1 of 4')[0]).toHaveAttribute('aria-hidden', 'false')
      expect(getAllByLabelText('slide 2 of 4')[0]).toHaveAttribute('aria-hidden', 'true')
      expect(getAllByLabelText('slide 3 of 4')[0]).toHaveAttribute('aria-hidden', 'true')
      expect(getAllByLabelText('slide 4 of 4')[0]).toHaveAttribute('aria-hidden', 'true')
    }, 100)
  })

  it('should correctly handle drag event', () => {
    const { container, rerender } = render(
      <Carousel layoutGap={5} ariaLabel="test">
        <div>One</div>
        <div>Two</div>
      </Carousel>
    )

    fireEvent.click(container.querySelectorAll('.slide')[1]!, { clientX: 500 })
    fireEvent.mouseDown(container.querySelectorAll('.slide')[1]!, { clientX: 500 })
    fireEvent.mouseMove(container.querySelectorAll('.slide')[1]!, { clientX: 200 })
    fireEvent.click(container.querySelectorAll('.slide')[1]!, { clientX: 500 })

    jest.clearAllTimers()

    setTimeout(() => {
      expect(container.querySelectorAll('.slide')[1]?.classList).toContain('grabbing')
    }, 100)

    fireEvent.mouseUp(container.querySelectorAll('.slide')[1]!, { clientX: 100 })

    rerender(
      <Carousel layoutGap={0} infinite duration={0} ariaLabel="test">
        <div>One</div>
        <div>Two</div>
      </Carousel>
    )

    fireEvent.mouseDown(container.querySelectorAll('.slide')[1]!, { clientX: 2000 })
    fireEvent.mouseMove(container.querySelectorAll('.slide')[1]!, { clientX: 1000 })

    jest.clearAllTimers()

    setTimeout(() => {
      expect(container.querySelectorAll('.slide')[1]?.classList).toContain('grabbing')
    }, 100)

    fireEvent.mouseUp(container.querySelectorAll('.slide')[1]!, { clientX: 500 })

    fireEvent.touchStart(container.querySelectorAll('.slide')[0]!, { clientX: 0 })
    fireEvent.touchMove(container.querySelectorAll('.slide')[0]!, { clientX: 50 })

    jest.clearAllTimers()

    setTimeout(() => {
      expect(container.querySelectorAll('.slide')[0]?.classList).toContain('grabbing')
    }, 100)

    fireEvent.touchEnd(container.querySelectorAll('.slide')[0]!, { clientX: 50 })
  })

  it('should correctly handle responsive breakpoints on window resize', () => {
    const { container } = render(
      <Carousel
        infinite
        ariaLabel="test"
        responsive={[
          {
            breakpoint: 1000,
            itemsToShow: 2,
            controlAlignment: 'top right',
            hideControls: true,
            hideIndicators: false,
            indicatorStyle: 'bar',
            layoutGap: 0
          },
          {
            breakpoint: 250,
            hideIndicators: true
          }
        ]}
      >
        <div>Slide 1</div>
        <div>Slide 2</div>
        <div>Slide 3</div>
      </Carousel>
    )

    act(() => {
      //@ts-ignore
      window.innerWidth = 500
      //@ts-ignore
      window.innerHeight = 500
      fireEvent(window, new Event('resize'))
    })

    setTimeout(() => {
      expect(container.querySelectorAll('.carousel-wrapper-indicators > button')?.length).toBe(3)
    }, 0)

    jest.clearAllTimers()

    act(() => {
      //@ts-ignore
      window.innerWidth = 200
      //@ts-ignore
      window.innerHeight = 200
      fireEvent(window, new Event('resize'))
    })

    setTimeout(() => {
      expect(container.querySelectorAll('.carousel-wrapper-indicators > button')?.length).toBe(0)
    }, 0)
  })

  it('should render carousel chips appropriately', () => {
    const { container } = render(
      <Carousel ariaLabel="test" layoutGap={5} controlStyle="legacy" chips={Chips} />
    )
    expect(container.querySelector('.slide')?.classList).toContain('chip-slide')
    fireEvent.click(container.querySelectorAll('.chip-slide button')[0]!)
    
    expect(container.querySelectorAll('.slide')[0]).toHaveStyle('margin: 0px 5px 0px 0px')
    expect(container.querySelectorAll('.slide')[0]).toHaveStyle('flex-basis: 0%')
  })

  it('should render variable width slides appropriately', () => {
    const { container } = render(
      <Carousel ariaLabel="test" layoutGap={30} disableControls variableWidth>
      {Chips.list.map(({ label, value }) => {
        return (
          <div key={label}>
            <Chip label={label} variant="default" onClick={() => console.log(value)} />
          </div>
        )
      })}
      </Carousel>
    )

    expect(container.querySelectorAll('.slide')[0]).toHaveStyle('margin: 0px 30px 0px 0px')
    expect(container.querySelectorAll('.slide')[0]).toHaveStyle('flex-basis: 0%')
  })

  it('should handle event capturing appropriately', () => {
    const { container, rerender } = render(
      <Carousel layoutGap={5} ariaLabel="test" capturePropagation='disable'>
        <div>One</div>
        <div>Two</div>
      </Carousel>
    )

    fireEvent.click(container.querySelectorAll('.slide')[1]!, { clientX: 500 })
    fireEvent.mouseDown(container.querySelectorAll('.slide')[1]!, { clientX: 500 })
    fireEvent.mouseMove(container.querySelectorAll('.slide')[1]!, { clientX: 200 })
    fireEvent.click(container.querySelectorAll('.slide')[1]!, { clientX: 500 })

    jest.clearAllTimers()

    setTimeout(() => {
      expect(container.querySelectorAll('.slide')[1]?.classList).toContain('grabbing')
    }, 100)

    fireEvent.mouseUp(container.querySelectorAll('.slide')[1]!, { clientX: 100 })

    rerender(
      <Carousel layoutGap={0} infinite duration={0} ariaLabel="test" capturePropagation='allow'>
        <div>One</div>
        <div>Two</div>
      </Carousel>
    )

    fireEvent.mouseDown(container.querySelectorAll('.slide')[1]!, { clientX: 2000 })
    fireEvent.mouseMove(container.querySelectorAll('.slide')[1]!, { clientX: 1000 })
    
    jest.clearAllTimers()

    setTimeout(() => {
      expect(container.querySelectorAll('.slide')[1]?.classList).toContain('grabbing')
      fireEvent.click(container.querySelectorAll('.slide')[1])
    }, 100)
  })
})
