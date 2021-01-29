import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import Tabs from './index'

const items = [
  'Extra firm Seally snoring bed sets Americas top-rated brands bed sheets snooze medium latex encased coil bunk bed linens firm plush queen sleep expert dreams memory foam hypoallergenic free delivery 50% low price guarantee spine position pillowcases futon shut eye loft special financing brand ultra plush comfy save back pain sleep trial size zzzzzz king stomach innerspring Sterns & Foster adjustable bed Beautyrest box spring side bundle Purple malouf wrap dow',
  'Mattress ipsum dolor amet Comfy pillow protectors innerspring Serta twin queen hypoallergenic Seally king position malouf wrap mattress toppers crib snoring extra firm adjustable bed back free delivery futon 50% tulo mattress gel memory foam Sleepys medium shut eye california king headboards full hot bed frames cooling tulo mattress comfort pillow protectors comforters gel memory foam Serta twin hybrid Tempur-pedic Sleepys mattress toppers nap pillow top best prices crib customized shopping options soft neck snuggle',
  'Pillow top Sterns & Foster snoring pain Seally king gel memory foam bed sheets twin soft Purple pillowcases sleep trial save hot loft plush bundle latex brand low price guarantee box spring snooze sleep expert spine crib bed sets zzzzzz futon Sleepys comfort size comforters customized shopping options snuggle dreams bed frames Serta medium Beautyrest back encased coil pillow protectors tulo mattress down headboards hypoallergenic full position',
  'Tempur-pedic side neck ultra plush queen malouf wrap 50% california king best prices cooling linens stomach shut eye hybrid Americas top-rated brands firm memory foam free delivery adjustable bed bunk bed extra firm innerspring special financing mattress toppers comfy Serta encased coil gel memory foam medium customized shopping options comforters twin 50% zzzzzz position pain sleep expert linens stomach adjustable bed box spring Americas top-rated brands full Sterns & Foster king latex snooze side shut eye special financing',
  'Mattress ipsum dolor amet Tempur-pedic Beautyrest brand snuggle crib pillow protectors snoring free delivery down sleep trial loft innerspring size bunk bed queen memory foam cooling dreams Purple neck Seally comfy california king tulo mattress back soft mattress toppers nap plush extra firm bed frames best prices comfort futon hypoallergenic firm hot bed sets malouf wrap hybrid pillowcases spine bed sheets save Sleepys pillow top headboards low price guarantee bundle ultra plush'
]

describe('Tabs Component', () => {
  it('should render component', () => {
    const { container } = render(<Tabs name="test" items={items} />)
    expect(container.querySelector('.tablist-wrapper')).toBeInTheDocument()
  })

  // it('should render a tablist', () => {
  //   const { getByText } = render(<Tabs name="test" items={items} />)
  //   expect(getByText('About Beautyrest')).toBeInTheDocument()
  // })

  // it('should render panel content', () => {
  //   const { container } = render(<Tabs name="test" items={items} />)
  //   expect(container.querySelector('.panel')).toBeInTheDocument()
  // })

  // it('should change tab on click', () => {
  //   const onClick = jest.fn()
  //   const { container } = render(<Tabs name="test" items={items} onClick={onClick} />)
  //   // @ts-ignore
  //   fireEvent.click(container.querySelector('.tab-item'))
  //   expect(onClick).toHaveBeenCalled()
  // })

  // it('should change tab on left arrow', () => {
  //   const onKeyDown = jest.fn()

  //   const { getAllByRole } = render(<Tabs name="test" items={items} onKeyDown={onKeyDown} />)

  //   // @ts-ignore
  //   fireEvent.keyDown(getAllByRole('tab')[2], { keyCode: 39 })
  //   expect(getAllByRole('tab')[1]?.classList).toContain('active')
  //   expect(onKeyDown).toHaveBeenCalled()
  // })

  // it('should change tab on right arrow', () => {
  //   const onKeyDown2 = jest.fn()

  //   const { getAllByRole } = render(<Tabs name="test" items={items} onKeyDown={onKeyDown2} />)

  //   // @ts-ignore
  //   fireEvent.keyDown(getAllByRole('tab')[0], { keyCode: 39 })
  //   expect(getAllByRole('tab')[1]?.classList).toContain('active')
  //   expect(onKeyDown2).toHaveBeenCalled()
  // })

  // it('should be vertical if position="left"', () => {
  //   const { container } = render(<Tabs name="test" items={items} position="left" />)
  //   expect(container.querySelector('.tabs-wrapper')?.classList).toContain('left')
  // })
})
