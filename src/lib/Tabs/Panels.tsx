import React, { useState, FunctionComponent, useEffect, useRef } from 'react'
import Panel from './Panel'

export interface Props {
  items: []
}

const Panels: FunctionComponent<Props> = ({ items }) => {
  return (
    <div className="tabs__panels">
      {items.map((panel, index) => {
        return (
          <Panel
            key={index}
            id={`panel-${index}`}
            index={index}
            // selectedIndex={selectedIndex}
          >
            {panel}
          </Panel>
        )
      })}
    </div>
  )
}

export default Panels
