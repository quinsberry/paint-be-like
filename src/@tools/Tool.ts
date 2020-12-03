export class Tool {
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.ctx = canvas?.getContext('2d')
    this.destroyEvents()
  }

  protected canvas: HTMLCanvasElement
  protected ctx

  private destroyEvents() {
    this.canvas.onmouseup = null
    this.canvas.onmousedown = null
    this.canvas.onmousemove = null
  }
}
