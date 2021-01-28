import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'

import Popper from './index'
import { act } from 'react-dom/test-utils'

describe('Popper Component', () => {
  it('renders a trigger', () => {
    const { getByRole } = render(
      <Popper
        trigger={'Top-Start Position'}
        offsetY={10}
        position={'top-start'}
        triggerClass={'test'}
        tooltipContent={"I'm in the Top-Start Position"}
      />
    )
    expect(getByRole('button').classList).toContain('test')
  })

  it('should not render arrow when false and vice versa', async () => {
    const { getByRole, getByTestId, rerender, container } = render(
      <Popper
        trigger={'Top-Start Position'}
        triggerClass={'test'}
        tooltipContent={"I'm in the Top-Start Position"}
        arrow={true}
      />
    )

    await act(async () => {
      fireEvent.click(getByRole('button'))
    })

    expect(getByTestId('arrow')).toBeInTheDocument()

    await act(async () => {
      rerender(
        <Popper
          trigger={'Top-Start Position'}
          triggerClass={'test'}
          tooltipContent={"I'm in the Top-Start Position"}
          arrow={false}
        />
      )
    })
    expect(container.querySelector('.arrow')).not.toBeInTheDocument()
  })

  it('should render top positions', async () => {
    const { container, getByRole, getByTestId } = render(
      <Popper
        position={'top'}
        trigger={'Top Position'}
        offset={10}
        tooltipContent={"I'm in the Top Position"}
        arrow={true}
      />
    )
    await act(async () => {
      fireEvent.click(getByRole('button'))
    })

    expect(getByTestId('arrow').classList).toContain('styleArrowBottom')
  })

  it('should render bottom positions', async () => {
    const { container, getByRole, getByTestId } = render(
      <Popper
        position={'bottom'}
        trigger={'Bottom Position'}
        offset={10}
        tooltipContent={"I'm in the Top Position"}
        arrow={true}
      />
    )

    await act(async () => {
      fireEvent.click(getByRole('button'))
    })

    expect(getByTestId('arrow').classList).toContain('styleArrowTop')
  })

  it('should render left positions', async () => {
    const { container, getByRole, getByTestId } = render(
      <Popper
        position={'left'}
        trigger={'Left Position'}
        offset={10}
        tooltipContent={"I'm in the Top Position"}
        arrow={true}
      />
    )

    await act(async () => {
      fireEvent.click(getByRole('button'))
    })

    expect(getByTestId('arrow').classList).toContain('styleArrowRight')
  })

  it('should render right positions', async () => {
    const { container, getByRole, getByTestId } = render(
      <Popper
        position={'right'}
        trigger={'Right Position'}
        offset={10}
        tooltipContent={"I'm in the Top Position"}
        arrow={true}
      />
    )

    await act(async () => {
      fireEvent.click(getByRole('button'))
    })

    expect(getByTestId('arrow').classList).toContain('styleArrowLeft')
  })

  it('should handle escape', async () => {
    const { container, getByRole, getByText } = render(
      <Popper position={'top'} trigger={'Top Position'} offset={10} tooltipContent={'Test Content'} arrow={true} />
    )
    expect(container.querySelector('.popper-wrapper')?.children.length).toBe(1)

    await act(async () => {
      fireEvent.click(getByRole('button'))
    })

    expect(container.querySelector('.popper-wrapper')?.children.length).toBe(2)

    await act(async () => {
      fireEvent.keyDown(document, { key: 'Escape' })
    })

    expect(container.querySelector('.popper-wrapper')?.children.length).toBe(1)
  })

  it('should show close button if enabled and vice versa', async () => {
    const { container, getByRole, rerender } = render(
      <Popper
        position={'top'}
        trigger={'Top Position'}
        offset={10}
        tooltipContent={"I'm in the Top Position"}
        arrow={true}
        closeBtn={true}
      />
    )
    await act(async () => {
      fireEvent.click(getByRole('button'))
    })

    expect(container.querySelector('.close')).toBeInTheDocument()

    await act(async () => {
      rerender(
        <Popper
          trigger={'Top-Start Position'}
          triggerClass={'test'}
          tooltipContent={"I'm in the Top-Start Position"}
          closeBtn={false}
        />
      )
    })
    expect(container.querySelector('.close')).not.toBeInTheDocument()
  })

  it('should close popper on close button click', async () => {
    await act(async () => {
      const { container, getAllByRole, getByLabelText, findByLabelText, getByText } = render(
        <Popper
          position={'top'}
          trigger={'Click Me'}
          offset={10}
          tooltipContent={'Test Content'}
          arrow={true}
          closeBtn={true}
        />
      )

      expect(container.querySelector('.popper-wrapper')?.children.length).toBe(1)

      await act(async () => {
        fireEvent.click(getByText('Click Me'))
      })

      expect(container.querySelector('.popper-wrapper')?.children.length).toBe(2)

      await act(async () => {
        fireEvent.click(getByLabelText('Close Alert'))
      })

      expect(container.querySelector('.popper-wrapper')?.children.length).toBe(1)
    })
  })

  it('should show heading text if enabled and vice versa', async () => {
    const { container, getByRole, getByText, rerender } = render(
      <Popper
        position={'top'}
        trigger={'Top Position'}
        offset={10}
        tooltipContent={"I'm in the Top Position"}
        arrow={true}
        header={'header'}
      />
    )

    await act(async () => {
      fireEvent.click(getByRole('button'))
    })

    expect(getByText('header')).toBeInTheDocument()

    await act(async () => {
      rerender(
        <Popper
          trigger={'Top-Start Position'}
          triggerClass={'test'}
          tooltipContent={"I'm in the Top-Start Position"}
          closeBtn={false}
        />
      )
    })
    expect(container.querySelector('.popper-header')).not.toBeInTheDocument()
  })
})
