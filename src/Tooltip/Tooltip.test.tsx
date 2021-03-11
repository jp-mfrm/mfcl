import React from 'react'
import { render, fireEvent, screen, act } from '@testing-library/react'

import Tooltip from './index'

const trigger = 'i'
const initialDimensions = {
  top: 5,
  bottom: 5,
  left: 5,
  right: 5,
  height: 5,
  width: 5
}

describe('Tooltip Component', () => {
  beforeEach(() => {
    // @ts-ignore
    Element.prototype.getBoundingClientRect = jest.fn(() => {
      return {
        width: 120,
        height: 120,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
      }
    })
  })
  it('renders a className', () => {
    render(<Tooltip header="header" trigger={trigger} className="test-class-name" />)
    expect(screen.getByLabelText('tooltip-wrapper').classList).toContain('test-class-name')
  })

  it('should fade in with a duration, delay, and easing prop', () => {
    render(
      <Tooltip
        header="header"
        trigger={trigger}
        duration={300}
        delay={100}
        easing="ease"
        arrowClassName="arrow"
        tipContainerClassName="tip"
      />
    )

    expect(screen.getByLabelText('tooltip-arrow')).toHaveStyle('transition: all 300ms ease 100ms')
    expect(screen.getAllByRole('tooltip')[1]).toHaveStyle('transition: all 300ms ease 100ms')
  })

  it('should not render arrow when false and vice versa', () => {
    const { rerender, container } = render(<Tooltip trigger={trigger} arrow arrowClassName="arrow" header="header" />)
    expect(screen.getByLabelText('tooltip-arrow')).toBeInTheDocument()

    rerender(<Tooltip trigger={trigger} arrow={false} header="header" />)
    expect(container.querySelector('.tooltip-arrow')).not.toBeInTheDocument()
  })

  it('should render top positions on arrow and tipContainer', () => {
    render(
      <Tooltip
        header="header"
        trigger={trigger}
        tipContainerClassName="tip"
        position="top"
        initialDimensions={initialDimensions}
      />
    )

    expect(screen.getByLabelText('tooltip-arrow')).toHaveStyle('transform: rotate(-45deg) translate3d(-50%, 0, 0)')
    fireEvent.click(screen.getByLabelText('tooltip-wrapper'))
    expect(screen.getByLabelText('tooltip-arrow')).toHaveStyle('transform: rotate(-45deg) translate3d(-50%, -2px, 0)')
  })

  it('should render top-left positions on arrow and tipContainer', () => {
    render(
      <Tooltip
        header="header"
        trigger={trigger}
        tipContainerClassName="tip"
        position="top-left"
        initialDimensions={initialDimensions}
      />
    )
    expect(screen.getByLabelText('tooltip-arrow')).toHaveStyle('transform: rotate(-45deg) translate3d(-50%, 0, 0)')
    fireEvent.click(screen.getByLabelText('tooltip-wrapper'))
    expect(screen.getByLabelText('tooltip-arrow')).toHaveStyle('transform: rotate(-45deg) translate3d(-50%, -2px, 0)')
  })

  it('should render top-right positions on arrow and tipContainer', () => {
    render(
      <Tooltip
        header="header"
        trigger={trigger}
        tipContainerClassName="tip"
        position="top-right"
        initialDimensions={initialDimensions}
      />
    )
    expect(screen.getByLabelText('tooltip-arrow')).toHaveStyle('transform: rotate(-45deg) translate3d(-50%, 0, 0)')
    fireEvent.click(screen.getByLabelText('tooltip-wrapper'))
    expect(screen.getByLabelText('tooltip-arrow')).toHaveStyle('transform: rotate(-45deg) translate3d(-50%, -2px, 0)')
  })

  it('should render bottom positions on arrow and tipContainer', () => {
    const onOpen = jest.fn()
    const onClose = jest.fn()
    render(
      <Tooltip
        header="header"
        trigger={trigger}
        tipContainerClassName="tip"
        position="bottom"
        initialDimensions={initialDimensions}
        onOpen={onOpen}
        onClose={onClose}
      />
    )
    expect(screen.getByLabelText('tooltip-arrow')).toHaveStyle('transform: rotate(-45deg) translate3d(0, -10px, 0)')
    fireEvent.click(screen.getByLabelText('tooltip-wrapper'))
    expect(screen.getByLabelText('tooltip-arrow')).toHaveStyle('transform: rotate(-45deg) translate3d(-50%, 1px, 0)')
    fireEvent.click(screen.getByLabelText('tooltip-wrapper'))
    expect(onOpen).toHaveBeenCalled()
    expect(onClose).toHaveBeenCalled()
  })

  it('should render bottom-left positions on arrow and tipContainer', () => {
    render(
      <Tooltip
        header="header"
        trigger={trigger}
        tipContainerClassName="tip"
        position="bottom-left"
        initialDimensions={initialDimensions}
      />
    )
    expect(screen.getByLabelText('tooltip-arrow')).toHaveStyle('transform: rotate(-45deg) translate3d(0, -10px, 0)')
    fireEvent.click(screen.getByLabelText('tooltip-wrapper'))
    expect(screen.getByLabelText('tooltip-arrow')).toHaveStyle('transform: rotate(-45deg) translate3d(-50%, 0, 0)')
  })

  it('should render bottom-right positions on arrow and tipContainer', () => {
    render(
      <Tooltip
        header="header"
        trigger={trigger}
        tipContainerClassName="tip"
        position="bottom-right"
        initialDimensions={initialDimensions}
      />
    )
    expect(screen.getByLabelText('tooltip-arrow')).toHaveStyle('transform: rotate(-45deg) translate3d(0, -10px, 0)')
    fireEvent.click(screen.getByLabelText('tooltip-wrapper'))
    expect(screen.getByLabelText('tooltip-arrow')).toHaveStyle('transform: rotate(-45deg) translate3d(-50%, 0, 0)')
  })

  it('should render left positions on arrow and tipContainer', () => {
    render(
      <Tooltip
        header="header"
        trigger={trigger}
        tipContainerClassName="tip"
        position="left"
        initialDimensions={initialDimensions}
      />
    )
    expect(screen.getByLabelText('tooltip-arrow')).toHaveStyle('transform: rotate(-45deg) translate3d(0, -50%, 0)')
    fireEvent.click(screen.getByLabelText('tooltip-wrapper'))
    expect(screen.getByLabelText('tooltip-arrow')).toHaveStyle('transform: rotate(-45deg) translate3d(0, -50%, 0)')
  })

  it('should render right positions on arrow and tipContainer', () => {
    render(
      <Tooltip
        header="header"
        trigger={trigger}
        tipContainerClassName="tip"
        position="right"
        initialDimensions={initialDimensions}
      />
    )
    expect(screen.getByLabelText('tooltip-arrow')).toHaveStyle('transform: rotate(-45deg) translate3d(-10px, -100%, 0)')
    fireEvent.click(screen.getByLabelText('tooltip-wrapper'))
    expect(screen.getByLabelText('tooltip-arrow')).toHaveStyle('transform: rotate(-45deg) translate3d(0, -50%, 0)')
  })

  it('should not hover when false', () => {
    render(<Tooltip header="header" trigger={trigger} hover={false} />)
    expect(screen.getByLabelText('tooltip-arrow')).toHaveStyle('opacity: 0')

    fireEvent.mouseEnter(screen.getByLabelText('tooltip-wrapper'))
    expect(screen.getByLabelText('tooltip-arrow')).toHaveStyle('opacity: 0')
  })

  it('should handle click and touch', () => {
    render(<Tooltip header="header" trigger={trigger} hover={false} />)

    fireEvent.click(screen.getByLabelText('tooltip-wrapper'))
    expect(screen.getAllByRole('tooltip')[1]).toHaveStyle('opacity: 1')
  })

  it('should handle escape', () => {
    render(<Tooltip header="header" trigger={trigger} hover={false} />)
    fireEvent.click(screen.getByLabelText('tooltip-wrapper'))
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.getAllByRole('tooltip')[1]).toHaveStyle('opacity: 0')
  })
})
