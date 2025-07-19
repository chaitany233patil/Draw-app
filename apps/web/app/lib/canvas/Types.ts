// /lib/canvas/types.ts
export type Shape =
  | {
      type: "rect" | "line";
      startX: number;
      startY: number;
      width: number;
      height: number;
    }
  | {
      type: "circle";
      centerX: number;
      centerY: number;
      radius: number;
    }
  | {
      type: "text";
      startX: number;
      startY: number;
      text: string;
    };
