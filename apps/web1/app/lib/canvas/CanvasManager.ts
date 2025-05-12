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
  private selectedTool: string = "rect";
  private isDrawing = false;
  private startX = 0;
  private startY = 0;
  private width = 0;
  private height = 0;
  private centerX = 0;
  private centerY = 0;
  private radius = 0;

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

  private handleMouseDown = async (e: MouseEvent) => {
    const rect = this.canvas.getBoundingClientRect();
    this.startX = e.clientX - rect.left;
    this.startY = e.clientY - rect.top;
    this.isDrawing = true;

    if (this.selectedTool == "text") {
      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = "type here..";
      input.style.color = "gray";
      input.style.position = "absolute";
      input.style.left = `${this.startX}px`;
      input.style.top = `${this.startY - 12}px`;

      document.body.appendChild(input);
      setTimeout(() => {
        input.focus();
      });

      const textHandler = (event: KeyboardEvent) => {
        if (event.key == "Enter") {
          this.ctx.fillStyle = "white";
          this.ctx.font = "16px Arial";
          const text = input.value;
          this.ctx.fillText(text, this.startX, this.startY);
          this.isDrawing = false;
          input.removeEventListener("keydown", textHandler);
          document.body.removeChild(input);
          const shape: Shape = {
            type: "text",
            startX: this.startX,
            startY: this.startY,
            text,
          };
          this.shapes.push(shape);
          this.sendShape(shape);
        }
      };

      input.addEventListener("keydown", textHandler);
    }
  };

  private handleMouseUp = () => {
    this.isDrawing = false;
    if (this.selectedTool == "rect") {
      const shape: Shape = {
        type: "rect",
        startX: this.startX,
        startY: this.startY,
        width: this.width,
        height: this.height,
      };
      this.shapes.push(shape);
      this.sendShape(shape);
    }

    if (this.selectedTool == "circle") {
      const shape: Shape = {
        type: "circle",
        centerX: this.centerX,
        centerY: this.centerY,
        radius: this.radius,
      };
      this.shapes.push(shape);
      this.sendShape(shape);
    }

    if (this.selectedTool == "line") {
      const shape: Shape = {
        type: "line",
        startX: this.startX,
        startY: this.startY,
        width: this.width,
        height: this.height,
      };

      this.shapes.push(shape);
      this.sendShape(shape);
    }
  };

  private handleMouseMove = (e: MouseEvent) => {
    if (!this.isDrawing) return;

    if (this.selectedTool == "rect") {
      const rect = this.canvas.getBoundingClientRect();
      this.width = e.clientX - rect.left - this.startX;
      this.height = e.clientY - rect.top - this.startY;

      this.clearCanvas();
      this.drawAllShapes();
      this.ctx.strokeRect(this.startX, this.startY, this.width, this.height);
    }

    if (this.selectedTool == "line") {
      this.width = e.clientX;
      this.height = e.clientY;
      this.ctx.beginPath();
      this.clearCanvas();
      this.drawAllShapes();
      this.ctx.moveTo(this.startX, this.startY);
      this.ctx.lineTo(this.width, this.height);
      this.ctx.stroke();
    }

    if (this.selectedTool == "circle") {
      const rect = this.canvas.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;

      const dx = currentX - this.startX;
      const dy = currentY - this.startY;

      // Get the smallest side to ensure it's a perfect circle
      const diameter = Math.min(Math.abs(dx), Math.abs(dy));
      this.radius = diameter / 2;

      // Calculate center of the circle
      this.centerX = this.startX + (dx < 0 ? -this.radius : this.radius);
      this.centerY = this.startY + (dy < 0 ? -this.radius : this.radius);

      this.clearCanvas();
      this.drawAllShapes();

      this.ctx.beginPath();
      this.ctx.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI);
      this.ctx.stroke();
    }
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
      if (shape.type == "rect") {
        this.ctx.strokeRect(
          shape.startX,
          shape.startY,
          shape.width,
          shape.height
        );
      }

      if (shape.type == "text") {
        this.ctx.fillStyle = "white";
        this.ctx.font = "16px Arial";
        this.ctx.fillText(shape.text, shape.startX, shape.startY);
      }

      if (shape.type == "line") {
        this.ctx.beginPath();
        this.ctx.moveTo(shape.startX, shape.startY);
        this.ctx.lineTo(shape.width, shape.height);
        this.ctx.stroke();
      }

      if (shape.type == "circle") {
        this.ctx.beginPath();
        this.ctx.arc(
          shape.centerX,
          shape.centerY,
          shape.radius,
          0,
          2 * Math.PI
        );
        this.ctx.stroke();
      }
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

  changeTool(tool: string) {
    this.selectedTool = tool;
  }
}
