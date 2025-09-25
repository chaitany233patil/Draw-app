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
  PlayIcon,
  CopyIcon,
  Square,
  Undo2,
  Redo2,
} from "lucide-react";
import { Tool } from "./Tool";
import Image from "next/image";

interface Props {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  roomId?: string;
}

const DRAW_TOOLS = [
  { selctedTool: "pan", icon: Hand, count: null },
  { selctedTool: "cursor", icon: MousePointer, count: 1 },
  { selctedTool: "circle", icon: Circle, count: 2 },
  { selctedTool: "rect", icon: RectangleHorizontal, count: 3 },
  { selctedTool: "line", icon: Minus, count: 4 },
  { selctedTool: "pen", icon: Pencil, count: 5 },
  { selctedTool: "text", icon: LetterText, count: 6 },
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

const DEFAULT_USERNAME = "User" + Math.floor(Math.random() * 1000);

export function Canvas({ canvasRef }: Props) {
  const [scale, setScale] = useState<number>(100);
  const [isSelected, setIsSelected] = useState("cursor");
  const [strokeColor, setStrokeColor] = useState("#FFFFFF");
  const canvas = useRef<CanvasManager | null>(null);
  const [settingModel, setSettingModel] = useState(false);
  const [strokeWidth, setStrokWidth] = useState(1);
  const [strokeStyle, setStrokeStyle] = useState([0, 0]);
  const [shareModel, setShareModel] = useState(false);
  const [startSharing, setStartSharing] = useState(false);
  const [username, setUsername] = useState(DEFAULT_USERNAME);

  // useEffect(() => {
  //   const roomExist = async () => {
  //     try {
  //       const ws = new WebSocket(WS_BACKEND);
  //       ws.onopen = () => {
  //         socketRef.current = ws;
  //         setIsConnected(true);
  //         ws.send(
  //           JSON.stringify({
  //             type: "join_room",
  //             roomId,
  //           })
  //         );

  //         if (canvasRef.current) {
  //           const ctx = canvasRef.current.getContext("2d");
  //           if (ctx) {
  //             const Game = new CanvasManager(
  //               ctx,
  //               canvasRef.current,
  //               ws,
  //               roomId
  //             );
  //             Game.setOnScaleChange((newScalePercent) =>
  //               setScale(newScalePercent)
  //             );
  //             Game.changeTool(isSelected);
  //             Game.changeColor(strokeColor);
  //             Game.changeStrokeWidth(strokeWidth);
  //             game.current = Game;
  //           }
  //         }
  //       };
  //       return () => {
  //         ws.close();
  //         console.log("WebSocket closed");
  //       };
  //     } catch (err) {
  //       console.log("Error Occured", err);
  //     }
  //   };
  //   roomExist();
  // }, [canvasRef, roomId, isConnected]);

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = window.innerWidth * 2;
      canvasRef.current.height = window.innerHeight;
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        const Canvas = new CanvasManager(ctx, canvasRef.current);
        Canvas.setOnScaleChange((newScalePercent) => setScale(newScalePercent));
        Canvas.changeTool(isSelected);
        Canvas.changeColor(strokeColor);
        Canvas.changeStrokeWidth(strokeWidth);
        canvas.current = Canvas;
        console.log("Canvas initialized");
        const roomId = new URLSearchParams(window.location.search).get(
          "roomId"
        );
        if (roomId) {
          canvas.current?.startSession(roomId);
        }
      }
    }
  }, [canvasRef]);

  //reset selcted tool
  if (canvas.current) {
    canvas.current.changeTool(isSelected);
    canvas.current.changeColor(strokeColor);
    canvas.current.changeStrokeWidth(strokeWidth);
    canvas.current.changeStrokeStyle(strokeStyle);
  }

  function handleStartSession() {
    setStartSharing(true);
    const currentURI: string = window.location.pathname;
    const roomID = "room_" + Date.now().toString(36);
    const newURI = `${currentURI}?roomId=${roomID}`;
    window.history.replaceState(null, "", newURI);
    canvas.current?.startSession(roomID);
  }

  return (
    <div>
      <canvas
        className="bg-neutral-900"
        ref={canvasRef}
        height={1800}
        width={2400}
        onClick={() => setSettingModel(false)}
      />

      {/* Drawing Tools */}
      <div className="absolute top-4 flex w-full ">
        <div className="mx-auto flex gap-2 bg-[#232329] rounded-xl p-1 shadow-xl">
          {DRAW_TOOLS.map((tool) => (
            <Tool
              key={tool.selctedTool}
              selected={isSelected == tool.selctedTool}
              onClick={() => {
                setSettingModel(true);
                setIsSelected(tool.selctedTool);
              }}
              count={tool.count!}
            >
              <tool.icon height={18} width={14} className="h-3.5 w-3.5" />
            </Tool>
          ))}
        </div>
      </div>

      {/* zoom in and zoom out */}
      <div className="absolute bottom-5 left-10 text-white hidden sm:flex items-center gap-1 bg-[#232329] rounded-lg p-1">
        <button
          className="h-8 w-8 cursor-pointer"
          onClick={() => {
            setScale(canvas.current?.scallingNumber as number);
            canvas.current?.zoomOut();
          }}
        >
          -
        </button>
        <div className="text-xs w-14 text-center">{scale}%</div>
        <button
          className="h-8 w-8 cursor-pointer"
          onClick={() => {
            setScale(canvas.current?.scallingNumber as number);
            canvas.current?.zoomIn();
          }}
        >
          +
        </button>
      </div>

      {/* setting pannel menu icon */}
      <div className="absolute top-4 left-3 bg-[#232329] p-2 rounded-lg cursor-pointer shadow-2xl hidden sm:block">
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

      {/* Share Button */}
      <button
        onClick={() => setShareModel(true)}
        className="absolute top-4 right-3 bg-[#A8A5FF] text-[#121212] text-xs p-2.5 rounded-lg cursor-pointer hidden sm:block"
      >
        Share
      </button>

      {/* share model */}
      {shareModel && (
        <div
          onClick={() => {
            setShareModel(false);
            setStartSharing(false);
          }}
          className="absolute top-0 left-0 w-full h-full p-2 md:p-0 bg-black/20 flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#232329] p-10 rounded-lg max-w-xl w-full"
          >
            {!startSharing ? (
              <>
                <h3 className="text-xl font-semibold mb-6 text-[#A8A5FF] text-center">
                  Live Collaboration
                </h3>
                <p className="text-xs text-[#E3E3E8] mb-6 text-center">
                  Invite people to collaborate on your drawing.
                </p>
                <p className="text-xs text-[#E3E3E8] mb-6 text-center max-w-lg leading-5">
                  Don&apos;t worry, the session is end-to-end encrypted, and
                  fully private. Not even our server can see what you draw.
                </p>
                <div className="flex w-full items-center justify-center">
                  <button
                    onClick={handleStartSession}
                    className="bg-[#A8A5FF] text-[#121212] py-4 px-6 rounded-lg text-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <PlayIcon size={18} />
                    Start session
                  </button>
                </div>

                <div className="relative border-t border-gray-600 mt-10 flex items-center justify-center">
                  <div className="absolute px-7 text-sm text-gray-400 bg-[#232329]">
                    Or
                  </div>
                </div>

                <h3 className="text-xl font-semibold mt-7 mb-5 text-[#A8A5FF] text-center">
                  Shareable link
                </h3>
                <p className="text-xs text-[#E3E3E8]  text-center">
                  Export as a read-only link.
                </p>
                <div className="flex w-full items-center justify-center mt-6">
                  <button className="bg-[#A8A5FF] text-[#121212] py-4 px-6 rounded-lg text-sm flex items-center justify-center gap-2">
                    <PlayIcon size={18} />
                    Export to link
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-lg font-semibold mb-6 text-[#E3E3E8]">
                  Live Collaboration
                </h3>
                <label
                  htmlFor="name"
                  className="text-sm font-semibold text-[#E3E3E8] mb-2 block"
                >
                  Your name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Your Name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border border-[#E3E3E8]/50 bg-[#232329] text-[#E3E3E8] rounded-lg p-3 w-full text-sm"
                />

                <div className="flex flex-col mt-2">
                  <label
                    htmlFor="link"
                    className="text-sm font-semibold text-[#E3E3E8] mb-2 mt-4"
                  >
                    link
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 border border-[#E3E3E8]/50 bg-[#A8A5FF]/10 text-[#E3E3E8] rounded-lg p-3 w-full text-sm">
                      {window.location.href}
                    </div>
                    <button
                      onClick={async () => (
                        await navigator.clipboard.writeText(
                          window.location.href
                        ),
                        alert("Link Copied")
                      )}
                      className="text-sm flex items-center justify-center gap-2 bg-[#A8A5FF] text-[#121212] rounded-lg p-3 font-semibold cursor-pointer"
                    >
                      <CopyIcon size={18} />
                      Copy link
                    </button>
                  </div>
                  <div className="relative border-t border-gray-500 mt-10 flex items-center justify-center"></div>

                  <button className="border-1 border-[#ffa8a5] max-w-[170px] text-[#ffa8a5] py-4 px-6 rounded-lg text-sm flex items-center justify-center gap-2 mx-auto mt-7">
                    <Square size={18} fill="#ffa8a5" />
                    Stop session
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Undo & Redo */}
      <div className="absolute bottom-5 right-10 text-white flex items-center gap-4 rounded-lg">
        <button
          onClick={() => canvas.current?.Undo()}
          className="bg-[#232329] cursor-pointer shadow-2xl p-2.5 rounded-full"
        >
          <Undo2 size={18} />
        </button>
        <button
          onClick={() => canvas.current?.Redo()}
          className="bg-[#232329] cursor-pointer shadow-2xl p-2.5 rounded-full"
        >
          <Redo2 size={18} />
        </button>
      </div>
    </div>
  );
}
