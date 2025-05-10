// /lib/canvas/types.ts
type ShapeType = "rect" | "circle";

export interface Shape {
  type: ShapeType;
  startX: number;
  startY: number;
  width: number;
  height: number;
}
