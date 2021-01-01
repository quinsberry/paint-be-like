import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import { DrawData, FigureType, Socket } from '@core/websocket'
import { CanvasState, ToolState } from '@store'
import { Brush, Rect } from '@tools'
import { SyncApi } from '@api/sync.api'

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
        case FigureType.rect:
          Rect.staticDraw(ctx!, figure.x, figure.y, figure.width, figure.height, figure.color)
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
      if (!canvasRef.current) return

      let ctx = canvasRef.current.getContext('2d')
      const setImage = async () => {
        const res = await SyncApi.getImage(params.id, canvasRef.current!.toDataURL())
        const img = new Image()
        img.src = res!.data
        img.onload = () => {
          ctx?.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height)
          ctx?.drawImage(img, 0, 0, canvasRef.current!.width, canvasRef.current!.height)
        }
      }
      setImage()
    }, [params.id])

    const connect = (username: string) => {
      const socket = new Socket()
      CanvasState.setSocket(socket)
      CanvasState.setSessionId(params.id)
      ToolState.setTool(new Brush(canvasRef.current!, socket, params.id))

      socket.connect(params.id, username)
      socket.message(drawHandler)
    }

    const handleMouseDown = (e: any) => {
      CanvasState.pushToUndo(canvasRef.current?.toDataURL())
    }
    const handleMouseUp = async (e: any) => {
      await SyncApi.sendImage(params.id, canvasRef.current!.toDataURL())
    }

    const modal = {
      onSubmit: (): void => {
        CanvasState.setUsername(usernameRef.current!.value)
        connect(usernameRef.current!.value)
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

        <canvas
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          ref={canvasRef}
          width={600}
          height={400}></canvas>
      </div>
    )
  },
)
