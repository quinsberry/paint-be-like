import { makeAutoObservable } from 'mobx'

class CanvasStateClass {
  constructor() {
    makeAutoObservable(this)
  }

  canvas: HTMLCanvasElement | null = null

  setCanvas(canvas: React.RefObject<HTMLCanvasElement>): void {
    this.canvas = canvas.current
  }
}

export const CanvasState = new CanvasStateClass()
