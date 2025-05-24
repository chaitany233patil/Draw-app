// /components/Canvas.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { WS_BAKCEND } from "../config";
import { CanvasManager } from "../lib/canvas/CanvasManager";
import { Circle, LetterText, PenLine, RectangleHorizontal } from "lucide-react";
import { Tool } from "./Tool";

interface Props {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  roomId: string;
}

export function Canvas({ canvasRef, roomId }: Props) {
  const socketRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isSelected, setIsSelected] = useState("rect");
  const game = useRef<CanvasManager | null>(null);

  useEffect(() => {
    const ws = new WebSocket(WS_BAKCEND);
    ws.onopen = () => {
      socketRef.current = ws;
      setIsConnected(true);
      ws.send(
        JSON.stringify({
          type: "join_room",
          roomId,
        })
      );

      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d");
        if (ctx) {
          const Game = new CanvasManager(ctx, canvasRef.current, ws, roomId);
          Game.changeTool(isSelected);
          game.current = Game;
        }
      }
    };

    return () => {
      ws.close();
      console.log("WebSocket closed");
    };
  }, [canvasRef, roomId, isConnected]);

  if (game.current) {
    game.current.changeTool(isSelected);
  }

  if (!isConnected) return <div>Connecting to WebSocket...</div>;

  return (
    <div>
      <div className="h-screen w-screen">
        <canvas
          className="bg-black"
          ref={canvasRef}
          height={window.innerHeight}
          width={window.innerWidth}
        />
      </div>
      <div className="absolute top-3 left-[42%] flex gap-2 bg-gray-600 px-4 rounded-xl">
        <Tool
          selected={isSelected == "rect"}
          onClick={() => setIsSelected("rect")}
        >
          <RectangleHorizontal width={25} />
        </Tool>
        <Tool
          selected={isSelected == "line"}
          onClick={() => setIsSelected("line")}
        >
          <PenLine width={20} />
        </Tool>
        <Tool
          selected={isSelected == "circle"}
          onClick={() => setIsSelected("circle")}
        >
          <Circle width={20} />
        </Tool>
        <Tool
          selected={isSelected == "text"}
          onClick={() => setIsSelected("text")}
        >
          <LetterText width={20} />
        </Tool>
      </div>
    </div>
  );
}
