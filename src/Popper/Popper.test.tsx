import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import Popper from './index'
import { act } from '@testing-library/react-hooks'

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

  it('should not render arrow when false and vice versa', () => {
    const { getByRole, getByTestId, rerender, container } = render(
      <Popper
        trigger={'Top-Start Position'}
        triggerClass={'test'}
        tooltipContent={"I'm in the Top-Start Position"}
        arrow={true}
      />
    )
    act(() => {
      fireEvent.click(getByRole('button'))
    })

    expect(getByTestId('arrow')).toBeInTheDocument()

    rerender(
      <Popper
        trigger={'Top-Start Position'}
        triggerClass={'test'}
        tooltipContent={"I'm in the Top-Start Position"}
        arrow={false}
      />
    )
    expect(container.querySelector('.arrow')).not.toBeInTheDocument()
  })

  // it('should render top positions', () => {
  //   const { container, getByRole, getByTestId } = render(
  //     <Popper
  //       position={'top'}
  //       trigger={'Top Position'}
  //       offset={10}
  //       tooltipContent={"I'm in the Top Position"}
  //       arrow={true}
  //     />
  //   )
  //   act(() => {
  //     fireEvent.click(getByRole('button'))
  //     expect(getByTestId('arrow').classList).toContain('styleArrowBottom')
  //   })
  // })

  // it('should render bottom positions', () => {
  //   const { container, getByRole, getByTestId } = render(
  //     <Popper
  //       position={'bottom'}
  //       trigger={'Bottom Position'}
  //       offset={10}
  //       tooltipContent={"I'm in the Top Position"}
  //       arrow={true}
  //     />
  //   )

  //   fireEvent.click(getByRole('button'))
  //   expect(getByTestId('arrow').classList).toContain('styleArrowTop')
  // })

  // it('should render left positions', () => {
  //   const { container, getByRole, getByTestId } = render(
  //     <Popper
  //       position={'left'}
  //       trigger={'Left Position'}
  //       offset={10}
  //       tooltipContent={"I'm in the Top Position"}
  //       arrow={true}
  //     />
  //   )

  //   fireEvent.click(getByRole('button'))
  //   expect(getByTestId('arrow').classList).toContain('styleArrowRight')
  // })

  // it('should render right positions', () => {
  //   const { container, getByRole, getByTestId } = render(
  //     <Popper
  //       position={'right'}
  //       trigger={'Right Position'}
  //       offset={10}
  //       tooltipContent={"I'm in the Top Position"}
  //       arrow={true}
  //     />
  //   )

  //   fireEvent.click(getByRole('button'))
  //   expect(getByTestId('arrow').classList).toContain('styleArrowLeft')
  // })

  // it('should handle escape', () => {
  //   const { container, getByRole } = render(
  //     <Popper
  //       position={'top'}
  //       trigger={'Top Position'}
  //       offset={10}
  //       tooltipContent={"I'm in the Top Position"}
  //       arrow={true}
  //     />
  //   )
  //   expect(container.querySelector('.popper-wrapper')?.children.length).toBe(1)

  //   fireEvent.click(getByRole('button'))
  //   expect(container.querySelector('.popper-wrapper')?.children.length).toBe(2)
  //   fireEvent.keyDown(document, { key: 'Escape' })
  //   expect(container.querySelector('.popper-wrapper')?.children.length).toBe(1)
  // })

  // it('should show close button if enabled and vice versa', () => {
  //   const { container, getByRole, rerender } = render(
  //     <Popper
  //       position={'top'}
  //       trigger={'Top Position'}
  //       offset={10}
  //       tooltipContent={"I'm in the Top Position"}
  //       arrow={true}
  //       closeBtn={true}
  //     />
  //   )
  //   fireEvent.click(getByRole('button'))
  //   expect(container.querySelector('.close')).toBeInTheDocument()

  //   rerender(
  //     <Popper
  //       trigger={'Top-Start Position'}
  //       triggerClass={'test'}
  //       tooltipContent={"I'm in the Top-Start Position"}
  //       closeBtn={false}
  //     />
  //   )
  //   expect(container.querySelector('.close')).not.toBeInTheDocument()
  // })

  // it('should show heading text if enabled and vice versa', () => {
  //   const { container, getByRole, getByText, rerender } = render(
  //     <Popper
  //       position={'top'}
  //       trigger={'Top Position'}
  //       offset={10}
  //       tooltipContent={"I'm in the Top Position"}
  //       arrow={true}
  //       header={'header'}
  //     />
  //   )
  //   fireEvent.click(getByRole('button'))
  //   expect(getByText('header')).toBeInTheDocument()

  //   rerender(
  //     <Popper
  //       trigger={'Top-Start Position'}
  //       triggerClass={'test'}
  //       tooltipContent={"I'm in the Top-Start Position"}
  //       closeBtn={false}
  //     />
  //   )
  //   expect(container.querySelector('.popper-header')).not.toBeInTheDocument()
  // })
})
