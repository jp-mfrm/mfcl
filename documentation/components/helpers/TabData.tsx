import React from 'react'
import mattressIpsum from 'mattress-ipsum'

const CustomHeader = ({ step, title }) => (
  <div>
    <small>Step {step}</small>
    <div>{title}</div>
  </div>
)

export const customTabHeaders = [
  <CustomHeader step={1} title="Sleep Style" />,
  <CustomHeader step={2} title="Mattress" />,
  <CustomHeader step={3} title="Foundation" />,
  <CustomHeader step={4} title="Accessories" />
]

export const ipsumArray = [mattressIpsum(1), mattressIpsum(1), mattressIpsum(1), mattressIpsum(1), mattressIpsum(1)]

export default ['Description', 'Specifications', 'About Beautyrest', 'Delivery & Shipping', 'Warranty']
