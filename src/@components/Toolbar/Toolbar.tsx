import React from 'react'

import { ToolState, CanvasState } from '@store'
import { Brush, Circle, Line, Rect, Eraser } from '@tools'

import { ToolButton } from '@components/common'

import './Toolbar.scss'

interface ToolbarProps {}
export const Toolbar: React.FC<ToolbarProps> = (): React.ReactElement => {
  const handleChangeColor = (e: any) => {
    ToolState.setStrokeColor(e.target.value)
    ToolState.setFillColor(e.target.value)
  }

  const onToolClick = {
    brush: () => ToolState.setTool(new Brush(CanvasState.canvas!)),
    rect: () => ToolState.setTool(new Rect(CanvasState.canvas!)),
    circle: () => ToolState.setTool(new Circle(CanvasState.canvas!)),
    eraser: () => ToolState.setTool(new Eraser(CanvasState.canvas!)),
    line: () => ToolState.setTool(new Line(CanvasState.canvas!)),
    undo: () => CanvasState.undo(),
    redo: () => CanvasState.redo(),
  }

  return (
    <div className="toolbar">
      <ToolButton type="brush" onClick={onToolClick.brush} />
      <ToolButton type="rect" onClick={onToolClick.rect} />
      <ToolButton type="circle" onClick={onToolClick.circle} />
      <ToolButton type="eraser" onClick={onToolClick.eraser} />
      <ToolButton type="line" onClick={onToolClick.line} />
      <input type="color" onChange={handleChangeColor} />
      <ToolButton type="undo" onClick={onToolClick.undo} />
      <ToolButton type="redu" onClick={onToolClick.redo} />
      <ToolButton type="save" />
    </div>
  )
}
