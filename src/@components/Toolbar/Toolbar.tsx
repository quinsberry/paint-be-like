import React from 'react'

import { ToolState, CanvasState } from '@store'
import { Brush, Circle, Line, Rect } from '@tools'

import { ToolButton } from '@components/common'

import './Toolbar.scss'

export const Toolbar = () => {
  return (
    <div className="toolbar">
      <ToolButton type="brush" onClick={() => ToolState.setTool(new Brush(CanvasState.canvas!))} />
      <ToolButton type="rect" onClick={() => ToolState.setTool(new Rect(CanvasState.canvas!))} />
      <ToolButton type="circle" onClick={() => ToolState.setTool(new Circle(CanvasState.canvas!))} />
      <ToolButton type="eraser" />
      <ToolButton type="line" onClick={() => ToolState.setTool(new Line(CanvasState.canvas!))} />
      <input type="color" />
      <ToolButton type="undo" />
      <ToolButton type="redu" />
      <ToolButton type="save" />
    </div>
  )
}
