import { makeAutoObservable } from 'mobx'

class ToolStateClass {
  constructor() {
    makeAutoObservable(this)
  }

  tool = null

  setTool(tool: any) {
    this.tool = tool
  }
}

export const ToolState = new ToolStateClass()
