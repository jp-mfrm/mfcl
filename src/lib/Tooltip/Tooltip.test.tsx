import React from 'react'
import { render } from '@testing-library/react'

import Tooltip from './index'

const trigger = <div className="trigger">trigger here</div>
const children = <div className="children">children here</div>

describe('Tooltip Component', () => {
  it('renders a className', () => {
    const { container } = render(
      <Tooltip trigger={trigger} className="test-class-name">
        {children}
      </Tooltip>
    )
    expect(container.querySelector('.tooltip-wrapper')?.classList).toContain('test-class-name')
  })

  // it('should fade in with a duration, delay, and easing prop', () => {
  //   const wrapper = mount(
  //     <Tooltip
  //       trigger={trigger}
  //       duration={300}
  //       delay={100}
  //       easing="ease"
  //       arrowClassName="arrow"
  //       tipContainerClassName="tip"
  //     >
  //       {children}
  //     </Tooltip>,
  //   );

  //   expect(wrapper.find('.arrow').prop('style')).toHaveProperty(
  //     'transition',
  //     'all 300ms ease 100ms',
  //   );
  //   expect(wrapper.find('.tip').prop('style')).toHaveProperty(
  //     'transition',
  //     'all 300ms ease 100ms',
  //   );
  // });

  // it('should not render arrow when false and vice versa', () => {
  //   const arrow = mount(
  //     <Tooltip trigger={trigger} arrow arrowClassName="arrow">
  //       {children}
  //     </Tooltip>,
  //   );
  //   const noArrow = mount(
  //     <Tooltip trigger={trigger} arrow={false} arrowClassName="arrow2">
  //       {children}
  //     </Tooltip>,
  //   );

  //   expect(arrow.find('.arrow').exists()).toEqual(true);
  //   expect(noArrow.find('.arrow2').exists()).toEqual(false);
  // });

  // it('should render the backgroundColor prop', () => {
  //   const wrapper = mount(
  //     <Tooltip
  //       trigger={trigger}
  //       position="top"
  //       tipContainerClassName="tip"
  //       arrowClassName="arrow"
  //       backgroundColor="#fff"
  //     >
  //       {children}
  //     </Tooltip>,
  //   );

  //   expect(wrapper.find('.arrow').prop('style')).toHaveProperty(
  //     'borderTop',
  //     'solid #fff 10px',
  //   );
  //   expect(wrapper.find('.tip').prop('style')).toHaveProperty(
  //     'backgroundColor',
  //     '#fff',
  //   );
  // });

  // it('should render positions on arrow and tipContainer', () => {
  //   const wrapper = mount(
  //     <Tooltip
  //       trigger={trigger}
  //       tipContainerClassName="tip"
  //       arrowClassName="arrow"
  //       position="top"
  //     >
  //       {children}
  //     </Tooltip>,
  //   );

  //   // top
  //   expect(wrapper.find('.arrow').prop('style')).toHaveProperty(
  //     'transform',
  //     'translate3d(-50%, 0, 0)',
  //   );
  //   expect(wrapper.find('.tip').prop('style')).toHaveProperty(
  //     'transform',
  //     'translate3d(-50%, 0, 0)',
  //   );

  //   // top-left
  //   wrapper.setProps({ position: 'top-left' });
  //   expect(wrapper.find('.tip').prop('style')).toHaveProperty(
  //     'transform',
  //     'translate3d(calc(-100% + 16px), 0, 0)',
  //   );

  //   // top-right
  //   wrapper.setProps({ position: 'top-right' });
  //   expect(wrapper.find('.tip').prop('style')).toHaveProperty(
  //     'transform',
  //     'translate3d(calc(0% + -16px), 0, 0)',
  //   );

  //   // bottom
  //   wrapper.setProps({ position: 'bottom' });
  //   expect(wrapper.find('.arrow').prop('style')).toHaveProperty(
  //     'transform',
  //     'translate3d(-50%, -10px, 0)',
  //   );
  //   expect(wrapper.find('.tip').prop('style')).toHaveProperty(
  //     'transform',
  //     'translate3d(-50%, 0, 0)',
  //   );

  //   // bottom-left
  //   wrapper.setProps({ position: 'bottom-left' });
  //   expect(wrapper.find('.tip').prop('style')).toHaveProperty(
  //     'transform',
  //     'translate3d(calc(-100% + 16px), 0, 0)',
  //   );

  //   // bottom-right
  //   wrapper.setProps({ position: 'bottom-right' });
  //   expect(wrapper.find('.tip').prop('style')).toHaveProperty(
  //     'transform',
  //     'translate3d(calc(0% + -16px), 0, 0)',
  //   );

  //   // left
  //   wrapper.setProps({ position: 'left' });
  //   expect(wrapper.find('.arrow').prop('style')).toHaveProperty(
  //     'transform',
  //     'translate3d(10px, -50%, 0)',
  //   );
  //   expect(wrapper.find('.tip').prop('style')).toHaveProperty(
  //     'transform',
  //     'translate3d(10px, -50%, 0)',
  //   );

  //   // right
  //   wrapper.setProps({ position: 'right' });
  //   expect(wrapper.find('.arrow').prop('style')).toHaveProperty(
  //     'transform',
  //     'translate3d(-10px, -50%, 0)',
  //   );
  //   expect(wrapper.find('.tip').prop('style')).toHaveProperty(
  //     'transform',
  //     'translate3d(-10px, -50%, 0)',
  //   );
  // });

  // it('should render positions when active', () => {
  //   const wrapper = mount(
  //     <Tooltip
  //       trigger={trigger}
  //       className="tooltip"
  //       tipContainerClassName="tip"
  //       arrowClassName="arrow"
  //       position="top"
  //     >
  //       {children}
  //     </Tooltip>,
  //   );

  //   const tooltip = wrapper.find('.tooltip').at(0);
  //   tooltip.simulate('mouseEnter');

  //   // top
  //   expect(wrapper.find('.arrow').prop('style')).toHaveProperty(
  //     'transform',
  //     'translate3d(-50%, -5px, 0)',
  //   );
  //   expect(wrapper.find('.tip').prop('style')).toHaveProperty(
  //     'transform',
  //     'translate3d(-50%, -5px, 0)',
  //   );

  //   // top-left
  //   wrapper.setProps({ position: 'top-left' });
  //   expect(wrapper.find('.tip').prop('style')).toHaveProperty(
  //     'transform',
  //     'translate3d(calc(-100% + 16px), -5px, 0)',
  //   );

  //   // top-right
  //   wrapper.setProps({ position: 'top-right' });
  //   expect(wrapper.find('.tip').prop('style')).toHaveProperty(
  //     'transform',
  //     'translate3d(calc(0% + -16px), -5px, 0)',
  //   );

  //   // bottom
  //   wrapper.setProps({ position: 'bottom' });
  //   expect(wrapper.find('.arrow').prop('style')).toHaveProperty(
  //     'transform',
  //     'translate3d(-50%, 0, 0)',
  //   );
  //   expect(wrapper.find('.tip').prop('style')).toHaveProperty(
  //     'transform',
  //     'translate3d(-50%, 10px, 0)',
  //   );

  //   // bottom-left
  //   wrapper.setProps({ position: 'bottom-left' });
  //   expect(wrapper.find('.tip').prop('style')).toHaveProperty(
  //     'transform',
  //     'translate3d(calc(-100% + 16px), 10px, 0)',
  //   );

  //   // bottom-right
  //   wrapper.setProps({ position: 'bottom-right' });
  //   expect(wrapper.find('.tip').prop('style')).toHaveProperty(
  //     'transform',
  //     'translate3d(calc(0% + -16px), 10px, 0)',
  //   );

  //   // left
  //   wrapper.setProps({ position: 'left' });
  //   expect(wrapper.find('.arrow').prop('style')).toHaveProperty(
  //     'transform',
  //     'translate3d(0, -50%, 0)',
  //   );
  //   expect(wrapper.find('.tip').prop('style')).toHaveProperty(
  //     'transform',
  //     'translate3d(0, -50%, 0)',
  //   );

  //   // right
  //   wrapper.setProps({ position: 'right' });
  //   expect(wrapper.find('.arrow').prop('style')).toHaveProperty(
  //     'transform',
  //     'translate3d(0, -50%, 0)',
  //   );
  //   expect(wrapper.find('.tip').prop('style')).toHaveProperty(
  //     'transform',
  //     'translate3d(0, -50%, 0)',
  //   );

  //   // nothing
  //   wrapper.setProps({ position: 'null' });
  //   expect(wrapper.find('.arrow').prop('style')).toHaveProperty('opacity', 1);
  //   expect(wrapper.find('.tip').prop('style')).toHaveProperty('opacity', 1);
  // });

  // it('should hover when true', () => {
  //   const wrapper = shallow(
  //     <Tooltip trigger={trigger} hover className="tooltip">
  //       {children}
  //     </Tooltip>,
  //   );

  //   const tooltip = wrapper.find('.tooltip').at(0);

  //   expect(wrapper.state('isShowing')).toEqual(false);

  //   tooltip.simulate('mouseEnter');
  //   expect(wrapper.state('isShowing')).toEqual(true);

  //   tooltip.simulate('mouseLeave');
  //   expect(wrapper.state('isShowing')).toEqual(false);

  //   tooltip.simulate('click');
  //   expect(wrapper.state('isShowing')).toEqual(false);
  // });

  // it('should not hover when false', () => {
  //   const wrapper = shallow(
  //     <Tooltip trigger={trigger} hover={false} className="tooltip">
  //       {children}
  //     </Tooltip>,
  //   );

  //   const tooltip = wrapper.find('.tooltip').at(0);
  //   expect(wrapper.state('isShowing')).toEqual(false);

  //   tooltip.simulate('mouseEnter');
  //   expect(wrapper.state('isShowing')).toEqual(false);
  // });

  // it('should handle click and touch when hover is false', () => {
  //   const map = {};
  //   document.addEventListener = jest.fn((event, cb) => {
  //     map[event] = cb;
  //   });
  //   const props = {
  //     actions: {
  //       something: jest.fn(),
  //     },
  //   };

  //   const wrapper = shallow(
  //     <Tooltip trigger={trigger} hover={false} className="tooltip" {...props}>
  //       {children}
  //     </Tooltip>,
  //   );

  //   const tooltip = wrapper.find('.tooltip').at(0);
  //   expect(wrapper.state('isShowing')).toEqual(false);

  //   tooltip.simulate('click');
  //   expect(wrapper.state('isShowing')).toEqual(true);

  //   tooltip.simulate('keyPress');
  //   expect(wrapper.state('isShowing')).toEqual(true);

  //   map.click({
  //     target: wrapper.instance(),
  //   });
  //   expect(props.actions.something).not.toHaveBeenCalled();

  //   wrapper.unmount();
  // });
})
