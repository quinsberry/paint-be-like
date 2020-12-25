import React, { useEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite'

import { CanvasState, ToolState } from '@store'
import { Brush } from '@tools'

import './Canvas.scss'

interface CanvasProps {}
export const Canvas: React.FC<CanvasProps> = observer(
  (): React.ReactElement => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
      CanvasState.setCanvas(canvasRef)
      ToolState.setTool(new Brush(canvasRef.current!))
    }, [])

    const handleMouseDown = (e: any) => {
      CanvasState.pushToUndo(canvasRef.current?.toDataURL())
    }

    return (
      <div className="canvas">
        <canvas onMouseDown={handleMouseDown} ref={canvasRef} width={600} height={400}></canvas>
      </div>
    )
  },
)
