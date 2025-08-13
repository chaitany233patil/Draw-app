// /lib/canvas/types.ts
export interface strokePoints {
  x: number;
  y: number;
}

export type Shape =
  | {
      type: "rect" | "line";
      startX: number;
      startY: number;
      width: number;
      height: number;
      color: string;
      lineWidth: number;
    }
  | {
      type: "circle";
      centerX: number;
      centerY: number;
      radius: number;
      color: string;
      lineWidth: number;
    }
  | {
      type: "text";
      startX: number;
      startY: number;
      text: string;
      color: string;
    }
  | {
      type: "pen";
      linewidth: number;
      points: strokePoints[];
      color: string;
      lineWidth: number;
    };
