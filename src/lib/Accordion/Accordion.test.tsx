import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Accordion from './index'
import AccordionItem from './AccordionItem'

describe('Accordion Component', () => {
  it('should render the accordionClass prop', () => {
    const { container } = render(<Accordion accordionClass="accordion-class" />)
    expect(container.querySelector('.accordionList')?.classList).toContain('accordion-class')
  })

  it('should render the style props correctly', () => {
    const container = render(
      <Accordion
        contentStyles={{ height: '150px' }}
        titleStyles={{ height: '100px' }}
        items={[{ title: '1', content: 'a' }]}
      />
    )
    expect(container.getByTestId('accordion-title')).toHaveStyle('height: 100px')
    expect(container.getByTestId('accordion-content')).toHaveStyle('height: 150px')
  })

  it('should render the width prop correctly', () => {
    const { container } = render(<Accordion width="200px" />)
    expect(container.querySelector('.accordionList')).toHaveStyle('width: 200px')
  })

  it('should render the items as accordionItems', () => {
    const { getByText } = render(<Accordion items={[{ title: 'Title1', content: 'abc' }]} />)
    expect(getByText('Title1')).toBeInTheDocument()
    expect(getByText('abc')).toBeInTheDocument()
  })

  it('should render the children as accordionItems', () => {
    const { getByText } = render(
      <Accordion>
        <AccordionItem title={'Test'} id="1" content={'test content'} />
      </Accordion>
    )
    expect(getByText('Test')).toBeInTheDocument()
    expect(getByText('test content')).toBeInTheDocument()
  })

  it('should render the preview text', () => {
    const { getByText } = render(<Accordion items={[{ title: 'Title1', content: 'abc', preview: 'testPreview' }]} />)
    expect(getByText('testPreview')).toBeInTheDocument()
  })

  it('should render the icon', () => {
    const { getByText } = render(<Accordion items={[{ title: 'Title1', content: 'abc', icon: 'testIcon' }]} />)
    expect(getByText('testIcon')).toBeInTheDocument()
  })

  it('should render with intialOpen when given', () => {
    const { container } = render(
      <Accordion items={[{ title: 'Title1', content: 'abc', icon: 'testIcon', initialOpen: true }]} />
    )
    expect(container.querySelector('.accordionItem')?.classList).toContain('open')
  })

  it('should handle opening section', () => {
    const testOpenCallBack = jest.fn()
    const { getByTestId, container } = render(
      <Accordion items={[{ title: 'Title1', content: 'abc', icon: 'testIcon', onOpen: testOpenCallBack }]} />
    )
    fireEvent.click(getByTestId('accordion-title'))
    expect(testOpenCallBack).toHaveBeenCalled()
    expect(container.querySelector('.accordionItem')?.classList).toContain('open')
  })

  it('should handle closing section', () => {
    const testCloseCallBack = jest.fn()
    const { getByTestId, container } = render(
      <Accordion items={[{ title: 'Title1', content: 'abc', icon: 'testIcon', onClose: testCloseCallBack }]} />
    )
    fireEvent.click(getByTestId('accordion-title'))
    fireEvent.click(getByTestId('accordion-title'))
    expect(testCloseCallBack).toHaveBeenCalled()
    expect(container.querySelector('.accordionItem')?.classList).not.toContain('open')
  })

  it('should handle space key to open/close', () => {
    const testOpenCallBack = jest.fn()
    const { getAllByTestId, container } = render(
      <Accordion items={[{ title: 'Title1', content: 'a', onOpen: testOpenCallBack }]} />
    )
    fireEvent.keyDown(getAllByTestId('accordion-title')[0], { keyCode: 32 })
    expect(container.querySelector('.accordionItem')?.classList).toContain('open')
    expect(testOpenCallBack).toHaveBeenCalled()
  })

  it('should handle enter key to open/close', () => {
    const testOpenCallBack = jest.fn()
    const { getAllByTestId, container } = render(
      <Accordion items={[{ title: 'Title1', content: 'a', onOpen: testOpenCallBack }]} />
    )
    fireEvent.keyDown(getAllByTestId('accordion-title')[0], { keyCode: 13 })
    expect(container.querySelector('.accordionItem')?.classList).toContain('open')
    expect(testOpenCallBack).toHaveBeenCalled()
  })

  it('should handle down arrow key to move focus', () => {
    const testFocusCallBack = jest.fn()
    const testFocusCallBack2 = jest.fn()
    const { getAllByTestId } = render(
      <Accordion items={[{ title: 'Title1', content: 'a', onFocus:testFocusCallBack }, { title: 'Title1', content: 'a', onFocus:testFocusCallBack2 }]} />
    )
    fireEvent.keyDown(getAllByTestId('accordion-title')[0], { keyCode: 40 })

    fireEvent.keyDown(getAllByTestId('accordion-title')[1], { keyCode: 40 })
    fireEvent.keyDown(getAllByTestId('accordion-title')[1], { keyCode: 40 })
    expect(testFocusCallBack).toHaveBeenCalled()
    expect(testFocusCallBack2).toHaveBeenCalled()
  })

  it('should handle up arrow key to move focus', () => {
    const testFocusCallBack = jest.fn()
    const testFocusCallBack2 = jest.fn()
    const { getAllByTestId } = render(
      <Accordion items={[{ title: 'Title1', content: 'a', onFocus:testFocusCallBack }, { title: 'Title1', content: 'a', onFocus:testFocusCallBack2 }]} />
    )
    fireEvent.keyDown(getAllByTestId('accordion-title')[0], { keyCode: 40 })

    fireEvent.keyDown(getAllByTestId('accordion-title')[0], { keyCode: 38 })
    fireEvent.keyDown(getAllByTestId('accordion-title')[1], { keyCode: 38 })
    expect(testFocusCallBack).toHaveBeenCalled()
    expect(testFocusCallBack2).toHaveBeenCalled()
  })

  it('should handle Home key to move focus', () => {
    const testFocusCallBack = jest.fn()
    const { getAllByTestId } = render(
      <Accordion items={[{ title: 'Title1', content: 'a', onFocus:testFocusCallBack }, { title: 'Title1', content: 'a' }]} />
    )
    fireEvent.keyDown(getAllByTestId('accordion-title')[1], { keyCode: 40 })
    fireEvent.keyDown(getAllByTestId('accordion-title')[1], { keyCode: 36 })
    expect(testFocusCallBack).toHaveBeenCalled()
  })

  it('should handle End to move focus', () => {
    const testFocusCallBack2 = jest.fn()
    const { getAllByTestId } = render(
      <Accordion items={[{ title: 'Title1', content: 'a' }, { title: 'Title1', content: 'a', onFocus:testFocusCallBack2 }]} />
    )
    fireEvent.keyDown(getAllByTestId('accordion-title')[0], { keyCode: 40 })
    fireEvent.keyDown(getAllByTestId('accordion-title')[0], { keyCode: 35 })
    expect(testFocusCallBack2).toHaveBeenCalled()
  })
})
