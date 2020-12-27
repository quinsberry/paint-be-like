export enum WSMethods {
  connection = 'connection',
  draw = 'draw',
}

export interface Message<M = WSMethods, D = any> {
  method: M
  data: D
}

export interface Connection {
  id: string
  username: string
}

export interface DrawData {
  id: string
  figure: DrawFigure
}

export enum FigureType {
  brush = 'brush',
  finish = 'finish',
}

export type DrawFigure = any

export type ConnectionMessage = Message<WSMethods.connection, Connection>
export type DrawMessage = Message<WSMethods.draw, DrawData>

export class Socket {
  private readonly socket = new WebSocket(`ws://localhost:5000/`)

  public connect(sessionId: string, username: string): void {
    this.socket.onopen = () => {
      this.socket.send(
        JSON.stringify({
          method: WSMethods.connection,
          data: {
            id: sessionId,
            username,
          },
        }),
      )
    }
  }

  public message(onDraw: any): void {
    this.socket.onmessage = (e: MessageEvent) => {
      const msgObj: ConnectionMessage | DrawMessage = JSON.parse(e.data)
      switch (msgObj.method) {
        case WSMethods.connection:
          console.log(`User ${msgObj.data.username} was connected`)
          break
        case WSMethods.draw:
          onDraw(msgObj.data)
          break
        default:
          break
      }
    }
  }

  public send(obj: Message<any>): void {
    this.socket.send(JSON.stringify(obj))
  }
}
