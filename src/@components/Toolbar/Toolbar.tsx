import React from 'react'

import { ToolState, CanvasState } from '@store'
// import { Brush, Circle, Line, Rect, Eraser } from '@tools'
import { Brush, Rect } from '@tools'

import { ToolButton } from '@components/common'

import './Toolbar.scss'

interface ToolbarProps {}
export const Toolbar: React.FC<ToolbarProps> = (): React.ReactElement => {
  const handleChangeColor = (e: any) => {
    ToolState.setStrokeColor(e.target.value)
    ToolState.setFillColor(e.target.value)
  }

  const onToolClick = {
    brush: () => ToolState.setTool(new Brush(CanvasState.canvas!, CanvasState.socket!, CanvasState.sessionId!)),
    rect: () => ToolState.setTool(new Rect(CanvasState.canvas!, CanvasState.socket!, CanvasState.sessionId!)),
    // circle: () => ToolState.setTool(new Circle(CanvasState.canvas!)),
    // eraser: () => ToolState.setTool(new Eraser(CanvasState.canvas!, CanvasState.socket!, CanvasState.sessionId!)),
    // line: () => ToolState.setTool(new Line(CanvasState.canvas!)),
    undo: () => CanvasState.undo(),
    redo: () => CanvasState.redo(),
    download: () => {
      const dataUrl = CanvasState.canvas?.toDataURL()
      let a = document.createElement('a')
      a.href = dataUrl!
      a.download = CanvasState.sessionId + '.jpg'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    },
  }

  return (
    <div className="toolbar">
      <ToolButton type="brush" onClick={onToolClick.brush} />
      <ToolButton type="rect" onClick={onToolClick.rect} />
      {/* <ToolButton type="circle" onClick={onToolClick.circle} />
      <ToolButton type="eraser" onClick={onToolClick.eraser} />
      <ToolButton type="line" onClick={onToolClick.line} /> */}
      <input type="color" onChange={handleChangeColor} />
      <ToolButton type="undo" onClick={onToolClick.undo} />
      <ToolButton type="redu" onClick={onToolClick.redo} />
      <ToolButton type="save" onClick={onToolClick.download} />
    </div>
  )
}
