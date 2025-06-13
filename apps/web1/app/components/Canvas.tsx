// /components/Canvas.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { CanvasManager } from "../lib/canvas/CanvasManager";
import {
  Circle,
  LetterText,
  PenLine,
  RectangleHorizontal,
  MousePointer,
  Hand,
} from "lucide-react";
import { Tool } from "./Tool";
import { WS_BAKCEND } from "../config";

interface Props {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  roomId: string;
}

export function Canvas({ canvasRef, roomId }: Props) {
  const socketRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isSelected, setIsSelected] = useState("cursor");
  const game = useRef<CanvasManager | null>(null);

  useEffect(() => {
    const roomExist = async () => {
      try {
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
              const Game = new CanvasManager(
                ctx,
                canvasRef.current,
                ws,
                roomId
              );
              Game.changeTool(isSelected);
              game.current = Game;
            }
          }
        };
        return () => {
          ws.close();
          console.log("WebSocket closed");
        };
      } catch (err) {
        console.log("Error Occured", err);
      }
    };
    roomExist();
  }, [canvasRef, roomId, isConnected]);

  if (game.current) {
    game.current.changeTool(isSelected);
  }

  if (!isConnected) return <div>Connecting to WebSocket...</div>;

  return (
    <div>
      <canvas
        className="bg-black"
        ref={canvasRef}
        height={window.innerHeight}
        width={window.innerWidth}
      />
      <div className="absolute top-[30%] ml-2 flex flex-col bg-gray-600/50 p-1 rounded-xl">
        <Tool
          selected={isSelected == "cursor"}
          onClick={() => setIsSelected("cursor")}
        >
          <MousePointer width={15} />
        </Tool>
        <Tool
          selected={isSelected == "Pan"}
          onClick={() => setIsSelected("Pan")}
        >
          <Hand width={15} />
        </Tool>
        <Tool
          selected={isSelected == "rect"}
          onClick={() => setIsSelected("rect")}
        >
          <RectangleHorizontal width={15} />
        </Tool>
        <Tool
          selected={isSelected == "line"}
          onClick={() => setIsSelected("line")}
        >
          <PenLine width={15} />
        </Tool>
        <Tool
          selected={isSelected == "circle"}
          onClick={() => setIsSelected("circle")}
        >
          <Circle width={15} />
        </Tool>
        <Tool
          selected={isSelected == "text"}
          onClick={() => setIsSelected("text")}
        >
          <LetterText width={15} />
        </Tool>
      </div>
      <div className="absolute bottom-5 text-white flex gap-3 ms-2">
        <button
          className="bg-gray-600/70 w-8 h-8 rounded-full"
          onClick={() => game.current?.zoomIn()}
        >
          +
        </button>

        <button
          className="bg-gray-600/70 w-8 h-8 rounded-full"
          onClick={() => game.current?.zoomOut()}
        >
          -
        </button>
      </div>
    </div>
  );
}
