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
  Menu,
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
    { selctedTool: "pan", icon: Hand },
    { selctedTool: "circle", icon: Circle },
    { selctedTool: "rect", icon: RectangleHorizontal },
    { selctedTool: "line", icon: PenLine },
    { selctedTool: "text", icon: LetterText },
  ];

  const StrokColors = [
    { id: "1", color: "bg-white", stroke: "white" },
    { id: "2", color: "bg-red-400", stroke: "red" },
  ];

  const [scale, setScale] = useState<number>(100);
  const socketRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isSelected, setIsSelected] = useState("cursor");
  const [strokeColor, setStrokeColor] = useState("red");
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
              Game.setOnScaleChange((newScalePercent) =>
                setScale(newScalePercent)
              );
              Game.changeTool(isSelected);
              Game.changeColor(strokeColor);
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
    game.current.changeColor(strokeColor);
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

      {/* Drawing Tools */}
      <div className="absolute top-0 flex w-full ">
        <div className="mx-auto flex gap-2 bg-[#232329] rounded-xl mt-2 p-1.5">
          {DrawTools.map((tool) => (
            <Tool
              key={tool.selctedTool}
              selected={isSelected == tool.selctedTool}
              onClick={() => setIsSelected(tool.selctedTool)}
            >
              <tool.icon height={18} width={14} className="h-4 w-4" />
            </Tool>
          ))}
        </div>
      </div>

      {/* zoom in and zoom out */}
      <div className="absolute bottom-5 left-10 text-white flex items-center gap-1 bg-[#232329] rounded-lg py-1">
        <button
          className="h-8 w-8 cursor-pointer"
          onClick={() => {
            setScale(game.current?.scallingNumber as number);
            game.current?.zoomIn();
          }}
        >
          +
        </button>
        <div className="text-sm w-14 text-center">{scale}%</div>
        <button
          className="h-8 w-8 cursor-pointer"
          onClick={() => {
            setScale(game.current?.scallingNumber as number);
            game.current?.zoomOut();
          }}
        >
          -
        </button>
      </div>

      {/* setting pannel menu icon */}
      <div className="hidden absolute top-4 left-6 bg-[#232329] p-2 rounded-lg cursor-pointer">
        <Menu strokeWidth={1} />
      </div>

      {/* setting pannel window */}
      <div className="hidden absolute top-20 left-6 bg-[#232329] p-4 rounded-lg cursor-pointer flex-col">
        <div className="flex flex-col gap-2">
          <div className="text-xs text-neutral-300">Stroke</div>
          <div className="flex gap-3">
            {StrokColors.map((stroke) => (
              <div
                key={stroke.id}
                className={`${stroke.color} h-7 w-7 rounded-md ring-offset-1 ring-slate-600 hover:ring-1 hover:ring-blue-400`}
                onClick={() => setStrokeColor(stroke.stroke)}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
