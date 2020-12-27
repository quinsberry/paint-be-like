import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import { DrawData, FigureType, Socket } from '@core/websocket'
import { CanvasState, ToolState } from '@store'
import { Brush } from '@tools'

import { Modal, Button } from 'react-bootstrap'
import './Canvas.scss'

interface CanvasProps {}
export const Canvas: React.FC<CanvasProps> = observer(
  (): React.ReactElement => {
    const params = useParams<{ id: string }>()
    const [isModalOpen, setIsModalOpen] = useState(true)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const usernameRef = useRef<HTMLInputElement>(null)

    const drawHandler = (data: DrawData): void => {
      const figure = data.figure
      const ctx = canvasRef.current!.getContext('2d')
      switch (figure.type) {
        case FigureType.brush:
          Brush.draw(ctx!, figure.x, figure.y)
          break
        case FigureType.finish:
          ctx?.beginPath()
          break
        default:
          break
      }
    }

    useEffect(() => {
      CanvasState.setCanvas(canvasRef)
    }, [])

    useEffect(() => {
      if (CanvasState.username) {
        const socket = new Socket()
        CanvasState.setSocket(socket)
        CanvasState.setSessionId(params.id)
        ToolState.setTool(new Brush(canvasRef.current!, socket, params.id))

        socket.connect(params.id, CanvasState.username)
        socket.message(drawHandler)
      }
    }, [CanvasState.username])

    const handleMouseDown = (e: any): void => {
      CanvasState.pushToUndo(canvasRef.current?.toDataURL())
    }

    const modal = {
      onSubmit: (): void => {
        CanvasState.setUsername(usernameRef.current!.value)
        setIsModalOpen(false)
      },
      onClose: (): void => setIsModalOpen(false),
    }

    return (
      <div className="canvas">
        <Modal show={isModalOpen} onHide={modal.onClose}>
          <Modal.Header>
            <Modal.Title>Enter your name</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input type="text" ref={usernameRef} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={modal.onSubmit}>
              Enter
            </Button>
          </Modal.Footer>
        </Modal>

        <canvas onMouseDown={handleMouseDown} ref={canvasRef} width={600} height={400}></canvas>
      </div>
    )
  },
)
