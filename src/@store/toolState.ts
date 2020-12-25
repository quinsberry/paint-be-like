import { makeAutoObservable } from 'mobx'

class ToolStateClass {
  constructor() {
    makeAutoObservable(this)
  }

  tool = null as any

  setTool(tool: any) {
    this.tool = tool
  }

  setFillColor(color: string) {
    this.tool.fillColor = color
  }

  setStrokeColor(color: string) {
    this.tool.strokeColor = color
  }

  setLineWidth(width: number) {
    this.tool.lineWidth = width
  }
}

export const ToolState = new ToolStateClass()
