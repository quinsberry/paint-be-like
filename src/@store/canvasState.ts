import { makeAutoObservable } from 'mobx'
import { Socket } from '@core/websocket'

class CanvasStateClass {
  constructor() {
    makeAutoObservable(this)
  }

  public canvas = null as HTMLCanvasElement | null
  public socket: Socket | null = null
  public sessionId: string | null = null
  private undoList = [] as any[]
  private redoList = [] as any[]
  public username = ''

  public setSocket = (socket: Socket): void => {
    this.socket = socket
  }
  public setSessionId = (id: string): void => {
    this.sessionId = id
  }

  public setUsername = (username: string): void => {
    this.username = username
  }

  public setCanvas(canvas: React.RefObject<HTMLCanvasElement>): void {
    this.canvas = canvas.current
  }

  public pushToUndo(data: any): void {
    this.undoList.push(data)
  }

  public pushToRedo(data: any): void {
    this.redoList.push(data)
  }

  public undo(): void {
    let ctx = this.canvas?.getContext('2d')
    if (this.undoList.length < 1) return

    let dataUrl = this.undoList.pop()
    this.redoList.push(this.canvas?.toDataURL())
    let img = new Image()
    img.src = dataUrl
    img.onload = () => {
      ctx?.clearRect(0, 0, this.canvas!.width, this.canvas!.height)
      ctx?.drawImage(img, 0, 0, this.canvas!.width, this.canvas!.height)
    }
  }

  public redo(): void {
    let ctx = this.canvas?.getContext('2d')
    if (this.redoList.length < 1) return

    let dataUrl = this.redoList.pop()
    this.undoList.push(this.canvas?.toDataURL())
    let img = new Image()
    img.src = dataUrl
    img.onload = () => {
      ctx?.clearRect(0, 0, this.canvas!.width, this.canvas!.height)
      ctx?.drawImage(img, 0, 0, this.canvas!.width, this.canvas!.height)
    }
  }
}

export const CanvasState = new CanvasStateClass()
