// /lib/canvas/CanvasManager.ts
import axios from "axios";
import { HTTP_BACKEND } from "../../config";
import { Shape } from "./Types";

export class CanvasManager {
  private ctx: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;
  private ws: WebSocket;
  private roomId: string;
  private shapes: Shape[] = [];
  private isDrawing = false;
  private startX = 0;
  private startY = 0;
  private width = 0;
  private height = 0;

  constructor(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    ws: WebSocket,
    roomId: string
  ) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.ws = ws;
    this.roomId = roomId;

    this.ctx.strokeStyle = "white";

    this.init();
  }

  private async init() {
    this.shapes = await this.fetchShapes();
    this.clearCanvas();
    this.drawAllShapes();

    this.addEventListeners();
    this.ws.onmessage = this.handleSocketMessage;
  }

  private addEventListeners() {
    this.canvas.addEventListener("mousedown", this.handleMouseDown);
    this.canvas.addEventListener("mouseup", this.handleMouseUp);
    this.canvas.addEventListener("mousemove", this.handleMouseMove);
  }

  private handleMouseDown = (e: MouseEvent) => {
    const rect = this.canvas.getBoundingClientRect();
    this.startX = e.clientX - rect.left;
    this.startY = e.clientY - rect.top;
    this.isDrawing = true;
  };

  private handleMouseUp = () => {
    this.isDrawing = false;
    const shape: Shape = {
      type: "rect",
      startX: this.startX,
      startY: this.startY,
      width: this.width,
      height: this.height,
    };
    this.shapes.push(shape);
    this.sendShape(shape);
  };

  private handleMouseMove = (e: MouseEvent) => {
    if (!this.isDrawing) return;

    const rect = this.canvas.getBoundingClientRect();
    this.width = e.clientX - rect.left - this.startX;
    this.height = e.clientY - rect.top - this.startY;

    this.clearCanvas();
    this.drawAllShapes();
    this.ctx.strokeRect(this.startX, this.startY, this.width, this.height);
  };

  private handleSocketMessage = (msg: MessageEvent) => {
    const data = JSON.parse(msg.data);
    if (data.type === "chat") {
      const shape: Shape = JSON.parse(data.message);
      this.shapes.push(shape);
      this.clearCanvas();
      this.drawAllShapes();
    }
  };

  private clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private drawAllShapes() {
    for (const shape of this.shapes) {
      this.ctx.strokeRect(
        shape.startX,
        shape.startY,
        shape.width,
        shape.height
      );
    }
  }

  private async fetchShapes(): Promise<Shape[]> {
    const response = await axios.get(
      `${HTTP_BACKEND}/api/v1/room/${this.roomId}`
    );
    return response.data.shapes || [];
  }

  private sendShape(shape: Shape) {
    this.ws.send(
      JSON.stringify({
        type: "chat",
        roomId: this.roomId,
        message: JSON.stringify(shape),
      })
    );
  }
}
