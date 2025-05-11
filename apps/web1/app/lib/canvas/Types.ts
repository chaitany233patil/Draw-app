// /lib/canvas/types.ts
export type Shape =
  | {
      type: "rect";
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
    };
