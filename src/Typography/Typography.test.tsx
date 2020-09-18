import React from 'react'
import { render } from '@testing-library/react'

import Typography from './index'

describe('Typography Component', () => {
  it('renders a custom tag', () => {
    const { getByTestId } = render(
      <Typography variant="xs" tag="p">
        Hello World
      </Typography>
    )
    expect(getByTestId('typography-wrapper').innerHTML).toContain('p')
  })

  it('renders a variant correctly', () => {
    const { getByTestId } = render(<Typography variant="xs">Hello World</Typography>)
    expect(getByTestId('typography-wrapper').querySelector('.xs')?.classList).toContain('xs')
  })
})
