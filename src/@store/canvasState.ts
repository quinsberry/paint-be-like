import { makeAutoObservable } from 'mobx'

class CanvasStateClass {
  constructor() {
    makeAutoObservable(this)
  }

  public canvas = null as HTMLCanvasElement | null
  private undoList = [] as any[]
  private redoList = [] as any[]

  public setCanvas(canvas: React.RefObject<HTMLCanvasElement>): void {
    this.canvas = canvas.current
  }

  public pushToUndo(data: any) {
    this.undoList.push(data)
  }

  public pushToRedo(data: any) {
    this.redoList.push(data)
  }

  public undo() {
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

  public redo() {
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
