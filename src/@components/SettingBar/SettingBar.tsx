import { ToolState } from '@store'
import React from 'react'

import './SettingBar.scss'

interface SettingBarProps {}
export const SettingBar: React.FC<SettingBarProps> = (): React.ReactElement => {
  const handleLineWidthChange = (e: any) => ToolState.setLineWidth(e.target.value)
  const handleStrokeColorChange = (e: any) => ToolState.setStrokeColor(e.target.value)

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
      <label htmlFor="stroke-color">Stroke color</label>
      <input onChange={handleStrokeColorChange} style={{ margin: '0 10px' }} id="stroke-color" type="color" />
    </div>
  )
}
