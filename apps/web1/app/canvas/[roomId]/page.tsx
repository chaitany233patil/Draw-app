"use client";

import { Canvas } from "@/app/components/Canvas";
import { useParams } from "next/navigation";
import { useRef } from "react";

export default function RoomCanvas() {
  const { roomId } = useParams<{ roomId: string }>();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <Canvas
      canvasRef={canvasRef as React.RefObject<HTMLCanvasElement>}
      roomId={roomId}
    />
  );
}
