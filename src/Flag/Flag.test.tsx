import React from 'react'
import { render } from '@testing-library/react'

import Flag from './index'

describe('Flag Component', () => {
  it('renders the given text', () => {
    const { getByText } = render(<Flag text="Text" />)
    expect(getByText('Text')).toBeInTheDocument()
  })

  it('renders the background color prop', () => {
    const { container } = render(<Flag text="Text" backgroundColor={'red'} />)
    expect(container.querySelector('.flag')).toHaveStyle(
      `background: linear-gradient(to right bottom,  red 50%, transparent 50%)`
    )
  })

  it('renders the text color prop', () => {
    const { container } = render(<Flag text="Text" textColor={'blue'} />)
    expect(container.querySelector('.text')).toHaveStyle(`color: blue`)
  })

  it('renders the height prop', () => {
    const { container } = render(<Flag text="Text" height={'100px'} />)
    expect(container.querySelector('.flag')).toHaveStyle(`height: 100px`)
  })

  it('renders the width prop', () => {
    const { container } = render(<Flag text="Text" width={'200px'} />)
    expect(container.querySelector('.flag')).toHaveStyle(`width: 200px`)
  })
  it('updates style when no container', () => {
    const { container } = render(<Flag text="Text" withoutContainer />)
    expect(container.querySelector('.flag')?.classList).toContain('withoutContainer')
  })
})
