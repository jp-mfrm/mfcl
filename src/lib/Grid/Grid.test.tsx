import React from 'react'
import { render } from '@testing-library/react'

import Grid from './index'
import GridRow from './GridRow'
import GridItem from './GridItem'

describe('Grid Component', () => {
  it('renders the grid styles given', () => {
    const { getByTestId } = render(<Grid gridStyles={{ marginTop: '1px' }}>content</Grid>)
    expect(getByTestId('grid-container')).toHaveStyle('margin-top: 1px')
  })
  it('adds the className given', () => {
    const { getByTestId } = render(<Grid className={'test-class'}>content</Grid>)
    expect(getByTestId('grid-container').classList).toContain('test-class')
  })

  it('creates the container by default', () => {
    const { getByTestId } = render(<Grid>content</Grid>)
    expect(getByTestId('grid-container')).toHaveClass('container')
  })
  it('does not add container class when given prop', () => {
    const { getByTestId } = render(<Grid createContainer={false}>content</Grid>)
    expect(getByTestId('grid-container')).not.toHaveClass('container')
  })

  it('creates the row by default', () => {
    const { getByTestId } = render(<Grid>content</Grid>)
    expect(getByTestId('grid-row')).toHaveClass('grid-row')
  })
  it('does not add row class when given prop', () => {
    const { getByTestId } = render(<Grid createRows={false}>content</Grid>)
    expect(getByTestId('grid-row')).not.toHaveClass('grid-row')
  })
  it('adds row alignment prop', () => {
    const { getByTestId } = render(<Grid alignRows={'center'}>content</Grid>)
    expect(getByTestId('grid-row')).toHaveClass('grid-row-center')
  })
  it('renders children as is by default', () => {
    const { getByText } = render(<Grid>content</Grid>)
    expect(getByText('content')).toBeInTheDocument()
  })
  it('renders children as gridItems when given prop', () => {
    const { container } = render(
      <Grid createGridItems>
        <div>Test Content</div>
        <div>Test Content</div>
      </Grid>
    )
    expect(container.querySelectorAll('.grid-item').length).toEqual(2)
  })
})

describe('Grid Row', () => {
  it('renders children as is', () => {
    const { getByText } = render(<GridRow>content</GridRow>)
    expect(getByText('content')).toBeInTheDocument()
  })
  it('adds the row styles given', () => {
    const { getByTestId } = render(<GridRow alignRow={'center'}>content</GridRow>)
    expect(getByTestId('grid-row')).toHaveClass('grid-row-center')
  })
})

describe('Grid Item', () => {
  it('renders children as is', () => {
    const { getByText } = render(<GridItem>content</GridItem>)
    expect(getByText('content')).toBeInTheDocument()
  })
  it('adds the correct column class', () => {
    const { getByTestId } = render(<GridItem defaultSize={6}>content</GridItem>)
    expect(getByTestId('grid-column')).toHaveClass('col-xs-6')
  })
  it('adds the gridItem styles', () => {
    const { container } = render(<GridItem itemStyles={{ marginTop: '1px' }}>content</GridItem>)
    expect(container.querySelector('.grid-item')).toHaveStyle('margin-top: 1px')
  })
  it('adds the className given', () => {
    const { container } = render(<GridItem className={'test-class'}>content</GridItem>)
    expect(container.querySelector('.grid-item')?.classList).toContain('test-class')
  })
})
