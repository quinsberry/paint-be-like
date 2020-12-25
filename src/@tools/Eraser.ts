import { Brush } from './Brush'

export class Eraser extends Brush {
  public draw(x: number, y: number) {
    if (!this.ctx) return
    this.ctx.strokeStyle = 'white'
    this.ctx.lineTo(x, y)
    this.ctx.stroke()
  }
}
