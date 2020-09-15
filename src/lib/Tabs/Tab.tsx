import React, { FunctionComponent } from 'react'
import clsx from 'clsx';
import styles from './tabs.module.scss'

export interface Props {
  id: string
  index?: number
  selectedIndex: number
  // isSelected: boolean
  label: string
  onClick?: Function | null
  onKeyDown?: Function | null
}

const Tab: FunctionComponent<Props> = ({ id, onClick, selectedIndex, index, label }) => {
  // const [isActive, setIsActive] = useState(false)
  // const firstUpdate = useRef(true)
  //const tabRef: any = useRef<HTMLAnchorElement>(null)
  const isSelected = index === selectedIndex;

  return (
    <li className="tabs__tab-list-item" role="presentation">
      <a
        //ref={tabRef}
        aria-controls={id}
        aria-selected={isSelected}
        className={clsx(styles['tab-item'], isSelected && styles['active'])}
        href={`#${id}`}
        role="tab"
        tabIndex={isSelected ? 0 : -1}
        // @ts-ignore
        onClick={onClick}
        // @ts-ignore
        index={index}
        // TODO set it so arrow keys work but this again might want to be on parent level
        // onKeyDown={setSelected}
      >
        {label}
      </a>
    </li>
  )
}

export default Tab
