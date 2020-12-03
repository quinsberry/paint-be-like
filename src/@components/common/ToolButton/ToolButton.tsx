import React from 'react'
import cn from 'classnames'

import './ToolButton.scss'

type ToolButtonTypes = 'brush' | 'circle' | 'eraser' | 'line' | 'undo' | 'redu' | 'save' | 'rect'

interface ToolButtonProps {
  type: ToolButtonTypes

  onClick?: () => void
}

export const ToolButton: React.FC<ToolButtonProps> = ({ type, onClick }): React.ReactElement => {
  return <button className={cn('tool-btn', { [type]: type })} onClick={onClick}></button>
}
