export class Tool {
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.ctx = canvas?.getContext('2d')
    this.destroyEvents()
  }

  protected canvas: HTMLCanvasElement
  protected ctx

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
