import { ToolState } from '@store'
import React from 'react'

import './SettingBar.scss'

export const SettingBar = () => {
  const handleLineWidthChange = (e: any) => ToolState.setLineWidth(e.target.value)

  return (
    <div className="setting-bar">
      <label htmlFor="line-width">Line width</label>
      <input
        onChange={handleLineWidthChange}
        style={{ margin: '0 10px' }}
        id="line-width"
        type="number"
        defaultValue={1}
        min={1}
        max={50}
      />
    </div>
  )
}
