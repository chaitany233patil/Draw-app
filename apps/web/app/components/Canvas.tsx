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
  const DrawTools = [
    { selctedTool: "cursor", icon: MousePointer },
    { selctedTool: "circle", icon: Circle },
    { selctedTool: "Pan", icon: Hand },
    { selctedTool: "rect", icon: RectangleHorizontal },
    { selctedTool: "line", icon: PenLine },
    { selctedTool: "text", icon: LetterText },
  ];

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
        className="bg-neutral-900"
        ref={canvasRef}
        height={window.innerHeight}
        width={window.innerWidth}
      />
      <div className="absolute top-0 flex w-full ">
        <div className="mx-auto flex gap-2 bg-[#232329] rounded-xl mt-2 p-1.5">
          {DrawTools.map((tool) => (
            <Tool
              key={tool.selctedTool}
              selected={isSelected == tool.selctedTool}
              onClick={() => setIsSelected(tool.selctedTool)}
            >
              <tool.icon height={18} width={14} className="h-5 w-5" />
            </Tool>
          ))}
        </div>
      </div>
      <div className="absolute bottom-5 right-10 text-white flex gap-3 ms-2">
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
