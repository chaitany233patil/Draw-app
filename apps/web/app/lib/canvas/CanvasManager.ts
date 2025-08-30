// import axios from "axios";
// import { HTTP_BACKEND } from "../../config";
import { Shape, strokePoints } from "./Types";

export class CanvasManager {
  private ctx: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;
  private ws: WebSocket;
  private roomId: string;
  private shapes: Shape[] = [];
  private selectedTool: string = "cursor";
  private currentColor: string = "white";
  private isDrawing = false;
  private startX = 0;
  private startY = 0;
  private width = 0;
  private height = 0;
  private centerX = 0;
  private centerY = 0;
  private radius = 0;
  private textBox: HTMLInputElement | undefined;
  private textStartX: number = 0;
  private textStartY: number = 0;
  public scallingNumber: number = 100;

  //pen drawing points arr
  private currentStrokePoints: strokePoints[] = [];

  private currentStrokeWidth: number = 1;
  private currentStrokeStyle: number[] = [0, 0];

  // Zoom in out settings
  private scale: number = 1;
  private translateX: number = 0;
  private translateY: number = 0;

  private onScaleChangeCallback?: (scale: number) => void;

  private isPanning: boolean = false;
  private panStartX: number = 0;
  private panStartY: number = 0;

  //Contructor
  constructor(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    ws: WebSocket,
    roomId: string,
  ) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.ws = ws;
    this.roomId = roomId;
    this.init();
  }

  //Scalling
  public setOnScaleChange(cb: (scale: number) => void) {
    this.onScaleChangeCallback = cb;
  }

  private handlePanStart = (e: MouseEvent) => {
    if (this.selectedTool === "pan") {
      this.isPanning = true;
      this.panStartX = e.clientX - this.translateX;
      this.panStartY = e.clientY - this.translateY;
    }
  };

  private handlePanMove = (e: MouseEvent) => {
    if (this.isPanning) {
      this.translateX = e.clientX - this.panStartX;
      this.translateY = e.clientY - this.panStartY;
      this.redraw();
    }
  };

  private handlePanEnd = () => {
    this.isPanning = false;
  };

  private handleWheel = (e: WheelEvent) => {
    e.preventDefault();

    const scaleAmount = -e.deltaY * 0.001;
    const newScale = this.scale * (1 + scaleAmount);

    this.scale = Math.min(Math.max(newScale, 0.2), 5);
    this.scallingNumber = Math.round(this.scale * 100);

    this.redraw();

    if (this.onScaleChangeCallback) {
      this.onScaleChangeCallback(this.scallingNumber);
    }
  };

  //Init Draw
  private async init() {
    this.shapes = await this.fetchShapes();
    this.clearCanvas();
    this.drawAllShapes();

    this.addEventListeners();
    this.ws.onmessage = this.handleSocketMessage;
  }

  //all Mouse Events
  private addEventListeners() {
    this.canvas.addEventListener("mousedown", this.handleMouseDown);
    this.canvas.addEventListener("mouseup", this.handleMouseUp);
    this.canvas.addEventListener("mousemove", this.handleMouseMove);
    this.canvas.addEventListener("dblclick", this.textHandler);

    this.canvas.addEventListener("mousedown", this.handlePanStart);
    this.canvas.addEventListener("mousemove", this.handlePanMove);
    this.canvas.addEventListener("mouseup", this.handlePanEnd);
    this.canvas.addEventListener("wheel", this.handleWheel, { passive: false });
  }

  private textHandler = async (e: MouseEvent) => {
    const rect = this.canvas.getBoundingClientRect();
    this.startX = e.clientX - rect.left;
    this.startY = e.clientY - rect.top;
    this.isDrawing = true;

    if (this.selectedTool == "text") {
      const input = document.createElement("input");
      this.textBox = input;
      input.type = "text";
      this.ctx.fillStyle = this.currentColor;
      input.placeholder = "type here..";
      input.style.color = this.currentColor;
      input.style.fontSize = "22px";
      input.style.position = "absolute";
      input.style.outline = "none";
      this.textStartX = (this.startX - this.translateX) / this.scale;
      this.textStartY = (this.startY - this.translateY) / this.scale;
      input.style.left = `${this.startX}px`;
      input.style.top = `${this.startY - 12}px`;

      document.body.appendChild(input);
      setTimeout(() => {
        input.focus();
      });

      const textHandler = () => {
        this.canvas.removeEventListener("mousedown", textHandler);
        this.ctx.fillStyle = this.currentColor;
        this.ctx.font = "22px Arial";
        const text = input.value;
        this.ctx.fillText(text, this.textStartX, this.textStartY);
        this.isDrawing = false;
        if (this.textBox) {
          this.textBox.remove();
        }
        const shape: Shape = {
          type: "text",
          startX: this.textStartX,
          startY: this.textStartY,
          color: this.currentColor,
          text,
        };
        this.shapes.push(shape);
        this.sendShape(shape);
      };

      this.canvas.addEventListener("mousedown", textHandler);
    }
  };

  private handleMouseDown = async (e: MouseEvent) => {
    const rect = this.canvas.getBoundingClientRect();

    const canvasX = (e.clientX - rect.left - this.translateX) / this.scale;
    const canvasY = (e.clientY - rect.top - this.translateY) / this.scale;

    this.startX = canvasX;
    this.startY = canvasY;

    if (this.textBox) {
      this.textBox.remove();
    }
    this.isDrawing = true;
  };

  private handleMouseUp = () => {
    this.isDrawing = false;
    this.ctx.beginPath();

    if (this.selectedTool == "pen") {
      const shape: Shape = {
        type: "pen",
        points: this.currentStrokePoints,
        linewidth: 1,
        color: this.currentColor,
        lineWidth: this.currentStrokeWidth,
        lineStyle: this.currentStrokeStyle,
      };
      this.currentStrokePoints = [];
      this.shapes.push(shape);
      this.sendShape(shape);
    }

    if (this.selectedTool == "rect") {
      const shape: Shape = {
        type: "rect",
        startX: this.startX,
        startY: this.startY,
        width: this.width,
        height: this.height,
        color: this.currentColor,
        lineWidth: this.currentStrokeWidth,
        lineStyle: this.currentStrokeStyle,
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
        color: this.currentColor,
        lineWidth: this.currentStrokeWidth,
        lineStyle: this.currentStrokeStyle,
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
        color: this.currentColor,
        lineWidth: this.currentStrokeWidth,
        lineStyle: this.currentStrokeStyle,
      };

      this.shapes.push(shape);
      this.sendShape(shape);
    }
  };

  private handleMouseMove = (e: MouseEvent) => {
    if (!this.isDrawing) return;

    if (this.selectedTool == "pen") {
      this.ctx.lineWidth = this.currentStrokeWidth;
      this.ctx.setLineDash(this.currentStrokeStyle);
      this.ctx.lineCap = "round";
      this.ctx.strokeStyle = this.currentColor;
      this.ctx.lineTo(e.clientX, e.clientY);
      this.currentStrokePoints.push({ x: e.clientX, y: e.clientY });
      this.ctx.stroke();
    }

    if (this.selectedTool == "rect") {
      const rect = this.canvas.getBoundingClientRect();

      const canvasX = (e.clientX - rect.left - this.translateX) / this.scale;
      const canvasY = (e.clientY - rect.top - this.translateY) / this.scale;
      this.width = canvasX - this.startX;
      this.height = canvasY - this.startY;

      this.clearCanvas();
      this.drawAllShapes();
      this.ctx.setLineDash(this.currentStrokeStyle);
      this.ctx.lineWidth = this.currentStrokeWidth;
      this.ctx.strokeStyle = this.currentColor;
      this.ctx.strokeRect(this.startX, this.startY, this.width, this.height);
    }

    if (this.selectedTool == "line") {
      this.width = (e.clientX - this.translateX) / this.scale;
      this.height = (e.clientY - this.translateY) / this.scale;
      this.ctx.beginPath();
      this.clearCanvas();
      this.drawAllShapes();
      this.ctx.setLineDash(this.currentStrokeStyle);
      this.ctx.lineWidth = this.currentStrokeWidth;
      this.ctx.strokeStyle = this.currentColor;
      this.ctx.moveTo(this.startX, this.startY);
      this.ctx.lineTo(this.width, this.height);
      this.ctx.stroke();
    }

    if (this.selectedTool == "circle") {
      const cirl = this.canvas.getBoundingClientRect();
      const currentX = (e.clientX - cirl.left - this.translateX) / this.scale;
      const currentY = (e.clientY - cirl.top - this.translateY) / this.scale;

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
      this.ctx.setLineDash(this.currentStrokeStyle);
      this.ctx.lineWidth = this.currentStrokeWidth;
      this.ctx.strokeStyle = this.currentColor;
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
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private drawAllShapes() {
    this.ctx.setTransform(
      this.scale,
      0,
      0,
      this.scale,
      this.translateX,
      this.translateY,
    );
    for (const shape of this.shapes) {
      if (shape.type == "pen") {
        this.ctx.strokeStyle = shape.color;
        this.ctx.lineWidth = shape.lineWidth;
        this.ctx.setLineDash(shape.lineStyle);
        this.ctx.lineCap = "round";
        this.ctx.beginPath();
        const points = shape.points;
        points.forEach((point) => this.ctx.lineTo(point.x, point.y));
        this.ctx.stroke();
      }

      if (shape.type == "rect") {
        this.ctx.setLineDash(shape.lineStyle);
        this.ctx.strokeStyle = shape.color;
        this.ctx.lineWidth = shape.lineWidth;
        this.ctx.strokeRect(
          shape.startX,
          shape.startY,
          shape.width,
          shape.height,
        );
      }

      if (shape.type == "text") {
        this.ctx.fillStyle = shape.color;
        this.ctx.font = "22px Arial";
        this.ctx.fillText(shape.text, shape.startX, shape.startY);
      }

      if (shape.type == "line") {
        this.ctx.beginPath();
        this.ctx.setLineDash(shape.lineStyle);
        this.ctx.strokeStyle = shape.color;
        this.ctx.lineWidth = shape.lineWidth;
        this.ctx.moveTo(shape.startX, shape.startY);
        this.ctx.lineTo(shape.width, shape.height);
        this.ctx.stroke();
      }

      if (shape.type == "circle") {
        this.ctx.beginPath();
        this.ctx.setLineDash(shape.lineStyle);
        this.ctx.lineWidth = shape.lineWidth;
        this.ctx.strokeStyle = shape.color;
        this.ctx.arc(
          shape.centerX,
          shape.centerY,
          shape.radius,
          0,
          2 * Math.PI,
        );
        this.ctx.stroke();
      }
    }
  }

  private async fetchShapes(): Promise<Shape[]> {
    // const response = await axios.get(
    //   `${HTTP_BACKEND}/api/v1/room/${this.roomId}`
    // );
    return [];
  }

  private sendShape(shape: Shape) {
    this.ws.send(
      JSON.stringify({
        type: "chat",
        roomId: this.roomId,
        message: JSON.stringify(shape),
      }),
    );
  }

  zoomIn() {
    this.scale *= 1.1;
    this.scallingNumber = Math.round(this.scale * 100);
    this.redraw();

    if (this.onScaleChangeCallback) {
      this.onScaleChangeCallback(this.scallingNumber);
    }
  }

  zoomOut() {
    this.scale /= 1.1;
    this.scallingNumber = Math.floor(this.scale * 100);
    this.redraw();

    if (this.onScaleChangeCallback) {
      this.onScaleChangeCallback(this.scallingNumber);
    }
  }

  //redraw
  private redraw() {
    this.clearCanvas();
    this.drawAllShapes();
  }

  changeTool(tool: string) {
    this.selectedTool = tool;
    switch (this.selectedTool) {
      case "text":
        this.canvas.style.cursor = "text";
        break;
      case "pan":
        this.canvas.style.cursor = "grabbing";
        break;
      case "cursor":
        this.canvas.style.cursor = "default";
        break;
      default:
        this.canvas.style.cursor = "crosshair";
    }
  }

  changeColor(color: string) {
    this.currentColor = color;
  }

  changeStrokeWidth(width: number) {
    this.currentStrokeWidth = width;
  }

  changeStrokeStyle(strokeStyle: number[]) {
    this.currentStrokeStyle = strokeStyle;
  }
}
