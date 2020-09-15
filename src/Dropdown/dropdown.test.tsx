/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Dropdown from './index'

const options = [
  { name: 'one', value: 1 },
  { name: 'two', value: 2 },
  { name: 'three', value: 3 },
  { name: 'four', value: 4 },
  { name: 'five', value: 5, disabled: true },
  { name: 'six', value: 6 }
]

describe('Dropdown Component', () => {
  const labelText = 'dropdown label'

  it('should render the different className props', () => {
    const { container } = render(
      <Dropdown open options={options} className="dd-class" menuClass="menu-class" listClass="list-class" />
    )
    expect(container.querySelector('.dropdown-container')?.classList).toContain('dd-class')
    expect(container.querySelector('.dropdown-list')?.classList).toContain('menu-class')
    expect(container.querySelector('.dropdown-list-wrapper')?.classList).toContain('list-class')
  })

  it('should render the label prop correctly', () => {
    const { getByText } = render(<Dropdown options={options} label={labelText} />)
    expect(getByText(labelText)).toBeInTheDocument()
  })

  it('should render the width prop correctly', () => {
    const { getByTestId } = render(<Dropdown options={options} width="300px" data-testid="dd" />)
    expect(getByTestId('dd')).toHaveStyle('width: 300px')
  })

  it('should render the open prop correctly', () => {
    const { container } = render(<Dropdown open options={options} />)
    expect(container.querySelector('.dropdown')?.classList).toContain('dropdown-visible')

    const mounted = render(<Dropdown open={false} options={options} />)
    expect(mounted.container.querySelector('.dropdown')?.classList.contains('dropdown-visible')).toEqual(false)
  })

  it('should render the size prop correctly', () => {
    const { container } = render(<Dropdown size="sm" options={options} />)
    expect(container.querySelector('.dropdown')?.classList.contains('dropdown-sm')).toEqual(true)

    const mounted = render(<Dropdown size="lg" options={options} />)
    expect(mounted.container.querySelector('.dropdown')?.classList.contains('dropdown-lg')).toEqual(true)
  })

  it('should render the disabled prop correctly', () => {
    const { container } = render(<Dropdown disabled options={options} />)
    expect(container.querySelector('.dropdown')?.classList.contains('disabled')).toEqual(true)
  })

  it('should render the onClick prop correctly', () => {
    let a = 0
    const { container, rerender } = render(
      <Dropdown
        disabled
        options={options}
        onClick={() => {
          a = 1
        }}
      />
    )
    // @ts-ignore
    fireEvent.click(container.querySelector('.dropdown'))
    expect(a).toEqual(0)

    // remove disabled
    rerender(
      <Dropdown
        options={options}
        onClick={() => {
          a = 1
        }}
      />
    )
    // @ts-ignore
    fireEvent.click(container.querySelector('.dropdown'))
    expect(a).toEqual(1)

    // remove disabled
    rerender(
      <Dropdown
        open
        value={options[1]}
        options={options}
        onClick={() => {
          a = 1
        }}
      />
    )
    // @ts-ignore
    fireEvent.click(container.querySelector('.dropdown'))
    expect(container.querySelector('.dropdown')?.classList.contains('dropdown-visible')).toBeFalsy()
  })

  it('should render the closeOnBlur prop correctly', () => {
    const { container, rerender } = render(<Dropdown options={options} />)
    expect(container.querySelector('.dropdown')?.classList.contains('dropdown-visible')).toEqual(false)
    // @ts-ignore
    fireEvent.click(container.querySelector('.dropdown'))
    expect(container.querySelector('.dropdown')?.classList.contains('dropdown-visible')).toEqual(true)
    // @ts-ignore
    fireEvent.blur(container.querySelector('.dropdown'))
    expect(container.querySelector('.dropdown')?.classList.contains('dropdown-visible')).toEqual(false)

    // rerender dropdown without closing on blur
    rerender(<Dropdown closeOnBlur={false} options={options} />)
    // @ts-ignore
    fireEvent.click(container.querySelector('.dropdown'))
    expect(container.querySelector('.dropdown')?.classList.contains('dropdown-visible')).toEqual(true)
    // @ts-ignore
    fireEvent.blur(container.querySelector('.dropdown'))
    expect(container.querySelector('.dropdown')?.classList.contains('dropdown-visible')).toEqual(true)
  })

  it('should handle clicking on an option', () => {
    const { container, getByTestId } = render(<Dropdown open options={options} />)
    const dropdown = container.querySelector('.dropdown')
    const items = container.querySelectorAll('.dropdown-item')
    expect(dropdown?.classList.contains('dropdown-visible')).toEqual(true)
    // @ts-ignore
    fireEvent.click(items[0])
    expect(dropdown?.classList.contains('dropdown-visible')).toEqual(false)

    // @ts-ignore
    fireEvent.click(dropdown)
    // @ts-ignore
    fireEvent.click(items[0])
    // @ts-ignore
    fireEvent.click(items[4])
    expect(getByTestId('active-item').textContent).toBe('one')
  })

  it('should handle disabled options', () => {
    const { container } = render(<Dropdown open options={options} />)
    expect(container.querySelectorAll('.dropdown-item')[4].classList.contains('item-disabled')).toEqual(true)
  })

  it('should handle being focused', () => {
    const { container } = render(<Dropdown open options={options} />)
    // @ts-ignore
    fireEvent.focus(container.querySelector('.dropdown'))
    expect(container.querySelector('.dropdown')?.classList).toContain('select-focused')
  })

  describe('Handling Keys', () => {
    const handleKeyClick = async (num: number) => {
      it(`${num} enter`, async () => {
        const { container } = render(<Dropdown options={options} />)
        const dropdown = container.querySelector('.dropdown')
        expect(dropdown?.classList.contains('dropdown-visible')).toBeFalsy()
        // @ts-ignore
        fireEvent.keyDown(dropdown, { keyCode: num })
        expect(dropdown?.classList).toContain('dropdown-visible')
      })
    }
    handleKeyClick(13)
    handleKeyClick(32)

    it('27 escape key', () => {
      const { container } = render(<Dropdown open options={options} />)
      const dropdown = container.querySelector('.dropdown')
      // @ts-ignore
      fireEvent.keyDown(dropdown, { keyCode: 27 })
      expect(dropdown?.classList.contains('dropdown-visible')).toBeFalsy()
      expect(dropdown?.classList.contains('select-focused')).toBeFalsy()
      // @ts-ignore
      fireEvent.keyDown(dropdown, { keyCode: 27 })
      expect(dropdown?.classList.contains('dropdown-visible')).toBeFalsy()
      expect(dropdown?.classList.contains('select-focused')).toBeFalsy()
    })

    it('38 down', () => {
      const { container, rerender, getByTestId } = render(<Dropdown options={options} value={options[2]} />)
      const dropdown = container.querySelector('.dropdown')
      expect(dropdown?.classList.contains('dropdown-visible')).toBeFalsy()
      // @ts-ignore
      fireEvent.keyDown(dropdown, { keyCode: 38 })
      expect(dropdown?.classList).toContain('dropdown-visible')
      expect(getByTestId('active-item').textContent).toBe('three')

      rerender(<Dropdown options={options} />)
      // @ts-ignore
      fireEvent.keyDown(dropdown, { keyCode: 38 })
      expect(getByTestId('active-item').textContent).toBe('two')

      // @ts-ignore
      fireEvent.keyDown(dropdown, { which: 38 })
      expect(getByTestId('active-item').textContent).toBe('two')
      // @ts-ignore
      fireEvent.keyDown(dropdown, { keyCode: 38 })
      expect(getByTestId('active-item').textContent).toBe('one')
      // @ts-ignore
      fireEvent.keyDown(dropdown, { keyCode: 38 })
      expect(getByTestId('active-item').textContent).toBe('one')
    })

    it('40 up', () => {
      const { container, rerender, getByTestId } = render(<Dropdown options={options} value={options[2]} />)
      const dropdown = container.querySelector('.dropdown')
      expect(dropdown?.classList.contains('dropdown-visible')).toBeFalsy()
      // @ts-ignore
      fireEvent.keyDown(dropdown, { keyCode: 40 })
      expect(dropdown?.classList).toContain('dropdown-visible')
      expect(getByTestId('active-item').textContent).toBe('three')

      rerender(<Dropdown options={options} />)
      // @ts-ignore
      fireEvent.keyDown(dropdown, { keyCode: 40 })
      expect(getByTestId('active-item').textContent).toBe('four')
    })

    it('handle search for S', () => {
      const { container, rerender, getByTestId } = render(<Dropdown options={options} value={options[2]} />)
      const dropdown = container.querySelector('.dropdown')
      rerender(<Dropdown options={options} />)
      // @ts-ignore
      fireEvent.keyDown(dropdown, { keyCode: 83 }) // S
      expect(getByTestId('active-item').textContent).toBe('six')
    })

    it('handle tab 9', () => {
      const { container } = render(<Dropdown options={options} open selectOnTab={false} />)
      const dropdown = container.querySelector('.dropdown')
      // @ts-ignore
      fireEvent.keyDown(dropdown, { keyCode: 9 }) // tab

      expect(dropdown?.classList.contains('dropdown-visible')).toBeFalsy()
    })

    it('should render the selectOnTab prop', () => {
      let num = 0
      const { container, rerender } = render(
        <Dropdown
          options={options}
          selectOnTab
          open
          value={null}
          onChange={(activeItem: any) => {
            num = activeItem.value
          }}
        />
      )
      expect(num).toEqual(0)

      rerender(
        <Dropdown
          options={options}
          selectOnTab
          open
          onChange={(activeItem: any) => {
            num = activeItem.value
          }}
        />
      )
      const dropdown = container.querySelector('.dropdown')
      // @ts-ignore
      fireEvent.keyDown(dropdown, { keyCode: 9 }) // tab
      expect(num).toEqual(options[0].value)

      rerender(<Dropdown options={options} selectOnTab={false} />)
      // @ts-ignore
      fireEvent.keyDown(dropdown, { keyCode: 9 }) // tab
      expect(dropdown?.classList.contains('dropdown-visible')).toBeFalsy()
    })
  })
})
