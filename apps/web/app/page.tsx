"use client";

import { Canvas } from "@/app/components/Canvas";
import { useRef } from "react";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // useEffect(() => {
  //   const roomID = "room_" + Date.now().toString(36);
  //   window.location.href = `/canvas/${roomID}`;
  // }, []);

  return <Canvas canvasRef={canvasRef as React.RefObject<HTMLCanvasElement>} />;
}
