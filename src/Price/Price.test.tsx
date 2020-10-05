import React from 'react';
import { render } from '@testing-library/react';

import Price from './index';

describe('Price Component', () => {
  const price = [1500]

  it('renders a className', () => {
  const { container } = render(<Price price={price} className="test-class-name" />);
  expect(container.querySelector('.price-wrapper')?.classList).toContain('test-class-name')
  })

  it('should render the size prop correctly', () => {
    let size = 'wumbo'
    const { container } = render(<Price price={price} text={size} />)
    expect(container.querySelector('.original-price')?.textContent).toContain(size)
  })

  it('should render the discounted price', () => {
    const { container } = render(<Price price={price} discountPrice={[200]} />)
    expect(container.querySelector('.discounted-price')?.classList).toBeTruthy()
  })

  it('should render the price', () => {
    const { getByTestId } = render(<Price price={price}/>)
    expect(getByTestId('price-container-prices').querySelector('p')?.classList).toContain('original-price')
  })

  it('should center the content', () => {
    const {container} = render(<Price price={price} center/>)
    expect(container.querySelector('.price-wrapper')?.classList).toContain('center')
  })

  it('should render the discount prop correctly', () => {
    const {getByTestId} = render(<Price price={price} discount/>)
    expect(getByTestId('price-container-prices').querySelector('p')?.classList).toContain('discount')
  })

  it('should render the text prop correctly', () => {
    let text = 'choo choo'
    const {getByTestId} = render(<Price price={price} text={text}/>)
    expect(getByTestId('price-container-prices').querySelector('p')?.textContent).toContain(text)
  })

  it('should render the divider prop correctly', () => {
    const {getByTestId} = render(<Price price={price} text='text' divider/>)
    expect(getByTestId('price-container-prices').querySelector('p')?.textContent).toContain('|')
  })
});
