import { Socket, WSMethods } from '@core/websocket'
import { Tool } from './Tool'

export class Brush extends Tool {
  constructor(canvas: HTMLCanvasElement, socket: Socket, id: string) {
    super(canvas, socket, id)
    this.listen()
  }

  private mouseDown: boolean = false

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
          type: 'finish',
          x: e.pageX - e.target.offsetLeft,
          y: e.pageY - e.target.offsetTop,
        },
      },
    })
  }

  private mouseDownHandler(e: any) {
    this.mouseDown = true
    this.ctx?.beginPath()
    this.ctx?.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
  }

  private mouseMoveHandler(e: any) {
    if (this.mouseDown) {
      this.socket.send({
        method: WSMethods.draw,
        data: {
          id: this.id,
          figure: {
            type: 'brush',
            x: e.pageX - e.target.offsetLeft,
            y: e.pageY - e.target.offsetTop,
          },
        },
      })
    }
  }

  public static draw(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx.lineTo(x, y)
    ctx.stroke()
  }
}
