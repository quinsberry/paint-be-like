import { Tool } from './Tool'

export class Circle extends Tool {
  constructor(canvas: HTMLCanvasElement) {
    // @ts-ignore
    super(canvas)
    this.listen()
  }

  private mouseDown: boolean = false
  private startX!: number
  private startY!: number
  private saved!: string

  private listen() {
    this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    this.canvas.onmousedown = this.mouseDownHandler.bind(this)
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
  }

  private mouseUpHandler(e: any) {
    this.mouseDown = false
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
      let width = currentX - this.startX
      let height = currentY - this.startY
      let radius = Math.sqrt(width ** 2 + height ** 2)
      this.draw(this.startX, this.startY, radius)
    }
  }

  private draw(x: number, y: number, r: number) {
    const img = new Image()
    img.src = this.saved
    img.onload = async () => {
      this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.ctx?.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
      this.ctx?.beginPath()
      this.ctx?.arc(x, y, r, 0, 2 * Math.PI)
      this.ctx?.fill()
      this.ctx?.stroke()
    }
  }
}
