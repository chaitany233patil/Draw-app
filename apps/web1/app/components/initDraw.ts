import axios from "axios";
import { HTTP_BACKEND } from "../config";

interface Shape {
  type: string;
  startX: number;
  startY: number;
  width: number;
  height: number;
}

export async function initDraw(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  ws: WebSocket,
  roomId: string
) {
  let startX = 0,
    startY = 0,
    width = 0,
    height = 0;
  let isDrawing = false;

  const existingShapes: Shape[] = await getExistingShapes(roomId);
  clearCanvas(ctx, canvas, existingShapes);

  ctx.strokeStyle = "white";

  canvas.addEventListener("mousedown", (e) => {
    const rect = canvas.getBoundingClientRect();
    startX = e.clientX - rect.left;
    startY = e.clientY - rect.top;
    isDrawing = true;
  });

  canvas.addEventListener("mouseup", () => {
    isDrawing = false;
    const shape: Shape = {
      type: "rect",
      startX,
      startY,
      width,
      height,
    };
    existingShapes.push(shape);

    ws.send(
      JSON.stringify({
        type: "chat",
        roomId,
        message: JSON.stringify(shape),
      })
    );
  });

  canvas.addEventListener("mousemove", (e) => {
    if (!isDrawing) return;

    width = e.clientX - canvas.getBoundingClientRect().left - startX;
    height = e.clientY - canvas.getBoundingClientRect().top - startY;
    clearCanvas(ctx, canvas, existingShapes);
    ctx.strokeRect(startX, startY, width, height);
  });

  ws.onmessage = (msg) => {
    const data = JSON.parse(msg.data);
    if (data.type == "chat") {
      existingShapes.push(JSON.parse(data.message));
      clearCanvas(ctx, canvas, existingShapes);
    }
  };
}

function clearCanvas(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  existingShapes: Shape[]
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  existingShapes.map((shape) => {
    ctx.strokeRect(shape.startX, shape.startY, shape.width, shape.height);
  });
}

async function getExistingShapes(roomId: string) {
  const allShapes = await axios.get(`${HTTP_BACKEND}/api/v1/room/${roomId}`);
  return allShapes.data.shapes;
}
