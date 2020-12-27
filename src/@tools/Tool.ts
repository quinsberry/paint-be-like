import { Socket } from '@core/websocket'

export class Tool {
  protected canvas: HTMLCanvasElement
  protected ctx
  protected socket
  protected id

  constructor(canvas: HTMLCanvasElement, socket: Socket, id: string) {
    this.canvas = canvas
    this.socket = socket
    this.id = id
    this.ctx = canvas?.getContext('2d')
    this.destroyEvents()
  }

  set fillColor(color: string) {
    if (this.ctx) this.ctx.strokeStyle = color
  }

  set strokeColor(color: string) {
    if (this.ctx) this.ctx.strokeStyle = color
  }

  set lineWidth(width: number) {
    if (this.ctx) this.ctx.lineWidth = width
  }

  private destroyEvents() {
    this.canvas.onmouseup = null
    this.canvas.onmousedown = null
    this.canvas.onmousemove = null
  }
}
