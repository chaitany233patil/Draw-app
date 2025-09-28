import { Minus } from "lucide-react";
import Image from "next/image";

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

interface Props {
  currStrokeColor: string;
  currStrokeWidth: number;
  currStrokeStyle: number[];
  setStrokeColor: (color: string) => void;
  setStrokeWidth: (stroke: number) => void;
  setStrokeStyle: (strokeStyle: number[]) => void;
}

export function SettingPanel(props: Props) {
  return (
    <div className="absolute top-22 left-3 bg-[#232329] p-4 rounded-lg cursor-pointer flex-col">
      <div className="flex flex-col gap-2">
        <div className="text-[12px] text-neutral-300">Stroke</div>
        <div className="flex gap-3">
          <div className="flex gap-1 border-r-3 border-slate-600 pr-3">
            {STROKE_COLORS.map((stroke) => (
              <div
                key={stroke.id}
                className={`${stroke.color} h-5.5 w-5.5 rounded-sm ring-offset-1 ring-slate-600 hover:ring-1 hover:ring-blue-400 ${props.currStrokeColor == stroke.stroke ? "ring-1 ring-blue-400" : ""}`}
                onClick={() => props.setStrokeColor(stroke.stroke)}
              ></div>
            ))}
          </div>
          <div
            className={`bg-[${props.currStrokeColor}] h-5.5 w-5.5 rounded-sm`}
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
                      ${props.currStrokeWidth == stroke.strokeWidth ? "bg-purple-500/30" : "bg-gray-500/15"}          
                      `}
                onClick={() => props.setStrokeWidth(stroke.strokeWidth)}
              >
                <Minus className="h-3 w-3" strokeWidth={stroke.strokeWidth} />
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
                      ${props.currStrokeStyle[0] == stroke.strokeStyle[0] ? "bg-purple-500/30" : "bg-gray-500/15"}          
                      `}
                onClick={() => props.setStrokeStyle(stroke.strokeStyle)}
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
  );
}
