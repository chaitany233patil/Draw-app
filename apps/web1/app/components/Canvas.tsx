import React, { useEffect, useRef } from "react";
import { WS_BAKCEND } from "../config";
import { initDraw } from "./initDraw";

interface Props {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  roomId: string;
}

export function Canvas({ canvasRef, roomId }: Props) {
  const socket = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(WS_BAKCEND);

    ws.onopen = () => {
      console.log("WebSocket connected");
      socket.current = ws;

      ws.send(
        JSON.stringify({
          type: "join_room",
          roomId,
        })
      );

      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d");
        if (ctx) {
          initDraw(ctx, canvasRef.current, ws, roomId);
        }
      }
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    ws.onmessage = (msg) => {
      console.log("🔄 Received: inside canvas", msg.data);
      // Optionally: add code to draw received shapes here
      
    };

    return () => {
      ws.close();
      console.log("WebSocket closed");
    };
  }, [canvasRef, roomId]);

  return (
    <div>
      <canvas className="bg-black" ref={canvasRef} height={600} width={1300} />
    </div>
  );
}
