import React, { useEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite'

import { CanvasState, ToolState } from '@store'
import { Brush } from '@tools'

import './Canvas.scss'

export const Canvas = observer(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    CanvasState.setCanvas(canvasRef)
    ToolState.setTool(new Brush(canvasRef.current!))
  }, [])

  return (
    <div className="canvas">
      <canvas ref={canvasRef} width={600} height={400}></canvas>
    </div>
  )
})
