import { Socket, WSMethods } from '@core/websocket'
import { Tool } from './Tool'

export class Rect extends Tool {
  constructor(canvas: HTMLCanvasElement, socket: Socket, id: string) {
    super(canvas, socket, id)
    this.listen()
  }

  private mouseDown: boolean = false
  private startX!: number
  private startY!: number
  private saved!: string
  private width: number = 0
  private height: number = 0

  private listen() {
    this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    this.canvas.onmousedown = this.mouseDownHandler.bind(this)
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
  }

  private mouseUpHandler(e: any) {
    this.mouseDown = false
    this.socket.send({
      method: WSMethods.draw,
      data: {
        id: this.id,
        figure: {
          type: 'rect',
          x: this.startX,
          y: this.startY,
          width: this.width,
          height: this.height,
          color: this.ctx?.fillStyle,
        },
      },
    })
  }

  private mouseDownHandler(e: any) {
    this.mouseDown = true
    this.ctx?.beginPath()
    this.startX = e.pageX - e.target.offsetLeft
    this.startY = e.pageY - e.target.offsetTop
    this.saved = this.canvas.toDataURL()
  }

  private mouseMoveHandler(e: any) {
    if (this.mouseDown) {
      let currentX = e.pageX - e.target.offsetLeft
      let currentY = e.pageY - e.target.offsetTop
      this.width = currentX - this.startX
      this.height = currentY - this.startY
      this.draw(this.startX, this.startY, this.width, this.height)
    }
  }

  private draw(x: number, y: number, w: number, h: number) {
    const img = new Image()
    img.src = this.saved
    img.onload = () => {
      this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.ctx?.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
      this.ctx?.beginPath()
      this.ctx?.rect(x, y, w, h)
      this.ctx?.fill()
      this.ctx?.stroke()
    }
  }

  public static staticDraw(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, color: string) {
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.rect(x, y, w, h)
    ctx.fill()
    ctx.stroke()
  }
}
