"use client";

import { useEffect, useRef, useState } from "react";
import { CanvasManager } from "../lib/canvas/CanvasManager";
import {
  Circle,
  LetterText,
  Minus,
  RectangleHorizontal,
  MousePointer,
  Hand,
  Menu,
  Pencil,
} from "lucide-react";
import { Tool } from "./Tool";
import { WS_BACKEND } from "../config";
import Image from "next/image";

interface Props {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  roomId: string;
}

const DRAW_TOOLS = [
  { selctedTool: "cursor", icon: MousePointer },
  { selctedTool: "pan", icon: Hand },
  { selctedTool: "circle", icon: Circle },
  { selctedTool: "rect", icon: RectangleHorizontal },
  { selctedTool: "line", icon: Minus },
  { selctedTool: "pen", icon: Pencil },
  { selctedTool: "text", icon: LetterText },
];

const STROKE_COLORS = [
  { id: "1", color: "bg-[#FFFFFF]", stroke: "#FFFFFF" },
  { id: "2", color: "bg-[#F26666]", stroke: "#F26666" },
  { id: "3", color: "bg-[#17AD3A]", stroke: "#17AD3A" },
  { id: "4", color: "bg-[#398EE3]", stroke: "#398EE3" },
  { id: "5", color: "bg-[#BD9204]", stroke: "#BD9204" },
];

const STROKE_WIDTHS = [
  { id: 1, strokeWidth: 1 },
  { id: 2, strokeWidth: 3 },
  { id: 3, strokeWidth: 5 },
];

const STROKE_STYLES = [
  { id: 1, strokeStyle: [0, 0], iconHref: "/line.svg" },
  { id: 2, strokeStyle: [3, 3], iconHref: "/dash_line.svg" },
  { id: 3, strokeStyle: [10, 5], iconHref: "/dash_line.svg" },
];

export function Canvas({ canvasRef, roomId }: Props) {
  const [scale, setScale] = useState<number>(100);
  const socketRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isSelected, setIsSelected] = useState("cursor");
  const [strokeColor, setStrokeColor] = useState("#FFFFFF");
  const game = useRef<CanvasManager | null>(null);
  const [settingModel, setSettingModel] = useState(false);
  const [strokeWidth, setStrokWidth] = useState(1);
  const [strokeStyle, setStrokeStyle] = useState([0, 0]);

  useEffect(() => {
    const roomExist = async () => {
      try {
        const ws = new WebSocket(WS_BACKEND);
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
              Game.changeStrokeWidth(strokeWidth);
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

  //reset selcted tool
  if (game.current) {
    game.current.changeTool(isSelected);
    game.current.changeColor(strokeColor);
    game.current.changeStrokeWidth(strokeWidth);
    game.current.changeStrokeStyle(strokeStyle);
  }

  if (!isConnected)
    return (
      <div className="flex items-center justify-center h-screen text-white">
        Connecting to WebSocket...
      </div>
    );

  return (
    <div>
      <canvas
        className="bg-neutral-900"
        ref={canvasRef}
        height={window.innerHeight}
        width={window.innerWidth}
        onClick={() => setSettingModel(false)}
      />

      {/* Drawing Tools */}
      <div className="absolute top-4 flex w-full ">
        <div className="mx-auto flex gap-2 bg-[#232329] rounded-xl p-1 shadow-xl border border-black">
          {DRAW_TOOLS.map((tool) => (
            <Tool
              key={tool.selctedTool}
              selected={isSelected == tool.selctedTool}
              onClick={() => {
                setSettingModel(true);
                setIsSelected(tool.selctedTool);
              }}
            >
              <tool.icon height={18} width={14} className="h-3.5 w-3.5" />
            </Tool>
          ))}
        </div>
      </div>

      {/* zoom in and zoom out */}
      <div className="absolute bottom-5 left-10 text-white flex items-center gap-1 bg-[#232329] rounded-lg p-1">
        <button
          className="h-8 w-8 cursor-pointer"
          onClick={() => {
            setScale(game.current?.scallingNumber as number);
            game.current?.zoomOut();
          }}
        >
          -
        </button>
        <div className="text-xs w-14 text-center">{scale}%</div>
        <button
          className="h-8 w-8 cursor-pointer"
          onClick={() => {
            setScale(game.current?.scallingNumber as number);
            game.current?.zoomIn();
          }}
        >
          +
        </button>
      </div>

      {/* setting pannel menu icon */}
      <div className="absolute top-4 left-3 bg-[#232329] p-2 rounded-lg cursor-pointer shadow-2xl">
        <Menu strokeWidth={1} className="h-5 w-5" />
      </div>

      {/* setting pannel window */}
      {settingModel && (
        // Stroke Colors
        <div className="absolute top-22 left-3 bg-[#232329] p-4 rounded-lg cursor-pointer flex-col">
          <div className="flex flex-col gap-2">
            <div className="text-[12px] text-neutral-300">Stroke</div>
            <div className="flex gap-3">
              <div className="flex gap-1 border-r-3 border-slate-600 pr-3">
                {STROKE_COLORS.map((stroke) => (
                  <div
                    key={stroke.id}
                    className={`${stroke.color} h-5.5 w-5.5 rounded-sm ring-offset-1 ring-slate-600 hover:ring-1 hover:ring-blue-400 ${strokeColor == stroke.stroke ? "ring-1 ring-blue-400" : ""}`}
                    onClick={() => setStrokeColor(stroke.stroke)}
                  ></div>
                ))}
              </div>
              <div
                className={`bg-[${strokeColor}] h-5.5 w-5.5 rounded-sm`}
              ></div>
            </div>

            {/* Stroke Width */}
            <div className="flex flex-col mt-3">
              <div className="text-[12px] text-neutral-300">Stroke Width</div>
              <div className="flex mt-2 gap-2">
                {STROKE_WIDTHS.map((stroke) => (
                  <div
                    key={stroke.id}
                    className={`p-3 rounded-lg hover:bg-gray-500/30 
                      ${strokeWidth == stroke.strokeWidth ? "bg-purple-500/30" : "bg-gray-500/15"}          
                      `}
                    onClick={() => setStrokWidth(stroke.strokeWidth)}
                  >
                    <Minus
                      className="h-3 w-3"
                      strokeWidth={stroke.strokeWidth}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col mt-2">
              <div className="text-[12px] text-neutral-300">Stroke Style</div>
              <div className="flex mt-2 gap-2">
                {STROKE_STYLES.map((stroke) => (
                  <div
                    key={stroke.id}
                    className={`rounded-lg hover:bg-gray-500/30 
                      ${strokeStyle[0] == stroke.strokeStyle[0] ? "bg-purple-500/30" : "bg-gray-500/15"}          
                      `}
                    onClick={() => setStrokeStyle(stroke.strokeStyle)}
                  >
                    <div className="p-0.5 flex gap-1">
                      <Image
                        src={stroke.iconHref}
                        alt="dash-line"
                        height={32}
                        width={32}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
